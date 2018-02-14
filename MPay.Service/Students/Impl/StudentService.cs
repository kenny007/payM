using MPay.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MPay.Domain;

namespace MPay.Service
{
    public class StudentService:EfRepository<MPayEntities, SRStudent>,IStudentService
    {
        public void SaveCodeDetail(CodeDetail code)
        {
            _entities.CodeDetails.Add(code);
        }

        public void SaveAddress(CTAddress address)
        {
            _entities.CTAddresses.Add(address);
        }

        public IQueryable<CodeDetail> Exist(string codeId, string codetype) {
            return _entities.CodeDetails.Where(x => x.ItemCodeID == codeId && x.CodeTypeID == codetype);
        }

    }
}
