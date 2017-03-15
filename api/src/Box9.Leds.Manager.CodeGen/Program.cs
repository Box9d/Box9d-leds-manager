using Box9.Leds.Manager.Api;
using NSwag.CodeGeneration.TypeScript;
using NSwag.SwaggerGeneration.WebApi;
using System.Configuration;
using System.IO;

namespace Box9.Leds.Manager.CodeGen
{
    class Program
    {
        static void Main(string[] args)
        {
            var controllers = Metadata.GetAllControllers();

            var swagDocSettings = new WebApiToSwaggerGeneratorSettings
            {
                DefaultUrlTemplate = "api/{controller}/{action}/{id}"
            };
            var swagDocGenerator = new WebApiToSwaggerGenerator(swagDocSettings);
            var document = swagDocGenerator.GenerateForControllersAsync(controllers).Result;

            var codeGenSettings = new SwaggerToTypeScriptClientGeneratorSettings
            {
                Template = TypeScriptTemplate.Fetch,
                PromiseType = PromiseType.Promise,
                GenerateClientInterfaces = true
            };

            var generator = new SwaggerToTypeScriptClientGenerator(document, codeGenSettings);
            var code = generator.GenerateFile();
            code = code.RemoveStatusCodeHandling();
            code = code.AddReferencedTypes();
            code = code.WithCustomReplacements();

            string outputPath = string.Empty;

            var directory = ConfigurationManager.AppSettings["OutputDirectory"].ToString();

            directory = directory.EndsWith("\\", System.StringComparison.InvariantCultureIgnoreCase) ? directory : directory + "\\";
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            outputPath = directory + "ApiClient.ts";

            File.WriteAllText(outputPath, code);
        }
    }
}
