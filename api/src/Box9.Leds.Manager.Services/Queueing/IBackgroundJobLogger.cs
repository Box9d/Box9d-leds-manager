using System;

namespace Box9.Leds.Manager.Services.Queueing
{
    public interface IBackgroundJobLogger
    {
        void NewJobAdded(Job job);

        void JobHasErrored(Job job, Exception ex);

        void JobHasCompleted(Job job);
    }
}
