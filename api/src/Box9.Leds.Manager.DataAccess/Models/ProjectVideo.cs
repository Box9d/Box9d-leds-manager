using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("ProjectVideo")]
    public class ProjectVideo : IDataModel
    {
        [ExplicitKey]
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int VideoReferenceId { get; set; }
    }
}
