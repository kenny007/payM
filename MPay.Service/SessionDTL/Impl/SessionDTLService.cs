﻿using MPay.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MPay.Domain;

namespace MPay.Service
{
    public class SessionDTLService: EfRepository<MPayEntities, SRSessionsDTL>, ISessionDTLService
    {
     
    }
}