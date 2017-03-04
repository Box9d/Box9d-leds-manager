using Box9.Leds.Manager.Core.Validation;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class DiscoveredDevice
    {
        public string Name { get; }

        public string IpAddress { get; }

        internal DiscoveredDevice(string name, string ipAddress)
        {
            Guard.This(name).AgainstNullOrEmpty("Device name cannot be empty");
            Guard.This(ipAddress).AgainstNonIpAddressFormat("IP Address is not in the correct format");

            Name = name;
            IpAddress = ipAddress;
        }
    }
}
