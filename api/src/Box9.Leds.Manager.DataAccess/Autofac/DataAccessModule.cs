using Autofac;
using Box9.Leds.Manager.DataAccess.Scripts;
using Box9.Leds.Manager.DataAccess.Scripts.Discovery;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Autofac
{
    public class DataAccessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<ScriptDiscovery>().As<IScriptDiscovery>();

            builder.Register(context => 
            {
                var scriptDiscovery = context.Resolve<IScriptDiscovery>();

                return new DbManager(config =>
                {
                    config.ConfigureScripts(scr =>
                    {
                        foreach (var script in scriptDiscovery.Discover())
                        {
                            scr.IncludeScript(script);
                        }
                    });
                });
            })
            .As<IDbManager>()
            .SingleInstance();

            builder.RegisterType<DataAccessDispatcher>().As<IDataAccessDispatcher>();
        }
    }
}
