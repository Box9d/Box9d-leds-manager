using Box9.Leds.Manager.DataModels;

namespace Box9.Leds.Manager.DataAccess.Models
{
    public class ProjectVideo : IDataModel
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }

        public int VideoReferenceId { get; set; }
    }
}
