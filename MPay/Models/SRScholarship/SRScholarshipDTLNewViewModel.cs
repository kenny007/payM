using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRScholarshipDTLNewViewModel
    {
        public int RecordID { get; set; }
        public int ParentID { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
        public string ItemID { get; set; }
        public int LineNumber { get; set; }
        public string SchorlarshipType { get; set; }
        public double Value { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }
    }
}