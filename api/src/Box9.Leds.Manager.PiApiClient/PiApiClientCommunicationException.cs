using System;

namespace Box9.Leds.Manager.PiApiClient
{
    public class PiApiClientCommunicationException : Exception
    {
        public PiApiClientCommunicationException(string baseClientAddress, string requestUri, Exception innerException = null)
            : base(ExceptionMessage(baseClientAddress + requestUri, innerException), innerException)
        {
        }

        private static string ExceptionMessage(string address, Exception innerException)
        {
            return innerException == null
                ? string.Format("Could not send request to Pi API at address '{0}'", address)
                : string.Format("Could not send request to Pi API at address '{0}': {1}", address, GetInnerExceptionMessage(innerException));
        }

        private static string GetInnerExceptionMessage(Exception exception)
        {
            var innerEx = exception;

            while (innerEx.InnerException != null)
            {
                innerEx = innerEx.InnerException;
            }

            return innerEx.Message;
        }
    }
}
