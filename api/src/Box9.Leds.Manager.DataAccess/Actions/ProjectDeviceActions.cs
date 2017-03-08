using System.Collections.Generic;
using System.Data;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class ProjectDeviceActions
    {
        public static DataAccessAction<ProjectDeviceVersion> GetLatestProjectDeviceVersion(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                return conn
                    .Query<ProjectDeviceVersion>("SELECT Version FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY VERSION DESC LIMIT 1",
                        new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetLatestProjectDeviceVersion(ProjectDeviceVersion projectDeviceMappingVersion)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                projectDeviceMappingVersion.Validate();

                var currentVersion = conn.Query<int>("SELECT Version FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1", 
                    new { projectDeviceMappingVersion.ProjectDeviceId })
                    .SingleOrDefault();

                var id = conn.GetNextId<ProjectDeviceVersion>();

                projectDeviceMappingVersion.Id = id;
                projectDeviceMappingVersion.Version = currentVersion == 0 ? 1 : currentVersion + 1;

                conn.Insert(projectDeviceMappingVersion);
                return projectDeviceMappingVersion;
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> UndoLatestProjectDeviceVersion(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                var currentVersion = conn.Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1",
                    new { projectDeviceId })
                    .SingleOrDefault();

                if (currentVersion != null)
                {
                    var versionMappings = conn.Query<ProjectDeviceVersionMapping>("SELECT * FROM ProjectDeviceVersionMapping WHERE projectdeviceversionid = @projectdeviceversionid");

                    using (var transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            foreach (var mapping in versionMappings)
                            {
                                conn.Delete(mapping, transaction);
                            }

                            conn.Delete(currentVersion);
                        }
                        catch
                        {
                            transaction.Rollback();
                            throw;
                        }
                    }

                    return conn.Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1",
                        new { projectDeviceId })
                        .SingleOrDefault();
                }

                return null;
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetProjectDeviceMappings(int projectDeviceId, IEnumerable<ProjectDeviceVersionMapping> mappings)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                // Update to new version of project device before setting mappings
                var latestDeviceVersion = GetLatestProjectDeviceVersion(projectDeviceId).Function(conn);
                latestDeviceVersion = SetLatestProjectDeviceVersion(latestDeviceVersion).Function(conn);

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        foreach (var mapping in mappings)
                        {
                            mapping.Validate(latestDeviceVersion);
                            conn.Insert(mapping);
                        }
                    }
                    catch
                    {
                        transaction.Rollback();
                        UndoLatestProjectDeviceVersion(projectDeviceId).Function(conn);
                        throw;
                    }
                }

                return latestDeviceVersion;
            });
        }
    }
}
