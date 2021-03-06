﻿using Box9.Leds.Manager.Core.Statuses;

namespace Box9.Leds.Manager.Services.VideoPlayback
{
    public interface IVideoPlaybackService
    {
        ProjectDevicePlaybackStatus GetProjectDevicePlaybackStatus(int deviceId, int projectId);

        void BypassDevice(int deviceId, int projectId, bool bypass);

        void LoadAudio(int projectId);

        void Play(int projectId);

        void Stop(int projectId);
    }
}
