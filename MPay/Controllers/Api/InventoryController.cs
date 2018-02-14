using AutoMapper;
using MPay.Domain;
using MPay.Models;
using MPay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AutoMapper.QueryableExtensions;
using System.Data.Entity.Validation;
using System.Collections;

namespace MPay.Controllers
{
    [RoutePrefix("api/Inventory")]
    public class InventoryController : BaseApiController
    {
        public readonly IInventoryService _irepo;
        public readonly ILedgerCOAService _ilcrepo;
        public InventoryController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, IFeeScheduleService ifrepo,
            IInventoryService irepo, ILedgerCOAService ilcrepo)
            : base(strepo, ctrepo, adrepo, ifrepo)
        {
            _irepo = irepo;
            _ilcrepo = ilcrepo;
        }

        [Route("Post")]
        [HttpPost]
        public IHttpActionResult Post([FromBody]SRItemNewViewModel feeitem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _irepo.GetAll().FirstOrDefault(x=>x.ItemID==feeitem.ItemID);
                    if (exist == null)
                    {
                        var newFeeItem = Mapper.Map<InventoryItem>(feeitem);
                        newFeeItem.ItemUOM = "EACH";
                        newFeeItem.ItemTypeID = "SERVICE";
                        newFeeItem.EnteredBy = User.Identity.Name;
                        //Save to database
                        _irepo.Insert(newFeeItem);
                        _irepo.Save();
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

        [Route("EditItem")]
        [HttpPost]
        public IHttpActionResult EditItem([FromBody]FeeItemSummary feeitem)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord = _irepo.GetAll().FirstOrDefault(x => x.ItemID == feeitem.ItemID);
                    if (currentRecord !=null)
                    currentRecord.EnteredBy = User.Identity.Name;
                    //Save to database
                    _irepo.Edit2(currentRecord, feeitem);
                    _irepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        [Route("PostAccount")]
        [HttpPost]
        public IHttpActionResult PostAccount([FromBody]SRLedgerCOAViewModel coaccount)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var exist = _ilcrepo.GetAll().FirstOrDefault(x => x.GLAccountNumber == coaccount.GLAccountNumber);
                    if (exist == null)
                    {
                        var newCOA = Mapper.Map<LedgerChartOfAccount>(coaccount);
                        newCOA.AuditUserID = User.Identity.Name;
                        //Save to database
                        _ilcrepo.Insert(newCOA);
                        _ilcrepo.Save();
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

        [Route("EditAccount")]
        [HttpPost]     
        public IHttpActionResult EditAccount([FromBody]SRLedgerCOAViewModel coaccount)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var currentRecord =  _ilcrepo.GetAll().FirstOrDefault(x => x.GLAccountNumber == coaccount.GLAccountNumber);
                    if (currentRecord != null)
                        currentRecord.AuditUserID = User.Identity.Name;
                    //Save to database
                    _ilcrepo.Edit2(currentRecord, coaccount);
                    _ilcrepo.Save();
                    return Json(new { success = true });
                }
            }
            catch (DbEntityValidationException dbex)
            {
                return Json(new { Message = ValidationErrorMsg(dbex) });
            }
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        [Route("Get/{itemId:int}")]
        [HttpGet]
        public SRItemNewViewModel Get(string itemId)
        {
            var result = Mapper.Map<SRItemNewViewModel>(_irepo.GetAll().FirstOrDefault(x=>x.ItemID == itemId));
            return result;
        }

        [HttpGet]
        public IEnumerable<FeeItemSummary> GetFeeItems(string mat, int fac = 0, int dept = 0, int page = 0, int pageSize = 10)
        {
            IQueryable<FeeItemSummary> query = _irepo.GetAll().ProjectTo<FeeItemSummary>();
            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);
            var paginationHeader = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages
            };
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination",
                                                                Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader));

            var results = query.OrderBy(x => x.ItemID)
                         .Skip(pageSize * page)
                         .Take(pageSize)
                         .ToList();
            return results;
        }
        [Route("ItemsList")]
        [HttpGet]
        public IEnumerable<FeeItemSummary> ItemsList()
        {
            IQueryable<FeeItemSummary> query = _irepo.GetAll().ProjectTo<FeeItemSummary>();
            var results = query.OrderBy(x => x.ItemID).ToList();
            return results;
        }
        [Route("GetAccounts")]
        [HttpGet]
        public IEnumerable<LedgerCOASummary> GetAccounts()
        {
            var query = _ilcrepo.GetAll().ProjectTo<LedgerCOASummary>();
            var results = query.OrderBy(x => x.GLAccountNumber).ToList();
            return results;
        }
        [Route("GetAccount/{recordId:int}")]
        [HttpGet]
        public IEnumerable<LedgerCOASummary> GetAccount(int recordId)
        {
            var lcoa = _ilcrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId);
            IQueryable<LedgerCOASummary> query = _ilcrepo.GetAll().Where(x => x.RecordID == lcoa.RecordID).ProjectTo<LedgerCOASummary>();

            var results = query.OrderBy(x => x.GLAccountNumber).ToList();
            return results;
        }
        [Route("GetCOA/{recordId:int}")]
        [HttpGet]
        public SRLedgerCOAViewModel GetCOA(int recordId)
        {
            var result = Mapper.Map<SRLedgerCOAViewModel>(_ilcrepo.GetAll().FirstOrDefault(x => x.RecordID == recordId));
            //var result = Mapper.Map<SRLedgerCOAViewModel>(_ilcrepo.Find(recordId)); 
            //_strepo.Find(recordId).ProjectTo<StudentSummary>();
            return result;
        }
        [Route("GetInvItemType")]
        [HttpGet]
        public IEnumerable GetInvItemType()
        {
            var results = _ctrepo.GetTypeList("InvItemType").ToList();
            return results;
        }
    }
}
