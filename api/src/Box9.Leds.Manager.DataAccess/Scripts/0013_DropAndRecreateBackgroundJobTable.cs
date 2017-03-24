using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0013_DropAndRecreateBackgroundJobTable : IScript
    {
        public int Id { get { return 13; } }

        public string Sql
        {
            get
            {
                return "DROP TABLE PiSyncJob; DROP TABLE BackgroundJob; CREATE TABLE IF NOT EXISTS BackgroundJob(id INTEGER PRIMARY KEY, projectdeviceversionid INTEGER, status TEXT, lastError TEXT, lastStackTrace TEXT)";
            }
        }
    }
}
