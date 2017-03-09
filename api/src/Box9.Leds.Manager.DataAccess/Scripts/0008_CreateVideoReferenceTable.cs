using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0008_CreateVideoReferenceTable : IScript
    {
        public int Id
        {
            get
            {
                return 8;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS VideoReference(id INTEGER PRIMARY KEY, filepath, TEXT)";
            }
        }
    }
}
