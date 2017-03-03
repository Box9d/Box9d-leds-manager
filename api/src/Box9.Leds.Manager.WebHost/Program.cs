using System;
using System.Configuration;
using System.IO;
using Box9.Leds.Manager.Api;
using Microsoft.Owin.Hosting;

namespace Box9.Leds.Manager.WebHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseUrl = "http://localhost:8001";
            using (WebApp.Start<Startup>(baseUrl))
            {
                Console.WriteLine("Starting app...");

                var filePath = Path.Combine(Environment.CurrentDirectory, ConfigurationManager.AppSettings["HtmlFilePath"]);

                if (!File.Exists(filePath))
                {
                    File.WriteAllText(filePath, "<html><head></head><body>No web interface found</body></html>");
                }

                System.Diagnostics.Process.Start(filePath);

                Console.WriteLine("Press any key to stop");
                Console.ReadKey();
            }
        }
    }
}
