using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRScholarshipNewViewModel
    {
        public int RecordID { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
        [Required]
        public string SchorlarshipID { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public double Amount { get; set; }
        public bool Partial { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }

        public IList<SRScholarshipDTLNewViewModel> Scholarshipdtl { get; set; }
    }
}