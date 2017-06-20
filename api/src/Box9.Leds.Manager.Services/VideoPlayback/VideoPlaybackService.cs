using System.Collections.Generic;
using System.Linq;
using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;
using System;
using System.Net;
using System.Net.Sockets;
using Box9.Leds.Manager.Services.AudioPlayback;
using System.Collections.Concurrent;

namespace Box9.Leds.Manager.Services.VideoPlayback
{
    public class VideoPlaybackService : IVideoPlaybackService
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly IPiApiClientFactory clientFactory;
        private IMp3AudioPlayer mp3Player;
        private ConcurrentBag<DevicePlayback> devicePlaybacks;
        private AudioTrack audioTrack;

        public VideoPlaybackService(IDataAccessDispatcher dispatcher, IPiApiClientFactory clientFactory)
        {
            this.dispatcher = dispatcher;
            this.clientFactory = clientFactory;

            this.devicePlaybacks = new ConcurrentBag<DevicePlayback>();
        }

        public ProjectDevicePlaybackStatus GetProjectDevicePlaybackStatus(int deviceId, int projectId)
        {
            var device = dispatcher.Dispatch(DeviceActions.GetDevice(deviceId));
            Guard.This(device).AgainstDefaultValue(string.Format("Cannot find device with device id '{0}'", deviceId));

            var projectDevice = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDevice(deviceId, projectId));
            Guard.This(projectDevice).AgainstDefaultValue(string.Format("Cannot find project device with device id '{0}' and project id '{1}'", deviceId, projectId));

            var deviceClient = clientFactory.ForDevice(device);

            try
            {
                deviceClient.LoadVideo(projectDevice.Id);
                if (!devicePlaybacks.Any(dp => dp.Client.BaseAddress == deviceClient.BaseAddress))
                {
                    devicePlaybacks.Add(new DevicePlayback(projectDevice.Id, deviceClient));
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

        public void LoadAudio(int projectId)
        {
            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));
            Guard.This(video).AgainstDefaultValue("Could not find video for project");

            if (audioTrack == null || audioTrack.AudioFilePath != video.FilePath)
            {
                if (audioTrack != null)
                {
                    audioTrack.Dispose();
                }

                audioTrack = AudioTrack.FromVideo(video.FilePath);
            }
        }

        public void Play(int projectId)
        {
            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));
            Guard.This(video).AgainstDefaultValue("No video found for project");

            mp3Player = new Mp3AudioPlayer(audioTrack);
            mp3Player.Load(audioTrack);

            var appPreferences = dispatcher.Dispatch(AppPreferencesActions.GetAppPreferences());

            var startTime = DateTime.Now.AddMilliseconds(appPreferences.PlaybackBuffer);

            foreach (var devicePlayback in devicePlaybacks)
            {
                devicePlayback.Client.PlayVideo(devicePlayback.ProjectDeviceId,
                    new Pi.Api.ApiRequests.PlayVideoRequest
                    {
                        PlayAt = startTime,
                        TimeReferenceUrl = string.Format("http://{0}:8001/api/time", GetTimeReferenceHost(devicePlayback.Client))
                    });
            }

            while (DateTime.Now.CompareTo(startTime) < 0)
            {
                continue;
            }

            mp3Player.Play();
        }

        public void Stop(int projectId)
        {
            try
            {
                if (mp3Player != null)
                {
                    mp3Player.Stop();
                    mp3Player.Dispose();
                }
            }
            catch
            {
            }


            foreach (var devicePlayback in devicePlaybacks)
            {
                try
                {
                    devicePlayback.Client.StopVideo(devicePlayback.ProjectDeviceId, new Pi.Api.ApiRequests.StopVideoRequest { });
                }
                catch
                {
                }
            }
            
            devicePlaybacks = new ConcurrentBag<DevicePlayback>();
        }

        public static string GetTimeReferenceHost(IPiApiClient piApiClient)
        {
            if (piApiClient.BaseAddress.ToLower().Contains("localhost"))
            {
                return "localhost";
            }

            var host = Dns.GetHostEntry(Dns.GetHostName());
            var localIps = host.AddressList
                .Where(a => a.AddressFamily == AddressFamily.InterNetwork)
                .OrderBy(ip => ip.ToString().StartsWith("192.168.1") ? 0 : 1);

            if (localIps.Any())
            {
                return localIps.First().ToString();
            }

            throw new Exception("Local IP Address Not Found!");
        }


        private class DevicePlayback
        {
            public int ProjectDeviceId { get; }

            public IPiApiClient Client { get; }

            public DevicePlayback(int projectDeviceId, IPiApiClient client)
            {
                ProjectDeviceId = projectDeviceId;
                Client = client;
            }
        }
    }
}
