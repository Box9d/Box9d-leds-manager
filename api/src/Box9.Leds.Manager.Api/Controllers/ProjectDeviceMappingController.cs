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

        [HttpGet]
        [ActionName("GetProjectDeviceMappings")]
        public GlobalJsonResult<IEnumerable<ProjectDeviceVersionMapping>> GetProjectDeviceMappings(int projectDeviceVersionId)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceMappings(projectDeviceVersionId));

            return GlobalJsonResult<IEnumerable<ProjectDeviceVersionMapping>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("SetProjectDeviceMappings")]
        public GlobalJsonResult<ProjectDeviceVersion> SetProjectDeviceMappings(int projectDeviceVersionId, IEnumerable<ProjectDeviceVersionMapping> mappings)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.SetProjectDeviceMappings(projectDeviceVersionId, mappings));

            return GlobalJsonResult<ProjectDeviceVersion>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}