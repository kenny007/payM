using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class FeeScheduleDtlSummary
    {
        public int RecordID { get; set; }
        public int ParentID { get; set; }
        public string ItemID { get; set; }
        public string LedgerAccount { get; set; }
        public double FeeAmount { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public double FeeFactor { get; set; }
    }
}