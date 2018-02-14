using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class FeeScheduleSummary
    {
        public int RecordID { get; set; }
        public string ScheduleID { get; set; }
        public string RuleID { get; set; }
        public string Description { get; set; }
        public decimal TotalAmount { get; set; }
        public string Remarks { get; set; }
        public int InvoiceMode { get; set; }
    }
}