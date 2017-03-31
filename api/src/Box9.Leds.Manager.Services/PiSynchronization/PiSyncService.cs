using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.VideoProcessing;
using System;
using System.Linq;

namespace Box9.Leds.Manager.Services.PiSynchronization
{
    public class PiSyncService : IPiSyncService
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IVideoProcessor videoProcessor;
        private readonly IPiApiClientFactory piClientFactory;
        private readonly IDeviceStatusService deviceStatusService;

        public PiSyncService(IDataAccessDispatcher dispatcher, IVideoProcessor videoProcessor, IPiApiClientFactory piClientFactory, IDeviceStatusService deviceStatusService)
        {
            this.dispatcher = dispatcher;
            this.videoProcessor = videoProcessor;
            this.piClientFactory = piClientFactory;
            this.deviceStatusService = deviceStatusService;
        }

        public void ProcessProjectDeviceVersion(int projectDeviceVersionId)
        {
            var projectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceVersion(projectDeviceVersionId));
            Guard.This(projectDeviceVersion).AgainstDefaultValue(string.Format("Could not find project device version '{0}'", projectDeviceVersionId));

            var device = dispatcher.Dispatch(DeviceActions.GetProjectDevice(projectDeviceVersion.ProjectDeviceId));
            Guard.This(device).AgainstDefaultValue(string.Format("Could not find device from project device version '{0}'", projectDeviceVersion.Id));
            Guard.This(device).WithRule(d => deviceStatusService.IsOnline(device), string.Format("Device {0} (with IP Address {1}) is not online", device.Name, device.IpAddress));

            var project = dispatcher.Dispatch(ProjectActions.GetProjectFromProjectDevice(projectDeviceVersion.ProjectDeviceId));
            Guard.This(project).AgainstDefaultValue(string.Format("Could not find project from project device with id '{0}'", projectDeviceVersion.ProjectDeviceId));

            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(project.Id));
            Guard.This(video).AgainstDefaultValue(string.Format("Could not find video for project '{0}'", project.Name));

            double frameRate;
            var videoFrames = videoProcessor.GetVideoFramesForDevice(projectDeviceVersion.ProjectDeviceId, out frameRate).ToArray();
            var client = piClientFactory.ForDevice(device);

            // Update video metadata (use project device id instead of video id with client (could have the same video in multiple configurations)
            var existingVideosOnPi = client.GetAllVideoMetadata();
            var existingVideoOnPi = existingVideosOnPi.SingleOrDefault(v => v.Id == projectDeviceVersion.ProjectDeviceId);

            if (existingVideoOnPi == null)
            {
                client.CreateVideoMetadata(new Pi.Api.ApiRequests.VideoMetadataCreateRequest
                {
                    Id = projectDeviceVersion.ProjectDeviceId,
                    FileName = video.FilePath,
                    FrameRate = frameRate
                });
            }
            else
            {
                client.UpdateVideoMetadata(new Pi.Api.ApiRequests.VideoMetadataPutRequest
                {
                    Id = projectDeviceVersion.ProjectDeviceId,
                    FileName = video.FilePath,
                    FrameRate = frameRate,
                });
            }

            // Clear, then send frames to Pi
            int frameId = 0;
            client.ClearFrames(projectDeviceVersion.ProjectDeviceId);
            client.SendFrames(projectDeviceVersion.ProjectDeviceId, new Pi.Api.ApiRequests.AppendFramesRequest
            {
                AppendFrameRequests = videoFrames
                    .Select(f => new Pi.Api.ApiRequests.AppendFrameRequest { Id = frameId++, BinaryData = f, Position = frameId })
                    .ToArray()
            });
        }
    }
}
