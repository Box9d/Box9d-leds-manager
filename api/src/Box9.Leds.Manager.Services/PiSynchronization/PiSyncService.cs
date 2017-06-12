using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.VideoProcessing;
using Box9.Leds.Pi.Api.ApiRequests;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Box9.Leds.Manager.Services.PiSynchronization
{
    public class PiSyncService : IPiSyncService
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly Func<IVideoProcessor> videoProcessorInstantiator;
        private readonly IPiApiClientFactory piClientFactory;
        private readonly IDeviceStatusService deviceStatusService;

        public PiSyncService(IDataAccessDispatcher dispatcher, Func<IVideoProcessor> videoProcessorInstantiator, IPiApiClientFactory piClientFactory, IDeviceStatusService deviceStatusService)
        {
            this.dispatcher = dispatcher;
            this.videoProcessorInstantiator = videoProcessorInstantiator;
            this.piClientFactory = piClientFactory;
            this.deviceStatusService = deviceStatusService;
        }

        public void ProcessProjectDeviceVersion(int projectDeviceVersionId)
        {
            var projectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceVersion(projectDeviceVersionId));
            Guard.This(projectDeviceVersion).AgainstDefaultValue(string.Format("Could not find project device version '{0}'", projectDeviceVersionId));

            var device = dispatcher.Dispatch(DeviceActions.GetProjectDevice(projectDeviceVersion.ProjectDeviceId));
            Guard.This(device).AgainstDefaultValue(string.Format("Could not find project device with project device Id '{0}'", projectDeviceVersion.ProjectDeviceId));
            Guard.This(device).WithRule(d => deviceStatusService.IsOnline(device), string.Format("Device {0} (with IP Address {1}) is not online", device.Name, device.IpAddress));

            var project = dispatcher.Dispatch(ProjectActions.GetProjectFromProjectDevice(projectDeviceVersion.ProjectDeviceId));
            Guard.This(project).AgainstDefaultValue(string.Format("Could not find project from project device with id '{0}'", projectDeviceVersion.ProjectDeviceId));

            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(project.Id));
            Guard.This(video).AgainstDefaultValue(string.Format("Could not find video for project '{0}'", project.Name));

            using (var videoProcessor = videoProcessorInstantiator())
            {
                var videoMetadata = videoProcessor.StartReadingVideo(project.Id, device.Id);
                var client = piClientFactory.ForDevice(device);

                // Update video metadata (use project device id instead of video id with client (could have the same video in multiple configurations)
                var existingVideosOnPi = client.GetAllVideoMetadata();
                var existingVideoOnPi = existingVideosOnPi.SingleOrDefault(v => v.Id == projectDeviceVersion.ProjectDeviceId);

                if (existingVideoOnPi == null)
                {
                    client.CreateVideoMetadata(new VideoMetadataCreateRequest
                    {
                        Id = projectDeviceVersion.ProjectDeviceId,
                        FileName = video.FilePath,
                        FrameRate = videoMetadata.FrameRate
                    });
                }
                else
                {
                    client.UpdateVideoMetadata(new VideoMetadataPutRequest
                    {
                        Id = projectDeviceVersion.ProjectDeviceId,
                        FileName = video.FilePath,
                        FrameRate = videoMetadata.FrameRate,
                    });
                }

                // Clear, then send frames to Pi
                client.ClearFrames(projectDeviceVersion.ProjectDeviceId);

                int framePosition = 1;
                while (true)
                {
                    var read = videoProcessor.ReadNext1000Frames();
                    client.SendFrames(projectDeviceVersion.ProjectDeviceId, new AppendFramesRequest
                    {
                        AppendFrameRequests = read.Frames
                            .Select(f => new AppendFrameRequest { BinaryData = f, Position = framePosition })
                            .ToArray()
                    });

                    if (!read.MoreFrames)
                    {
                        break;
                    }

                    framePosition++;
                }
            }
        }
    }
}
