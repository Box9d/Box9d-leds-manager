using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0003_CreateDeviceTable : IScript
    {
        public int Id
        {
            get
            {
                return 3;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS Device(id INTEGER PRIMARY KEY, projectid INTEGER NOT NULL, name TEXT, ipaddress TEXT)";
            }
        }
    }
}
