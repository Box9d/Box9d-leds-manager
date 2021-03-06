﻿using System.Web.Http;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Api.Controllers
{
    public class ProjectDeviceVersionController : ApiController
    {
        private readonly IDataAccessDispatcher dispatcher;

        public ProjectDeviceVersionController(IDataAccessDispatcher dispatcher)
        {
            this.dispatcher = dispatcher;
        }

        [HttpGet]
        [ActionName("GetLatestProjectDeviceVersion")]
        public GlobalJsonResult<ProjectDeviceVersion> GetLatestProjectDeviceVersion(int deviceId, int projectId)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.GetLatestProjectDeviceVersion(deviceId, projectId));

            return GlobalJsonResult<ProjectDeviceVersion>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpGet]
        [ActionName("GetLatest")]
        public GlobalJsonResult<ProjectDeviceVersion> GetLatest(int projectDeviceId)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDeviceId));

            return GlobalJsonResult<ProjectDeviceVersion>.Success(System.Net.HttpStatusCode.OK, result);
        }

        [HttpPost]
        [ActionName("SetProjectDeviceVersion")]
        public GlobalJsonResult<ProjectDeviceVersion> SetLatestProjectDeviceVersion(int projectDeviceId, [FromBody]ProjectDeviceVersion projectDeviceVersion)
        {
            var result = dispatcher.Dispatch(ProjectDeviceActions.SetLatestProjectDeviceVersion(projectDeviceVersion));

            return GlobalJsonResult<ProjectDeviceVersion>.Success(System.Net.HttpStatusCode.Created, result);
        }
    }
}