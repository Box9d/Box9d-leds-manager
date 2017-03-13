using System.Drawing;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public interface IBitmapToBinaryProcessor
    {
        byte[] ProcessBitmap(Bitmap bitmap, ProjectDeviceVersion projectDeviceVersion);
    }
}
