using MPay.Data;
using MPay.Domain;
using MPay.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service
{
    public interface IInvoiceService:IRepository<SRInvoiceHeader>
    {
        void ProcessInvoice(int sessionId, int subSessionId, int scheduleId, string selectedStudent);

    }
}
