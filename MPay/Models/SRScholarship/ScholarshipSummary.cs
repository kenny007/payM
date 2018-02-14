using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class ScholarshipSummary
    {
        public int RecordID { get; set; }
        
        [Required]
        public string SchorlarshipID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public double Amount { get; set; }
        public bool Partial { get; set; }
      
    }
}