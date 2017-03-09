using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class ProjectDeviceController : ApiController
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;

        public ProjectDeviceController(IDataAccessDispatcher dataAccessDispatcher)
        {
            this.dataAccessDispatcher = dataAccessDispatcher;
        }

        [HttpGet]
        [ActionName("GetProjectDevices")]
        public GlobalJsonResult<IEnumerable<Device>> GetProjectDevices(int projectId)
        {
            var result = dataAccessDispatcher.Dispatch(DeviceActions.GetProjectDevices(projectId));

            return GlobalJsonResult<IEnumerable<Device>>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}