using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRSessionNewViewModel
    {
        public int RecordID { get; set; }
        public string SessionID { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> NoOfTerms { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> Approved { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public string EnteredBy { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditUserID { get; set; }
    }
}