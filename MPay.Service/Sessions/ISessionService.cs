using MPay.Data;
using MPay.Domain;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service
{
    public interface ISessionService:IRepository<SRSession>
    {
        IEnumerable SessionDTL(int sessionId);
        IEnumerable GetTerms();
    }
}
