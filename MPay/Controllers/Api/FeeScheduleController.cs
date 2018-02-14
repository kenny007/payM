using MPay.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using MPay.Models;
using AutoMapper;
using MPay.Domain;

namespace MPay.Controllers
{
     [RoutePrefix("api/FeeSchedule")]
    public class FeeScheduleController : BaseApiController
    {
        
        public FeeScheduleController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, IFeeScheduleService ifrepo)
            : base(strepo, ctrepo, adrepo, ifrepo)
        {

        }
        [Route("Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRFeeSchNewViewModel feeschedule)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _ifrepo.GetAll().FirstOrDefault(x=>x.ScheduleID== feeschedule.ScheduleID);
                    if (exist == null)
                    {
                        var newFeeSchedule = Mapper.Map<SRFeeScheduleHdr>(feeschedule);
                        newFeeSchedule.AuditUserID = User.Identity.Name;
                        newFeeSchedule.AuditDateTime = DateTime.Now;
                        //Save to database
                        _ifrepo.Insert(newFeeSchedule);
                        _ifrepo.Save();
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

        [Route("EditItem")]
        [HttpPost]
        public IHttpActionResult EditItem([FromBody]FeeScheduleSummary feeitem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _ifrepo.GetAll().FirstOrDefault(x => x.ScheduleID == feeitem.ScheduleID);
                    currentRecord.AuditUserID = User.Identity.Name;
                    currentRecord.AuditDateTime = DateTime.Now;
                    //Save to database
                    _ifrepo.Edit2(currentRecord, feeitem);
                    _ifrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { data = ValidationErrorMsg(dbex) });
            }
            return Json(new { data = "An error Occured"});
        }

        [Route("Get/{scheduleId}")]
        [HttpGet]
        public FeeScheduleSummary Get(string scheduleId)
        {
            var result = Mapper.Map<FeeScheduleSummary>(_ifrepo.GetAll().FirstOrDefault(x => x.ScheduleID== scheduleId));
            return result;
        }
        [Route("GetSch/{recordId}")]
        [HttpGet]
        public FeeScheduleSummary GetSch(int recordId)
        {
            var result = Mapper.Map<FeeScheduleSummary>(_ifrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId));
            return result;
        }

        public IEnumerable<FeeScheduleSummary> GetFeeSchdedules(string mat, int fac = 0, int dept = 0, int page = 0, int pageSize = 10)
        {
            IQueryable<FeeScheduleSummary> query = _ifrepo.GetAll().ProjectTo<FeeScheduleSummary>();
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages
            };
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query.OrderBy(x => x.ScheduleID)
                         .Skip(pageSize * page)
                         .Take(pageSize)
                         .ToList();
            return results;
        }
        [Route("GetSchdedules")]
        [HttpGet]
        public IEnumerable<FeeScheduleSummary> GetSchdedules()
        {
            IQueryable<FeeScheduleSummary> query = _ifrepo.GetAll().ProjectTo<FeeScheduleSummary>();
            var totalCount = query.Count();
            var results = query.OrderBy(x => x.ScheduleID).ToList();
            return results;
        }
    }
}
