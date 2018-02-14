﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class SRItemNewViewModel
    {
        public int RecordID { get; set; }
        [Required]
        public string ItemID { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public string ItemTypeID { get; set; }
        [Required]
        public string ItemName { get; set; }
        [Required]
        public string ItemDescription { get; set; }
        public string ItemCategoryID { get; set; }
        public string ItemFamilyID { get; set; }
        public string SalesDescription { get; set; }
        public string PurchaseDescription { get; set; }
        public string PictureURL { get; set; }
        public string LargePictureURL { get; set; }
        public Nullable<double> ItemWeight { get; set; }
        public Nullable<double> ItemWeightMetric { get; set; }
        public Nullable<int> ItemShipWeight { get; set; }
        public string ItemUPCCode { get; set; }
        public string ItemEPCCode { get; set; }
        public string ItemRFID { get; set; }
        public string ItemSize { get; set; }
        public string ItemSizeCmm { get; set; }
        public string ItemDimentions { get; set; }
        public string ItemDimentionsCmm { get; set; }
        public string ItemColor { get; set; }
        public string ItemNRFColor { get; set; }
        public string ItemStyle { get; set; }
        public string ItemNRFStyle { get; set; }
        public string ItemCareInstructions { get; set; }
        public string Warehouse { get; set; }
        public string ItemLocationX { get; set; }
        public string DownloadLocation { get; set; }
        public string DownloadPassword { get; set; }
        public string ItemUOM { get; set; }
        public string GLItemSalesAccount { get; set; }
        public string GLItemCOGSAccount { get; set; }
        public string GLItemInventoryAccount { get; set; }
        public string CurrencyID { get; set; }
        public Nullable<double> CurrencyExchangeRate { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string ItemPricingCode { get; set; }
        public string PricingMethods { get; set; }
        public Nullable<bool> Taxable { get; set; }
        public string VendorID { get; set; }
        public string LeadTime { get; set; }
        public string LeadTimeUnit { get; set; }
        public Nullable<int> ReOrderLevel { get; set; }
        public Nullable<int> ReOrderQty { get; set; }
        public Nullable<int> BuildTime { get; set; }
        public string BuildTimeUnit { get; set; }
        public Nullable<int> UseageRate { get; set; }
        public string UseageRateUnit { get; set; }
        public Nullable<int> SalesForecast { get; set; }
        public string SalesForecastUnit { get; set; }
        public Nullable<int> CalculatedCover { get; set; }
        public string CalculatedCoverUnits { get; set; }
        public Nullable<bool> IsAssembly { get; set; }
        public string ItemAssembly { get; set; }
        public Nullable<decimal> LIFO { get; set; }
        public Nullable<decimal> LIFOValue { get; set; }
        public Nullable<decimal> LIFOCost { get; set; }
        public Nullable<decimal> Average { get; set; }
        public Nullable<decimal> AverageValue { get; set; }
        public Nullable<decimal> AverageCost { get; set; }
        public Nullable<decimal> FIFO { get; set; }
        public Nullable<decimal> FIFOValue { get; set; }
        public Nullable<decimal> FIFOCost { get; set; }
        public Nullable<decimal> Expected { get; set; }
        public Nullable<decimal> ExpectedValue { get; set; }
        public Nullable<decimal> ExpectedCost { get; set; }
        public Nullable<decimal> Landed { get; set; }
        public Nullable<decimal> LandedValue { get; set; }
        public string LandedCost { get; set; }
        public Nullable<decimal> Other { get; set; }
        public Nullable<decimal> OtherValue { get; set; }
        public Nullable<decimal> OtherCost { get; set; }
        public Nullable<bool> Commissionable { get; set; }
        public Nullable<short> CommissionType { get; set; }
        public Nullable<double> CommissionPerc { get; set; }
        public Nullable<bool> Approved { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<System.DateTime> ApprovedDate { get; set; }
        public string EnteredBy { get; set; }
        public string TaxGroupID { get; set; }
        public Nullable<double> TaxPercent { get; set; }
        public string ShipMethodID { get; set; }
        public Nullable<int> WeightStyle { get; set; }
        public Nullable<bool> AllowOverWeight { get; set; }
        public Nullable<bool> TaxInclusive { get; set; }
        public string CompanyID { get; set; }
        public string DivisionID { get; set; }
        public string DepartmentID { get; set; }
    }
}