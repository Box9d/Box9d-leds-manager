using System;
using Box9.Leds.Manager.Services.VideoProcessing;
using SimpleMapping;

namespace Box9.Leds.Manager.Api.Responses
{
    public class VideoMetadataResponse : IPopulatableFrom<IVideoFileReader>
    {
        public long FrameCount { get; set; }

        public double FrameRate { get; set; }

        public int Height { get; set; }

        public int Width { get; set; }

        public void Populate(IVideoFileReader source)
        {
            FrameCount = source.FrameCount;
            FrameRate = source.FrameRate;
            Height = source.Height;
            Width = source.Width;
        }
    }
}