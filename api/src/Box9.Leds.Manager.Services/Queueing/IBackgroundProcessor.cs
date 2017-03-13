using System;
using System.Threading.Tasks;

namespace Box9.Leds.Manager.Services.Queueing
{
    public interface IBackgroundProcessor : IDisposable
    {
        void AppendJob(Job job);

        Task StartProcessingJobsAsync();
    }
}
