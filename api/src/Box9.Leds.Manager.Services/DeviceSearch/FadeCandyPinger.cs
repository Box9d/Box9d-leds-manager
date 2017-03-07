using System;
using System.Net;

namespace Box9.Leds.Manager.Services.DeviceSearch
{
    public class FadeCandyPinger : IFadeCandyPinger
    {
        public bool IsFadecandyDevice(string ipAddress)
        {
            var request = WebRequest.Create(string.Format("http://{0}:{1}", ipAddress, 7890));
            request.Method = "GET";

            try
            {
                using (var response = (HttpWebResponse)(request.GetResponse()))
                {
                    if (response.StatusCode == HttpStatusCode.OK)
                    {
                        return true;
                    }

                    response.Close();
                }
            }
            catch
            {
            }

            return false;
        }
    }
}
