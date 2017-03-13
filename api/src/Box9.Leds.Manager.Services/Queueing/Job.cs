using System;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class Job
    {
        internal Action JobAction { get; }

        internal string Description { get; }

        internal Job(Action jobAction, string description)
        {
            JobAction = jobAction;
            Description = description;
        }
    }
}
