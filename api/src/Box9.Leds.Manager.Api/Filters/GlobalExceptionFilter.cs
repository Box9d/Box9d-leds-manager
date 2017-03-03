using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http.Filters;

namespace Box9.Leds.Manager.Api.Filters
{
    public class GlobalExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                if (context.Exception is InvalidOperationException || context.Exception is ArgumentException)
                {
                    context.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                    context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                        GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.BadRequest),
                        new JsonMediaTypeFormatter());
                }
                else if (context.Exception is UnauthorizedAccessException)
                {
                    context.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                    context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                        GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.Unauthorized),
                        new JsonMediaTypeFormatter());
                }
                else
                {
                    context.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                    context.Response.Content = new ObjectContent(typeof(GlobalJsonResult<EmptyResult>),
                        GlobalJsonResult<EmptyResult>.Error(context.Exception, HttpStatusCode.InternalServerError),
                        new JsonMediaTypeFormatter());
                }
            }

            base.OnException(context);
        }
    }
}