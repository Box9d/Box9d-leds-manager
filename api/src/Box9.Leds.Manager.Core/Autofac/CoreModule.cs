using Autofac;
using Box9.Leds.Manager.Core.Config;
using Box9.Leds.Manager.Core.Logging;

namespace Box9.Leds.Manager.Core.Autofac
{
    public class CoreModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<Configuration>().As<IConfiguration>();
            builder.RegisterType<Logger>().As<ILogger>();
        }
    }
}
