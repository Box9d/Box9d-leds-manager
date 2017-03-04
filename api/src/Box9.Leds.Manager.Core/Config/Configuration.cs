using System.Collections.Specialized;
using System.Configuration;

namespace Box9.Leds.Manager.Core.Config
{
    public class Configuration : IConfiguration
    {
        public NameValueCollection AppSettings
        {
            get
            {
                return ConfigurationManager.AppSettings;
            }
        }
    }
}
