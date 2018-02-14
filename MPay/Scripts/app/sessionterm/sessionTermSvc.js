
(function () {
    'use strict';
    angular.module('mpayModule').factory('sessionTermSvc', ["$resource", sessionTermSvc])

    function sessionTermSvc($resource) {
        var resource = $resource('/api/SessionTerm/:recordId', { recordId: '@recordId' });
        return {
            saveSession: function (session) {
                return $resource('/api/SessionTerm/Post').save(session);
            },
            saveEdit: function (session) {
                return $resource('/api/SessionTerm/EditSession').save(session);
            },
            getSessions: function () {
                return $resource('/api/SessionTerm/SessionsList').query();
            },
            getSessionTerms: function (recordId) {
                return $resource('/api/SessionTerm/GetSessionDet/:recordId').query();
            },
            getSession: function (recordId) {
                return $resource('/api/SessionTerm/Get/:recordId').get({ recordId: recordId });
            },
            deleteSessionTerm: function (recordId) {
                return $resource('/api/SessionTerm/Delete/:recordId').remove({ recordId: recordId });
            },
            saveCode: function (codes) {
                return $resource('/api/SessionTerm/SaveCodeType').save(codes);
            },
            saveAddress: function (address) {
                return $resource('/api/SessionTerm/SaveAddress').save(address);
            },
            getAddress: function () {
                return $resource('/api/SessionTerm/GetAddressById/:recordId');
            },
            saveSessionDTL: function (term) {
                return $resource('/api/SessionTerm/PostTerm').save(term);
            },
            saveSessionDTLEdit: function (term) {
                return $resource('/api/SessionTerm/EditTerm').save(term);
            }
        }
    };
})()