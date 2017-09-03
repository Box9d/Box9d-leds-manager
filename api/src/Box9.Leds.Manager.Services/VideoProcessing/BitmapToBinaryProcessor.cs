using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using System;
using Box9.Leds.Manager.Core.Validation;

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
            Guard.This(bitmap).AgainstDefaultValue("Bitmap cannot be null");

            var mappings = dispatcher.Dispatch(ProjectDeviceActions.GetProjectDeviceMappings(projectDeviceVersion.Id));

            var data = new List<byte>
            {
                0,0,0,0
            };

            var xPercentagePixelGap = (double)(projectDeviceVersion.HorizontalPercentage) / (double)(projectDeviceVersion.NumberOfHorizontalPixels - 1);
            var yPercentagePixelGap = (double)(projectDeviceVersion.VerticalPercentage) / (double)(projectDeviceVersion.NumberOfVerticalPixels - 1);

            foreach (var mapping in mappings.OrderBy(m => m.MappingOrder))
            {
                var xPercent = projectDeviceVersion.StartAtHorizontalPercentage + (mapping.HorizontalPosition - 1) * xPercentagePixelGap;
                var yPercent = projectDeviceVersion.StartAtVerticalPercentage + (mapping.VerticalPosition - 1) * yPercentagePixelGap;

                var x = (int)Math.Round(xPercent * bitmap.Width / 100, 0);
                var y = (int)Math.Round(yPercent * bitmap.Height / 100, 0);

                x = x >= bitmap.Width ? bitmap.Width - 1 : x;
                y = y >= bitmap.Height ? bitmap.Height - 1 : y;

                try
                {
                    var pixelColor = bitmap.GetPixel(x, y);

                    data.Add(pixelColor.R);
                    data.Add(pixelColor.G);
                    data.Add(pixelColor.B);
                }
                catch
                {
                    throw;
                }
            }

            return data.ToArray();
        }
    }
}
