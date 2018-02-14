using AutoMapper;
using AutoMapper.QueryableExtensions;
using MPay.Domain;
using MPay.Models;
using MPay.Service;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MPay.Controllers.Api
{
    [RoutePrefix("api/SessionTerm")]
    public class SessionTermController : BaseApiController
    {
        public readonly ISessionService _issrepo;
        public readonly ISessionDTLService _isdrepo;
        public SessionTermController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo,  IFeeScheduleService ifrepo, 
            ISessionService issrepo, SessionDTLService isdrepo)
            : base(strepo, ctrepo, adrepo, ifrepo)
        {
            _issrepo = issrepo;
            _isdrepo = isdrepo;
        }

        [Route("GetSessions")]
        [HttpGet]
        public IEnumerable GetSessions()
        {
            var results = _issrepo.GetAll().ToList();
            return results;
        }
        [Route("GetSessionDet/{sessionId:int}")]
        [HttpGet]
        public IEnumerable<SRSessionDTLSummary> GetSessionDet(int sessionId)
        {
            IQueryable<SRSessionDTLSummary> query = _isdrepo.GetAll().Where(x=>x.ParentID == sessionId).ProjectTo<SRSessionDTLSummary>();
            var results = query.OrderBy(x => x.RecordID).ToList();
            return results;          
        }

        [Route("Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRSessionNewViewModel session)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _issrepo.GetAll().FirstOrDefault(x => x.SessionID == session.SessionID);
                    if (exist == null)
                    {
                        var newSession = Mapper.Map<SRSession>(session);
                        newSession.EnteredBy = User.Identity.Name;
                        newSession.AuditDateTime = DateTime.Now;
                        //Save to database
                        _issrepo.Insert(newSession);
                        _issrepo.Save();
                        return Json(new { success = true });
                    }
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { data = GetErrorMessages().ToList() });
        }

        [Route("EditSession")]
        [HttpPost]
        public IHttpActionResult EditSession([FromBody]SRSessionNewViewModel session)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _issrepo.GetAll().FirstOrDefault(x => x.RecordID == session.RecordID);
                    if (currentRecord != null)
                        currentRecord.EnteredBy = User.Identity.Name;
                    //Save to database
                    _issrepo.Edit2(currentRecord, session);
                    _issrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        [Route("Get/{recordId:int}")]
        [HttpGet]
        public SessionSummary Get(int recordId)
        {
            var result = Mapper.Map<SessionSummary>(_issrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId));
            return result;
        }
        [Route("SessionsList")]
        [HttpGet]
        public IEnumerable<SessionSummary> SessionsList()
        {
            IQueryable<SessionSummary> query = _issrepo.GetAll().ProjectTo<SessionSummary>();
            var results = query.OrderBy(x => x.RecordID).ToList();
            return results;
        }

        #region SessionDTLs
        [Route("PostTerm")]
        [HttpPost]
        public IHttpActionResult PostTerm([FromBody]SRSessionDTLNewViewModel term)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _isdrepo.GetAll().FirstOrDefault(x => x.SubSessionID == term.SubSessionID
                                                                  &&  x.ParentID == term.ParentID);
                    if (exist == null)
                    {
                        var newTerm = Mapper.Map<SRSessionsDTL>(term);
                        newTerm.AuditUserID = User.Identity.Name;
                        newTerm.AuditDateTime = DateTime.Now;
                        //Save to database
                        _isdrepo.Insert(newTerm);
                        _isdrepo.Save();
                        return Json(new { success = true });
                    }
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }

            // Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { data = GetErrorMessages().ToList() });
        }

        [Route("EditTerm")]
        [HttpPost]
        public IHttpActionResult EditTerm([FromBody]SRSessionDTLNewViewModel term)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _isdrepo.GetAll().FirstOrDefault(x => x.RecordID == term.RecordID);
                    if (currentRecord != null)
                        currentRecord.AuditUserID = User.Identity.Name;
                    //Save to database
                    _isdrepo.Edit2(currentRecord, term);
                    _isdrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        [Route("GetTerm/{recordId:int}")]
        [HttpGet]
        public SRSessionDTLSummary GetTerm(int recordId)
        {
            var result = Mapper.Map<SRSessionDTLSummary>(_isdrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId));
            return result;
        }

        [Route("TermsList")]
        [HttpGet]
        public IEnumerable<SRSessionDTLSummary> TermsList()
        {
            IQueryable<SRSessionDTLSummary> query = _isdrepo.GetAll().ProjectTo<SRSessionDTLSummary>();
            var results = query.OrderBy(x => x.RecordID).ToList();
            return results;
        }
        #endregion
    }
}
