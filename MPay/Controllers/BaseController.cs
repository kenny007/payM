using MPay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MPay.Controllers
{
    public class BaseController : Controller
    {
        public readonly IStudentService _strepo;
        // GET: Base
        public BaseController(IStudentService strepo)
        {
            _strepo = strepo;
        }

        //public ActionResult Classes(int termId)
        //{
        //    Session["ExamTermId"] = termId;
        //    return Json(_iutrepo.ClassTermRegList(termId), JsonRequestBehavior.AllowGet);
        //}

    }
}