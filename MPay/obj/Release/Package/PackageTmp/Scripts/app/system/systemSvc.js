
(function () {
    'use strict';
    angular.module('mpayModule').factory('systemSvc', ["$resource", systemSvc])

    function systemSvc($resource) {
        var resource = $resource('/api/System/:recordId', { recordId: '@recordId' });
        return {
            save: function (session) {
                return resource.save(session);
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
            getStudents: function () {
                return $resource('/api/Student/GetStudents/:aa:ab:ac:ad:ae');
                //('/Artisan/GetArtisanBSS/:id:ad:bd:cd:dd', { update: { method: 'PUT' } });
            },
            getStudent: function (recordId) {
                return $resource('/api/Student/Get/:recordId').get({ recordId: recordId });
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