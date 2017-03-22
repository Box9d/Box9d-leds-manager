using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class ProjectDeviceController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public ProjectDeviceController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [HttpGet]
        [ActionName("GetProjectDevices")]
        public GlobalJsonResult<IEnumerable<ProjectDevice>> GetProjectDevices(int projectId)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDevices(projectId));

            return GlobalJsonResult<IEnumerable<ProjectDevice>>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}