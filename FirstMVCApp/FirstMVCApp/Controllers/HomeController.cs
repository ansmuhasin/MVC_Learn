using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FirstMVCApp.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Products()
        {
            return View("OurCompanyProducts");
        }
        public ActionResult Contact()
        {
            return View();
        }
        [Route("Products/StudentDetails/{id:int?}")]
        public ActionResult StudentDetails(int id)
        {
            var request = Request;
            ViewBag.Id = 1;
            ViewBag.Name = "Ans";
            ViewBag.Age = 25;

            return View();
        }
        public ActionResult GetUser()
        {
            string username = "Ans";
            //return new ContentResult { Content = username, ContentType = "text/plain" };
            return Content(username, "text/plain");
        }
        public ActionResult GetUserPdf()
        {
            string fileName = "~/Data/eFeeReceipt10C18182020.pdf";
            return File(fileName, "application/pdf");
        }
        public ActionResult EmpFacebookpage()
        {
            string url = "https://www.facebook.com";
            return Redirect(url);
        }

    }
}