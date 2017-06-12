using System;
using System.Collections.Generic;
using System.Drawing;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;

namespace Box9.Leds.Manager.Services.VideoProcessing
{
    public class VideoProcessor : IVideoProcessor
    {
        private readonly Func<IVideoFileReader> videoFileReader;
        private readonly IBitmapToBinaryProcessor bitmapToBinaryProcessor;
        private readonly IDataAccessDispatcher dispatcher;

        private IVideoFileReader reader;
        private long framesRead;
        private long framesToRead;
        private ProjectDeviceVersion projectDeviceVersion;
        private VideoReference videoReference;

        public VideoProcessor(IDataAccessDispatcher dispatcher, Func<IVideoFileReader> videoFileReader, IBitmapToBinaryProcessor bitmapToBinaryProcessor)
        {
            this.dispatcher = dispatcher;
            this.videoFileReader = videoFileReader;
            this.bitmapToBinaryProcessor = bitmapToBinaryProcessor;
        }

        public VideoMetadata StartReadingVideo(int projectId, int projectDeviceId)
        {
            var project = dispatcher.Dispatch(ProjectActions.GetProject(projectId));
            Guard.This(project).AgainstDefaultValue(string.Format("Could not find project with project id '{0}'", projectId));

            var video = dispatcher.Dispatch(VideoActions.GetVideoForProject(projectId));
            Guard.This(video).AgainstDefaultValue(string.Format("Could not find video for project '{0}' (id '{1}')", project.Name, project.Id));

            var projectDeviceVersion = dispatcher.Dispatch(ProjectDeviceActions.GetLatestProjectDeviceVersion(projectDeviceId));
            Guard.This(projectDeviceVersion).AgainstDefaultValue(string.Format("Could not get latest project device version for project '{0}' (id '{1}')", project.Name, project.Id));

            reader = videoFileReader();
            reader.Open(video.FilePath);

            framesRead = 0;
            framesToRead = reader.FrameCount;
            this.videoReference = video;
            this.projectDeviceVersion = projectDeviceVersion;

            return new VideoMetadata(reader.FrameCount, reader.FrameRate);
        }

        public VideoReadResult ReadNext1000Frames()
        {
            Guard.This(reader).AgainstDefaultValue("Cannot read frames before starting video read");

            int readCount = 0;
            const int readCountMax = 1000;
            var frames = new List<byte[]>();

            while (framesRead < framesToRead && readCount < readCountMax)
            {
                var currentFrame = reader.ReadVideoFrame();
                var binaryData = bitmapToBinaryProcessor.ProcessBitmap(currentFrame, projectDeviceVersion);
                frames.Add(binaryData);

                readCount++;
                framesRead++;
            }

            return new VideoReadResult(frames, framesRead, framesToRead);
        }

        public void Dispose()
        {
            if (reader != null)
            {
                reader.Dispose();
            }
        }
    }
}
