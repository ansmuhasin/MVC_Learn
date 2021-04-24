using Product_details.ContextManager;
using Product_details.EntityModels;
using Product_details.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Product_details.Controllers
{
    public class ProductController : Controller
    {
        public ActionResult GetProducts(string search, string SortColumn = "ProductID", string iconClass="fa-sort-asc",int pageNo = 1)
        {
            var dbContext = new ProductsContext();
            IQueryable<Product> products = dbContext.products;
            if (SortColumn == "ProductID")
            {
                if (!string.IsNullOrEmpty(search))
                {
                    products = products.Where(x => x.ProductName.Contains(search));
                }

                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.ProductID) : products.OrderByDescending(x => x.ProductID);
            }
            else if(SortColumn == "ProductName")
            {
                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.ProductName) : products.OrderByDescending(x => x.ProductName);
            }
            else if(SortColumn == "Price")
            {
                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.Price) : products.OrderByDescending(x => x.ProductID);
            }
            else if(SortColumn == "BrandID")
            {
                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.BrandID) : products.OrderByDescending(x => x.BrandID);
            }
            else if(SortColumn == "CategoryID")
            {
                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.CategoryID) : products.OrderByDescending(x => x.CategoryID);
            }
            else if(SortColumn == "AvailabilityStatus")
            {
                products = iconClass == "fa-sort-asc" ? products.OrderBy(x => x.AvailabilityStatus) : products.OrderByDescending(x => x.AvailabilityStatus);
            }

            ViewBag.search = search;
            ViewBag.IconClass = iconClass;
            ViewBag.SortColumn = SortColumn;
            ViewBag.PageNo = pageNo;
            float productCount = products.Count();
            int noOfPages = Convert.ToInt32((Math.Ceiling(productCount / 5)));
            ViewBag.NoOfPages = noOfPages;

            return View(products.Include(x => x.Category).Include(x => x.Brand).Skip((pageNo - 1) * 5).Take(5).ToList());
        }
        public ActionResult GetCategories()
        {
            var dbContext = new ProductsContext();
            List<Category> categories = dbContext.categories.ToList();
            return View(categories);
        }
        public ActionResult GetBrands()
        {
            var dbContext = new ProductsContext();
            List<Brand> brands = dbContext.brands.Include(x => x.Products).ToList();

            return View(brands);
        }
        public ActionResult GetProductDetails(int id)
        {
            var dbContext = new ProductsContext();
            Product product = dbContext.products.Include(x => x.Category).Include(x => x.Brand).FirstOrDefault(x => x.ProductID == id);

            return View("GetProductDetails", product);
        }
        public ActionResult AddProduct()
        {
            var dbCOntext = new ProductsContext();
            ViewBag.Categories = dbCOntext.categories.ToList();
            ViewBag.Brands = dbCOntext.brands.ToList();
            return View();
        }
        [HttpPost]
        public ActionResult AddProduct(Product productsModel)
        {
            if (ModelState.IsValid)
            {
                var dbContext = new ProductsContext();
                if (Request.Files.Count > 0)
                {
                    var file = Request.Files[0];
                    var imgByte = new Byte[file.ContentLength];
                    file.InputStream.Read(imgByte, 0, file.ContentLength);
                    var base64Image = Convert.ToBase64String(imgByte, 0, imgByte.Length);
                    productsModel.ImageBase64 = base64Image;
                }

                dbContext.products.Add(productsModel);
                dbContext.SaveChanges();
            }
            return RedirectToAction("GetProducts");
        }
        public ActionResult GetUpdateProductView(int id)
        {
            var dbContext = new ProductsContext();
            Product product = dbContext.products.FirstOrDefault(x => x.ProductID == id);
            ViewBag.Categories = dbContext.categories.ToList();
            ViewBag.Brands = dbContext.brands.ToList();
            return View(product);
        }
        public ActionResult DeleteProduct(int id)
        {
            var dbContext = new ProductsContext();
            Product product = dbContext.products.FirstOrDefault(x => x.ProductID == id);
            dbContext.products.Remove(product);
            dbContext.SaveChanges();

            return RedirectToAction("GetProducts");
        }
        public ActionResult UpdateProduct(Product productsModel)
        {
            var dbContext = new ProductsContext();
            Product product = dbContext.products.FirstOrDefault(x => x.ProductID == productsModel.ProductID);
            product.Active = productsModel.Active;
            product.AvailabilityStatus = productsModel.AvailabilityStatus;
            product.BrandID = productsModel.BrandID;
            product.CategoryID = productsModel.CategoryID;
            product.DateOfPurchase = productsModel.DateOfPurchase;
            product.Price = productsModel.Price;
            product.ProductName = productsModel.ProductName;
            dbContext.SaveChanges();

            return View("GetProductDetails", product);
        }
    }
}