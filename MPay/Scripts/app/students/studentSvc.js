
(function () {
    'use strict';
    angular.module('mpayModule').factory('studentSvc', ["$resource", studentSvc])

    function studentSvc($resource) {
        var resource = $resource('/api/Student/:recordId', { recordId: '@recordId' });
        return {
            save: function (student) {
                return $resource('/api/Student/Post').save(student);
                //return resource.save(student);
            },
            saveEdit: function (student) {
                return $resource('/api/Student/EditStudent').save(student);
            },
            getdept: function () {
                return $resource('/api/Student/GetDepartments').query();
            },
            getstudentstype: function () {
                return $resource('/api/Student/GetStudentType').query();
            },
            getprogtype: function () {
                return $resource('/api/Student/GetPrograms').query();
            },
            getprogLevel: function () {
                return $resource('/api/Student/GetProgramLevel').query();
            },
            getentryMode: function () {
                return $resource('/api/Student/GetEntryMode').query();
            },
            getdisability: function () {
                return $resource('/api/Student/GetDisability').query();
            },
            getStudents: function () {
                return $resource('/api/Student/GetStudents/:aa:ab:ac:ad:ae');
                //('/Artisan/GetArtisanBSS/:id:ad:bd:cd:dd', { update: { method: 'PUT' } });
            },
            getStudent: function (recordId) {
               // return $resource('/api/FeeSchedule/GetSch/:recordId').get({ recordId: recordId });
                return $resource('/api/Student/Get/:recordId').get({ recordId: recordId });
                //('/Artisan/GetArtisanBSS/:id:ad:bd:cd:dd', { update: { method: 'PUT' } });
            },
            getScheduleStudent: function (scheduleId) {
                return $resource('/api/Student/GetStudent/:scheduleId', { scheduleId: '@scheduleId' });
            },
            deleteStudent: function (recordId) {
                return $resource('/api/Student/Delete/:recordId').remove({ recordId: recordId });
            },
            saveCode: function (codes) {
                return $resource('/api/Student/SaveCodeType').save(codes);
            },
            saveAddress: function (address) {
                return $resource('/api/Student/SaveAddress').save(address);
            },
            getAddress: function () {
                return $resource('/api/Student/GetAddressById/:recordId');
            }
        }
    };
})()