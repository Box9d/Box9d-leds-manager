using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0015_ExtendBackgroundJobsTable : IScript
    {
        public int Id
        {
            get
            {
                return 15;
            }
        }

        public string Sql
        {
            get
            {
                return "ALTER TABLE BackgroundJob ADD COLUMN percentagecomplete INTEGER DEFAULT 100";
            }
        }
    }
}
