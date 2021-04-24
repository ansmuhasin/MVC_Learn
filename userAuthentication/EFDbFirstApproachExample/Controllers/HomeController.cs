using EFDbFirstApproachExample.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFDbFirstApproachExample.Controllers
{
    [MyAuthenticationFilter]
    public class HomeController : Controller
    {
        [MyActionFilter]
        [MyResultFilter]
        public ActionResult Index()
        {
            return View();
        }
    }
}



