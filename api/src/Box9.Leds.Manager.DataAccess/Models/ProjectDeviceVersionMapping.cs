using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataModels;

namespace Box9.Leds.Manager.DataAccess.Models
{
    public class ProjectDeviceVersionMapping : IDataModel, IValidatable<ProjectDeviceVersion>
    {
        public int Id { get; set; }

        public int ProjectDeviceVersionId { get; set; }

        public int HorizontalPosition { get; set; }

        public int VerticalPosition { get; set; }

        public int MappingOrder { get; set; }

        public void Validate(ProjectDeviceVersion validateAgainst)
        {
            Guard.This(HorizontalPosition)
                .AgainstOutsideOfRange(1, validateAgainst.NumberOfHorizontalPixels,
                string.Format("Pixel mapping horizontal position cannot exceed '{0}' horizontal pixels set for this device", validateAgainst.NumberOfHorizontalPixels));

            Guard.This(VerticalPosition)
                .AgainstOutsideOfRange(1, validateAgainst.NumberOfVerticalPixels,
                string.Format("Pixel mapping vertical position cannot exceed '{0}' vertical pixels set for this device", validateAgainst.NumberOfVerticalPixels));

            Guard.This(MappingOrder)
                .AgainstOutsideOfRange(1, validateAgainst.NumberOfHorizontalPixels * validateAgainst.NumberOfVerticalPixels,
                string.Format("Pixel mapping position must lie between 1 and {0} (total number of pixels set)", validateAgainst.NumberOfHorizontalPixels * validateAgainst.NumberOfVerticalPixels));
        }
    }
}
