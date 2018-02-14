using AutoMapper;
using MPay.Domain;
using MPay.Models;
using MPay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using OfficeOnline;

namespace MPay.Controllers.Api
{
    [RoutePrefix("api/Scholarship")]
    public class ScholarshipController : BaseApiController
    {
        public readonly IScholarshipService _ischrepo;
        public readonly IScholarshipdtlService _ischdrepo;
        public ScholarshipController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, 
            IFeeScheduleService ifrepo, IFeeScheduleDtlService ifsdrepo, IScholarshipService ischrepo, IScholarshipdtlService ischdrepo) : base(strepo, ctrepo, adrepo, ifrepo)
            {
                  _ischrepo = ischrepo;
                  _ischdrepo = ischdrepo;
            }

        [Route("Get/{recordId:int}")]
        [HttpGet]
        public SRScholarshipNewViewModel Get(int recordId)
        {
            var result = Mapper.Map<SRScholarshipNewViewModel>(_ischrepo.Find(recordId)); //_strepo.Find(recordId).ProjectTo<StudentSummary>();
            return result;
        }

        [Route("Delete/{recordId:int}")]
        [HttpGet]
        public IHttpActionResult Delete(int recordId)
        {
            try
            {
                _ischrepo.Delete(recordId);
                return Json(new { Message = "Success" });
            }
            catch (Exception)
            {
                return Json(new { Message = "Failed", ModelState = ModelState });
            }
        }

        [Route("Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRScholarshipNewViewModel scholarship)
        {
            try
            {
                
                if (ModelState.IsValid)
                {                 
                    var newScholarship = Mapper.Map<SRSchorlarshipSetupHdr>(scholarship);
                    newScholarship.AuditUserID = User.Identity.Name;
                    newScholarship.AuditDateTime = DateTime.Now;
                    //Save to database
                    var exist = _ischrepo.GetAll().FirstOrDefault(x => x.SchorlarshipID == scholarship.SchorlarshipID);
                    if (exist== null)
                    {
                        _ischrepo.Insert(newScholarship);
                        _ischrepo.Save();
                        foreach (var item in scholarship.Scholarshipdtl)
                        {
                            var scholarshipdtl = Mapper.Map<SRSchorlarshipSetupDtl>(item);
                            scholarshipdtl.ParentID = newScholarship.RecordID;
                            scholarshipdtl.LineNumber = FoCommon.NextSequenceInt();
                            if (scholarship.Partial == true)
                            {
                               scholarshipdtl.SchorlarshipType = "PARTIAL";
                            }
                            _ischdrepo.Insert(scholarshipdtl);
                            _ischdrepo.Save();
                        }
                    }                  
                   
                    return Json(new { Message = "success" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Message = ex.Message });
            }
            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed" });
        }
        [Route("EditScholarship")]
        [HttpPost]
        public IHttpActionResult EditScholarship([FromBody]SRStudentEditViewModel scholarship)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _ischrepo.Find(scholarship.RecordID);
                    scholarship.AuditUserID = User.Identity.Name;
                    //Save to database
                    _ischrepo.Edit2(currentRecord, scholarship);
                    _ischrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (Exception ex)
            {
                return Json(new { Message = ex.Message });
            }
            return Json(new { Message = "Failed"});
        }
     
        [Route("GetScholarships")]
        [HttpGet]
        public IEnumerable<ScholarshipSummary> GetScholarships()
        {
            IQueryable<ScholarshipSummary> query = _ischrepo.GetAll().ProjectTo<ScholarshipSummary>();
            var results = query.OrderBy(x => x.SchorlarshipID).ToList();
            return results;
        }
        [Route("CopyScholarship/{recordId:int}")]
        [HttpGet]
        public IHttpActionResult CopyScholarship(int recordId)
        {
            var result = Mapper.Map<ScholarshipSummary>(_ischrepo.GetAll().FirstOrDefault(x=>x.RecordID == recordId));
            IQueryable<SRScholarshipDTLNewViewModel> details = _ischdrepo.GetAll().ProjectTo<SRScholarshipDTLNewViewModel>();
            var headerdetails = new
            {
                ScholarshipName = result,
                Scholarshipdetials = details.ToList()
            };
         
           // System.Web.HttpContext.Current.Response.Headers.Add("X-ScholarshipObj",
               //                                                Newtonsoft.Json.JsonConvert.SerializeObject(headerdetails));

            return Json(headerdetails);
        }
    }
}
