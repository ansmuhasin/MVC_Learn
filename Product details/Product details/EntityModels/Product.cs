using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Product_details.EntityModels
{
    [Table("Products")]
    public class Product
    {
        [Key]
        [Required]
        public long ProductID { get; set; }
        [Required]
        public string ProductName { get; set; }
        [Required]
        public decimal? Price { get; set; }
        public DateTime? DateOfPurchase { get; set; }
        public string AvailabilityStatus { get; set; }
        public long? CategoryID { get; set; }
        public long? BrandID { get; set; }
        public bool? Active { get; set; }
        public string ImageBase64 { get; set; }

        [ForeignKey("BrandID")]
        public virtual Brand Brand { get; set; }
        [ForeignKey("CategoryID")]
        public virtual Category Category { get; set; }
    }
}