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
    
    public partial class SRInvoiceHeader
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SRInvoiceHeader()
        {
            this.SRInvoiceDetails = new HashSet<SRInvoiceDetail>();
        }
    
        public int RecordID { get; set; }
        public string InvoiceNumber { get; set; }
        public string TransactionTypeID { get; set; }
        public string InvoiceNumberRef { get; set; }
        public string CustomerID { get; set; }
        public string StudentID { get; set; }
        public Nullable<int> SessionID { get; set; }
        public Nullable<int> TermID { get; set; }
        public string ClassID { get; set; }
        public string ArmID { get; set; }
        public string ScheduleID { get; set; }
        public Nullable<bool> TransOpen { get; set; }
        public Nullable<System.DateTime> InvoiceDate { get; set; }
        public Nullable<System.DateTime> InvoiceDueDate { get; set; }
        public Nullable<System.DateTime> InvoiceCancelDate { get; set; }
        public Nullable<System.DateTime> SystemDate { get; set; }
        public string TermsID { get; set; }
        public string CurrencyID { get; set; }
        public Nullable<double> CurrencyExchangeRate { get; set; }
        public Nullable<decimal> SubTotal { get; set; }
        public Nullable<decimal> DiscountPers { get; set; }
        public Nullable<decimal> DiscountAmount { get; set; }
        public Nullable<decimal> AdjustmentAmount { get; set; }
        public Nullable<decimal> Total { get; set; }
        public string PaymentMethodID { get; set; }
        public Nullable<decimal> AmountPaid { get; set; }
        public Nullable<decimal> BalanceDue { get; set; }
        public string CheckNumber { get; set; }
        public Nullable<System.DateTime> CheckDate { get; set; }
        public Nullable<bool> Printed { get; set; }
        public Nullable<System.DateTime> PrintedDate { get; set; }
        public Nullable<bool> InvoiceSent { get; set; }
        public Nullable<int> SentCount { get; set; }
        public Nullable<System.DateTime> DateSent { get; set; }
        public string TrackingNumber { get; set; }
        public Nullable<bool> Posted { get; set; }
        public Nullable<System.DateTime> PostedDate { get; set; }
        public Nullable<double> AllowanceDiscountPerc { get; set; }
        public string HeaderMemo1 { get; set; }
        public string HeaderMemo2 { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public string AuditUserID { get; set; }
        public string AuditCompanyID { get; set; }
        public Nullable<System.DateTime> AuditDatetime { get; set; }
        public string GLTransactionNumber { get; set; }
        public string DiscountCode { get; set; }
        public string BatchID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SRInvoiceDetail> SRInvoiceDetails { get; set; }
    }
}