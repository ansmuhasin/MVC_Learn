using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using EFDbFirstApproachExample.Filters;
using EFDbFirstApproachExample.Models;
using Product_details.ContextManager;

namespace EFDbFirstApproachExample.Controllers
{
    [MyAuthenticationFilter]
    public class BrandsController : Controller
    {
        // GET: Brands/Index
        public ActionResult Index()
        {
            //ProductsContext db = new ProductsContext();
            //List<Brand> brands = db.Brands.ToList();
            return View();
        }
    }
}


