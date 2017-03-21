using System;
using System.Collections.Concurrent;
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
        private readonly IPinger pinger;
        private readonly IFadeCandyPinger fadeCandyPinger;

        private ConcurrentQueue<DiscoveredDevice> discoveredDevices;
        private CancellationTokenSource currentSearchTokenSource;
        private bool isSearching;

        public DeviceSearchService(ILogger logger, 
            IDataAccessDispatcher dispatcher,
            IPinger pinger,
            IFadeCandyPinger fadeCandyPinger)
        {
            this.dispatcher = dispatcher;
            this.logger = logger;
            this.pinger = pinger;
            this.fadeCandyPinger = fadeCandyPinger;

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
            isSearching = true;

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

            isSearching = false;
        }

        private void Search()
        {
            currentSearchTokenSource = new CancellationTokenSource();

            try
            {
                var appPreferences = dispatcher.Dispatch(AppPreferencesActions.GetAppPreferences());

                foreach (var ipAddress in appPreferences.GetIpAddressRange())
                {
                    if (pinger.IsResponding(ipAddress) && fadeCandyPinger.IsFadecandyDevice(ipAddress))
                    {
                        var hostName = pinger.GetHostName(ipAddress);
                        discoveredDevices.Enqueue(new DiscoveredDevice
                        {
                            Name = hostName,
                            IpAddress = ipAddress
                        });
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
