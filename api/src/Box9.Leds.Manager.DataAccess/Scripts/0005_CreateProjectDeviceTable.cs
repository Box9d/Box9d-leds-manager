using System;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0005_CreateProjectDeviceTable : IScript
    {
        public int Id
        {
            get
            {
                return 5;
            }
        }

        public string Sql
        {
            get
            {
                return "CREATE TABLE IF NOT EXISTS ProjectDevice(id INTEGER PRIMARY KEY, projectid INT NOT NULL, deviceid NOT NULL)";
            }
        }
    }
}
