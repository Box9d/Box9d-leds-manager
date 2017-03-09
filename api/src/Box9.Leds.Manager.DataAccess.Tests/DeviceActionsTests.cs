using System.Linq;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests
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
                device = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);

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
                var projectDevice = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };
                var anotherProjectDevice = new Device { IpAddress = "192.168.1.2", Name = "MyOtherTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                anotherProject = ProjectActions.CreateProject(anotherProject).Function(conn);
                projectDevice = DeviceActions.AddDeviceToProject(project.Id, projectDevice).Function(conn);
                anotherProjectDevice = DeviceActions.AddDeviceToProject(anotherProject.Id, anotherProjectDevice).Function(conn);

                var devices = DeviceActions.GetProjectDevices(project.Id).Function(conn);

                Assert.Equal(1, devices.Count());

                var retrievedDevice = devices.Single();

                Assert.Equal(projectDevice.IpAddress, retrievedDevice.IpAddress);
                Assert.Equal(projectDevice.Name, retrievedDevice.Name);
            }
        }
    }
}
