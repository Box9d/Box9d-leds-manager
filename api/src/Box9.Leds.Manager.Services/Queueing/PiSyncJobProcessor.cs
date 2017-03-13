using System.Linq;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.PiApiClient;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.VideoProcessing;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class PiSyncJobProcessor : IPiSyncJobProcessor
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IVideoProcessor videoProcessor;
        private readonly IPiApiClientFactory piClientFactory;
        private readonly IDeviceStatusService deviceStatusService;
        private readonly IBackgroundProcessor backgroundProcessor;

        public PiSyncJobProcessor(IDataAccessDispatcher dispatcher, IVideoProcessor videoProcessor, IPiApiClientFactory piClientFactory, IDeviceStatusService deviceStatusService, IBackgroundProcessor backgroundProcessor)
        {
            this.dispatcher = dispatcher;
            this.videoProcessor = videoProcessor;
            this.piClientFactory = piClientFactory;
            this.deviceStatusService = deviceStatusService;
            this.backgroundProcessor = backgroundProcessor;
        }

        public void ProcessJobs()
        {
            var queueItems = dispatcher.Dispatch(PiSyncJobActions.GetJobs());
            foreach (var queueItem in queueItems.Where(q => q.StartedProcessing == 0 && q.FinishedProcessing == 0))
            {
                dispatcher.Dispatch(PiSyncJobActions.FlagAsStartedProcessing(queueItem.Id));

                backgroundProcessor.StartProcessingJobsAsync();
                backgroundProcessor.AppendJob(() => ProcessAndSendToPi(queueItem), "Syncing video alterations to Pi");
            }
        }

        public void ProcessAndSendToPi(PiSyncJob queueItem)
        {
            var device = dispatcher.Dispatch(DeviceActions.GetProjectDevice(queueItem.ProjectDeviceId));
            Guard.This(device).AgainstDefaultValue(string.Format("Device relating to project device id '{0}' could not be found", queueItem.ProjectDeviceId));

            var project = dispatcher.Dispatch(ProjectActions.GetProjectFromProjectDevice(queueItem.ProjectDeviceId));
            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(project.Id));
            Guard.This(video).AgainstDefaultValue(string.Format("Video not found for project '{0}' (with Id '{1}')", project.Name, project.Id));

            double frameRate;
            var videoFrames = videoProcessor.GetVideoFramesForDevice(queueItem.ProjectDeviceId, out frameRate).ToArray();
            var client = piClientFactory.ForDevice(device);

            // Update video metadata (use project device id instead of video id with client (could have the same video in multiple configurations)
            var existingVideosOnPi = client.GetAllVideoMetadata();
            var existingVideoOnPi = existingVideosOnPi.SingleOrDefault(v => v.Id == queueItem.ProjectDeviceId);

            if (existingVideoOnPi == null)
            {
                client.CreateVideoMetadata(new Pi.Api.ApiRequests.VideoMetadataCreateRequest
                {
                    Id = queueItem.ProjectDeviceId, // 
                    FileName = video.FilePath,
                    FrameRate = frameRate
                });
            }
            else
            {
                client.UpdateVideoMetadata(new Pi.Api.ApiRequests.VideoMetadataPutRequest
                {
                    Id = queueItem.ProjectDeviceId,
                    FileName = video.FilePath,
                    FrameRate = frameRate,
                });
            }

            // Clear, then send frames to Pi
            int frameId = 0;
            client.ClearFrames(queueItem.ProjectDeviceId);
            client.SendFrames(queueItem.ProjectDeviceId, new Pi.Api.ApiRequests.AppendFramesRequest
            {
                AppendFrameRequests = videoFrames
                    .Select(f => new Pi.Api.ApiRequests.AppendFrameRequest { Id = frameId++, BinaryData = f, Position = frameId })
                    .ToArray()
            });

            dispatcher.Dispatch(PiSyncJobActions.FlagAsFinishedProcessing(queueItem.Id));
        }
    }
}
