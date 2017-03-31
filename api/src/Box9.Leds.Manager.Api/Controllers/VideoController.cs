using System.Collections.Generic;
using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Api.Responses;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.Services.VideoProcessing;
using System.IO;
using System.Net.Http;
using System.Linq;
using Box9.Leds.Manager.Services.Store;
using System;
using Box9.Leds.Manager.Services.VideoUpload;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class VideoController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IVideoFileReader videoFileReader;
        private readonly IVideoUploader videoUploader;

        public VideoController(IDataAccessDispatcher dispatcher, IVideoFileReader videoFileReader, IVideoUploader videoUploader)
        {
            this.dispatcher = dispatcher;
            this.videoFileReader = videoFileReader;
            this.videoUploader = videoUploader;
        }

        [HttpGet]
        [ActionName("GetVideoReferences")]
        public GlobalJsonResult<IEnumerable<VideoReference>> GetVideoReferences()
        {
            var result = dispatcher.Dispatch(VideoActions.GetVideoReferences());

            return GlobalJsonResult<IEnumerable<VideoReference>>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("PreUploadVideo")]
        public GlobalJsonResult<EmptyResult> PreUploadVideo(string fileName)
        {
            videoUploader.PreUpload(fileName);

            return GlobalJsonResult<EmptyResult>.Success(System.Net.HttpStatusCode.OK);
        }

        [HttpPost]
        [ActionName("StartVideoUpload")]
        public void StartVideoUpload()
        {
            videoUploader.Upload(this.Request);
        }

        [HttpGet]
        [ActionName("FinishVideoUpload")]
        public GlobalJsonResult<VideoReference> FinishVideoUpload()
        {
            var result = videoUploader.ConsumeAndFinishUpload();

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
        [ActionName("AddMostRecentVideoUploadToProject")]
        public GlobalJsonResult<ProjectVideo> AddMostRecentVideoUploadToProject(int projectId, int videoReferenceId)
        {           
            var result = dispatcher.Dispatch(VideoActions.SetVideoForProject(projectId, videoReferenceId));

            // When a video changes, create new version of project devices
            var projectDevices = dispatcher.Dispatch(DeviceActions.GetProjectDevices(projectId));
            foreach (var projectDevice in projectDevices)
            {
                var latestProjectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDevice.Id));
                dispatcher.Dispatch(ProjectDeviceActions.SetLatestProjectDeviceVersion(latestProjectDeviceVersion));
            }

            return GlobalJsonResult<ProjectVideo>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}