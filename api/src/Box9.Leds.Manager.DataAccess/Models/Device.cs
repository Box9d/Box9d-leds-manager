using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("Device")]
    public class Device : IDataModel, IValidatable
    {
        [ExplicitKey]
        public int Id { get; set; }

        public string Name { get; set; }

        public string IpAddress { get; set; }

        public void Validate()
        {
            Guard.This(Name).AgainstNullOrEmpty("Device name cannot be empty");
            Guard.This(IpAddress).AgainstNonIpAddressFormat("Device IP address is not in the correct format");
        }
    }
}
