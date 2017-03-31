using System;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Core.Config;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClientFactory : IPiApiClientFactory
    {
        private readonly IConfiguration config;

        public PiApiClientFactory(IConfiguration config)
        {
            this.config = config;
        }

        public IPiApiClient ForDevice(Device device)
        {
            var piApiPort = int.Parse(config.AppSettings["PiApiPort"]);

            return new PiApiClient(new Uri(string.Format("http://{0}:{1}", device.IpAddress, piApiPort)));
        }
    }
}
