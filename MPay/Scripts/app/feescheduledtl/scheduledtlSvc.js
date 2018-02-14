(function () {
    'use strict';
    angular.module('mpayModule').factory('scheduledtlSvc', ["$resource", scheduledtlSvc])

    function scheduledtlSvc($resource) {
        //var resource = $resource('/api/FeeScheduleDtl/:scheduleId', { recordId: '@recordId' });
        return {
            save: function (feescheduledtl) {
                return $resource('/api/FeeScheduleDtl/Post').save(feescheduledtl);
            },
            saveEdit: function (feescheduledtl) {
                return $resource('/api/FeeScheduleDtl/EditScheduleDtl').save(feescheduledtl);
            },
            getScheduleDtl: function (recordId) {
                return $resource('/api/FeeScheduleDtl/Get/:recordId').get({ recordId: recordId });
            },        
            getSchedulesDtl: function (recordId) {
                return $resource('/api/FeeScheduleDtl/GetFeeScheduleDtl/:recordId', { recordId: '@recordId' });
            },
            getScheduleDtls: function (scheduleId) {
                return $resource('/api/FeeScheduleDtl/GetFeeScheduleDtl/:scheduleId', { scheduleId: '@scheduleId' });
            },
            deleteSchedule: function (itemId) {
                return $resource('/api/FeeScheduleDtl/Delete/:recordId').remove({ recordId: recordId });
            },
            saveCode: function (codes) {
                return $resource('/api/FeeScheduleDtl/SaveCode').save(codes);
            },
            getScheduleR: function (recordId) {
            return $resource('/api/FeeSchedule/GetSch/:recordId').get({ recordId: recordId });
            },
            getInventory: function () {
                return $resource('/api/Inventory/ItemsList').query();
            }
        }
    };
})()