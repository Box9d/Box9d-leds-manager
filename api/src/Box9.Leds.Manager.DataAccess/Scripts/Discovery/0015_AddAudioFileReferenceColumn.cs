using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts.Discovery
{
    public class _0015_AddAudioFileReferenceColumn : IScript
    {
        public string Sql => "ALTER TABLE VideoReference ADD COLUMN audiofilepath TEXT";

        public int Id => 15;
    }
}
