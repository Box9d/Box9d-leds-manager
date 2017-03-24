using System.Linq;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.PiApiClient;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.VideoProcessing;
using Box9.Leds.Manager.DataAccess.Models;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using System;
using Box9.Leds.Manager.Services.PiSynchronization;

namespace Box9.Leds.Manager.Services.JobProcessing
{
    public class BackgroundJobsProcessor : IBackgroundJobsProcessor
    {
        private readonly IPiSyncService piSyncService;
        private readonly IDataAccessDispatcher dispatcher;

        private BlockingCollection<BackgroundJob> jobQueue;
        private int pollPeriodInMilliseconds;

        public BackgroundJobsProcessor(IDataAccessDispatcher dispatcher, IPiSyncService piSyncService)
        {
            this.dispatcher = dispatcher;
            this.piSyncService = piSyncService;

            jobQueue = new BlockingCollection<BackgroundJob>();
            pollPeriodInMilliseconds = 5000;
        }

        public async Task ProcessJobsAsync(CancellationToken cancellationToken)
        {
            await Task.Run(() => ProcessJobs(cancellationToken), cancellationToken);
        }

        private async void ProcessJobs(CancellationToken cancellationToken)
        {
            var consumerTask = Task.Run(() => ConsumeJobs(cancellationToken), cancellationToken);

            while (!cancellationToken.IsCancellationRequested)
            {
                Thread.Sleep(this.pollPeriodInMilliseconds);

                var newJobs = dispatcher.Dispatch(BackgroundJobActions.GetAllJobs(includeCompleted: false))
                    .Where(j => !jobQueue.Select(qj => qj.Id).Contains(j.Id))
                    .OrderBy(j => j.Id);

                foreach (var job in newJobs)
                {
                    jobQueue.Add(job);
                }
            }

            await consumerTask;
        }

        private void ConsumeJobs(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var job = jobQueue.Take();
                var jobProcessed = false;

                while (!jobProcessed)
                {
                    var retryPeriodInMilliseconds = 5000;

                    try
                    {
                        piSyncService.ProcessProjectDeviceVersion(job.ProjectDeviceVersionId);
                        dispatcher.Dispatch(BackgroundJobActions.MarkAsComplete(job.Id));
                        jobProcessed = true;
                    }
                    catch (Exception ex)
                    {
                        dispatcher.Dispatch(BackgroundJobActions.MarkAsErrored(job.Id, ex.Message, ex.StackTrace));

                        if (cancellationToken.IsCancellationRequested)
                        {
                            break;
                        }

                        cancellationToken.WaitHandle.WaitOne(retryPeriodInMilliseconds);
                    }
                }
            }
        }
    }
}
