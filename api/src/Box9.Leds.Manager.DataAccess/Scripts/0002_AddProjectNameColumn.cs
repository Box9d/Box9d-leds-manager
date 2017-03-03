using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0002_AddProjectNameColumn : IScript
    {
        public int Id
        {
            get
            {
                return 2;
            }
        }

        public string Sql
        {
            get
            {
                return "ALTER TABLE Project ADD COLUMN name TEXT";
            }
        }
    }
}
