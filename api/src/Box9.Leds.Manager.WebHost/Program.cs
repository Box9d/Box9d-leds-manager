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
            string baseUrl = "http://+:8001";
            using (WebApp.Start<Startup>(baseUrl))
            {
                Console.WriteLine("Starting app...");

                if (!(args.Length == 1 && args[0] == "-q")) // Do not use a startup page if this parameter is specified
                {
                    System.Diagnostics.Process.Start("http://localhost:8001");
                }

                Console.WriteLine("Press any key to stop");
                Console.ReadKey();
            }
        }
    }
}
