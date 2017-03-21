using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using System;
using System.Configuration;
using System.IO;
using System.Reflection;

namespace Box9.Leds.Manager.Api
{
    public static class FileServer
    {
        public static void UseCustomFileServer(this IAppBuilder builder)
        {
            var filePath = Path.Combine(CurrentDirectory(), ConfigurationManager.AppSettings["HtmlFilePath"]);
            if (!File.Exists(filePath))
            {
                File.WriteAllText(filePath, "<html><head></head><body>No web interface found</body></html>");
            }

            var fileSystem = new PhysicalFileSystem(new FileInfo(filePath).DirectoryName);
            var options = new FileServerOptions
            {
                EnableDefaultFiles = true,
                FileSystem = fileSystem,
            };
            options.StaticFileOptions.ServeUnknownFileTypes = true;

            builder.UseFileServer(options);
        }

        private static string CurrentDirectory()
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string path = Uri.UnescapeDataString(uri.Path);
            return Path.GetDirectoryName(path);
        }
    }
}