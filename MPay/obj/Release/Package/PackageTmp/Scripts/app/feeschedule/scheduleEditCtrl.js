
(function () {
    'use strict';
    angular.module('mpayModule').controller('FeeScheduleCtrl', ["$rootScope", "scheduleSvc", "scheduleObj", "$state",
                                                                "$uibModal", "$log", FeeScheduleCtrl]);

    function FeeScheduleCtrl($rootScope, scheduleSvc, scheduleObj, $state, $uibModal, $log) {
        var vm = this;
        vm.feeschedule = scheduleObj;
        if (vm.feeschedule && vm.feeschedule.scheduleID) {
            vm.title = "Edit: " + vm.feeschedule.description + " - " + vm.feeschedule.scheduleID
            vm.subtitle= "Edit Fee Schedule"
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "New Fee Schedule";
            vm.subtitle = "Add Fee Schedule"
        }

        vm.reset = function (feeschedule) {
            //angular.copy({}, studentForm);
            angular.copy({}, vm.feeschedule);
        }

        vm.activateTForm = function (itemTypeID) {
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

        vm.save = function (scheduleForm, feeschedule) {
            vm.errors = [];
            if (scheduleForm.$valid) {
                var feeschedule = feeschedule;
                scheduleSvc.save(feeschedule)
            .$promise
            .then(function (response) {
                if (response.data != "" && response.data != null && response.data !=undefined) {
                    for (var i = 0; i < response.data.length; i++) {
                        toastr.error(response.data[i]);
                    }                 
                    //vm.errors = response.data;
                }
                else {
                 toastr.success("Save successful");
                 $state.go("scheduleEdit.list");
                }
               
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

        vm.saveEdit = function (scheduleForm, feeschedule) {
            vm.errors = [];
            if (scheduleForm.$valid) {
                var feeschedule = feeschedule;
                scheduleSvc.saveEdit(feeschedule)
            .$promise
            .then(function (response) {
                toastr.success("Edit saved");
                $state.go("scheduleEdit.list");
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
            $state.go('scheduleEdit.list');
        }
        vm.fstatereload = function () {
            $state.go('scheduleEdit.list', { itemId: "" });
        }
    };
})()