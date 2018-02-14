using MPay.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MPay.Domain;
using MPay.Service;
using System.Collections;

namespace MPay.Service
{
    public class SessionService:EfRepository<MPayEntities, SRSession>, ISessionService
    {       
        public IEnumerable SessionDTL(int sessionId)
        {
            return _entities.SRSessionsDTLs.Where(x => x.ParentID == sessionId).ToList();
        }

        public IEnumerable GetTerms()
        {
            return _entities.SRSessionsDTLs.ToList();
        }

    }
}
