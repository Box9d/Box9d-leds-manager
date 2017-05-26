using System;
using System.Web.Http;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class TimeController : ApiController
    {
        [HttpGet]
        [ActionName("/")]
        public GlobalJsonResult<DateTime> Get()
        {
            return GlobalJsonResult<DateTime>.Success(System.Net.HttpStatusCode.OK, DateTime.Now);
        }
    }
}