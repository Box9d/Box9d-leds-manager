using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0004_CreateAppPreferencesTable : IScript
    {
        public int Id
        {
            get
            {
                return 4;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS AppPreferences(id INTEGER PRIMARY KEY, devicesearchstartip TEXT, devicesearchendip TEXT); " +
                    "INSERT INTO AppPreferences(id, devicesearchstartip, devicesearchendip) VALUES(1, '192.168.0.1', '192.168.0.255')";
            }
        }
    }
}
