using Autofac;
using Box9.Leds.Manager.DataAccess.Autofac;

namespace Box9.Leds.Manager.Api.Autofac
{
    public class ApiModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule<DataAccessModule>();
        }
    }
}