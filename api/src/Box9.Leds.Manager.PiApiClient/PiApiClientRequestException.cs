using System;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClientRequestException : Exception
    {
        public PiApiClientRequestException(string message): base(message)
        {
        }

        public PiApiClientRequestException(string message, Exception innerException): base(message, innerException)
        {
        }
    }
}
