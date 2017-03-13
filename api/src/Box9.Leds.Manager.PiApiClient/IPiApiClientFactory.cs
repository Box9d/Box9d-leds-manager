using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.PiApiClient
{
    public interface IPiApiClientFactory
    {
        IPiApiClient ForDevice(Device device);
    }
}
