using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Filters;

namespace EFDbFirstApproachExample.Filters
{
    public class MyAuthenticationFilter: FilterAttribute, IAuthenticationFilter
    {
        public void OnAuthentication(AuthenticationContext authenticationContext)
        {
            if(!authenticationContext.HttpContext.User.Identity.IsAuthenticated)
            {
                authenticationContext.Result = new HttpUnauthorizedResult();
            }
        }

        public void OnAuthenticationChallenge(AuthenticationChallengeContext filterContext)
        {
        }
    }
}