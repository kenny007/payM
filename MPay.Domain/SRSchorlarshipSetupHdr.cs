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
    
    public partial class SRSchorlarshipSetupHdr
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SRSchorlarshipSetupHdr()
        {
            this.SRSchorlarshipSetupDtls = new HashSet<SRSchorlarshipSetupDtl>();
        }
    
        public int RecordID { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
        public string SchorlarshipID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Amount { get; set; }
        public bool Partial { get; set; }
        public Nullable<System.DateTime> AuditDateTime { get; set; }
        public string AuditCompanyID { get; set; }
        public string AuditUserID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SRSchorlarshipSetupDtl> SRSchorlarshipSetupDtls { get; set; }
    }
}
