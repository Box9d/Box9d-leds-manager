using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class BitmapToBinaryProcessor : IBitmapToBinaryProcessor
    {
        private readonly IDataAccessDispatcher dispatcher;

        public BitmapToBinaryProcessor(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        public byte[] ProcessBitmap(Bitmap bitmap, ProjectDeviceVersion projectDeviceVersion)
        {
            var mappings = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceMappings(projectDeviceVersion.Id));

            var data = new List<byte>
            {
                0,0,0,0
            };

            foreach (var mapping in mappings.OrderBy(m => m.MappingOrder))
            {
                var xPercent = projectDeviceVersion.StartAtHorizontalPercentage + projectDeviceVersion.HorizontalPercentage * (mapping.HorizontalPosition + 1) / projectDeviceVersion.NumberOfHorizontalPixels;
                var yPercent = projectDeviceVersion.StartAtVerticalPercentage + projectDeviceVersion.VerticalPercentage * (mapping.VerticalPosition + 1) / projectDeviceVersion.NumberOfVerticalPixels;

                var x = (xPercent * bitmap.Width) / 100;
                var y = (yPercent * bitmap.Height) / 100;

                x = x >= bitmap.Width ? bitmap.Width - 1 : x;
                y = y >= bitmap.Height ? bitmap.Height - 1 : y;

                var pixelColor = bitmap.GetPixel(x, y);

                data.Add(pixelColor.R);
                data.Add(pixelColor.G);
                data.Add(pixelColor.B);
            }

            return data.ToArray();
        }
    }
}
