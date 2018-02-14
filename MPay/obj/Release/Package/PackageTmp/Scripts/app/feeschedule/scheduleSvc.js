(function () {
    'use strict';
    angular.module('mpayModule').factory('scheduleSvc', ["$resource", scheduleSvc])

    function scheduleSvc($resource) {
        var resource = $resource('/api/FeeSchedule/:scheduleId', { recordId: '@scheduleId' });
        return {
            save: function (feeschedule) {
                return $resource('/api/FeeSchedule/Post').save(feeschedule);
            },
            saveEdit: function (feeschedule) {
                return $resource('/api/FeeSchedule/EditItem').save(feeschedule);
            },
            getSchedule: function (scheduleId) {
                return $resource('/api/FeeSchedule/Get/:scheduleId').get({ scheduleId: scheduleId });
            },
            getSchedulesAll: function(){
                return $resource('/api/FeeSchedule/GetSchdedules');
            },
            getSchedules: function () {
                return $resource('/api/FeeSchedule/GetFeeSchdedules/:aa:ab:ac:ad:ae');
            }, //GetSchdedules
            getSchedulesList: function () {
                return $resource('/api/FeeSchedule/GetSchdedules').query();
            },
            deleteSchedule: function (itemId) {
                return $resource('/api/FeeSchedule/Delete/:scheduleId').remove({ scheduleId: scheduleId });
            },
            saveCode: function (codes) {
                return $resource('/api/FeeSchedule/SaveCode').save(codes);
            }
        }
    };
})()