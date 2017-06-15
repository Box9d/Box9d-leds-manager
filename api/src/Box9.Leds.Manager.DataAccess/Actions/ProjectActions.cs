using System.Collections.Generic;
using System.Data;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public class ProjectActions
    {
        public static DataAccessAction<IEnumerable<Project>> GetAllProjects()
        {
            return new DataAccessAction<IEnumerable<Project>>((IDbConnection conn) =>
            {
                return conn.GetAll<Project>();
            });
        }

        public static DataAccessAction<Project> GetProject(int id)
        {
            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                return conn.Get<Project>(id);
            });
        }

        public static DataAccessAction<Project> GetProjectFromProjectDevice(int projectDeviceId)
        {
            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                var projectDevice = conn.Get<ProjectDevice>(projectDeviceId);
                Guard.This(projectDevice).AgainstDefaultValue(string.Format("No project device could be found with id of '{0}'", projectDeviceId));

                return conn.Get<Project>(projectDevice.ProjectId);
            });
        }

        public static DataAccessAction<Project> CreateProject(Project project)
        {
            project.Validate();

            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                project.Id = conn.GetNextId<Project>();
                conn.Insert(project);

                return project;
            });
        }

        public static DataAccessAction<Project> CopyProject(Project project)
        {
            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                var existingProject = conn.Get<Project>(project.Id);
                Guard.This(existingProject).AgainstDefaultValue(string.Format("No project exists with an id of {0}", project.Id));

                var tran = conn.BeginTransaction();

                try
                {
                    var newProject = new Project
                    {
                        Id = conn.GetNextId<Project>(),
                        Name = project.Name
                    };

                    conn.Insert(newProject, tran);

                    var projectDevices = ProjectDeviceActions.GetProjectDevices(project.Id).Function(conn);

                    var nextProjectDeviceId = conn.GetNextId<ProjectDevice>();
                    var nextProjectDeviceVersionId = conn.GetNextId<ProjectDeviceVersion>();
                    foreach (var projectDevice in projectDevices)
                    {
                        var projectDeviceId = projectDevice.Id;

                        projectDevice.Id = nextProjectDeviceId;
                        projectDevice.ProjectId = newProject.Id;

                        conn.Insert(projectDevice, tran);

                        var projectDeviceLatestVersion = ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDeviceId).Function(conn);
                        var projectDeviceVersionId = projectDeviceLatestVersion.Id;
                        projectDeviceLatestVersion.ProjectDeviceId = projectDevice.Id;
                        projectDeviceLatestVersion.Version = 1;
                        projectDeviceLatestVersion.Id = nextProjectDeviceVersionId;

                        conn.Insert(projectDeviceLatestVersion, tran);

                        var mappings = ProjectDeviceActions.GetProjectDeviceMappings(projectDeviceVersionId).Function(conn);
                        var nextMappingId = conn.GetNextId<ProjectDeviceVersionMapping>();
                        foreach (var mapping in mappings)
                        {
                            mapping.Id = nextMappingId;
                            mapping.ProjectDeviceVersionId = projectDeviceLatestVersion.Id;

                            conn.Insert(mapping, tran);

                            nextMappingId++;
                        }

                        nextProjectDeviceId++;
                        nextProjectDeviceVersionId++;
                    }

                    tran.Commit();
                    return newProject;
                }
                catch
                {
                    tran.Rollback();
                    throw;
                }
            });
        }

        public static DataAccessAction<Project> UpdateProject(Project project)
        {
            project.Validate();

            return new DataAccessAction<Project>((IDbConnection conn) =>
            {
                conn.Update(project);

                return project;
            });
        }

        public static DataAccessAction DeleteProject(int id)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var project = conn.Get<Project>(id);
                conn.Delete(project);
            });
        }
    }
}
