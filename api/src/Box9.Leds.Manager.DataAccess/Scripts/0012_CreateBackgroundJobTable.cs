using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0012_CreateBackgroundJobTable : IScript
    {
        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS BackgroundJob(id INTEGER PRIMARY KEY, description TEXT, latesterror TEXT, lateststacktrace TEXT, status TEXT)";
            }
        }

        public int Id { get { return 12; } }
    }
}
