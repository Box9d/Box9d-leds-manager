using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class VideoController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public VideoController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [HttpGet]
        [ActionName("GetVideoReferences")]
        public GlobalJsonResult<IEnumerable<VideoReference>> GetVideoReferences()
        {
            var result = dispatcher.Dispatch(VideoActions.GetVideoReferences());

            return GlobalJsonResult<IEnumerable<VideoReference>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("CreateVideoReference")]
        public GlobalJsonResult<VideoReference> CreateVideoReference(VideoReference video)
        {
            var result = dispatcher.Dispatch(VideoActions.CreateVideoReference(video));

            return GlobalJsonResult<VideoReference>.Success(System.Net.HttpStatusCode.OK, video);
        }

        [HttpPost]
        [ActionName("UpdateVideoReference")]
        public GlobalJsonResult<VideoReference> UpdateVideoReference(VideoReference video)
        {
            var result = dispatcher.Dispatch(VideoActions.UpdateVideoReference(video));

            return GlobalJsonResult<VideoReference>.Success(System.Net.HttpStatusCode.OK, video);
        }
    }
}