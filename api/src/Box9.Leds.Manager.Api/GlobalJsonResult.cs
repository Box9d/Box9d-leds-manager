using System;
using System.Net;

namespace Box9.Leds.Manager.Api
{
    public class GlobalJsonResult<T>
    {
        public bool Successful { get; private set; }

        public T Result { get; private set; }

        public string ErrorMessage { get; private set; }

        public string StackTrace { get; private set; }

        public HttpStatusCode StatusCode { get; private set; }

        private GlobalJsonResult(bool successful, T result, string errorMessage, string stackTrace, HttpStatusCode statusCode)
        {
            Successful = successful;
            Result = result;
            ErrorMessage = errorMessage;
            StatusCode = statusCode;
            StackTrace = stackTrace;
        }

        public static GlobalJsonResult<EmptyResult> Error(Exception ex, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
        {
            return new GlobalJsonResult<EmptyResult>(false, new EmptyResult(), ex.Message, ex.StackTrace, statusCode);
        }

        public static GlobalJsonResult<EmptyResult> Success(HttpStatusCode statusCode)
        {
            return new GlobalJsonResult<EmptyResult>(true, new EmptyResult(), null, null, statusCode);
        }

        public static GlobalJsonResult<T> Success(HttpStatusCode statusCode, T result)
        {
            return new GlobalJsonResult<T>(true, result, null, null, statusCode);
        }
    }
}
