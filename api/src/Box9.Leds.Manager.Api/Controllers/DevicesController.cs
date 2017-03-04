using System.Net;
using System.Web.Http;
using Box9.Leds.Manager.Api;
using Box9.Leds.Manager.Services.DeviceSearch;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class DevicesController : ApiController
    {
        private readonly IDeviceSearchService deviceSearch;

        public DevicesController(IDeviceSearchService deviceSearch)
        {
            this.deviceSearch = deviceSearch;
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
    }
}