using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using System;

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

            var xPixelGap = (double)(100 - projectDeviceVersion.StartAtHorizontalPercentage) / (double)(projectDeviceVersion.NumberOfHorizontalPixels - 1);
            var yPixelGap = (double)(100 - projectDeviceVersion.StartAtVerticalPercentage) / (double)(projectDeviceVersion.NumberOfVerticalPixels - 1);

            foreach (var mapping in mappings.OrderBy(m => m.MappingOrder))
            {
                var x = (int)Math.Round(projectDeviceVersion.StartAtHorizontalPercentage + (mapping.HorizontalPosition - 1) * xPixelGap, 0);
                var y = (int)Math.Round(projectDeviceVersion.StartAtVerticalPercentage + (mapping.VerticalPosition - 1) * yPixelGap, 0);

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
