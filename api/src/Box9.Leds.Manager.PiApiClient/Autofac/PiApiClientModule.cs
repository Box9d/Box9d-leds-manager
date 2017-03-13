using Autofac;

namespace Box9.Leds.Manager.PiApiClient.Autofac
{
    public class PiApiClientModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<PiApiClientFactory>().As<IPiApiClientFactory>();
        }
    }
}
