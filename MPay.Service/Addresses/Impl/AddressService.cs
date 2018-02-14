using MPay.Data;
using MPay.Domain;
using MPay.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service
{
    public class AddressService : EfRepository<MPayEntities, CTAddress>, IAddressService
    {

    }
}
