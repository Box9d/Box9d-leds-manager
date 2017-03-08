using Box9.Leds.Manager.DataAccess.Models;
using SimpleMapping;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class DiscoveredDevice : IMappableTo<Device>
    {
        public string Name { get; set; }

        public string IpAddress { get; set; }

        public Device Map()
        {
            return new Device
            {
                Name = Name,
                IpAddress = IpAddress
            };
        }
    }
}
