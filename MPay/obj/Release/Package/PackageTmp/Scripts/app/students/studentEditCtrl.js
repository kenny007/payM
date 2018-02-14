(function () {
    'use strict';
    angular.module('mpayModule').controller('StudentEditCtrl', ["$rootScope", "studentSvc", "scheduleSvc", "$location", "studentObj", "$state",
                                                                "$uibModal","$log",'cfpLoadingBar', StudentEditCtrl]);

    function StudentEditCtrl($rootScope, studentSvc, scheduleSvc, $location, studentObj, $state, $uibModal, $log, cfpLoadingBar) {
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
                    backdrop: 'static',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/programs.html',
                    controller: itemModalCtrl,
                    controllerAs: 'vm',
                    resolve: {
                        codedata: function () {
                            return angular.copy({});
                        }
                    }
                });
                modalInstance.result.then(function (codes) {
                    vm.selected = codes;
                }, function () {
                    //toastr.success("Program successfully added");
                    //$log.info('Modal dismissed at: ' + new Date());
                    //$rootScope.$emit('programR', 'I\'ll never join you');
                });

            }
            else if (programType === -2) {
                // $state.go('studentEdit.programModal');
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/departments.html',
                    controller: itemModalCtrl,
                    controllerAs: 'vm',
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
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/studenttypes.html',
                    controller: itemModalCtrl,
                    controllerAs: 'vm',
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
                    backdrop: 'static',
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/levels.html',
                    controller: itemModalCtrl,
                    controllerAs: 'vm',
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

        vm.departments = studentSvc.getdept();
        vm.getstudtype = studentSvc.getstudentstype();
        vm.getprogtype = studentSvc.getprogtype();
        vm.levels = studentSvc.getprogLevel();
        vm.entrymodes = studentSvc.getentryMode();
        vm.studentsList = studentSvc.getStudents();
        vm.schedules = scheduleSvc.getSchedulesList();
        vm.disability = studentSvc.getdisability();

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
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = vm.formats[0];
        //vm.dateOptions = { //--> DATE FORMAT
        //    changeYear: true,
        //    changeMonth: true,
        //    yearRange: '2005:2030',
        //    dateFormat: vm.format
        //};

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2030, 1, 1),
            minDate: new Date(1960, 1, 1),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
        vm.setDate = function () {
            if (studentObj !== null && studentObj !== undefined) {
                var stringDate = studentObj.admissionDate;
                var date = new Date(stringDate);
                vm.student.admissionDate = date;
            }
           // $scope.dt = new Date(year, month, day);
        };
        vm.setDate();
        vm.today();

        var itemModalCtrl = function ($window, $uibModalInstance, $log, $timeout, studentSvc) {
            var vm = this;
            vm.codes = {};

            vm.createprog = function (codes) {
                codes.codeTypeId = "ProgramType";
                $timeout(function () {
                    studentSvc.saveCode(codes)
                    .$promise
                    .then(function (response) {
                        $rootScope.$emit('programR', 'Programs');
                        $uibModalInstance.dismiss('cancel');
                        toastr.success("Program Type Created");
                    })
                    .catch(function (response) {
                        console.log('failure', response)
                    });
                }, 3000)            
               
            }

            vm.createdept = function (codes) {
                codes.codeTypeId = "Departments";             
                $timeout(function () {
                    studentSvc.saveCode(codes)
                    .$promise
                    .then(function (response) {
                        $rootScope.$emit('departmentR', 'Departments');
                        $uibModalInstance.dismiss('cancel');
                        toastr.success("Department Created");
                    })
                    .catch(function (response) {
                        console.log('failure', response)
                    });
                }, 3000)              
            }

            vm.createsttype = function (codes) {
                codes.codeTypeId = "StudentType";
                $timeout(function () {
                    studentSvc.saveCode(codes)
                    .$promise
                    .then(function (response) {
                        $rootScope.$emit('studentR', 'StudentType');
                        $uibModalInstance.dismiss('cancel');
                        toastr.success("Student Type Created");
                    })
                    .catch(function (response) {
                        console.log('failure', response)
                    });
                }, 3000)
            }

            vm.createlevel = function (codes) {
                codes.codeTypeId = "ProgramLevel";
                $timeout(function () {
                    studentSvc.saveCode(codes)
                    .$promise
                    .then(function (response) {
                        $rootScope.$emit('levelR', 'ProgramLevel');
                        $uibModalInstance.dismiss('cancel');
                        toastr.success("Program Level Created");
                    })
                    .catch(function (response) {
                        console.log('failure', response)
                    });
                }, 3000)           
            }

            vm.cancel = function (mode) {
                $uibModalInstance.dismiss('cancel');
            };
        };      
    };
})()