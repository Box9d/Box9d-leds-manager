using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using Autofac.Integration.WebApi;
using Box9.Leds.Manager.Services.Queueing;

namespace Box9.Leds.Manager.Api.Filters
{
    public class HangfireActionFilter : IAutofacActionFilter
    {
        private readonly IPiSyncJobProcessor queueProcessor;

        public HangfireActionFilter(IPiSyncJobProcessor queueProcessor)
        {
            this.queueProcessor = queueProcessor;
        }

        public Task OnActionExecutedAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
        {
            queueProcessor.ProcessJobs();

            return Task.FromResult(0);
        }

        public Task OnActionExecutingAsync(HttpActionContext actionContext, CancellationToken cancellationToken)
        {
            return Task.FromResult(0);
        }
    }
}