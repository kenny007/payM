using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class LedgerCOASummary
    {
        public int RecordID { get; set; }
        public string GLAccountNumber { get; set; }
        public string GLAccountName { get; set; }
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
        public Nullable<bool> IsQuantity { get; set; }
        public string UOM { get; set; }
        public Nullable<bool> IsControlAcct { get; set; }
        public string SrceLedgerID { get; set; }
        public string StructureCode { get; set; }
        public Nullable<bool> IsInactive { get; set; }
    }
}