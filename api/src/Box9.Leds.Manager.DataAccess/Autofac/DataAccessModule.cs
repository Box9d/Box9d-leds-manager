using Autofac;
using Box9.Leds.Manager.DataAccess.Scripts;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Autofac
{
    public class DataAccessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.Register(context => 
            {
                return new DbManager(config =>
                {
                    config.ConfigureScripts(scr =>
                    {
                        scr.IncludeScript<_0001_CreateProjectTable>();
                        scr.IncludeScript<_0002_AddProjectNameColumn>();
                        scr.IncludeScript<_0003_CreateDeviceTable>();
                        scr.IncludeScript<_0004_CreateAppPreferencesTable>();
                        scr.IncludeScript<_0005_CreateProjectDeviceTable>();
                    });
                });
            })
            .As<IDbManager>()
            .SingleInstance();

            builder.RegisterType<DataAccessDispatcher>().As<IDataAccessDispatcher>();
        }
    }
}
