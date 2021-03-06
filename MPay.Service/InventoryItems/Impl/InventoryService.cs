﻿using MPay.Data;
using MPay.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MPay.Service
{
    public class InventoryService: EfRepository<MPayEntities, InventoryItem>, IInventoryService
    {
        public IEnumerable<LedgerChartOfAccount> Accounts()
        {
            return _entities.LedgerChartOfAccounts.ToList();
        }
    }
}
