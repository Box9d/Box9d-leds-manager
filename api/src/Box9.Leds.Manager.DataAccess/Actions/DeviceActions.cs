using System.Collections.Generic;
using System.Data;
using System.Linq;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class DeviceActions
    {
        public static DataAccessAction<IEnumerable<Device>> GetProjectDevices(int projectId)
        {
            return new DataAccessAction<IEnumerable<Device>>((IDbConnection conn) =>
            {
                return conn.Query<Device>("SELECT Device.* FROM Device INNER JOIN ProjectDevice ON Device.id = ProjectDevice.deviceid WHERE ProjectDevice.projectid = @projectid", new { projectId });
            });
        }

        public static DataAccessAction<Device> AddDeviceToProject(int projectId, Device device)
        {
            return new DataAccessAction<Device>((IDbConnection conn) =>
            {
                device.Validate();

                var project = conn.Get<Project>(projectId);
                Guard.This(project).AgainstDefaultValue(string.Format("No project exists with id '{0}'", projectId));

                var existingDevice = conn
                    .Query<Device>("SELECT * FROM Device WHERE ipaddress = @ipaddress", new { device.IpAddress })
                    .SingleOrDefault();

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        if (existingDevice != null)
                        {
                            device.Id = existingDevice.Id;
                            conn.Update(device, transaction);
                        }
                        else
                        {
                            device.Id = conn.GetNextId<Device>();
                            conn.Insert(device, transaction);
                        }

                        var projectDevice = new ProjectDevice { DeviceId = device.Id, ProjectId = project.Id };
                        projectDevice.Id = conn.GetNextId<ProjectDevice>();

                        conn.Insert(projectDevice, transaction);
                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }

                return device;
            });
        }
    }
}
