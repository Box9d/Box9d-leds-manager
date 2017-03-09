using System;
using Hangfire;
using Hangfire.SQLite;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Hangfire
{
    public static class HangfireConfigurationExtensions
    {
        public static void UseSQLiteStorage(this IGlobalConfiguration configuration)
        {
            var connectionString = string.Format("Data Source = {0}; Version = 3;", DbManagerDefaults.DefaultDbPath);

            configuration.UseSQLiteStorage(connectionString, new SQLiteStorageOptions
            {
                QueuePollInterval = TimeSpan.FromSeconds(10),
                PrepareSchemaIfNecessary = true
            });
        }
    }
}
