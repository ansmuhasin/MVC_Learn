using EFDbFirstApproachExample.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Product_details.ContextManager
{
    public class ProductsContext : DbContext
    {
        public ProductsContext()
            : base("name=PlutoConnection")
        {
        }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Brand> Brands { get; set; }
    }
}