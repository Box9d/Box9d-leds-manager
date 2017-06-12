using Box9.Leds.Manager.Core.Statuses;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("BackgroundJob")]
    public class BackgroundJob : IDataModel
    {
        [ExplicitKey]
        public int Id { get; set; }

        public int ProjectDeviceVersionId { get; set; }

        public string LastError { get; set; }

        public string LastStackTrace { get; set; }

        public JobStatus Status { get; set; }

        public double PercentageComplete { get; set; }
    }
}
