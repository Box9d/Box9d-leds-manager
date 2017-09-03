using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Core.Validation;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class DeviceController : ApiController
    {
        private readonly IDataAccessDispatcher dataAccessDispatcher;
        private readonly IDeviceStatusService deviceStatusService;

        public DeviceController(IDataAccessDispatcher dataAccessDispatcher, IDeviceStatusService deviceStatusService)
        {
            this.dataAccessDispatcher = dataAccessDispatcher;
            this.deviceStatusService = deviceStatusService;
        }

        [HttpGet]
        [ActionName("GetProjectDevices")]
        public GlobalJsonResult<IEnumerable<Device>> GetProjectDevices(int projectId)
        {
            var result = dataAccessDispatcher.Dispatch(DeviceActions.GetProjectDevices(projectId));

            return GlobalJsonResult<IEnumerable<Device>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpGet]
        [ActionName("GetProjectDeviceStatuses")]
        public GlobalJsonResult<Dictionary<string, string>> GetProjectDeviceStatuses(int projectId)
        {
            var projectDevices = dataAccessDispatcher.Dispatch(DeviceActions.GetProjectDevices(projectId));

            var statuses = new Dictionary<string, string>();

            foreach (var projectDevice in projectDevices)
            {
                var name = string.IsNullOrEmpty(projectDevice.Name)
                    ? projectDevice.IpAddress
                    : projectDevice.Name;

                var status = deviceStatusService.IsOnline(projectDevice)
                    ? ProjectDevicePlaybackStatus.Ready
                    : ProjectDevicePlaybackStatus.NotOnline;

                statuses.Add(name, status.ToString());
            }

            return GlobalJsonResult<Dictionary<string, string>>.Success(System.Net.HttpStatusCode.OK, statuses);
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