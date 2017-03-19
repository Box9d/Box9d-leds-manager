using System;
using System.IO;
using Box9.Leds.Manager.DataAccess.Models;
using Box9.Leds.Manager.Core.Validation;
using System.Net.Http;
using Box9.Leds.Manager.Core.Config;
using System.Diagnostics;
using System.Threading;
using Box9.Leds.Manager.DataAccess;
using Box9.Leds.Manager.DataAccess.Actions;

namespace Box9.Leds.Manager.Services.VideoUpload
{
    public class VideoUploader : IVideoUploader
    {
        private readonly IConfiguration config;
        private readonly IDataAccessDispatcher dispatcher;

        private bool isUploading;
        private string fileName;

        public VideoUploader(IConfiguration config, IDataAccessDispatcher dispatcher)
        {
            this.config = config;
            this.dispatcher = dispatcher;

            isUploading = false;
        }

        public void PreUpload(string fileName)
        {
            Guard.This(fileName).AgainstNullOrEmpty("File name of video upload cannot be null");
            this.fileName = fileName;
            this.isUploading = true;
        }

        public void Upload(HttpRequestMessage request)
        {
            Guard.This(isUploading).WithRule(val => val, "Set a file name before uploading");

            if (!Directory.Exists(UploadDirectory()))
            {
                Directory.CreateDirectory(UploadDirectory());
            }

            var filePath = Path.Combine(UploadDirectory(), fileName);

            using (var requestStream = request.Content.ReadAsStreamAsync().Result)
            using (var fileStream = File.Create(filePath))
            {
                requestStream.CopyToAsync(fileStream).Wait();
            }

            isUploading = false;
        }

        public VideoReference ConsumeAndFinishUpload()
        {
            var timeoutStopwatch = new Stopwatch();
            timeoutStopwatch.Start();

            while (timeoutStopwatch.ElapsedMilliseconds < int.Parse(config.AppSettings["VideoUploadTimeoutMilliseconds"]))
            {
                if (!isUploading)
                {
                    return dispatcher.Dispatch(VideoActions.CreateVideoReference(new VideoReference
                    {
                        FilePath = Path.Combine(UploadDirectory(), fileName)
                    }));
                }
            }

            isUploading = false;
            throw new Exception("Video upload timed out");
        }

        private string UploadDirectory()
        {
            return Path.Combine(Directory.GetCurrentDirectory(), "uploadedvideos");
        }
    }
}
