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
        public static DataAccessAction<Device> CreateProjectDevice(int projectId, Device device)
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

                        conn.Insert(new ProjectDevice { DeviceId = device.Id, ProjectId = project.Id }, transaction);
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
