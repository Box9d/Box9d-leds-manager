using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class DeviceController : ApiController
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;

        public DeviceController(IDataAccessDispatcher dataAccessDispatcher)
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

        [HttpGet]
        [ActionName("GetAllPreviouslyDiscoveredDevices")]
        public GlobalJsonResult<IEnumerable<Device>> GetAllPreviouslyDiscoveredDevices()
        {
            var result = dataAccessDispatcher.Dispatch(DeviceActions.GetAllDevices());

            return GlobalJsonResult<IEnumerable<Device>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("AddDeviceToProject")]
        public GlobalJsonResult<ProjectDevice> AddDeviceToProject(int projectId, Device device)
        {
            var result = dataAccessDispatcher.Dispatch(DeviceActions.AddDeviceToProject(projectId, device));

            return GlobalJsonResult<ProjectDevice>.Success(System.Net.HttpStatusCode.Created, result);
        }

        [HttpPost]
        [ActionName("RemoveDeviceFromProject")]
        public GlobalJsonResult<EmptyResult> RemoveDeviceFromProject(int deviceId, int projectId)
        {
            dataAccessDispatcher.Dispatch(DeviceActions.RemoveDeviceFromProject(deviceId, projectId));

            return GlobalJsonResult<ProjectDevice>.Success(System.Net.HttpStatusCode.OK);
        }
    }
}