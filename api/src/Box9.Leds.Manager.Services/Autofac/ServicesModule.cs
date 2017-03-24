using Autofac;
using Box9.Leds.Manager.Core.Autofac;
using Box9.Leds.Manager.DataAccess.Autofac;
using Box9.Leds.Manager.PiApiClient.Autofac;
using Box9.Leds.Manager.Services.DeviceSearch;
using Box9.Leds.Manager.Services.DeviceStatus;
using Box9.Leds.Manager.Services.JobProcessing;
using Box9.Leds.Manager.Services.PiSynchronization;
using Box9.Leds.Manager.Services.Store;
using Box9.Leds.Manager.Services.VideoProcessing;
using Box9.Leds.Manager.Services.VideoUpload;

namespace Box9.Leds.Manager.Services.Autofac
{
    public class ServicesModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterType<DeviceSearchService>()
                .As<IDeviceSearchService>()
                .SingleInstance();

            builder.RegisterType<BackgroundJobsProcessor>()
                .As<IBackgroundJobsProcessor>()
                .SingleInstance();

            builder.RegisterType<InMemoryStore>()
                .As<IStore>()
                .SingleInstance();

            builder.RegisterType<VideoUploader>()
                .As<IVideoUploader>()
                .SingleInstance();

            builder.RegisterType<Pinger>().As<IPinger>();
            builder.RegisterType<FadeCandyPinger>().As<IFadeCandyPinger>();
            builder.RegisterType<VideoFileReaderWrapper>().As<IVideoFileReader>();
            builder.RegisterType<VideoProcessor>().As<IVideoProcessor>();
            builder.RegisterType<BitmapToBinaryProcessor>().As<IBitmapToBinaryProcessor>();
            builder.RegisterType<DeviceStatusService>().As<IDeviceStatusService>();
            builder.RegisterType<BackgroundJobsProcessor>().As<IBackgroundJobsProcessor>();
            builder.RegisterType<PiSyncService>().As<IPiSyncService>();

            builder.RegisterModule<CoreModule>();
            builder.RegisterModule<DataAccessModule>();
            builder.RegisterModule<PiApiClientModule>();
        }
    }
}
