using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRFeeSchNewViewModel
    {
        public int RecordID { get; set; }
        public string ScheduleID { get; set; }
        public string RuleID { get; set; }
        public string Description { get; set; }
        public decimal TotalAmount { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }
        public int InvoiceMode { get; set; }
        public string MappedItemID { get; set; }
    }
}