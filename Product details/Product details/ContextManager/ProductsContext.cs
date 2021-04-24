using Product_details.EntityModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Product_details.ContextManager
{
    public class ProductsContext: DbContext
    {
        public ProductsContext()
            :base("name=PlutoConnection")
        {
        }
        public virtual DbSet<Product> products { get; set; }
        public virtual DbSet<Category> categories {get; set;}
        public virtual DbSet<Brand> brands {get; set;}
    }
}