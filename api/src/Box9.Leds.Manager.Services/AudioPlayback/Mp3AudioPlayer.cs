using System;
using System.IO;
using NAudio.Wave;

namespace Box9.Leds.Manager.Services.AudioPlayback
{
    public class Mp3AudioPlayer : IMp3AudioPlayer
    {
        private FileStream fileStream;
        private Mp3FileReader mp3FileReader;
        private WaveStream wavStream;
        private BlockAlignReductionStream baStream;
        private WaveOut wave;

        public void Load(string filePath)
        {
            fileStream = File.OpenRead(filePath);
            mp3FileReader = new Mp3FileReader(fileStream);
            wavStream = WaveFormatConversionStream.CreatePcmStream(mp3FileReader);
        }

        public void Play(int minutes = 0, int seconds = 0)
        {
            wavStream.CurrentTime = wavStream.CurrentTime.Add(new TimeSpan(0, minutes, seconds));

            baStream = new BlockAlignReductionStream(wavStream);
            wave = new WaveOut(WaveCallbackInfo.FunctionCallback());
            wave.Init(baStream);
            wave.Play();
        }

        public void Stop()
        {
            if (wave != null && wave.PlaybackState == PlaybackState.Playing)
            {
                try
                {
                    wave.Stop();
                }
                catch
                {
                }
            }
        }

        public void Dispose()
        {
            fileStream.Dispose();
            mp3FileReader.Dispose();
            wavStream.Dispose();
            baStream.Dispose();
            wave.Dispose();
        }
    }
}
