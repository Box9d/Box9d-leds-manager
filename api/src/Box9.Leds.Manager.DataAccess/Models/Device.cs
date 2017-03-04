using System;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("Device")]
    public class Device : IDataModel, IValidatable
    {
        [ExplicitKey]
        public int Id { get; internal set; }

        public int ProjectId { get; set; }

        public string Name { get; set; }

        public string IpAddress { get; set; }

        public void Validate()
        {
            throw new NotImplementedException();
        }
    }
}
