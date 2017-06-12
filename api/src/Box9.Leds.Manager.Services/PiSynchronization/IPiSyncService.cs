using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.PiSynchronization
{
    public interface IPiSyncService
    {
        void ProcessProjectDeviceVersion(BackgroundJob job);
    }
}
