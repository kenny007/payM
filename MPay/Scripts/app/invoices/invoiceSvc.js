(function () {
    'use strict';
    angular.module('mpayModule').factory('invoiceSvc', ["$resource", invoiceSvc])

    function invoiceSvc($resource) {
        var resource = $resource('/api/FeeSchedule/:scheduleId', { recordId: '@scheduleId' });
        return {
            save: function (feeschedule) {
                return $resource('/api/FeeSchedule/Post').save(feeschedule);
            },
            saveEdit: function (feeschedule) {
                return $resource('/api/FeeSchedule/EditItem').save(feeschedule);
            },
            deleteSchedule: function (itemId) {
                return $resource('/api/FeeSchedule/Delete/:scheduleId').remove({ scheduleId: scheduleId });
            },
            saveCode: function (codes) {
                return $resource('/api/FeeSchedule/SaveCode').save(codes);
            },
            getSessions: function () {
                return $resource('/api/SessionTerm/SessionsList').query();
            },
            getSessionTerms: function (sessionId) {
                return $resource('/api/SessionTerm/GetSessionDet/:sessionId', { sessionId: '@sessionId' });
            },
            processInvoice: function (invoice) {
                return $resource('/api/Invoice/ProcessInvoice').save(invoice);
            }

        }
    };
})()