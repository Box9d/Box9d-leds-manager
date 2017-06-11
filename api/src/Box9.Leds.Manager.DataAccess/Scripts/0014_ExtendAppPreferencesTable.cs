using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0014_ExtendAppPreferencesTable : IScript
    {
        public int Id
        {
            get
            {
                return 14;
            }
        }

        public string Sql
        {
            get
            {
                return "ALTER TABLE AppPreferences ADD COLUMN pingtimeout INTEGER; ALTER TABLE AppPreferences ADD COLUMN playbackbuffer INTEGER;" +
                    "UPDATE AppPreferences SET pingtimeout = 250, playbackbuffer = 10000";
            }
        }
    }
}
