using System;
using System.Collections.Generic;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public interface IVideoProcessor : IDisposable
    {
        VideoMetadata StartReadingVideo(int projectId, int projectDeviceId);

        VideoReadResult ReadNext1000Frames();
    }
}
