using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class ProjectsController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public ProjectsController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [ActionName("GetAll")]
        [HttpGet]
        public GlobalJsonResult<IEnumerable<Project>> GetAll()
        {
            var projects = dispatcher.Dispatch(ProjectActions.GetAllProjects());

            return GlobalJsonResult<IEnumerable<Project>>.Success(System.Net.HttpStatusCode.OK, projects);
        }

        [ActionName("GetProject")]
        [HttpGet]
        public GlobalJsonResult<Project> Get(int id)
        {
            var project = dispatcher.Dispatch(ProjectActions.GetProject(id));

            return GlobalJsonResult<Project>.Success(System.Net.HttpStatusCode.OK, project);
        }

        [ActionName("CreateProject")]
        [HttpPost]
        public GlobalJsonResult<Project> Create([FromBody]Project project)
        {
            dispatcher.Dispatch(ProjectActions.CreateProject(project));

            return GlobalJsonResult<Project>.Success(System.Net.HttpStatusCode.Created, project);
        }

        [ActionName("UpdateProject")]
        [HttpPut]
        public GlobalJsonResult<Project> Update([FromBody]Project project)
        {
            dispatcher.Dispatch(ProjectActions.UpdateProject(project));

            return GlobalJsonResult<Project>.Success(System.Net.HttpStatusCode.OK, project);
        }

        [ActionName("Delete")]
        [HttpDelete]
        public GlobalJsonResult<EmptyResult> Delete(int id)
        {
            dispatcher.Dispatch(ProjectActions.DeleteProject(id));

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.NoContent);
        }
    }
}
