using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0011_CreatePiSyncJobTable : IScript
    {
        public int Id
        {
            get
            {
                return 11;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS PiSyncJob(id INTEGER PRIMARY KEY, description TEXT, projectdeviceid INTEGER NOT NULL, startedprocessing INTEGER, finishedprocessing INTEGER)";
            }
        }
    }
}
