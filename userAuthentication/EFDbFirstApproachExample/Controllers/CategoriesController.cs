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
    public class CategoriesController : Controller
    {
        // GET: Categories/Index
        public ActionResult Index()
        {
            ProductsContext db = new ProductsContext();
            List<Category> categories = db.Categories.ToList();
            return View(categories);
        }
    }
}


