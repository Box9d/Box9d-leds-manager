using Autofac;
using Autofac.Integration.WebApi;
using Box9.Leds.Manager.Api.Controllers;
using Box9.Leds.Manager.Api.Filters;
using Box9.Leds.Manager.Core.Autofac;
using Box9.Leds.Manager.DataAccess.Autofac;
using Box9.Leds.Manager.Services.Autofac;

namespace Box9.Leds.Manager.Api.Autofac
{
    public class ApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<DataAccessModule>();
            builder.RegisterModule<ServicesModule>();
            builder.RegisterModule<CoreModule>();

            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<DeviceController>();
            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<DeviceDiscoveryController>();
            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<ProjectDeviceMappingController>();
            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<ProjectDeviceVersionController>();
            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<ProjectsController>();
            builder.RegisterType<HangfireActionFilter>().AsWebApiActionFilterFor<VideoController>();
        }
    }
}