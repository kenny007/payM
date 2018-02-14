(function () {
    'use strict';
    angular.module('mpayModule').controller('SessionTermEditCtrl', ["$rootScope", "sessionTermSvc", "$location", "sessionObj", "$state",
                                                                "$uibModal", "uiGridConstants", "$log", SessionTermEditCtrl]);

    function SessionTermEditCtrl($rootScope, sessionTermSvc, $location, sessionObj, $state, $uibModal, $log, uiGridConstant) {
        var vm = this;
        vm.session = sessionObj;
        if (vm.session && vm.session.recordID) {
            vm.title = "Edit: " + vm.session.sessionID + " " + "(" + vm.session.description + ")"
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "New Session";
            vm.subtitle = "Add New Session";
        }

        vm.reset = function (session) {
            //angular.copy({}, sessionForm);
            angular.copy({}, vm.session);
            //vm.session = angular.copy(vm.initial); //[{}];
        }

        vm.saveSession = function (sessionForm, session) {
            vm.errors = [];
            if (sessionForm.$valid) {
                var session = session;
                sessionTermSvc.saveSession(session)
            .$promise
            .then(function (response) {
                toastr.success("Save successful");
                $state.go("sessionTermEdit.list");
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

        vm.saveEditSession = function (sessionForm, session) {
            vm.errors = [];
            if (sessionForm.$valid) {
                var session = session;
                sessionTermSvc.saveEdit(session)
            .$promise
            .then(function (response) {
                toastr.success("Edit saved");
                $state.go("sessionTermEdit.list");
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
            $state.go('sessionTermEdit.list');
        }
      
        $rootScope.$on('programR', function (event, data) {
            vm.getprogtype = sessionTermSvc.getprogtype();
        });

        //Date Processor Region
        vm.popup1 = {
            opened: false
        };

        vm.popup2 = {
            opened: false
        };

        vm.openstartDate = function () {
            vm.popup1.opened = true;
        };

        vm.openendDate = function () {
            vm.popup2.opened = true;
        };

        vm.today = function () {
            if (sessionObj !== null && sessionObj !==undefined) {
           // vm.sessionObj.startDate = new Date();
           // vm.sessionObj.endDate = new Date();
            }
        };

        vm.today();

        vm.dateOptions = {
            dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2030, 5, 22)
            //minDate: new Date(),
            //startingDay: 1
        };

        function disabled(data) {
            var date = data.date,
              mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }


        vm.setDate = function () {
            if (sessionObj !== null && sessionObj !==undefined) {
                var startdate = new Date(sessionObj.startDate);
                var enddate = new Date(sessionObj.endDate);
                vm.session.startDate = startdate;
                vm.session.endDate = enddate;
            }
            // $scope.dt = new Date(year, month, day);
        };

        vm.setDate();

        var itemModalCtrl = function ($window, $uibModalInstance, $log, $timeout, sessionSvc) {
            var vm = this;
            vm.codes = {};

            vm.createprog = function (codes) {
                codes.codeTypeId = "ProgramType";
                sessionSvc.saveCode(codes);
                $uibModalInstance.dismiss('cancel');
                $rootScope.$emit('programR', 'Programs');
            }

            vm.cancel = function (mode) {
                $uibModalInstance.dismiss('cancel');
            };
        };

    };
})()