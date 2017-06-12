using System.Collections.Generic;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoReadResult
    {
        public List<byte[]> Frames { get; }
        public bool MoreFrames { get; }

        public VideoReadResult(List<byte[]> frames, bool moreFrames)
        {
            Frames = frames;
            MoreFrames = moreFrames;
        }
    }
}
