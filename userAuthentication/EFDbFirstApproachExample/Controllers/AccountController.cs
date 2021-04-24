using EFDbFirstApproachExample.Filters;
using EFDbFirstApproachExample.Identity;
using EFDbFirstApproachExample.ViewModels;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace EFDbFirstApproachExample.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                var dbContext = new ApplicationDBContext();
                var userStore = new ApplicationUserStore(dbContext);
                var userManager = new ApplicationUserManager(userStore);
                var passwordHash = Crypto.HashPassword(registerViewModel.Password);
                var user = new ApplicationUser() { Email = registerViewModel.Email, UserName = registerViewModel.Username, PasswordHash = passwordHash, Address = registerViewModel.Address, PhoneNumber = registerViewModel.Mobile };
                IdentityResult result = userManager.Create(user);
                if (result.Succeeded)
                {
                    userManager.AddToRole(user.Id, "Customer");

                    var authenticationManager = HttpContext.GetOwinContext().Authentication;
                    var userIdentity = userManager.CreateIdentity(user, DefaultAuthenticationTypes.ApplicationCookie);
                    authenticationManager.SignIn(new AuthenticationProperties(), userIdentity);
                    return RedirectToAction("Index", "Home");
                }
                else
                {
                    ModelState.AddModelError("My Error" ,string.Join(",", result.Errors));
                    return View();
                }
            }
            else
            {
                ModelState.AddModelError("My Error", "Invalid data");
                return View();
            }
        }

        public ActionResult Login()
        {
            return View();
        }

        [MyAuthenticationFilter]
        public ActionResult MyProfile()
        {
            var dbContext = new ApplicationDBContext();
            var userStore = new ApplicationUserStore(dbContext);
            var userManager = new ApplicationUserManager(userStore);
            ApplicationUser applicationUser = userManager.FindById(User.Identity.GetUserId());
            return View(applicationUser);
        }

        public ActionResult Logout()
        {
            var authManager = HttpContext.GetOwinContext().Authentication;
            authManager.SignOut();

            return RedirectToAction("Login");
        }

        [HttpPost]
        public ActionResult Login(LoginViewModel loginViewModel)
        {
            var dbContext = new ApplicationDBContext();
            var userStore = new ApplicationUserStore(dbContext);
            var userManager = new ApplicationUserManager(userStore);

            ApplicationUser applicationUser = userManager.Find(loginViewModel.Username, loginViewModel.Password);
            if (applicationUser != null)
            {
                var authenticationmanager = HttpContext.GetOwinContext().Authentication;
                var userIdentity = userManager.CreateIdentity(applicationUser, DefaultAuthenticationTypes.ApplicationCookie);
                authenticationmanager.SignIn(new AuthenticationProperties(),userIdentity);
                return RedirectToAction("Index", "Home");
            }
            else
            {
                ModelState.AddModelError("My Error", "Invalid usernam or password");
                return View();
            }
        }
    }
}