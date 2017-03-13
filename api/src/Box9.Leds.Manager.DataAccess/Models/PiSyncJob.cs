using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("PiSyncJob")]
    public class PiSyncJob : IDataModel, IValidatable
    {
        public int Id { get; set; }

        public int ProjectDeviceId { get; set; }

        public string Description { get; set; }

        public int StartedProcessing { get; set; }

        public int FinishedProcessing { get; set; }

        public void Validate()
        {
            Guard.This(Description).AgainstNullOrEmpty("Provide a description for the item to be processed");
            Guard.This(ProjectDeviceId).AgainstDefaultValue("A project device id must be provided");
        }
    }
}
