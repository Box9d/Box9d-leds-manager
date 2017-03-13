using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.DeviceStatus
{
    public interface IDeviceStatusService
    {
        bool IsOnline(Device device);
    }
}
