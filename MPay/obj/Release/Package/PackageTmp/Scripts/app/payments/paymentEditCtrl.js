(function () {
    'use strict';
    angular.module('mpayModule').controller('paymentEditCtrl', ["$rootScope", "paymentSvc", "$location", "studentObj", "$state",
                                                                "$uibModal", "$log", 'cfpLoadingBar', paymentEditCtrl]);

    function paymentEditCtrl($rootScope, paymentSvc, $location, studentObj, $state, $uibModal, $log, cfpLoadingBar) {
        var vm = this;
        vm.student = studentObj;
        vm.start = function () {
            cfpLoadingBar.start();
        };
        vm.complete = function () {
            cfpLoadingBar.complete();
        };
        if (vm.student && vm.student.recordID) {
            vm.title = "Edit: " + vm.student.lastName + " " + vm.student.firstName
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "New Student";
        }
     
        vm.reset = function (student) {
            //angular.copy({}, studentForm);
            angular.copy({}, vm.student);
            //vm.student = angular.copy(vm.initial); //[{}];
        }

        vm.save = function (studentForm, student) {
            vm.errors = [];
            if (studentForm.$valid) {
                var student = student;
                studentSvc.save(student)
            .$promise
            .then(function (response) {
                toastr.success("Save successful");
                $state.go("studentList");
                //console.log('success', response)
            })
            .catch(function (response) {
                console.log('failure', response)
            });
            } else {
                toastr.error("Please correct the validation errors");
                // alert("Please correct the validation errors first");
            }
        }

        vm.saveEdit = function (studentForm, student) {
            vm.errors = [];
            if (studentForm.$valid) {
                var student = student;
                studentSvc.saveEdit(student)
            .$promise
            .then(function (response) {
                if(response.Message=="Failed"){
                    toastr.error ("An error occured")
                }
                toastr.success("Edit saved");
                $state.go("studentList");
                //console.log('success', response)
            })
            .catch(function (response) {
                console.log('failure', response)
            });
            } else {
                toastr.error("Please correct the validation errors");
                // alert("Please correct the validation errors first");
            }
        }

        vm.cancel = function () {
            $state.go('studentList');
        }
        vm.invoices = paymentSvc.getInvoices;

        //Date Region
        vm.popup1 = {
            opened: false
        };
        vm.open = function () {
            vm.popup1.opened = true;
        };

        vm.today = function () {
            vm.dt = new Date();
        };

        vm.today();
    };
})()