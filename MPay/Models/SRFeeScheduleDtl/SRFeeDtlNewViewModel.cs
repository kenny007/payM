using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRFeeDtlNewViewModel
    {
        public int RecordID { get; set; }
        public int ParentID { get; set; }
        [Required]
        public string ItemID { get; set; }
        public string LedgerAccount { get; set; }
        [Required]
        public double FeeAmount { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }
        public string MappedItemID { get; set; }
        [Required]
        public double FeeFactor { get; set; }
    }
}