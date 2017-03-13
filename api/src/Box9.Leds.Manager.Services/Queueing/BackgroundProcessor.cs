using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class BackgroundProcessor : IBackgroundProcessor
    {
        private CancellationTokenSource taskConsumerToken;
        private readonly int retryCount;
        private readonly int retryDelaySeconds;
        private readonly BlockingCollection<Job> jobs;
        private readonly IBackgroundJobLogger jobLogger;

        public BackgroundProcessor(IBackgroundJobLogger jobLogger)
        {
            jobs = new BlockingCollection<Job>();
            this.jobLogger = jobLogger;
            retryCount = int.MaxValue; // Cannot continue with the queue unless the job completes successfully
            retryDelaySeconds = 60;
        }

        public void AppendJob(Action jobAction, string description)
        {
            lock (jobLogger)
            {
                var job = jobLogger.NewJobAdded(jobAction, description);
                jobs.Add(job);
            }           
        }

        public async Task StartProcessingJobsAsync()
        {
            lock (taskConsumerToken)
            {
                if (taskConsumerToken == null)
                {
                    taskConsumerToken = new CancellationTokenSource();
                }
            }

            await Task.Run(() => StartProcessingJobs(), taskConsumerToken.Token);
        }

        private void StartProcessingJobs()
        {
            while (!jobs.IsAddingCompleted)
            {
                var job = jobs.Take();
                var retries = 0;
                while (retries < retryCount)
                {
                    try
                    {
                        job.JobAction();
                        lock(jobLogger)
                        {
                            jobLogger.JobHasCompleted(job);
                        }

                        break;
                    }
                    catch (Exception ex)
                    {
                        lock(jobLogger)
                        {
                            jobLogger.JobHasErrored(job, ex);
                        }

                        retries++;
                        Thread.Sleep(retryDelaySeconds);
                    }
                }
            }
        }

        public void Dispose()
        {
            lock (taskConsumerToken)
            {
                if (taskConsumerToken != null)
                {
                    taskConsumerToken.Cancel();
                }
            }
        }
    }
}
