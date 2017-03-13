using System.Collections.Generic;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public interface IVideoProcessor
    {
        IEnumerable<byte[]> GetVideoFramesForDevice(int projectDeviceId, out double frameRate);
    }
}
