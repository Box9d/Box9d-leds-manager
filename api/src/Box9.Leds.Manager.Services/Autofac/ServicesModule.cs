using Autofac;
using Box9.Leds.Manager.DataAccess.Autofac;
using Box9.Leds.Manager.PiApiClient.Autofac;
using Box9.Leds.Manager.Services.DeviceSearch;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.Queueing;
using Box9.Leds.Manager.Services.VideoProcessing;

namespace Box9.Leds.Manager.Services.Autofac
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<DeviceSearchService>()
                .As<IDeviceSearchService>()
                .SingleInstance();

            builder.RegisterType<BackgroundProcessor>()
                .As<IBackgroundProcessor>()
                .SingleInstance();

            builder.RegisterType<Pinger>().As<IPinger>();
            builder.RegisterType<FadeCandyPinger>().As<IFadeCandyPinger>();
            builder.RegisterType<VideoFileReaderWrapper>().As<IVideoFileReader>();
            builder.RegisterType<VideoProcessor>().As<IVideoProcessor>();
            builder.RegisterType<BitmapToBinaryProcessor>().As<IBitmapToBinaryProcessor>();
            builder.RegisterType<DeviceStatusService>().As<IDeviceStatusService>();
            builder.RegisterType<PiSyncJobProcessor>().As<IPiSyncJobProcessor>();

            builder.RegisterModule<DataAccessModule>();
            builder.RegisterModule<PiApiClientModule>();
        }
    }
}
