using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Models
{
    [Table("ProjectDeviceVersion")]
    public class ProjectDeviceVersion: IDataModel, IValidatable
    {
        [ExplicitKey]
        public int Id { get; set; }

        public int ProjectDeviceId { get; set; }

        public int Version { get; set; }

        public int NumberOfHorizontalPixels { get; set; }

        public int NumberOfVerticalPixels { get; set; }

        public int StartAtHorizontalPercentage { get; set; }

        public int StartAtVerticalPercentage { get; set; }

        public int HorizontalPercentage { get; set; }

        public int VerticalPercentage { get; set; }

        public void Validate()
        {
            Guard.This(ProjectDeviceId)
                .AgainstNegative("Project device id cannot be negative")
                .AgainstZero("Project device id cannot be 0");

            Guard.This(NumberOfHorizontalPixels)
                .AgainstOutsideOfRange(1, 200, "Number of horizontal pixels should be between 1 and 200");

            Guard.This(NumberOfVerticalPixels)
                .AgainstOutsideOfRange(1, 200, "Number of vertical pixels should be between 1 and 200");

            Guard.This(StartAtHorizontalPercentage)
                .AgainstOutsideOfRange(0, 99, "Start at horizontal percentage should be between 1 and 99");

            Guard.This(StartAtVerticalPercentage)
                .AgainstOutsideOfRange(0, 99, "Start at vertical percentage should be between 1 and 99");

            Guard.This(HorizontalPercentage)
                .AgainstOutsideOfRange(1, 100 - StartAtHorizontalPercentage,
                "Sum of 'Start at horizontal percentage' and 'Horizontal Percentage' values must not exceed 100 in total");

            Guard.This(VerticalPercentage)
                .AgainstOutsideOfRange(1, 100 - StartAtVerticalPercentage,
                "Sum of 'Start at vertical percentage' and 'Vertical Percentage' values must not exceed 100 in total");
        }
    }
}
