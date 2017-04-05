﻿using System.Collections.Generic;
using System.Linq;
using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;

namespace Box9.Leds.Manager.Services.VideoPlayback
{
    public class VideoPlaybackService : IVideoPlaybackService
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IPiApiClientFactory clientFactory;
        private List<DevicePlayback> devicePlaybacks;

        public VideoPlaybackService(IDataAccessDispatcher dispatcher, IPiApiClientFactory clientFactory)
        {
            this.dispatcher = dispatcher;
            this.clientFactory = clientFactory;

            this.devicePlaybacks = new List<DevicePlayback>();
        }

        public ProjectDevicePlaybackStatus GetProjectDevicePlaybackStatus(int projectDeviceId)
        {
            var device = dispatcher.Dispatch(DeviceActions.GetProjectDevice(projectDeviceId));
            Guard.This(device).AgainstDefaultValue(string.Format("Cannot find device with project device id '{0}'", projectDeviceId));

            var projectDevice = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDevice(projectDeviceId));
            Guard.This(projectDevice).AgainstDefaultValue(string.Format("Cannot find project device with project device id '{0}'", projectDeviceId));

            var deviceClient = clientFactory.ForDevice(device);

            try
            {
                var playbackResult = deviceClient.LoadVideo(projectDeviceId);
                if (!devicePlaybacks.Any(dp => dp.Client.BaseAddress == deviceClient.BaseAddress))
                {
                    devicePlaybacks.Add(new DevicePlayback(projectDeviceId, playbackResult.PlaybackToken, deviceClient));
                }

                return ProjectDevicePlaybackStatus.Ready;
            }
            catch (PiApiClientCommunicationException)
            {
                return ProjectDevicePlaybackStatus.NotOnline;
            }
            catch (PiApiClientRequestException)
            {
                return ProjectDevicePlaybackStatus.NotReady;
            }
        }

        public void Play(int projectId)
        {
            foreach (var devicePlayback in devicePlaybacks)
            {
                devicePlayback.Client.PlayVideo(devicePlayback.ProjectDeviceId, new Pi.Api.ApiRequests.PlayVideoRequest { PlaybackToken = devicePlayback.PlaybackToken });
            }
        }

        public void Stop(int projectId)
        {
            try
            {
                foreach (var devicePlayback in devicePlaybacks)
                {
                    devicePlayback.Client.StopVideo(devicePlayback.ProjectDeviceId, new Pi.Api.ApiRequests.StopVideoRequest { PlaybackToken = devicePlayback.PlaybackToken });
                }
            }
            finally
            {
                this.devicePlaybacks = new List<DevicePlayback>();
            }
        }


        private class DevicePlayback
        {
            public int ProjectDeviceId { get; }

            public string PlaybackToken { get; }

            public IPiApiClient Client { get; }

            public DevicePlayback(int projectDeviceId, string playbackToken, IPiApiClient client)
            {
                ProjectDeviceId = projectDeviceId;
                PlaybackToken = playbackToken;
                Client = client;
            }
        }
    }
}