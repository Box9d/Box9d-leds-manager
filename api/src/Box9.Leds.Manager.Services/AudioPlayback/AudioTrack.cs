using System;
using System.IO;

namespace Box9.Leds.Manager.Services.AudioPlayback
{
    public class AudioTrack : IDisposable
    {
        public string AudioFilePath { get; }

        private AudioTrack(string videoFilePath)
        {
            var converter = new NReco.VideoConverter.FFMpegConverter();
            var audioFilePath = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString() + ".mp3");

            converter.ConvertMedia(videoFilePath, audioFilePath, "mp3");

            this.AudioFilePath = audioFilePath;
        }

        public static AudioTrack FromVideo(string videoFilePath)
        {
            return new AudioTrack(videoFilePath);
        }

        public void Dispose()
        {
            File.Delete(AudioFilePath);
        }
    }
}
