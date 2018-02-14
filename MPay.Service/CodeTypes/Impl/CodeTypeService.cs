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
    public class CodeTypeService: EfRepository<MPayEntities, CodeType>, ICodeTypeService
    {
        public IQueryable<CodeDetail> GetType(string typename)
        {
            return _entities.CodeDetails.Where(x => x.CodeTypeID == typename);
        }
        public IList<CodeDetail> GetTypeList(string typename)
        {
            return _entities.CodeDetails.Where(x => x.CodeTypeID == typename).ToList();
        }
    }
}
