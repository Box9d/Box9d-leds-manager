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
            var fileInfo = new FileInfo(videoFilePath);
            var directory = fileInfo.Directory.FullName;
            var fileName = fileInfo.Name;
            var audioFilePath = Path.Combine(directory, fileName.Replace(".mp4", ".mp3"));

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
