using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0010_CreateProjectVideoTable : IScript
    {
        public int Id
        {
            get
            {
                return 10;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS ProjectVideo(id INTEGER PRIMARY KEY, projectid INTEGER NOT NULL, videoid INTEGER NOT NULL)";
            }
        }
    }
}
