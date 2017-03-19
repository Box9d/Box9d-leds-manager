using Box9.Leds.Manager.DataAccess.Models;
using System.Net.Http;

namespace Box9.Leds.Manager.Services.VideoUpload
{
    public interface IVideoUploader
    {
        void PreUpload(string fileName);

        void Upload(HttpRequestMessage request);

        VideoReference ConsumeAndFinishUpload();
    }
}
