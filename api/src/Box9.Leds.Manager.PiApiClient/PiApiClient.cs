using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Box9.Leds.Pi.Api;
using Box9.Leds.Pi.Api.ApiRequests;
using Box9.Leds.Pi.Api.ApiResults;
using Box9.Leds.Manager.PiApiClient.Response;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClient : IPiApiClient
    {
        public string BaseAddress
        {
            get
            {
                return client.BaseAddress.ToString();
            }
        }

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
            this.Post<object, EmptyResult>(string.Format("api/VideoFrames/ClearFrames?videoId={0}", videoId), new { });
        }

        public void CreateVideoMetadata(VideoMetadataCreateRequest videoReference)
        {
            this.Post<VideoMetadataCreateRequest, EmptyResult>("api/VideoMetadata/NewVideo", videoReference);
        }

        public IEnumerable<VideoMetadataResult> GetAllVideoMetadata()
        {
            return this.Get<IEnumerable<VideoMetadataResult>>("api/VideoMetadata/GetVideos");
        }

        public LoadVideoPlaybackResult LoadVideo(int videoId)
        {
            return this.Get<LoadVideoPlaybackResult>(string.Format("api/VideoPlayback/Load?videoId={0}", videoId));
        }

        public void PlayVideo(int videoId, PlayVideoRequest request)
        {
            this.Post<PlayVideoRequest, EmptyResult>(string.Format("api/VideoPlayback/Play?videoId={0}", videoId), request);
        }

        public void SendFrames(int videoId, AppendFramesRequest request)
        {
            this.Post<AppendFramesRequest, EmptyResult>(string.Format("api/VideoFrames/AppendFrames?videoId={0}", videoId), request);
        }

        public void StopVideo(int videoId, StopVideoRequest request)
        {
            this.Post<StopVideoRequest, EmptyResult>(string.Format("api/VideoPlayback/Stop?videoId={0}", videoId), request);
        }

        public void UpdateVideoMetadata(VideoMetadataPutRequest videoMetadata)
        {
            this.Put<VideoMetadataPutRequest, EmptyResult>(string.Format("api/VideoMetadata/UpdateVideo"), videoMetadata);
        }

        private TResponse Get<TResponse>(string requestUri)
        {

            SerializableGlobalJsonResult<TResponse> globalResult = null;

            try
            {
                var response = client.GetAsync(requestUri).Result;
                globalResult = response.Content.ReadAsAsync<SerializableGlobalJsonResult<TResponse>>().Result;
            }
            catch (Exception ex)
            {
                throw new PiApiClientCommunicationException(client.BaseAddress.ToString(), requestUri, ex);
            }

            if (!globalResult.Successful)
            {
                throw new PiApiClientRequestException(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }

        private TResponse Post<TRequest, TResponse>(string requestUri, TRequest request)
        {
            SerializableGlobalJsonResult<TResponse> globalResult = null;

            try
            {
                var response = client.PostAsJsonAsync(requestUri, request).Result;
                globalResult = response.Content.ReadAsAsync<SerializableGlobalJsonResult<TResponse>>().Result;
            }
            catch (Exception ex)
            {
                throw new PiApiClientCommunicationException(client.BaseAddress.ToString(), requestUri, ex);
            }

            if (!globalResult.Successful)
            {
                throw new PiApiClientRequestException(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }

        private TResponse Put<TRequest, TResponse>(string requestUri, TRequest request)
        {
            SerializableGlobalJsonResult<TResponse> globalResult = null;

            try
            {
                var response = client.PutAsJsonAsync(requestUri, request).Result;
                globalResult = response.Content.ReadAsAsync<SerializableGlobalJsonResult<TResponse>>().Result;
            }
            catch (Exception ex)
            {
                throw new PiApiClientCommunicationException(client.BaseAddress.ToString(), requestUri, ex);
            }

            if (!globalResult.Successful)
            {
                throw new PiApiClientRequestException(globalResult.ErrorMessage);
            }

            return globalResult.Result;
        }
    }
}
