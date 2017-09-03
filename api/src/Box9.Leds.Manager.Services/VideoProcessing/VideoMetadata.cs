namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoMetadata
    {
        public long FrameCount { get; }

        public double FrameRate { get; }

        public VideoMetadata(long frameCount, double frameRate)
        {
            FrameCount = frameCount;
            FrameRate = frameRate;
        }
    }
}
