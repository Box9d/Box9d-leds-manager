using System;
using System.Collections.Concurrent;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading;
using System.Threading.Tasks;
using Box9.Leds.Manager.Core.Logging;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class DeviceSearchService : IDeviceSearchService
    {
        private readonly IDataAccessDispatcher dispatcher;
        private readonly ILogger logger;
        private ConcurrentQueue<DiscoveredDevice> discoveredDevices;
        private CancellationTokenSource currentSearchTokenSource;
        private bool isSearching;

        public DeviceSearchService(ILogger logger, IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
            this.logger = logger;

            discoveredDevices = new ConcurrentQueue<DiscoveredDevice>();
            currentSearchTokenSource = new CancellationTokenSource();
            isSearching = false;
        }

        public DeviceSearchStatus GetLatest()
        {
            return new DeviceSearchStatus(isSearching, discoveredDevices);
        }

        public async Task SearchAsync()
        {
            CancelSearch();

            currentSearchTokenSource = new CancellationTokenSource();
            discoveredDevices = new ConcurrentQueue<DiscoveredDevice>();

            isSearching = true;
            await Task.Run(() => Search(), currentSearchTokenSource.Token);
            isSearching = false;
        }

        public void CancelSearch()
        {
            currentSearchTokenSource.Cancel();
            currentSearchTokenSource.Dispose();
        }

        private void Search()
        {
            try
            {
                var appPreferences = dispatcher.Dispatch(AppPreferencesActions.GetAppPreferences());

                foreach (var ipAddress in appPreferences.GetIpAddressRange())
                {
                    try
                    {
                        var ping = new Ping();
                        var reply = ping.Send(ipAddress, 250);

                        if (reply.Status == IPStatus.Success)
                        {
                            IPHostEntry entry = Dns.GetHostEntry(ipAddress);
                            discoveredDevices.Enqueue(new DiscoveredDevice(entry.HostName, ipAddress));
                        }
                    }
                    catch
                    {
                    }
                }
            }
            catch (Exception ex)
            {
                logger.LogException(ex);
            }
        }
    }
}
