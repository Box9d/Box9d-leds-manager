using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class BackgroundJobsController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public BackgroundJobsController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [HttpGet]
        [ActionName("GetAllJobs")]
        public GlobalJsonResult<IEnumerable<BackgroundJob>> GetAllJobs(bool includeCompleted = false)
        {
            var result = dispatcher.Dispatch(BackgroundJobActions.GetAllJobs(includeCompleted));

            return GlobalJsonResult<IEnumerable<BackgroundJob>>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}