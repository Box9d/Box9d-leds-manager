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

            return GlobalJsonResult<VideoReference>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpGet]
        [ActionName("GetProjectVideo")]
        public GlobalJsonResult<VideoReference> GetProjectVideo(int projectId)
        {
            var result = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));

            return GlobalJsonResult<VideoReference>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("AddVideoToProject")]
        public GlobalJsonResult<ProjectVideo> AddVideoToProject(int projectId, int videoReferenceId)
        {
            var result = dispatcher.Dispatch(VideoActions.SetVideoForProject(projectId, videoReferenceId));
            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));

            return GlobalJsonResult<ProjectVideo>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}