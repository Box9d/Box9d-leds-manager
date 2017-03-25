using Microsoft.Owin.Hosting;
using System;
using System.Configuration;

namespace Box9.Leds.Pi.Api.WebHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseUrl = ConfigurationManager.AppSettings["Host"];
            using (var app = WebApp.Start<Startup>(baseUrl))
            {
                Console.WriteLine("Starting Pi API...");
                Console.WriteLine("Press any key to stop");
                Console.ReadKey();
            }
        }
    }
}
