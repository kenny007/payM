using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MPay.Startup))]
namespace MPay
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
