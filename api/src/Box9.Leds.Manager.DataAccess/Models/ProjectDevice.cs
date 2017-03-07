using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("ProjectDevice")]
    public class ProjectDevice
    {
        [ExplicitKey]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int DeviceId { get; set; }
    }
}
