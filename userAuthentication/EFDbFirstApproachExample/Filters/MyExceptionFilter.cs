using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFDbFirstApproachExample.Filters
{
    public class MyExceptionFilter : FilterAttribute, IExceptionFilter
    {
        public void OnException(ExceptionContext filterContext)
        {
            string errorMessage = "Message" + filterContext.Exception.Message;
            //StreamWriter sw = File.AppendText(filterContext.RequestContext.HttpContext.Request.ApplicationPath + "\\ErrorLog.txt");
            //sw.WriteLine(errorMessage);
            //sw.Close();
            filterContext.ExceptionHandled = true;
            filterContext.Result = new RedirectResult("~/Error.html");
        }
    }
}