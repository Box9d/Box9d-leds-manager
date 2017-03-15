using System;
using System.Configuration;
using System.IO;
using Box9.Leds.Manager.Api;
using Microsoft.Owin.Hosting;
using System.Reflection;

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

                if (!(args.Length == 1 && args[0] == "-q")) // Do not use a startup page if this parameter is specified
                {
                    var filePath = Path.Combine(CurrentDirectory(), ConfigurationManager.AppSettings["HtmlFilePath"]);

                    if (!File.Exists(filePath))
                    {
                        File.WriteAllText(filePath, "<html><head></head><body>No web interface found</body></html>");
                    }

                    System.Diagnostics.Process.Start(filePath);
                }

                Console.WriteLine("Press any key to stop");
                Console.ReadKey();
            }
        }

        static string CurrentDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
}
