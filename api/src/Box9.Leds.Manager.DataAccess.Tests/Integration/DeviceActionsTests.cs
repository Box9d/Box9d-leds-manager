using System.Linq;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class DeviceActionsTests
    {
        [Fact]
        public void CanAddDeviceToProject()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);
            }
        }

        [Fact]
        public void CanGetDevicesForProject()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                var projectDevice = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);

                var devices = DeviceActions.GetProjectDevices(project.Id).Function(conn);

                Assert.Equal(1, devices.Count());

                var retrievedDevice = devices.Single();

                Assert.Equal(device.IpAddress, retrievedDevice.IpAddress);
                Assert.Equal(device.Name, retrievedDevice.Name);
            }
        }

        [Fact]
        public void CanDistinguishBetweenProjectDevicesAndNonProjectDevices()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var anotherProject = new Project { Name = "Test2" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };
                var anotherDevice = new Device { IpAddress = "192.168.1.2", Name = "MyOtherTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                anotherProject = ProjectActions.CreateProject(anotherProject).Function(conn);
                var projectDevice = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);
                var anotherProjectDevice = DeviceActions.AddDeviceToProject(anotherProject.Id, anotherDevice).Function(conn);

                var devices = DeviceActions.GetProjectDevices(project.Id).Function(conn);

                Assert.Equal(1, devices.Count());

                var retrievedDevice = devices.Single();

                Assert.Equal(device.IpAddress, retrievedDevice.IpAddress);
                Assert.Equal(device.Name, retrievedDevice.Name);
            }
        }
    }
}
