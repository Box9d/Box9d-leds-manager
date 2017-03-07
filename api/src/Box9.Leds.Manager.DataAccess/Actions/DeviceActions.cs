using System.Data;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
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

                device.Id = conn.GetNextId<Device>();

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        conn.Insert(device, transaction);
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
