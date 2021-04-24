using System;
using System.Linq;
using System.Threading.Tasks;
using EFDbFirstApproachExample.Identity;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;

[assembly: OwinStartup(typeof(EFDbFirstApproachExample.Startup))]

namespace EFDbFirstApproachExample
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions() { AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie, LoginPath = new PathString("/Account/Login") });
            this.CreateInitialRolesAndUsers();
        }

        private void CreateInitialRolesAndUsers()
        {
            var dbCOntext = new ApplicationDBContext();
            RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(dbCOntext));
            var appUserStore = new ApplicationUserStore(dbCOntext);
            var applicationUserManager = new ApplicationUserManager(appUserStore);

            var a = roleManager.Roles.ToList();
            //Create Admin Role
            if (!roleManager.RoleExists("Admin"))
            {
                var role = new IdentityRole();
                role.Name = "Admin";
                roleManager.Create(role);
            }
            // Create admin role
            if (applicationUserManager.FindByName("admin") == null)
            {
                var user = new ApplicationUser();
                user.UserName = "admin";
                user.Email = "admin@gmail.com";
                string passsword = "Admin123";
                var chkUser = applicationUserManager.Create(user, passsword);
                if (chkUser.Succeeded)
                {
                    applicationUserManager.AddToRole(user.Id, "Admin");
                }
            }
            //Create manager Role
            if(!roleManager.RoleExists("Manager"))
            {
                var role = new IdentityRole();
                role.Name = "Manager";
                roleManager.Create(role);
            }
            // Create manager role
            if (applicationUserManager.FindByName("manager") == null)
            {
                var user = new ApplicationUser();
                user.UserName = "manager";
                user.Email = "manager@gmail.com";
                string passsword = "Manager123";
                var chkUser = applicationUserManager.Create(user, passsword);
                if (chkUser.Succeeded)
                {
                    applicationUserManager.AddToRole(user.Id, "Manager");
                }
            }
            //Create customer Role
            bool isCexists = roleManager.RoleExists("Customer");
            if (!isCexists)
            {
                var role = new IdentityRole();
                role.Name = "Customer";
                roleManager.Create(role);
            }
        }
    }
}
