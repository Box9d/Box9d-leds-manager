using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper.Contrib.Extensions;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class BackgroundJobActions
    {
        public static DataAccessAction<IEnumerable<BackgroundJob>> GetAllJobs(bool includeCompleted = false)
        {
            return new DataAccessAction<IEnumerable<BackgroundJob>>((IDbConnection conn) =>
            {
                return conn.GetAll<BackgroundJob>()
                    .Where(j => includeCompleted || j.Status != Core.Jobs.JobStatus.Complete);
            });
        }
         
        public static DataAccessAction<BackgroundJob> CreateJob(string description)
        {
            return new DataAccessAction<BackgroundJob>((IDbConnection conn) =>
            {
                Guard.This(description).AgainstNullOrEmpty("Description must be provided for background job");

                var job = new BackgroundJob
                {
                    Id = conn.GetNextId<BackgroundJob>(),
                    Description = description,
                    Status = Core.Jobs.JobStatus.Pending
                };
                conn.Insert(job);

                return job;
            });
        }

        public static DataAccessAction<BackgroundJob> MarkAsErrored(int backgroundJobId, string error, string stackTrace)
        {
            return new DataAccessAction<BackgroundJob>((IDbConnection conn) =>
            {
                var job = GetJob(backgroundJobId).Function(conn);
                Guard.This(job).AgainstDefaultValue(string.Format("No job exists with id '{0}'", job.Id));
                Guard.This(error).AgainstNullOrEmpty("Cannot mark job as errored without an error message");
                Guard.This(stackTrace).AgainstNullOrEmpty("Cannot mark job as errored without a stack trace");

                job.LatestError = error;
                job.LatestStackTrace = stackTrace;
                job.Status = Core.Jobs.JobStatus.Failed;

                conn.Update(job);
                return job;
            });
        }

        public static DataAccessAction<BackgroundJob> MarkAsProcessing(int backgroundJobId)
        {
            return new DataAccessAction<BackgroundJob>((IDbConnection conn) =>
            {
                var job = GetJob(backgroundJobId).Function(conn);
                Guard.This(job).AgainstDefaultValue(string.Format("No job exists with id '{0}'", job.Id));

                job.Status = Core.Jobs.JobStatus.Processing;

                conn.Update(job);
                return job;
            });
        }

        public static DataAccessAction<BackgroundJob> MarkAsComplete(int backgroundJobId)
        {
            return new DataAccessAction<BackgroundJob>((IDbConnection conn) =>
            {
                var job = GetJob(backgroundJobId).Function(conn);
                Guard.This(job).AgainstDefaultValue(string.Format("No job exists with id '{0}'", job.Id));

                job.LatestError = null;
                job.LatestStackTrace = null;
                job.Status = Core.Jobs.JobStatus.Complete;

                conn.Update(job);
                return job;
            });
        }

        internal static DataAccessAction<BackgroundJob> GetJob(int id)
        {
            return new DataAccessAction<BackgroundJob>((IDbConnection conn) =>
            {
                return conn.Get<BackgroundJob>(id);
            });
        }
    }
}
