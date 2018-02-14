using AutoMapper;
using AutoMapper.QueryableExtensions;
using MPay.Domain;
using MPay.Models;
using MPay.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MPay.Controllers.Api
{
    [RoutePrefix("api/FeeScheduleDtl")]
    public class FeeScheduleDtlController : BaseApiController
    {
        public readonly IFeeScheduleDtlService _fsdrepo;
        public FeeScheduleDtlController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo,  
            IFeeScheduleService ifrepo, IFeeScheduleDtlService fsdrepo) : base(strepo, ctrepo, adrepo, ifrepo)
        {
            _fsdrepo = fsdrepo;
        }

        [Route("Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRFeeDtlNewViewModel feescheduledtl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _fsdrepo.GetAll().FirstOrDefault(x => x.ItemID == feescheduledtl.ItemID && x.ParentID == feescheduledtl.ParentID);
                    if (exist == null)
                    {
                        var newFeeScheduleDtl = Mapper.Map<SRFeeScheduleDTL>(feescheduledtl);
                        newFeeScheduleDtl.ParentID = feescheduledtl.ParentID;
                        newFeeScheduleDtl.AuditUserID = User.Identity.Name;
                        //Save to database
                        _fsdrepo.Insert(newFeeScheduleDtl);
                        _fsdrepo.Save();
                        return Json(new { success = true });
                    }
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { data = ValidationErrorMsg(dbex) });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { data = GetErrorMessages() });
        }

        [Route("EditScheduleDtl")]
        [HttpPost]
        public IHttpActionResult EditScheduleDtl([FromBody]FeeScheduleDtlSummary feeschdtl)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _fsdrepo.GetAll().FirstOrDefault(x => x.RecordID == feeschdtl.RecordID && x.ItemID== feeschdtl.ItemID);
                    currentRecord.AuditUserID = User.Identity.Name;
                    //Save to database
                    _fsdrepo.Edit2(currentRecord, feeschdtl);
                    _fsdrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { data = ValidationErrorMsg(dbex) });
            }
            return Json(new { data = "An error Occured" });
        }

        [Route("Get/{recordId:int}")]
        [HttpGet]
        public FeeScheduleDtlSummary Get(int recordId)
        {
            var result = Mapper.Map<FeeScheduleDtlSummary>(_fsdrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId));
            return result;
        }
        [Route("GetFeeScheduleDtl/{scheduleId:int}")]
        [HttpGet]
        public IEnumerable<FeeScheduleDtlSummary> GetFeeScheduleDtl(int scheduleId)
        {
            IQueryable<FeeScheduleDtlSummary> query = _fsdrepo.GetAll().Where(x=>x.ParentID== scheduleId).ProjectTo<FeeScheduleDtlSummary>();
          
            var results = query.OrderBy(x => x.ItemID).ToList();
            return results;
        }

    }
}
