using System;
using System.Collections.Generic;
using System.Drawing;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoProcessor : IVideoProcessor
    {
        private readonly Func<IVideoFileReader> videoFileReader;
        private readonly IBitmapToBinaryProcessor bitmapToBinaryProcessor;
        private readonly IDataAccessDispatcher dispatcher;

        public VideoProcessor(IDataAccessDispatcher dispatcher, Func<IVideoFileReader> videoFileReader, IBitmapToBinaryProcessor bitmapToBinaryProcessor)
        {
            this.dispatcher = dispatcher;
            this.videoFileReader = videoFileReader;
            this.bitmapToBinaryProcessor = bitmapToBinaryProcessor;
        }

        public IEnumerable<byte[]> GetVideoFramesForDevice(int projectDeviceId, out double frameRate)
        {
            var project = dispatcher.Dispatch(ProjectDeviceActions.GetProjectFromProjectDeviceId(projectDeviceId));
            Guard.This(project).AgainstDefaultValue(string.Format("Could not find project for project device id '{0}'", projectDeviceId));

            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(project.Id));
            Guard.This(video).AgainstDefaultValue(string.Format("Could not find video for project '{0}' (id '{1}')", project.Name, project.Id));

            var projectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDeviceId));
            Guard.This(projectDeviceVersion).AgainstDefaultValue(string.Format("Could not get latest project device version for project '{0}' (id '{1}')", project.Name, project.Id));

            var frames = new List<byte[]>();
            using (var reader = videoFileReader())
            {
                reader.Open(video.FilePath);
                frameRate = reader.FrameRate;

                var raw = reader.ReadVideoFrame();
                var frame = (Bitmap)raw.GetThumbnailImage(0, 0, null, IntPtr.Zero);
                var binaryData = bitmapToBinaryProcessor.ProcessBitmap(frame, projectDeviceVersion);

                frames.Add(binaryData);
            }

            return frames;
        }
    }
}
