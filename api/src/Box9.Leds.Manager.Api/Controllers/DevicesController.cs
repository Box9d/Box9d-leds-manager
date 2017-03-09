using System;
using System.Net;
using System.Web.Http;
using Box9.Leds.Manager.Api;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Services.DeviceSearch;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class DevicesController : ApiController
    {
        private readonly IDeviceSearchService deviceSearch;
        private readonly IDataAccessDispatcher dispatcher;

        public DevicesController(IDeviceSearchService deviceSearch, IDataAccessDispatcher dispatcher)
        {
            this.deviceSearch = deviceSearch;
            this.dispatcher = dispatcher;
        }

        [ActionName("StartSearchForDevices")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> StartSearchForDevices()
        {
            deviceSearch.SearchAsync();

            return GlobalJsonResult<EmptyResult>.Success(HttpStatusCode.OK);
        }

        [ActionName("GetDeviceSearchStatus")]
        [HttpGet]
        public GlobalJsonResult<DeviceSearchStatus> GetDeviceSearchStatus()
        {
            return GlobalJsonResult<DeviceSearchStatus>.Success(HttpStatusCode.OK, deviceSearch.GetLatest());
        }

        [ActionName("AddDiscoveredDeviceToProject")]
        [HttpPost]
        public GlobalJsonResult<Device> AddDiscoveredDeviceToProject(int projectId, [FromBody]DiscoveredDevice device)
        {
            var result = dispatcher.Dispatch(DeviceActions.AddDeviceToProject(projectId, device.Map()));

            return GlobalJsonResult<Device>.Success(HttpStatusCode.OK, result);
        }
    }
}