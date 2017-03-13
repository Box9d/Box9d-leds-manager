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
