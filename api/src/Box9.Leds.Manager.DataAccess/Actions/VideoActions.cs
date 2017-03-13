using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper;
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

        public static DataAccessAction<IEnumerable<VideoReference>> GetVideoReferences()
        {
            return new DataAccessAction<IEnumerable<VideoReference>>((IDbConnection conn) =>
            {
                return conn.GetAll<VideoReference>();
            });
        }

        public static DataAccessAction<ProjectVideo> SetVideoForProject(int projectId, int videoReferenceId)
        {
            return new DataAccessAction<ProjectVideo>((IDbConnection conn) =>
            {
                Guard.This(conn.Get<Project>(projectId)).AgainstDefaultValue(string.Format("Project with id '{0}' does not exist", projectId));
                Guard.This(conn.Get<VideoReference>(videoReferenceId)).AgainstDefaultValue(string.Format("Video reference with id '{0}' does not exist", videoReferenceId));

                var existingProjectVideos = conn.Query<ProjectVideo>("SELECT * FROM ProjectVideo WHERE projectid = @projectid AND videoreferenceid = @videoid", new { projectId, videoReferenceId });

                using (var transaction = conn.BeginTransaction())
                {
                    try
                    {
                        foreach (var existingProjectVideo in existingProjectVideos)
                        {
                            conn.Delete(existingProjectVideo, transaction);
                        }

                        var projectVideo = new ProjectVideo();
                        projectVideo.Id = conn.GetNextId<ProjectVideo>();
                        projectVideo.ProjectId = projectId;
                        projectVideo.VideoReferenceId = videoReferenceId;

                        conn.Insert(projectVideo, transaction);

                        return projectVideo;
                    }
                    catch
                    {
                        transaction.Rollback();
                        throw;
                    }
                }
            });
        }

        public static DataAccessAction<VideoReference> GetVideoForProject(int projectId)
        {
            return new DataAccessAction<VideoReference>((IDbConnection conn) =>
            {
                Guard.This(conn.Get<Project>(projectId)).AgainstDefaultValue(string.Format("Project with id '{0}' does not exist", projectId));

                return conn.Query<VideoReference>("SELECT VideoReference.* FROM ProjectVideo INNER JOIN VideoReference ON ProjectVideo.videoreferenceid = VideoReference.id WHERE ProjectVideo.projectid = @projectid")
                    .SingleOrDefault();
            });
        }
    }
}
