using System.Net;

namespace Box9.Leds.Manager.PiApiClient.Response
{
    public class SerializableGlobalJsonResult<T>
    {
        public bool Successful { get; set; }

        public T Result { get; set; }

        public string ErrorMessage { get; set; }

        public string StackTrace { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}
