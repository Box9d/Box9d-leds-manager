using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using System.Net;
using System.Net.NetworkInformation;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class Pinger : IPinger
    {
        private readonly int pingTimeout;

        public Pinger(IDataAccessDispatcher dispatcher)
        {
            var appPreferences = dispatcher.Dispatch(AppPreferencesActions.GetAppPreferences());
            pingTimeout = appPreferences.PingTimeout;
        }

        public bool IsResponding(string ipAddress)
        {
            var ping = new Ping();
            var reply = ping.Send(ipAddress, pingTimeout);

            return reply.Status == IPStatus.Success;
        }

        public string GetHostName(string ipAddress)
        {
            IPHostEntry entry = Dns.GetHostEntry(ipAddress);
            return entry.HostName;
        }
    }
}
