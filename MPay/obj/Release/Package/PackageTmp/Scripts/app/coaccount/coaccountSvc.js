(function () {
    'use strict';
    angular.module('mpayModule').factory('coaccountSvc', ["$resource", coaccountSvc])

    function coaccountSvc($resource) {
        var resource = $resource('/api/Inventory/:recordId', { recordId: '@recordId' });
        return {
            save: function (coaccount) {
                return $resource('/api/Inventory/PostAccount').save(coaccount);
            },
            saveEdit: function (coaccount) {
                return $resource('/api/Inventory/EditAccount').save(coaccount);
            },
            getCOA: function (recordId) {
                return $resource('/api/Inventory/GetCOA/:recordId').get({ recordId: recordId });;
            },
            getLedgerCOA: function (recordId) {
                return $resource('/api/Inventory/GetAccount/:recordId').get({ recordId: recordId });
            },
            getLedgerCOAs: function () {
                return $resource('/api/Inventory/GetAccounts').query();
            }
        }
    };
})()