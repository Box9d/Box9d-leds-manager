using System;
using System.Collections.Generic;
using System.Data;
using Box9.Leds.Manager.Core.Validation;
using Box9.Leds.Manager.DataAccess.Extensions;
using Box9.Leds.Manager.DataAccess.Models;
using Dapper.Contrib.Extensions;

namespace Box9.Leds.Manager.DataAccess.Actions
{
    public static class PiSyncJobActions
    {
        public static DataAccessAction<IEnumerable<PiSyncJob>> GetJobs()
        {
            return new DataAccessAction<IEnumerable<PiSyncJob>>((IDbConnection conn) =>
            {
                return conn.GetAll<PiSyncJob>();
            });
        }

        public static DataAccessAction FlagAsStartedProcessing(int piSyncJobId)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var queueItem = conn.Get<PiSyncJob>(piSyncJobId);
                Guard.This(queueItem).AgainstDefaultValue(string.Format("Hangfire queue item with id '{0}' not found", piSyncJobId));

                queueItem.StartedProcessing = 1;
                conn.Update(queueItem);
            });
        }

        public static DataAccessAction FlagAsFinishedProcessing(int piSyncJobId)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var queueItem = conn.Get<PiSyncJob>(piSyncJobId);
                Guard.This(queueItem).AgainstDefaultValue(string.Format("Hangfire queue item with id '{0}' not found", piSyncJobId));
                Guard.This(queueItem.StartedProcessing).AgainstZero("Cannot flag queue item as finished processing before it has started");

                queueItem.FinishedProcessing = 1;
                conn.Update(queueItem);
            });
        }

        public static DataAccessAction RemoveJob(int piSyncJobId)
        {
            return new DataAccessAction((IDbConnection conn) =>
            {
                var item = conn.Get<PiSyncJob>(piSyncJobId);
                Guard.This(item).AgainstDefaultValue(string.Format("Hangfire queue item with id '{0}' not found", piSyncJobId));

                conn.Delete(item);
            });
        }
         
        internal static DataAccessAction<PiSyncJob> AddJob(PiSyncJob queueItem)
        {
            return new DataAccessAction<PiSyncJob>((IDbConnection conn) =>
            {
                queueItem.Validate();

                var projectDevice = conn.Get<ProjectDevice>(queueItem.ProjectDeviceId);
                if (projectDevice == null)
                {
                    throw new ArgumentException(string.Format("Project device with id '{0}' not found", queueItem.ProjectDeviceId));
                }

                var id = conn.GetNextId<PiSyncJob>();
                queueItem.Id = id;

                conn.Insert(queueItem);
                return queueItem;
            });
        }
    }
}
