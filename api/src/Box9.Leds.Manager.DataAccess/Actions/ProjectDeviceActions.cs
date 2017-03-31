using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
using Dapper.Contrib.Extensions;
using Box9.Leds.Manager.Core.Validation;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class ProjectDeviceActions
    {
        public static DataAccessAction<Project> GetProjectFromProjectDeviceId(int projectDeviceId)
        {
            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                return conn.Query<Project>("SELECT Project.* FROM ProjectDevice INNER JOIN Project ON ProjectDevice.projectid = Project.id WHERE ProjectDevice.id = @projectdeviceid", new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<IEnumerable<ProjectDevice>> GetProjectDevices(int projectId)
        {
            return new DataAccessAction<IEnumerable<ProjectDevice>>((IDbConnection conn) =>
            {
                return conn.Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE projectid = @projectid", new { projectId });
            });
        }

        public static DataAccessAction<ProjectDevice> GetProjectDevice(int deviceId, int projectId)
        {
            return new DataAccessAction<ProjectDevice>((IDbConnection conn) =>
            {
                var projectDevice = conn.Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE projectid=@projectid AND deviceid=@deviceid", new { projectId, deviceId })
                    .SingleOrDefault();

                Guard.This(projectDevice).AgainstDefaultValue(string.Format("No project device found with project id {0} and deviceid {1}", projectId, deviceId));

                return projectDevice;
            });
        }

        public static DataAccessAction<ProjectDevice> GetProjectDevice(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDevice>((IDbConnection conn) =>
            {
                return conn.Get<ProjectDevice>(projectDeviceId);
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> GetProjectDeviceVersion(int projectDeviceVersionId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                return conn.Get<ProjectDeviceVersion>(projectDeviceVersionId);
            });
        }


        public static DataAccessAction<IEnumerable<ProjectDeviceVersion>> GetProjectDeviceVersionsForProjectDevice(int projectDeviceId)
        {
            return new DataAccessAction<IEnumerable<ProjectDeviceVersion>>((IDbConnection conn) =>
            {
                return conn.Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid", new { projectDeviceId });
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> GetLatestProjectDeviceVersion(int deviceId, int projectId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                var projectDevice = GetProjectDevice(deviceId, projectId).Function(conn);
                return GetLatestProjectDeviceVersion(projectDevice.Id).Function(conn);
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> GetLatestProjectDeviceVersion(int projectDeviceId)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                return conn
                    .Query<ProjectDeviceVersion>("SELECT * FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY VERSION DESC LIMIT 1",
                        new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetLatestProjectDeviceVersion(ProjectDeviceVersion projectDeviceVersion)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                projectDeviceVersion.Validate();

                var currentVersion = conn.Query<int>("SELECT Version FROM ProjectDeviceVersion WHERE projectdeviceid = @projectdeviceid ORDER BY Version DESC LIMIT 1", 
                    new { projectDeviceVersion.ProjectDeviceId })
                    .SingleOrDefault();

                var id = conn.GetNextId<ProjectDeviceVersion>();

                projectDeviceVersion.Id = id;
                projectDeviceVersion.Version = currentVersion == 0 ? 1 : currentVersion + 1;

                conn.Insert(projectDeviceVersion);

                // Always create a new background job when the project device version changes
                BackgroundJobActions.CreateJob(projectDeviceVersion.Id).Function(conn);

                return projectDeviceVersion;
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
                    var versionMappings = conn.Query<ProjectDeviceVersionMapping>(
                            @"SELECT * FROM ProjectDeviceVersionMapping " +
                            @"WHERE projectdeviceversionid = @projectdeviceversionid",
                            new { ProjectDeviceVersionId = currentVersion.Id });

                    using (var transaction = conn.BeginTransaction())
                    {
                        try
                        {
                            foreach (var mapping in versionMappings)
                            {
                                conn.Delete(mapping, transaction);
                            }

                            conn.Delete(currentVersion, transaction);

                            transaction.Commit();
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

        public static DataAccessAction<IEnumerable<ProjectDeviceVersionMapping>> GetProjectDeviceMappings(int projectDeviceVersionId)
        {
            return new DataAccessAction<IEnumerable<ProjectDeviceVersionMapping>>((IDbConnection conn) =>
            {
                return conn.Query<ProjectDeviceVersionMapping>("SELECT * FROM ProjectDeviceVersionMapping WHERE projectdeviceversionid = @projectdeviceversionid", new { projectDeviceVersionId });
            });
        }

        public static DataAccessAction<ProjectDeviceVersion> SetProjectDeviceMappings(int projectDeviceVersionId, IEnumerable<ProjectDeviceVersionMapping> mappings)
        {
            return new DataAccessAction<ProjectDeviceVersion>((IDbConnection conn) =>
            {
                // Update to new version of project device before setting mappings
                var deviceVersion = GetProjectDeviceVersion(projectDeviceVersionId).Function(conn);

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        var currentMappings = GetProjectDeviceMappings(projectDeviceVersionId).Function(conn);

                        foreach (var mapping in currentMappings)
                        {
                            conn.Delete(mapping, transaction);
                        }

                        var nextId = conn.GetNextId<ProjectDeviceVersionMapping>();

                        foreach (var mapping in mappings)
                        {
                            mapping.Validate(deviceVersion);
                            mapping.Id = nextId;
                            mapping.ProjectDeviceVersionId = projectDeviceVersionId;
                            conn.Insert(mapping, transaction);

                            nextId++;
                        }

                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                return deviceVersion;
            });
        }
    }
}
