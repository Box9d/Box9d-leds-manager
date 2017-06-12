using System.Linq;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using System;
using Box9.Leds.Manager.Services.PiSynchronization;
using Autofac;
using Box9.Leds.Manager.Core.Tasks;
using System.Collections.Generic;

namespace Box9.Leds.Manager.Services.JobProcessing
{
    public class BackgroundJobsProcessor : IStartable
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

        public void Start()
        {
            ProcessJobsAsync(CancellationToken.None).Ignore();
        }

        public async Task ProcessJobsAsync(CancellationToken cancellationToken)
        {
            await Task.Run(() => ProcessJobs(cancellationToken), cancellationToken);
        }

        private async void ProcessJobs(CancellationToken cancellationToken)
        {
            var consumerTask = Task.Run(() => ConsumeJobs(cancellationToken), cancellationToken);

            var jobsLastAddedById = new List<int>();
            while (!cancellationToken.IsCancellationRequested)
            {
                Thread.Sleep(this.pollPeriodInMilliseconds);

                var newJobs = dispatcher.Dispatch(BackgroundJobActions.GetAllJobs(includeCompleted: false))
                    .Where(j => !jobQueue.Select(qj => qj.Id).Contains(j.Id))
                    .Where(j => !jobsLastAddedById.Contains(j.Id))
                    .OrderBy(j => j.Id);

                if (newJobs.Any())
                {
                    jobsLastAddedById = new List<int>();
                }

                foreach (var job in newJobs)
                {
                    jobsLastAddedById.Add(job.Id);
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

                while (true)
                {
                    var retryPeriodInMilliseconds = 5000;

                    try
                    {
                        dispatcher.Dispatch(BackgroundJobActions.MarkAsProcessing(job.Id));

                        // Check if the job is now obsolete (because a newer version of the project device exists)
                        var jobProjectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceVersion(job.ProjectDeviceVersionId));
                        var projectDeviceVersions = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceVersionsForProjectDevice(jobProjectDeviceVersion.ProjectDeviceId));

                        if (projectDeviceVersions.Select(pdv => pdv.Version).Max() > jobProjectDeviceVersion.Version)
                        {
                            dispatcher.Dispatch(BackgroundJobActions.MarkAsCancelled(job.Id, "A newer version of the project device now exists"));
                            break;
                        }

                        piSyncService.ProcessProjectDeviceVersion(job);
                        dispatcher.Dispatch(BackgroundJobActions.MarkAsComplete(job.Id));
                        break;
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
