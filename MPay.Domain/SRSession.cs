//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MPay.Domain
{
    using System;
    using System.Collections.Generic;
    
    public partial class SRSession
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SRSession()
        {
            this.SRSessionsDTLs = new HashSet<SRSessionsDTL>();
        }
    
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
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SRSessionsDTL> SRSessionsDTLs { get; set; }
    }
}
