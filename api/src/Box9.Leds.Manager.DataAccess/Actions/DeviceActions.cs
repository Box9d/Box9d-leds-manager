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
        public static DataAccessAction<IEnumerable<Device>> GetAllDevices()
        {
            return new DataAccessAction<IEnumerable<Device>>((IDbConnection conn) =>
            {
                return conn.GetAll<Device>();
            });
        }

        public static DataAccessAction<IEnumerable<Device>> GetProjectDevices(int projectId)
        {
            return new DataAccessAction<IEnumerable<Device>>((IDbConnection conn) =>
            {
                return conn.Query<Device>("SELECT Device.* FROM Device INNER JOIN ProjectDevice ON Device.id = ProjectDevice.deviceid WHERE ProjectDevice.projectid = @projectid", new { projectId });
            });
        }

        public static DataAccessAction<Device> GetProjectDevice(int projectDeviceId)
        {
            return new DataAccessAction<Device>((IDbConnection conn) =>
            {
                return conn.Query<Device>("SELECT Device.* FROM Device INNER JOIN ProjectDevice ON Device.id = ProjectDevice.deviceid WHERE ProjectDevice.id = @projectdeviceid", new { projectDeviceId })
                    .SingleOrDefault();
            });
        }

        public static DataAccessAction<Device> GetDevice(int deviceId)
        {
            return new DataAccessAction<Device>((IDbConnection conn) =>
            {
                return conn.Get<Device>(deviceId);
            });
        }

        public static DataAccessAction<ProjectDevice> AddDeviceToProject(int projectId, Device device)
        {
            return new DataAccessAction<ProjectDevice>((IDbConnection conn) =>
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

                        var existingProjectDevices = conn
                            .Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE deviceid=@deviceid AND projectid=@projectid", new { deviceId = device.Id, projectId });

                        foreach (var existingProjectDevice in existingProjectDevices)
                        {
                            conn.Delete(existingProjectDevice, transaction);
                        }

                        var projectDevice = new ProjectDevice { DeviceId = device.Id, ProjectId = project.Id };
                        projectDevice.Id = conn.GetNextId<ProjectDevice>();

                        conn.Insert(projectDevice, transaction);

                        var projectDeviceVersionId = conn.GetNextId<ProjectDeviceVersion>();
                        var projectDeviceVersion = new ProjectDeviceVersion
                        {
                            Id = projectDeviceVersionId,
                            ProjectDeviceId = projectDevice.Id,
                        };

                        conn.Insert(projectDeviceVersion, transaction);

                        transaction.Commit();

                        return projectDevice;
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            });
        }

        public static DataAccessAction RemoveDeviceFromProject(int deviceId, int projectId)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var existingProjectDevices = conn
                            .Query<ProjectDevice>("SELECT * FROM ProjectDevice WHERE deviceid=@deviceid AND projectid=@projectid", new { deviceId, projectId });

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        foreach (var existingProjectDevice in existingProjectDevices)
                        {
                            conn.Delete(existingProjectDevice, transaction);
                        }

                        transaction.Commit();
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            });
        }
    }
}
