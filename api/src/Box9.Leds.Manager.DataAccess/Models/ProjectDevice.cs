using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("ProjectDevice")]
    public class ProjectDevice : IDataModel
    {
        [ExplicitKey]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int DeviceId { get; set; }

        public int ReadyForPlayback { get; set; }
    }
}
