using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0001_CreateProjectTable : IScript
    {
        public int Id
        {
            get
            {
                return 1;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS Project(id INTEGER PRIMARY KEY)";
            }
        }
    }
}
