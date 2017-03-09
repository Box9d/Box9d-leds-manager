using System;
using System.IO;
using System.Linq;
using Box9.Leds.Manager.Core.Equality;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class VideoActionsTests : IDisposable
    {
        private readonly string firstTestFilePath;
        private readonly string secondTestFilePath;

        public VideoActionsTests()
        {
            firstTestFilePath = Path.Combine(Environment.CurrentDirectory, string.Format("testfile-{0}.mp4", Guid.NewGuid()));
            File.Create(firstTestFilePath);
            secondTestFilePath = Path.Combine(Environment.CurrentDirectory, string.Format("testfile-{0}.mp4", Guid.NewGuid()));
            File.Create(secondTestFilePath);
        }

        [Fact]
        public void CanCreateVideoReference()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                VideoActions.CreateVideoReference(new VideoReference { FilePath = firstTestFilePath }).Function(conn);
            }
        }

        [Fact]
        public void CanUpdateVideoReference()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var videoReference = new VideoReference { FilePath = firstTestFilePath };
                videoReference = VideoActions.CreateVideoReference(videoReference).Function(conn);

                var update = new VideoReference
                {
                    Id = videoReference.Id,
                    FilePath = secondTestFilePath
                };

                var retrievedUpdate = VideoActions.UpdateVideoReference(update).Function(conn);

                var propertiesAreEqual = update.PropertiesAreEqual(retrievedUpdate);

                Assert.True(propertiesAreEqual);
            }
        }

        [Fact]
        public void CanGetVideoReferences()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                VideoActions.CreateVideoReference(new VideoReference { FilePath = firstTestFilePath }).Function(conn);

                var videos = VideoActions.GetVideoReferences().Function(conn);

                Assert.Equal(1, videos.Count());
            }
        }

        public void Dispose()
        {
            if (File.Exists(firstTestFilePath))
            {
                File.Delete(firstTestFilePath);
            }

            if (File.Exists(secondTestFilePath))
            {
                File.Delete(secondTestFilePath);
            }
        }
    }
}
