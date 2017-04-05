using System;
using System.Web.Http;
using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.PiApiClient;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class VideoPlaybackController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IPiApiClientFactory clientFactory;

        public VideoPlaybackController(IDataAccessDispatcher dispatcher, IPiApiClientFactory clientFactory)
        {
            this.dispatcher = dispatcher;
            this.clientFactory = clientFactory;
        }

        [ActionName("GetProjectDevicePlaybackStatus")]
        [HttpGet]
        public GlobalJsonResult<ProjectDevicePlaybackStatus> GetProjectDevicePlaybackStatus(int projectDeviceId)
        {
            return GlobalJsonResult<ProjectDevicePlaybackStatus>.Success(System.Net.HttpStatusCode.OK, ProjectDevicePlaybackStatus.Ready); 
        }

        [ActionName("Play")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> Play(int projectId)
        {
            throw new NotImplementedException();
        }

        [ActionName("Stop")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> Stop(int projectId)
        {
            throw new NotImplementedException();
        }
    }
}