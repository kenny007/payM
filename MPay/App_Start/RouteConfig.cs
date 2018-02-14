using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MPay
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "Student Route",
               url: "Student/{*any}",
               defaults: new { controller = "App", action = "Index"}
           );
            routes.MapRoute(
               name: "Home Route",
               url: "Home/{*catchall}",
               defaults: new { controller = "Home", action = "Index" }
           );
            routes.MapRoute(
                name: "Student Overview Route",
                url: "Student/Overview",
                defaults: new { controller = "App", action = "Index" }
          );
            routes.MapRoute(
               name: "Student Create Route",
               url: "Student/Create",
               defaults: new { controller = "App", action = "Index" }
         );
            routes.MapRoute(
                 name: "Student Edit Route",
                 url: "Student/Edit",
                 defaults: new { controller = "App", action = "Index" }
           );

        }
    }
}
