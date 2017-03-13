using System;
using System.Drawing;
using Accord.Video.FFMPEG;
using MediaInfoDotNet;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoFileReaderWrapper : IVideoFileReader
    {
        private readonly VideoFileReader reader;

        public long FrameCount { get { return reader.FrameCount; } }

        public double FrameRate { get; private set; }

        public int Height { get { return reader.Height; } }

        public int Width { get { return reader.Width; } }

        public VideoFileReaderWrapper()
        {
            reader = new VideoFileReader();
        }

        public void Open(string fileName)
        {
            reader.Open(fileName);
            FrameRate = new MediaFile(fileName).Video[0].FrameRate;
        }

        public Bitmap ReadVideoFrame()
        {
            return reader.ReadVideoFrame();
        }

        public void Dispose()
        {
            reader.Dispose();
        }
    }
}
