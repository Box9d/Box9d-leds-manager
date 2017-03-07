using System.Net;
using System.Net.NetworkInformation;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class Pinger : IPinger
    {
        public bool IsResponding(string ipAddress)
        {
            var ping = new Ping();
            var reply = ping.Send(ipAddress, 250);

            return reply.Status == IPStatus.Success;
        }

        public string GetHostName(string ipAddress)
        {
            IPHostEntry entry = Dns.GetHostEntry(ipAddress);
            return entry.HostName;
        }
    }
}
