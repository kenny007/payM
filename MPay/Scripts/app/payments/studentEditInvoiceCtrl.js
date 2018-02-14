(function myfunction() {
    'use strict'
    angular.module('mpayModule').controller('StudentEditInvoiceCtrl', ["$rootScope", "studentSvc", "$location", "studentObj", "$state", "$uibModal", "$log", StudentEditInvoiceCtrl]);

    function StudentEditInvoiceCtrl($rootScope, studentSvc, $location, studentObj,
        $state,  $uibModal, $log) {
        var vm = this;
        vm.student = studentObj;
    }
})()


