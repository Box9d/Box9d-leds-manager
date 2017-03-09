using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("Project")]
    public class Project : IDataModel, IValidatable
    {
        [ExplicitKey]
        public int Id { get; set; }

        public string Name { get; set; }

        public void Validate()
        {
            Guard.This(Name)
                .AgainstNullOrEmpty("Project name cannot be null or empty");
        }
    }
}
