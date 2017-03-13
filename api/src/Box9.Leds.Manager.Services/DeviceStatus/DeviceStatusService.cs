using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Services.DeviceSearch;

namespace Box9.Leds.Manager.Services.DeviceStatus
{
    public class DeviceStatusService : IDeviceStatusService
    {
        private readonly IFadeCandyPinger fadeCandyPinger;
        private readonly IPinger pinger;

        public DeviceStatusService(IFadeCandyPinger fadeCandyPinger, IPinger pinger)
        {
            this.fadeCandyPinger = fadeCandyPinger;
            this.pinger = pinger;
        }

        public bool IsOnline(Device device)
        {
            return pinger.IsResponding(device.IpAddress) && fadeCandyPinger.IsFadecandyDevice(device.IpAddress);
        }
    }
}
