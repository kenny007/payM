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
    public interface ICodeTypeService: IRepository<CodeType>
    {
        IQueryable<CodeDetail> GetType(string typename);
        IList<CodeDetail> GetTypeList(string typename);
    }
}
