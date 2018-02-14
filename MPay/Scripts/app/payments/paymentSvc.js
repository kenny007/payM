
(function () {
    'use strict';
    angular.module('mpayModule').factory('paymentSvc', ["$resource", paymentSvc])

    function paymentSvc($resource) {
        var resource = $resource('/api/Student/:recordId', { recordId: '@recordId' });
        return {
            save: function (student) {
                return $resource('/api/Student/Post').save(student);
                //return resource.save(student);
            },
            saveEdit: function (student) {
                return $resource('/api/Student/EditStudent').save(student);
            },
            getInvoices: function () {
                return $resource('/api/Invoice/LoadInvoice').query();
            },        
            getInvoice: function (recordId) {
                return $resource('/api/Student/Get/:recordId').get({ recordId: recordId });
            },
            getScheduleStudent: function (scheduleId) {
                return $resource('/api/Student/GetStudent/:scheduleId', { scheduleId: '@scheduleId' });
            },
            deleteStudent: function (recordId) {
                return $resource('/api/Student/Delete/:recordId').remove({ recordId: recordId });
            },
            getAddress: function () {
                return $resource('/api/Student/GetAddressById/:recordId');
            }
        }
    };
})()