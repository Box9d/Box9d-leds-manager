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
