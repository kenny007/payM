(function () {
    'use strict';
    angular.module('mpayModule').factory('feeitemSvc', ["$resource", feeitemSvc])

    function feeitemSvc($resource) {
        var resource = $resource('/api/Inventory/:itemId', { recordId: '@itemId' });
        return {
            save: function (feeitem) {
                return $resource('/api/Inventory/Post').save(feeitem);
            },
            saveEdit: function (student) {
                return $resource('/api/Inventory/EditItem').save(student);
            },
            getItem: function (itemId) {
                return $resource('/api/Inventory/Get/:itemId').get({ itemId: itemId });
            },
            getItems: function () {
                return $resource('/api/Inventory/GetFeeItems/:aa:ab:ac:ad:ae');
            },
            getAccounts: function () {
                return $resource('/api/Inventory/AccountsList').query();
            },
            deleteItem: function (itemId) {
                return $resource('/api/Inventory/Delete/:itemId').remove({ itemId: itemId });
            },
            saveCode: function (codes) {
                return $resource('/api/Inventory/SaveCode').save(codes);
            },
            getLedgerCOAs: function () {
                return $resource('/api/Inventory/GetAccounts').query();
            }, //GetInvItemType
            getInvItemType: function () {
                return $resource('/api/Inventory/GetInvItemType').query();
            },
        }
    };
})()