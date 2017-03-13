using Box9.Leds.Manager.DataAccess.Models;
using SimpleMapping;
using System;

namespace Box9.Leds.Manager.Services.Queueing
{
    public class Job
    {
        public int Id { get; }

        public Action JobAction { get; }


        internal Job(int id, Action jobAction)
        {
            Id = id;
            JobAction = jobAction;
        }
    }
}
