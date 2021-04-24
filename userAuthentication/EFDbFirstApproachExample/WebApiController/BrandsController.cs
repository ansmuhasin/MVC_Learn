using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using EFDbFirstApproachExample.Models;
using Product_details.ContextManager;

namespace EFDbFirstApproachExample.WebApi
{
    public class BrandsController : ApiController
    {
        public List<Brand> Get()
        {
            ProductsContext db = new ProductsContext();
            List<Brand> brands = db.Brands.ToList();
            return brands;
        }
    }
}
