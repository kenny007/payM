(function () {
    'use strict';
    angular.module('mpayModule').controller('systemEditCtrl', ["$rootScope", "systemSvc", "$location", "studentObj", "$state",
                                                                "$uibModal","$log", systemEditCtrl]);

    function systemEditCtrl($rootScope, systemSvc, $location, studentObj, $state, $uibModal,$log) {
        var vm = this;
        vm.student = studentObj;
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

        vm.activateDForm = function (programType) {
            if (programType === -1) {
                // $state.go('studentEdit.programModal');
                var modalInstance = $uibModal.open({
                    animation: true,
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/programs.html',
                    controller: itemModalCtrl,
                    resolve: {
                        codedata: function () {
                            return angular.copy({});
                        }
                    }
                });
                modalInstance.result.then(function (codes) {
                    vm.selected = codes;
                }, function () {
                    toastr.success("Program successfully added");
                    $log.info('Modal dismissed at: ' + new Date());
                    vm.$emit('programR', 'I\'ll never join you');
                });

            }
            else if (programType === -2) {
                // $state.go('studentEdit.programModal');
                var modalInstance = $uibModal.open({
                    animation: true,
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/departments.html',
                    controller: itemModalCtrl,
                    resolve: {
                        codedata: function () {
                            return angular.copy({});
                        }
                    }
                });
            }
            else if (programType === -3) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/studenttypes.html',
                    controller: itemModalCtrl,
                    resolve: {
                        codedata: function () {
                            return angular.copy({});
                        }
                    }
                });
            }
            else if (programType === -4) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/levels.html',
                    controller: itemModalCtrl,
                    resolve: {
                        codedata: function () {
                            return angular.copy({});
                        }
                    }
                });
            }
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

        vm.departments = studentSvc.getdept();
        vm.getstudtype = studentSvc.getstudentstype();
        vm.getprogtype = studentSvc.getprogtype();
        vm.levels = studentSvc.getprogLevel();
        vm.studentsList = studentSvc.getStudents();

        $rootScope.$on('programR', function (event, data) {
            vm.getprogtype = studentSvc.getprogtype();
        });
        $rootScope.$on('departmentR', function (event, data) {
            vm.departments = studentSvc.getdept();
        });
        $rootScope.$on('studentR', function (event, data) {
            vm.getstudtype = studentSvc.getstudentstype();
        });
        $rootScope.$on('levelR', function (event, data) {
            vm.levels = studentSvc.getprogLevel();
        });

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

        var itemModalCtrl = function ($window, $uibModalInstance, $log, $timeout, studentSvc) {
            var vm = this;
            vm.codes = {};

            vm.createprog = function (codes) {
                codes.codeTypeId = "ProgramType";
                studentSvc.saveCode(codes);
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('programR', 'Programs');
            }

            vm.createdept = function (codes) {
                codes.codeTypeId = "Departments";
                studentSvc.saveCode(codes);
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('departmentR', 'Departments');
            }

            vm.createsttype = function (codes) {
                codes.codeTypeId = "StudentType";
                studentSvc.saveCode(codes); 
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('studentR', 'StudentType');
            }

            vm.createlevel = function (codes) {
                codes.codeTypeId = "ProgramLevel";
                studentSvc.saveCode(codes);
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('levelR', 'ProgramLevel');
            }

            vm.cancel = function (mode) {
                $uibModalInstance.dismiss('cancel');
            };
        };      
    };
})()