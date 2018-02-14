using MPay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MPay.Controllers.Api
{
    public class SystemController : BaseApiController
    {
        public SystemController(IStudentService strepo, ICodeTypeService ctrepo, IAddressService adrepo, 
           IFeeScheduleService ifrepo, IFeeScheduleDtlService fsdrepo) : base(strepo, ctrepo, adrepo, ifrepo)
        {
            //_fsdrepo = fsdrepo;
        }

    }
}
