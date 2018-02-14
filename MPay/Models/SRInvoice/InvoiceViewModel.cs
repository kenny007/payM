using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class InvoiceViewModel
    {
        [Required]
        public int SessionID { get; set; }
        [Required]
        public int SubSessionID { get; set; }
        [Required]
        public int ScheduleID { get; set; }
        [Required]
        public string SelectedStudent { get; set; }
    }
}