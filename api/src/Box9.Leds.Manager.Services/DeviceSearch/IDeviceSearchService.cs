using System.Threading.Tasks;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public interface IDeviceSearchService
    {
        DeviceSearchStatus GetLatest();

        Task SearchAsync();

        void CancelSearch();
    }
}
