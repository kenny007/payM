
using MPay.Service;
using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MPay.Controllers
{
    public class BaseApiController : ApiController
    {
        public readonly IStudentService _strepo;
        public readonly ICodeTypeService _ctrepo;
        public readonly IAddressService _adrepo;
        //public readonly IInventoryService _irepo;
        public readonly IFeeScheduleService _ifrepo;
        public BaseApiController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, IFeeScheduleService ifrepo)
        {
            _strepo = strepo;
            _ctrepo = ctrepo;
            _adrepo = adrepo;
            _ifrepo = ifrepo;
        }
        public IEnumerable<string> GetErrorMessages()
        {
            return ModelState.Values.SelectMany(x => x.Errors.Select(e => e.ErrorMessage));
        }

        public string ValidationErrorMsg(DbEntityValidationException dbex)
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
            return line;
        }
    }
}
