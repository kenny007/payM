using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class FeeItemSummary
    {
        public int RecordID { get; set; }
        [Required]
        public string ItemID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string ItemTypeID { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string ItemDescription { get; set; }
        public string ItemCategoryID { get; set; }
        public string ItemUOM { get; set; }

    }
}