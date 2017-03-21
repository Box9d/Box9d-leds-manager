using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;
using System.Configuration;
using System.IO;

namespace Box9.Leds.Manager.Api
{
    public static class FileServer
    {
        public static void UseCustomFileServer(this IAppBuilder builder)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), ConfigurationManager.AppSettings["HtmlFilePath"]);
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
    }
}