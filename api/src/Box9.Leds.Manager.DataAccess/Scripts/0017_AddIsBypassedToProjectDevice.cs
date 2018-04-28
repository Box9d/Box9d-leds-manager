using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0017_AddIsMutedToProjectDevice : IScript
    {
        public int Id => 17;

        public string Sql => "ALTER TABLE ProjectDevice ADD bypassed INTEGER";
    }
}
