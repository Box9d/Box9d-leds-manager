using Box9.Leds.Manager.Core.Jobs;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("BackgroundJob")]
    public class BackgroundJob
    {
        [ExplicitKey]
        public int Id { get; set; }

        public string LatestError { get; set; }

        public string LatestStackTrace { get; set; }

        public JobStatus Status { get; set; }
    }
}
