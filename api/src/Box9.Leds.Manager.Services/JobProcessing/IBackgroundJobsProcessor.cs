using System.Threading;
using System.Threading.Tasks;

namespace Box9.Leds.Manager.Services.JobProcessing
{
    public interface IBackgroundJobsProcessor
    {
        Task ProcessJobsAsync(CancellationToken cancellationToken);
    }
}
