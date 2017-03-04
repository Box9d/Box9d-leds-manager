using System.Collections.Generic;
namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class DeviceSearchStatus
    {
        public IEnumerable<DiscoveredDevice> DiscoveredDevices { get; private set; }

        public bool IsSearching { get; }

        internal DeviceSearchStatus(bool isSearching, IEnumerable<DiscoveredDevice> discoveredDevices = null)
        {
            DiscoveredDevices = discoveredDevices == null ? new List<DiscoveredDevice>() : discoveredDevices;
            IsSearching = isSearching;
        }
    }
}
