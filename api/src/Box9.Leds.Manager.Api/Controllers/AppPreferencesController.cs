using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class AppPreferencesController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public AppPreferencesController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [ActionName("GetAll")]
        [HttpGet]
        public GlobalJsonResult<AppPreferences> GetAll()
        {
            var result = dispatcher.Dispatch(AppPreferencesActions.GetAppPreferences());

            return GlobalJsonResult<AppPreferences>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [ActionName("UpdatePreferences")]
        [HttpPost]
        public GlobalJsonResult<AppPreferences> UpdatePreferences([FromBody]AppPreferences preferences)
        {
            var result = dispatcher.Dispatch(AppPreferencesActions.UpdateAppPreferences(preferences));

            return GlobalJsonResult<AppPreferences>.Success(System.Net.HttpStatusCode.OK, result);
        }
    }
}