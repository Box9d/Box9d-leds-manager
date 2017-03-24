using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Box9.Leds.Pi.Api;
using Box9.Leds.Pi.Api.ApiRequests;
using Box9.Leds.Pi.Api.ApiResults;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClient : IPiApiClient
    {
        private readonly HttpClient client;

        internal PiApiClient(Uri baseUri)
        {
            client = new HttpClient()
            {
                BaseAddress = baseUri
            };
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public void ClearFrames(int videoId)
        {
            var response = client.DeleteAsync(string.Format("/VideoFrames/ClearFrames?videoId={0}", videoId)).Result;
            var globalResult = response.Content.ReadAsAsync<GlobalJsonResult<EmptyResult>>().Result;

            if (!globalResult.Successful)
            {
                throw new Exception(globalResult.ErrorMessage);
            }
        }

        public void CreateVideoMetadata(VideoMetadataCreateRequest videoReference)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<VideoMetadataResult> GetAllVideoMetadata()
        {
            throw new NotImplementedException();
        }

        public LoadVideoPlaybackResult LoadVideo(int videoId)
        {
            throw new NotImplementedException();
        }

        public void PlayVideo(int videoId, PlayVideoRequest request)
        {
            throw new NotImplementedException();
        }

        public void SendFrames(int videoId, AppendFramesRequest request)
        {
            throw new NotImplementedException();
        }

        public void StopVideo(int videoId, StopVideoRequest request)
        {
            throw new NotImplementedException();
        }

        public void UpdateVideoMetadata(VideoMetadataPutRequest videoMetadata)
        {
            throw new NotImplementedException();
        }
    }
}
