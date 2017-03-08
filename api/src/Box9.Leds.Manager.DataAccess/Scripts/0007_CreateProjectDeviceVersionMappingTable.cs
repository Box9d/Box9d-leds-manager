using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0007_CreateProjectDeviceVersionMappingTable : IScript
    {
        public int Id
        {
            get
            {
                return 7;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS ProjectDeviceVersionMapping(id INTEGER PRIMARY KEY, projectdeviceversionid INTEGER NOT NULL, horizontalposition INTEGER NOT NULL, verticalposition INTEGER NOT NULL, mappingorder INTEGER NOT NULL)";
            }
        }
    }
}
