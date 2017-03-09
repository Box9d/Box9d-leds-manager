using System;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests
{
    public class ProjectActionsTests
    {
        [Fact]
        public void CanCreateProject()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                ProjectActions
                    .CreateProject(new Project { Id = 1, Name = "Test" })
                    .Function(conn);
            }
        }

        [Fact]
        public void CanGetProjects()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Id = 1, Name = "Test" };

                ProjectActions
                    .CreateProject(project)
                    .Function(conn);

                var get = ProjectActions
                    .GetProject(project.Id)
                    .Function(conn);
            }
        }

        [Fact]
        public void CanGetAllProjects()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Id = 1, Name = "Test" };

                ProjectActions
                    .CreateProject(project)
                    .Function(conn);

                ProjectActions
                    .GetAllProjects()
                    .Function(conn);
            }
        }

        [Fact]
        public void CanUpdateProject()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Id = 1, Name = "Test" };

                ProjectActions
                    .CreateProject(project)
                    .Function(conn);

                project.Name = "Update Test";

                ProjectActions
                    .UpdateProject(project)
                    .Function(conn);
            }
        }

        [Fact]
        public void CanDeleteProject()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var project = new Project { Id = 1, Name = "Test" };

                ProjectActions
                    .CreateProject(project)
                    .Function(conn);

                ProjectActions
                    .DeleteProject(project.Id)
                    .Action(conn);

                var get = ProjectActions
                    .GetProject(project.Id)
                    .Function(conn);

                Assert.Null(get);
            }
        }
    }
}
