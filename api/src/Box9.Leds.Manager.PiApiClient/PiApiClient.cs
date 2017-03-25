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
            this.Post<object, EmptyResult>("/VideoFrames/ClearFrames?videoId={0}", new { });
        }

        public void CreateVideoMetadata(VideoMetadataCreateRequest videoReference)
        {
            this.Post<VideoMetadataCreateRequest, EmptyResult>("/VideoMetadata/NewVideo", videoReference);
        }

        public IEnumerable<VideoMetadataResult> GetAllVideoMetadata()
        {
            return this.Get<IEnumerable<VideoMetadataResult>>("/VideoMetadata/GetVideos");
        }

        public LoadVideoPlaybackResult LoadVideo(int videoId)
        {
            return this.Get<LoadVideoPlaybackResult>(string.Format("/VideoPlayback/Load?videoId={0}", videoId));
        }

        public void PlayVideo(int videoId, PlayVideoRequest request)
        {
            this.Post<PlayVideoRequest, EmptyResult>(string.Format("/VideoPlayback/Play?videoId={0}", videoId), request);
        }

        public void SendFrames(int videoId, AppendFramesRequest request)
        {
            this.Post<AppendFramesRequest, EmptyResult>(string.Format("/VideoFrames/AppendFrames?videoId={0}", videoId), request);
        }

        public void StopVideo(int videoId, StopVideoRequest request)
        {
            this.Post<StopVideoRequest, EmptyResult>(string.Format("/VideoPlayback/Stop?videoId={0}", videoId), request);
        }

        public void UpdateVideoMetadata(VideoMetadataPutRequest videoMetadata)
        {
            this.Put<VideoMetadataPutRequest, EmptyResult>(string.Format("/VideoMetadata/UpdateVideo"), videoMetadata);
        }

        private TResponse Get<TResponse>(string requestUri)
        {
            var response = client.GetAsync(requestUri).Result;
            var globalResult = response.Content.ReadAsAsync<GlobalJsonResult<TResponse>>().Result;

            if (!globalResult.Successful)
            {
                throw new Exception(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }

        private TResponse Post<TRequest, TResponse>(string requestUri, TRequest request)
        {
            var response = client.PostAsJsonAsync(requestUri, request).Result;
            var globalResult = response.Content.ReadAsAsync<GlobalJsonResult<TResponse>>().Result;

            if (!globalResult.Successful)
            {
                throw new Exception(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }

        private TResponse Put<TRequest, TResponse>(string requestUri, TRequest request)
        {
            var response = client.PutAsJsonAsync(requestUri, request).Result;
            var globalResult = response.Content.ReadAsAsync<GlobalJsonResult<TResponse>>().Result;

            if (!globalResult.Successful)
            {
                throw new Exception(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }
    }
}
