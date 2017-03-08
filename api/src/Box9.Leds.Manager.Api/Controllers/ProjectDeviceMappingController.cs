using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class ProjectDeviceMappingController : ApiController
    {
        private IDataAccessDispatcher dispatcher;

        public ProjectDeviceMappingController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [HttpPost]
        [ActionName("UpdateProjectDeviceMappings")]
        public GlobalJsonResult<ProjectDeviceVersion> UpdateProjectDeviceMappings(int projectDeviceId, IEnumerable<ProjectDeviceVersionMapping> mappings)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.SetProjectDeviceMappings(projectDeviceId, mappings));

            return GlobalJsonResult<ProjectDeviceVersion>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}