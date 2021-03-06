﻿using System;

namespace Box9.Leds.Manager.Services.AudioPlayback
{
    public interface IMp3AudioPlayer : IDisposable
    {
        void Load(string filePath);

        void Play(int minutes = 0, int seconds = 0);

        void Stop();
    }
}
