using System.Collections.Generic;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoReadResult
    {
        public List<byte[]> Frames { get; }
        public bool MoreFrames { get; }

        public double PercentageComplete { get; }

        public VideoReadResult(List<byte[]> frames, long framesRead, long totalFrames)
        {
            Frames = frames;
            MoreFrames = framesRead != totalFrames;
            PercentageComplete = ((double)framesRead / (double)totalFrames) * 100;
        }
    }
}
