using System;
using System.Data;
using System.IO;
using Box9.Leds.Manager.DataAccess.Scripts.Discovery;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Tests.Integration
{
    public class TestDbConnectionFactory : IDisposable
    {
        private readonly string testDbFilePath;
        private DbManager dbManager;
        private bool hasBeenDisposed;

        public TestDbConnectionFactory()
        {
            var dbFileName = string.Format("testdatabase-{0}.sqlite", Guid.NewGuid());
            var directory = new DirectoryInfo(Environment.CurrentDirectory);
            testDbFilePath = Path.Combine(directory.FullName, dbFileName);

            dbManager = new DbManager(config =>
            {
                config.SetDatabaseFilePath(directory, dbFileName);
                config.ConfigureScripts(scr =>
                {
                    foreach (var script in new ScriptDiscovery().Discover())
                    {
                        scr.IncludeScript(script);
                    };
                });
            });
        }

        public Func<IDbConnection> Database
        {
            get
            {
                if (hasBeenDisposed)
                {
                    return () => { throw new ObjectDisposedException("TestDbConnectionFactory"); };
                }

                return dbManager.Database;
            }
        }

        public void Dispose()
        {
            if (File.Exists(testDbFilePath))
            {
                File.Delete(testDbFilePath);
            }

            hasBeenDisposed = true;
        }
    }
}
