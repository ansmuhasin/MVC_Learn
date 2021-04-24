using EFDbFirstApproachExample.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EFDbFirstApproachExample
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilter(GlobalFilterCollection globalFilterCollection)
        {
            globalFilterCollection.Add(new MyExceptionFilter());
        }
    }
}