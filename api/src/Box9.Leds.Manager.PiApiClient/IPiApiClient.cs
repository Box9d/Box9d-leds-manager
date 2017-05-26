using System.Collections.Generic;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Pi.Api.ApiRequests;
using Box9.Leds.Pi.Api.ApiResults;

namespace Box9.Leds.Manager.PiApiClient
{
    public interface IPiApiClient
    {
        string BaseAddress { get; }

        IEnumerable<VideoMetadataResult> GetAllVideoMetadata();

        void ClearFrames(int videoId);

        void SendFrames(int videoId, AppendFramesRequest request);

        void CreateVideoMetadata(VideoMetadataCreateRequest videoReference);

        void UpdateVideoMetadata(VideoMetadataPutRequest videoMetadata);

        void LoadVideo(int videoId);

        void PlayVideo(int videoId, PlayVideoRequest request);

        void StopVideo(int videoId, StopVideoRequest request);
    }
}
