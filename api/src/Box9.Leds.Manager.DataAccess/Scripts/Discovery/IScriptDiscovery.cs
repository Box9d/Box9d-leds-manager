using System.Collections.Generic;
using InstaSqlite;

namespace Box9.Leds.Manager.DataAccess.Scripts.Discovery
{
    public interface IScriptDiscovery
    {
        IEnumerable<IScript> Discover();
    }
}
