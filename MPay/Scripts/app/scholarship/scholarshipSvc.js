(function () {
    'use strict';
    angular.module('mpayModule').factory('scholarshipSvc', ["$resource", scholarshipSvc])

    function scholarshipSvc($resource) {
        return {
            save: function (scholarship) {
                return $resource('/api/Scholarship/Post').save(scholarship);
            },
            saveEdit: function (scholarship) {
                return $resource('/api/Scholarship/EditScholarship').save(scholarship);
            },
            getScholarship: function (recordId) {
                return $resource('/api/Scholarship/GetScholarship/:recordId').get({ recordId: recordId });//.get({ recordId: recordId });
            },
            copyScholarship: function (recordId) {
                return $resource('/api/Scholarship/CopyScholarship/:recordId').get({ recordId: recordId });//.get({ recordId: recordId });
            },
            getScholarships: function () {
                return $resource('/api/Scholarship/GetScholarships').query(); //GetScholarships
            },
            deleteScholarship: function (scholarshipId) {
                return $resource('/api/Scholarship/Delete/:scholarshipId').remove({ scholarshipId: scholarshipId });
            }
        }
    };
})()