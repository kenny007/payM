using MPay.Data;
using MPay.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service
{
    public interface IStudentService:IRepository<SRStudent>
    {
        void SaveCodeDetail(CodeDetail code);
        void SaveAddress(CTAddress address);
        IQueryable<CodeDetail> Exist(string codeId, string codetype);
    }
}
