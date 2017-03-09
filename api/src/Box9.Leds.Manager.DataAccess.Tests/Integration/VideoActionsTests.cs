using System.Linq;
using Box9.Leds.Manager.Core.Equality;
using Box9.Leds.Manager.DataAccess.Actions;
using Box9.Leds.Manager.DataAccess.Models;
using Xunit;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class VideoActionsTests
    {
        [Fact]
        public void CanCreateVideoReference()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                VideoActions.CreateVideoReference(new VideoReference { FilePath = "test.mp4" }).Function(conn);
            }
        }

        [Fact]
        public void CanUpdateVideoReference()
        {
            using (var dbFactory = new TestDbConnectionFactory())
            using (var conn = dbFactory.Database())
            {
                var videoReference = new VideoReference { FilePath = "test.mp4" };
                videoReference = VideoActions.CreateVideoReference(videoReference).Function(conn);

                var update = new VideoReference
                {
                    Id = videoReference.Id,
                    FilePath = "test2.mp4"
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
                VideoActions.CreateVideoReference(new VideoReference { FilePath = "test.mp4" }).Function(conn);

                var videos = VideoActions.GetVideoReferences().Function(conn);

                Assert.Equal(1, videos.Count());
            }
        }
    }
}
