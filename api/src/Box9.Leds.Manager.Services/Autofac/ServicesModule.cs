using Autofac;
using Box9.Leds.Manager.Services.DeviceSearch;

namespace Box9.Leds.Manager.Services.Autofac
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<DeviceSearchService>()
                .As<IDeviceSearchService>()
                .SingleInstance();

            builder.RegisterType<Pinger>().As<IPinger>();
            builder.RegisterType<FadeCandyPinger>().As<IFadeCandyPinger>();
        }
    }
}
