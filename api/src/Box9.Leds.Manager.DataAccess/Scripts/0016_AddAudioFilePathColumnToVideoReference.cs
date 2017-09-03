using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts
{
    public class _0016_AddAudioFilePathColumnToVideoReference : IScript
    {
        public string Sql => "ALTER TABLE VideoReference ADD audiofilepath TEXT";

        public int Id => 16;
    }
}
