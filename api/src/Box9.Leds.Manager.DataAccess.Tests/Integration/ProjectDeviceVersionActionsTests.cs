using System.Collections.Generic;
using System.Linq;
using Box9.Leds.Manager.Core.Equality;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class ProjectDeviceVersionActionsTests
    {
        [Fact]
        public void CanCreateProjectAndGetDeviceVersion()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                var projectDevice = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);

                var projectDeviceVersion = ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDevice.Id).Function(conn);

                projectDeviceVersion = ProjectDeviceActions.SetLatestProjectDeviceVersion(new ProjectDeviceVersion
                {
                    ProjectDeviceId = projectDevice.Id,
                    HorizontalPercentage = 100,
                    VerticalPercentage = 100,
                    NumberOfHorizontalPixels = 50,
                    NumberOfVerticalPixels = 50,
                    StartAtHorizontalPercentage = 0,
                    StartAtVerticalPercentage = 0
                }).Function(conn);

                projectDeviceVersion = ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDevice.Id).Function(conn);

                Assert.NotNull(projectDeviceVersion);
            }
        }

        [Fact]
        public void CanUndoProjectDeviceVersion()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                var projectDevice = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);

                var projectDeviceVersion = ProjectDeviceActions.SetLatestProjectDeviceVersion(new ProjectDeviceVersion
                {
                    ProjectDeviceId = projectDevice.Id,
                    HorizontalPercentage = 100,
                    VerticalPercentage = 100,
                    NumberOfHorizontalPixels = 50,
                    NumberOfVerticalPixels = 50,
                    StartAtHorizontalPercentage = 0,
                    StartAtVerticalPercentage = 0
                }).Function(conn);

                var updatedProjectDeviceVersion = ProjectDeviceActions.SetLatestProjectDeviceVersion(new ProjectDeviceVersion
                {
                    ProjectDeviceId = projectDevice.Id,
                    HorizontalPercentage = 99,
                    VerticalPercentage = 99,
                    NumberOfHorizontalPixels = 30,
                    NumberOfVerticalPixels = 30,
                    StartAtHorizontalPercentage = 1,
                    StartAtVerticalPercentage = 1
                }).Function(conn);

                var undoneProjectDeviceVersion = ProjectDeviceActions.UndoLatestProjectDeviceVersion(projectDevice.Id).Function(conn);

                var undoEqualsOriginalProjectDeviceVersion = projectDeviceVersion.PropertiesAreEqual(undoneProjectDeviceVersion);

                Assert.True(undoEqualsOriginalProjectDeviceVersion);
            }
        }

        [Fact]
        public void CanSetProjectDeviceMappingsTwice()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Name = "Test" };
                var device = new Device { IpAddress = "192.168.1.1", Name = "MyTestDevice" };

                project = ProjectActions.CreateProject(project).Function(conn);
                var projectDevice = DeviceActions.AddDeviceToProject(project.Id, device).Function(conn);
                var projectDeviceVersion = ProjectDeviceActions.SetLatestProjectDeviceVersion(new ProjectDeviceVersion
                {
                    ProjectDeviceId = projectDevice.Id,
                    HorizontalPercentage = 100,
                    VerticalPercentage = 100,
                    NumberOfHorizontalPixels = 50,
                    NumberOfVerticalPixels = 50,
                    StartAtHorizontalPercentage = 0,
                    StartAtVerticalPercentage = 0
                }).Function(conn);

                var firstMappings = new List<ProjectDeviceVersionMapping>
                {
                    new ProjectDeviceVersionMapping
                    {
                        HorizontalPosition = 1,
                        VerticalPosition = 1,
                        MappingOrder = 1
                    }
                };

                var secondMappings = new List<ProjectDeviceVersionMapping>
                {
                    new ProjectDeviceVersionMapping
                    {
                        HorizontalPosition = 1,
                        VerticalPosition = 1,
                        MappingOrder = 1,
                    },
                    new ProjectDeviceVersionMapping
                    {
                        HorizontalPosition = 2,
                        VerticalPosition = 1,
                        MappingOrder = 2
                    }
                };

                ProjectDeviceActions.SetProjectDeviceMappings(projectDeviceVersion.Id, firstMappings).Function(conn);
                ProjectDeviceActions.SetProjectDeviceMappings(projectDeviceVersion.Id, secondMappings).Function(conn);

                var result = ProjectDeviceActions.GetProjectDeviceMappings(projectDeviceVersion.Id).Function(conn);

                Assert.Equal(2, result.Count());
            }
        }
    }
}
