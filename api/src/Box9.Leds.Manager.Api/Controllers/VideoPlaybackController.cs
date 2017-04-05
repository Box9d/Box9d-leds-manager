using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;
using Box9.Leds.Manager.Services.VideoPlayback;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class VideoPlaybackController : ApiController
    {
        private readonly IVideoPlaybackService videoPlayback;

        public VideoPlaybackController(IVideoPlaybackService videoPlayback)
        {
            this.videoPlayback = videoPlayback;
        }

        [ActionName("GetProjectDevicePlaybackStatus")]
        [HttpGet]
        public GlobalJsonResult<ProjectDevicePlaybackStatus> GetProjectDevicePlaybackStatus(int deviceId, int projectId)
        {
            var result = videoPlayback.GetProjectDevicePlaybackStatus(deviceId, projectId);

            return GlobalJsonResult<ProjectDevicePlaybackStatus>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("Play")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> Play(int projectId)
        {
            videoPlayback.Play(projectId);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.OK);
        }

        [ActionName("Stop")]
        [HttpPost]
        public GlobalJsonResult<EmptyResult> Stop(int projectId)
        {
            videoPlayback.Stop(projectId);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.OK);
        }
    }
}