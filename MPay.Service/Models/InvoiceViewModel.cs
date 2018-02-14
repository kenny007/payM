using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service.Models
{
    public class InvoiceViewModel
    {
     
        public int SessionID { get; set; }

        public int SubSessionID { get; set; }
     
        public int ScheduleID { get; set; }
       
        public string SelectedStudent { get; set; }
    }
}
