using System.Data;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class ProjectDeviceVersionActions
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
    }
}
