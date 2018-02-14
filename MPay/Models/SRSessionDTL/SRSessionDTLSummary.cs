using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRSessionDTLSummary
    {
        public int RecordID { get; set; }
        public int ParentID { get; set; }
        public string SubSessionID { get; set; }
        public string Description { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> NoOfDays { get; set; }
        public Nullable<System.DateTime> MidBreakStartDate { get; set; }
        public Nullable<System.DateTime> MidBreakEndDate { get; set; }
    }
}