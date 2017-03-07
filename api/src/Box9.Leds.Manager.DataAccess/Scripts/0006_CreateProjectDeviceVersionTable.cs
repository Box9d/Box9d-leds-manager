using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0006_CreateProjectDeviceVersionTable : IScript
    {
        public int Id
        {
            get
            {
                return 6;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS ProjectDeviceVersion(id INTEGER PRIMARY KEY, projectdeviceid INTEGER NOT NULL, version INTEGER NOT NULL, " +
                    "numberofhorizontalpixels INTEGER, numberofverticalpixels INTEGER, startathorizontalpercentage INTEGER, startatverticalpercentage INTEGER, " +
                    "horizontalpercentage INTEGER, verticalpercentage INTEGER)";
            }
        }
    }
}
