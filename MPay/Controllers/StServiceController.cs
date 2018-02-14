using MPay.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MPay.Controllers
{
    public class StServiceController : ApiController
    {
        // GET: api/StService
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/StService/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/StService
        public void Post(SRStudentNewViewModel student)
        {

        }

        // PUT: api/StService/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/StService/5
        public void Delete(int id)
        {
        }
    }
}
