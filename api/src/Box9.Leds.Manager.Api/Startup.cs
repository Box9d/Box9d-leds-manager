using System.Reflection;
using System.Web.Http;
using System.Web.Http.Cors;
using Autofac;
using Autofac.Integration.WebApi;
using Box9.Leds.Manager.Api;
using Box9.Leds.Manager.Api.Autofac;
using Box9.Leds.Manager.Api.Filters;
using Microsoft.Owin;
using NSwag.AspNet.Owin;
using Owin;

[assembly: OwinStartup(typeof(Startup))]
namespace Box9.Leds.Manager.Api
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            config.Routes.MapHttpRoute(name: "Html", routeTemplate: "{controller}/Index");
            config.Routes.MapHttpRoute(name: "ControllerOnly", routeTemplate: "api/{controller}");
            config.Routes.MapHttpRoute(name: "ControllerAndAction", routeTemplate: "api/{controller}/{action}");
            config.Routes.MapHttpRoute(name: "ControllerActionAndId", routeTemplate: "api/{controller}/{action}/{id}");
            config.Filters.Add(new GlobalExceptionFilter());
            config.Filters.Add(new GlobalActionFilter());

            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            var builder = new ContainerBuilder();
            builder.RegisterApiControllers(typeof(Startup).Assembly);
            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterWebApiModelBinderProvider();
            builder.RegisterModule<ApiModule>();

            var container = builder.Build();

            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);

            app.UseCustomFileServer();
            app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, new SwaggerUiOwinSettings
            {
                DefaultUrlTemplate = "api/{controller}/{action}",
                IsAspNetCore = false
            });

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(config);
            app.UseWebApi(config);

            config.MapHttpAttributeRoutes();
            config.EnsureInitialized();
        }
    }
}
