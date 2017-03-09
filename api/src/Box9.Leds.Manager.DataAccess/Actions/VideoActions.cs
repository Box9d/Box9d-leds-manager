using System.Collections.Generic;
using System.Data;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class VideoActions
    {
        public static DataAccessAction<VideoReference> CreateVideoReference(VideoReference video)
        {
            return new DataAccessAction<VideoReference>((IDbConnection conn) =>
            {
                video.Validate();

                video.Id = conn.GetNextId<VideoReference>();

                conn.Insert(video);
                return video;
            });
        }

        public static DataAccessAction<VideoReference> UpdateVideoReference(VideoReference video)
        {
            return new DataAccessAction<VideoReference>((IDbConnection conn) =>
            {
                video.Validate();

                conn.Update(video);

                return video;
            });
        }

        public static DataAccessAction<IEnumerable<VideoReference>> GetVideoReferences()
        {
            return new DataAccessAction<IEnumerable<VideoReference>>((IDbConnection conn) =>
            {
                return conn.GetAll<VideoReference>();
            });
        }
    }
}
