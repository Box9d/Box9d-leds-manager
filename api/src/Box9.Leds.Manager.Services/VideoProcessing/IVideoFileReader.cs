using System;
using System.Drawing;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public interface IVideoFileReader : IDisposable
    {
        long FrameCount { get ; }

        double FrameRate { get; }

        int Height { get ; }

        int Width { get; }

        void Open(string fileName);

        Bitmap ReadVideoFrame();
    }
}
