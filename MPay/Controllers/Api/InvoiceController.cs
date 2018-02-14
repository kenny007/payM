using MPay.Domain;
using MPay.Models;
using MPay.Service;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
//using System.Web.Mvc;

namespace MPay.Controllers
{
    [RoutePrefix("api/Invoice")]
    public class InvoiceController : BaseApiController
    {
        public readonly IFeeScheduleDtlService _ifsdrepo;
        public readonly IInvoiceService _iinvsrepo;
        public InvoiceController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, IFeeScheduleService ifrepo,
            IFeeScheduleDtlService ifsdrepo, IInvoiceService iinvsrepo)
            : base(strepo, ctrepo, adrepo, ifrepo)
        {
            _ifsdrepo = ifsdrepo;
            _iinvsrepo = iinvsrepo;
        }
        [Route("ProcessInvoice")]
        [HttpPost]
        public IHttpActionResult ProcessInvoice(InvoiceViewModel invoice)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _iinvsrepo.ProcessInvoice(invoice.SessionID, invoice.SubSessionID, invoice.ScheduleID, invoice.SelectedStudent);
                    return Json(new { Message = "success" });
                }
                catch (Exception ex)
                {
                    return Json(new { Message = ex.Message});
                }
            }

            return Json(new { Message ="An error occured"});
        }

        [Route("LoadInvoice")]
        public IEnumerable<InvoiceViewModel> LoadInvoice()
        {
            //Get UserId
            int sessionId = 1; int termId = 1;
            string userId = "11"; //var userId = User.Identity.Name;
                                  // IQueryable<FeeScheduleSummary> query = _ifrepo.GetAll().ProjectTo<FeeScheduleSummary>();
            IQueryable<InvoiceViewModel> invoices = _iinvsrepo.GetAll().
                                        Where(x => x.StudentID == userId && x.SessionID == sessionId && x.TermID == termId)
                                        .ProjectTo<InvoiceViewModel>();
            return invoices;
        }

    }
}