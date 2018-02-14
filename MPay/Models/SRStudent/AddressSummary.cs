using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MPay.Models
{
    public class AddressSummary
    {
        public int RecordID { get; set; }
        public int ParentID { get; set; }
        public int EntityType { get; set; }
        public string ContactFullName { get; set; }
        public string PhoneNumber { get; set; }
        public string MobilePhone { get; set; }
        public string Fax { get; set; }
        public int AddressType { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string CityCode { get; set; }
        public string Statecode { get; set; }
        public string Country { get; set; }
    }
}