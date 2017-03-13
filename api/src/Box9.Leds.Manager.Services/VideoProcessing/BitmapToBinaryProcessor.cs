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

            var xStart = bitmap.Width * projectDeviceVersion.StartAtHorizontalPercentage / 100;
            var xFinish = xStart + (bitmap.Width * projectDeviceVersion.HorizontalPercentage / 100);
            var xGap = (xFinish - xStart) / projectDeviceVersion.NumberOfHorizontalPixels;

            var yStart = bitmap.Height * projectDeviceVersion.StartAtVerticalPercentage / 100;
            var yFinish = xStart + (bitmap.Width * projectDeviceVersion.VerticalPercentage / 100);
            var yGap = (xFinish - xStart) / projectDeviceVersion.NumberOfVerticalPixels;

            var data = new List<byte>
            {
                0,0,0,0
            };

            foreach (var mapping in mappings.OrderBy(m => m.MappingOrder))
            {
                var xPixel = xStart + xGap * (mapping.HorizontalPosition - 1);
                var yPixel = yStart + yGap * (mapping.VerticalPosition - 1);

                var pixelColor = bitmap.GetPixel(xPixel, yPixel);

                data.Add(pixelColor.R);
                data.Add(pixelColor.G);
                data.Add(pixelColor.B);
            }

            return data.ToArray();
        }
    }
}
