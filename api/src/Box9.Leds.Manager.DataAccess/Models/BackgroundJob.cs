using Box9.Leds.Manager.Core.Jobs;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("BackgroundJob")]
    public class BackgroundJob : IDataModel
    {
        [ExplicitKey]
        public int Id { get; set; }

        public string Description { get; set; }

        public string LatestError { get; set; }

        public string LatestStackTrace { get; set; }

        public JobStatus Status { get; set; }
    }
}
