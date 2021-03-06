using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Blog.Repository;
using Blog.Core.Articles.Model;
using Blog.Core;
using Blog.EntityFramework.Repository;
using Blog.Domain.Service;
using Blog.Core.Extensions;
using Blog.Core.Options;

namespace Blog.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddOptions();
            services.Configure<BlogOption>(Configuration.GetSection("BlogOption"));
            //services.AddDbContext<BlogDbContext>(options =>
            //    options.UseSqlServer(Configuration.GetConnectionString("Default")));
            services.AddDbContext<BlogDbContext>(options =>
               options.UseSqlite(Configuration.GetConnectionString("Default")));
            services.AddBlogService();
            
            
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });
        }
    }
}
