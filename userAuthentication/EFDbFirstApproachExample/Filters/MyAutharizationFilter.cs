using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace EFDbFirstApproachExample.Filters
{
    public class MyAutharizationFilter : FilterAttribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationContext filterContext)
        {
            if(!filterContext.HttpContext.User.IsInRole("Admin"))
            {
                filterContext.Result = new HttpUnauthorizedResult();
            }
        }
    }
}