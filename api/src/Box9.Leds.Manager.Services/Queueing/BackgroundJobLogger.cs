using System;
using Box9.Leds.Manager.DataAccess;
using System.Collections.Concurrent;
using System.Linq;
using Box9.Leds.Manager.DataAccess.Actions;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class BackgroundJobLogger : IBackgroundJobLogger
    {
        private readonly IDataAccessDispatcher dispatcher;
        private ConcurrentDictionary<int, Job> jobs;

        public BackgroundJobLogger(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;

            jobs = new ConcurrentDictionary<int, Job>();
        }

        public Job NewJobAdded(Action jobAction, string description)
        {
            var job = dispatcher.Dispatch(BackgroundJobActions.CreateJob(description));

            return new Job(job.Id, jobAction);
        }

        public void JobHasCompleted(Job job)
        {
            dispatcher.Dispatch(BackgroundJobActions.MarkAsComplete(job.Id));
        }

        public void JobHasErrored(Job job, Exception ex)
        {
            dispatcher.Dispatch(BackgroundJobActions.MarkAsErrored(job.Id, ex.Message, ex.StackTrace));
        }

        private int NextJobId()
        {
            return jobs.Keys
                .OrderByDescending(k => k)
                .FirstOrDefault() + 1;
        }
    }
}
