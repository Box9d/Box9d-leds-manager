using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;

namespace Box9.Leds.Manager.Api
{
    public static class Metadata
    {
        public static IEnumerable<Type> GetAllControllers()
        {
            return typeof(Metadata).GetTypeInfo().Assembly.GetTypes()
                .Where(t => t.GetTypeInfo().IsSubclassOf(typeof(ApiController)));
        }
    }
}