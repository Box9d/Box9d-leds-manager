using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Api.Responses;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.Services.VideoProcessing;
using System.IO;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class VideoController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IVideoFileReader videoFileReader;

        public VideoController(IDataAccessDispatcher dispatcher, IVideoFileReader videoFileReader)
        {
            this.dispatcher = dispatcher;
            this.videoFileReader = videoFileReader;
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

        [HttpGet]
        [ActionName("GetProjectVideoMetadata")]
        public GlobalJsonResult<VideoMetadataResponse> GetProjectVideoMetadata(int projectId)
        {
            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));
            Guard.This(video).AgainstDefaultValue(string.Format("No video exists for project with id {0}", projectId));
            Guard.This(video.FilePath).WithRule(path => File.Exists(path), string.Format("Video {0} does not exist", video.FilePath));

            videoFileReader.Open(video.FilePath);
            var result = new VideoMetadataResponse();
            result.Populate(videoFileReader);

            return GlobalJsonResult<VideoMetadataResponse>.Success(System.Net.HttpStatusCode.OK, result);
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