using System;

namespace Box9.Leds.Manager.Services.Queueing
{
    public interface IBackgroundJobLogger
    {
        Job NewJobAdded(Action job, string description);

        void JobHasErrored(Job job, Exception ex);

        void JobHasCompleted(Job job);
    }
}
