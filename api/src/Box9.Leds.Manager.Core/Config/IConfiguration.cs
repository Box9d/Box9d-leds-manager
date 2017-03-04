using System.Collections.Specialized;

namespace Box9.Leds.Manager.Core.Config
{
    public interface IConfiguration
    {
        NameValueCollection AppSettings { get; }
    }
}
