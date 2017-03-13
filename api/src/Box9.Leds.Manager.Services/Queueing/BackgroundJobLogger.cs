using System;
using Box9.Leds.Manager.DataAccess;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class BackgroundJobLogger : IBackgroundJobLogger
    {
        private readonly IDataAccessDispatcher dispatcher;

        public BackgroundJobLogger(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        public void NewJobAdded(Job job)
        {
            throw new NotImplementedException();
        }

        public void JobHasCompleted(Job job)
        {
            throw new NotImplementedException();
        }

        public void JobHasErrored(Job job, Exception ex)
        {
            throw new NotImplementedException();
        }
    }
}
