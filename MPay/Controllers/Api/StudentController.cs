using AutoMapper;
using MPay.Domain;
using MPay.Models;
using MPay.Service;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Net.Http;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
//using System.Web.Mvc;
//using System.Web.Http;
//using System.Web.Mvc;

namespace MPay.Controllers
{
    public class StudentController : BaseApiController
    {
        public StudentController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, IFeeScheduleService ifrepo)
            :base(strepo, ctrepo,adrepo, ifrepo)
        {

        }
        [Route("api/Student/Get/{recordId:int}")]
        [HttpGet]
        public SRStudentEditViewModel Get(int recordId)
        {
            var result = Mapper.Map<SRStudentEditViewModel>(_strepo.Find(recordId)); //_strepo.Find(recordId).ProjectTo<StudentSummary>();
            return result;
        }

        [Route("api/Student/Delete/{recordId:int}")]
        [HttpGet]
        public IHttpActionResult Delete(int recordId)
        {
            try
            {
                _strepo.Delete(recordId);
                return Json(new { Message = "Success"});
            }
            catch (Exception)
            {

                return Json(new { Message = "Failed", ModelState = ModelState });
            }        
            //_strepo.Find(recordId).ProjectTo<StudentSummary>();
           //return Json(new { Message = "Failed", ModelState = ModelState });
        }
        [Route("api/Student/Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRStudentNewViewModel student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newStudent = Mapper.Map<SRStudent>(student);
                    newStudent.StatusID = 1;
                    newStudent.StudentID = (newStudent.StudentID == null) ? Convert.ToString(Guid.NewGuid()) : newStudent.StudentID;
                    newStudent.GlobalID = Guid.NewGuid();
                    newStudent.AuditUserID = User.Identity.Name;
                    //Save to database
                    _strepo.Insert(newStudent);
                    _strepo.Save();
                    return Json(new { success = true });
                    //Json(Mapper.Map<SRStudentNewViewModel>(newStudent));
                }
            }
            catch (Exception ex)
            {
                //return request.CreateResponse(HttpStatusCode.BadRequest, GetErrorMessages());
                // Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
        [Route("api/Student/EditStudent")]
        [HttpPost]
        public IHttpActionResult EditStudent([FromBody]SRStudentEditViewModel student)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //var editStudent = Mapper.Map<SRStudent>(student);
                    var currentRecord = _strepo.Find(student.RecordID);
                    //editStudent.StatusID = 1;
                    student.StudentID = (student.StudentID == null) ? Convert.ToString(Guid.NewGuid()) : student.StudentID;
                    //editStudent.GlobalID = currentRecord.GlobalID;
                    student.AuditUserID = User.Identity.Name;
                    //Save to database
                    _strepo.Edit2(currentRecord, student);
                    _strepo.Save();
                    return Json(new { success = true });
                    //Json(Mapper.Map<SRStudentNewViewModel>(newStudent));
                }
            }
            catch (Exception ex)
            {
                //return request.CreateResponse(HttpStatusCode.BadRequest, GetErrorMessages());
                // Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
        #region Customs
        [Route("api/Student/GetStudents")]
        [HttpGet]
        public IEnumerable<StudentSummary> GetStudents(string mat, int fac = 0, int dept = 0,  int page = 0, int pageSize = 10)
        {
            IQueryable<StudentSummary> query = _strepo.GetAll().ProjectTo<StudentSummary>();
        //    Mapper.<SRStudent, StudentSummary>().ForMember(dest => dest.,
        //opt => opt.MapFrom(src => int.Parse(src.Stringphoneno)));
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages
            };
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query.OrderBy(x=>x.StudentID)
                         .Skip(pageSize * page)
                         .Take(pageSize)
                         .ToList();
            return results;
        }
        [Route("api/Student/GetStudent/{scheduleId:int}")]
        [HttpGet]
        public IEnumerable<StudentSummary> GetStudent(int scheduleId)
        {
            var schedule = _ifrepo.GetAll().FirstOrDefault(x => x.RecordID == scheduleId);
            IQueryable<StudentSummary> query = _strepo.GetAll().Where(x=>x.PayTemplateNo == schedule.ScheduleID).ProjectTo<StudentSummary>();
           
            var results = query.OrderBy(x => x.StudentID).ToList();
            return results;
        }

        [Route("api/Student/SaveCodeType")]
        [HttpPost]
        public IHttpActionResult SaveCodeType([FromBody]CodeDetail codes)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _strepo.Exist(codes.ItemCodeID, codes.CodeTypeID).ToList();
                    if (exist.Count == 0)
                    {
                        codes.GlobalID = Guid.NewGuid();
                        codes.SourceID = "U";
                        _strepo.SaveCodeDetail(codes);
                        //Save to database
                        _strepo.Save();
                    }
                  
                    return Json(new { success = true });
                    //Json(Mapper.Map<SRStudentNewViewModel>(newStudent));
                }
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbex)
            {
                return Json(new { Message =  ValidationErrorMsg(dbex)});
            }
            //catch (Exception ex)
            //{
            //    ModelState.Values.SelectMany(x => x.Errors.Select(e => e.ErrorMessage));
            //    return Json(new { Message = ex.Message });
            //}
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        [Route("api/Student/GetPrograms")]
        [HttpGet]
        public IEnumerable GetPrograms()
        {
            var results = _ctrepo.GetTypeList("ProgramType");
            results.Add(new CodeDetail { RecordID = -1, ItemCodeID = "+ Add Program", Description = "+ Add Program" });
            return results;
        }
        [Route("api/Student/GetDepartments")]
        [HttpGet]
        public IEnumerable GetDepartments()
        {
            var results = _ctrepo.GetTypeList("Departments");
            results.Add(new CodeDetail { RecordID = -2, ItemCodeID = "+ Add Department", Description = "+ Add Department" });
            return results;
        }
        [Route("api/Student/GetStudentType")]
        [HttpGet]
        public IEnumerable GetStudentType()
        {
            var results = _ctrepo.GetTypeList("StudentType");
            results.Add(new CodeDetail { RecordID = -3, ItemCodeID = "+ Add Student Type", Description = "+ Add Student Type" });
            return results.ToList();
        }

        [Route("api/Student/GetProgramLevel")]
        [HttpGet]
        public IEnumerable GetProgramLevel()
        {
            var results = _ctrepo.GetTypeList("ProgramLevel");
            //results.Add(new CodeDetail { RecordID = -4, ItemCodeID = "+ Add a New Level", Description = "+ Add a New Level" });
            return results.ToList();
        }
        [Route("api/Student/GetEntryMode")]
        [HttpGet]
        public IEnumerable GetEntryMode()
        {
            var results = _ctrepo.GetTypeList("EntryMode");
            //results.Add(new CodeDetail { RecordID = -5, ItemCodeID = "+ Add Entry Mode", Description = "+ Add Entry Mode" });
            return results.ToList();
        }
        [Route("api/Student/GetDisability")]
        [HttpGet]
        public IEnumerable GetDisability()
        {
            var results = _ctrepo.GetTypeList("Disability");
           // results.Add(new CodeDetail { RecordID = -6, ItemCodeID = "+ Add Disability", Description = "+ Add Disability" });
            return results.ToList();
        }
        #endregion

        #region Address Logic

        [Route("api/Student/SaveAddress")]
        [HttpPost]
        public IHttpActionResult SaveAddress([FromBody]AddressSummary address)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editAddress = Mapper.Map<CTAddress>(address);
                    _adrepo.Insert(editAddress);
                    //Save to database
                    _adrepo.Save();
                    return Json(new { success = true });
                    //Json(Mapper.Map<SRStudentNewViewModel>(newStudent));
                }
            }
            catch (System.Data.Entity.Validation.DbEntityValidationException dbex)
            {
                string line = "";
                foreach (var eve in dbex.EntityValidationErrors)
                {
                    line = string.Format("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);

                    foreach (var ve in eve.ValidationErrors)
                    {
                        line = string.Format("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);

                    }
                }
                return Json(new { Message = line });
            }
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        //[Route("api/Student/Get/{recordId:int}")]
        [Route("api/Student/GetAddressById")]
        [HttpGet]
        public IEnumerable<AddressSummary> GetAddressById(int recordId)
        {
            IQueryable<AddressSummary> query = _adrepo.GetAll().Where(x=>x.ParentID==recordId).ProjectTo<AddressSummary>();
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / 10);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages
            };
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query.OrderBy(x => x.ContactFullName).ToList();
            return results;
        }

        [Route("api/Student/EditAddress")]
        [HttpPost]
        public IHttpActionResult EditAddress([FromBody]AddressSummary address)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editAddress = Mapper.Map<CTAddress>(address);
                    var currentRecord = _adrepo.Find(address.RecordID);
                    _adrepo.Edit(editAddress);
                    _adrepo.Save();
                    return Json(new { success = true });
                    //Json(Mapper.Map<SRStudentNewViewModel>(newStudent));
                }
            }
            catch (Exception ex)
            {
                //return request.CreateResponse(HttpStatusCode.BadRequest, GetErrorMessages());
                // Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }
        #endregion
        //[HttpPost]
        //public ActionResult Save(SRStudentNewViewModel vm)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var newstudent = Mapper.Map<SRStudent>(vm);
        //        _strepo.Insert(newstudent);
        //        _strepo.Save();
        //       return Json(new { success = true }, JsonRequestBehavior.AllowGet);
        //    }
        //    return Json(new {success=false }, JsonRequestBehavior.AllowGet);
        //}
        //public IHttpActionResult GetStudents()
        //{
        //    return Json("", JsonRequestBehavior.AllowGet);
        //}
    }
}
