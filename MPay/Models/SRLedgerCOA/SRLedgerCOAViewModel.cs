﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRLedgerCOAViewModel
    {
        public int RecordID { get; set; }
        [Required]
        public string GLAccountNumber { get; set; }
        [Required, MaxLength(ErrorMessage ="Max Length Allowed is 30 Characters")]
        public string GLAccountName { get; set; }
        [Required]
        public string GLAccountDescription { get; set; }
        public string GLAccountUse { get; set; }
        public string GLAccountType { get; set; }
        public string GLBalanceType { get; set; }
        public Nullable<int> GLNormalBalance { get; set; }
        public Nullable<bool> GLReportingAccount { get; set; }
        public Nullable<short> GLReportLevel { get; set; }
        public string CurrencyID { get; set; }
        public Nullable<double> CurrencyExchangeRate { get; set; }
        public Nullable<decimal> GLAccountBalance { get; set; }
        public Nullable<decimal> GLAccountBeginningBalance { get; set; }
        public string GLOtherNotes { get; set; }
        public string GLBudgetID { get; set; }
        public Nullable<decimal> GLCurrentYearBeginningBalance { get; set; }
        public string Segment0 { get; set; }
        public string Segment1 { get; set; }
        public string Segment2 { get; set; }
        public string Segment3 { get; set; }
        public string Segment4 { get; set; }
        public string Segment5 { get; set; }
        public string Segment6 { get; set; }
        public string Segment7 { get; set; }
        public string Segment8 { get; set; }
        public string Segment9 { get; set; }
        public Nullable<bool> IsQuantity { get; set; }
        public string UOM { get; set; }
        public Nullable<bool> IsControlAcct { get; set; }
        public string SrceLedgerID { get; set; }
        public string StructureCode { get; set; }
        public Nullable<bool> IsInactive { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
        public string AuditUserID { get; set; }
        public Nullable<System.DateTime> AuditDatetime { get; set; }
        public string AuditCompanyID { get; set; }
    }
}