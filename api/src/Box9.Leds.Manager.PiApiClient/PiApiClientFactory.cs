using System;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClientFactory : IPiApiClientFactory
    {
        public IPiApiClient ForDevice(Device device)
        {
            return new PiApiClient(new Uri(string.Format("http://{0}:8001/api", device.IpAddress)));
        }
    }
}
