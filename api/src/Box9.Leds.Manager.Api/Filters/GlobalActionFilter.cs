using System.Net.Http;
using System.Web.Http.Filters;

namespace Box9.Leds.Manager.Api.Filters
{
    public class GlobalActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            var statusCode = ((dynamic)(context.Response?.Content as ObjectContent)?.Value)?.StatusCode;

            if (statusCode != null)
            {
                context.Response.StatusCode = statusCode;
            }

            base.OnActionExecuted(context);
        }
    }
}