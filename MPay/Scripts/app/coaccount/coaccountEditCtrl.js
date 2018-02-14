
(function () {
    'use strict';
    angular.module('mpayModule').controller('COAccountEditCtrl', ["$rootScope", "$state", "$uibModal", "$log", "coaccountSvc", "coaccountObj", "uiGridConstants", COAccountEditCtrl]);

    function COAccountEditCtrl($rootScope, $state, $uibModal, $log, coaccountSvc, coaccountObj, uiGridConstants) {
        var vm = this;
        vm.coaccount = coaccountObj;

        if (vm.coaccount && vm.coaccount.recordID) {
            vm.title = "Edit: ";
        }
        else {
            vm.title = "Add";
        }
        
       
        vm.reset = function (feeschedule) {
            angular.copy({}, vm.feeschedule);
        }
  
        //
        vm.getLedgerCOA = function (recordID) {
            var recordId = entity.recordID;
            if (recordId != null && recordId != undefined) {
                coaccountSvc.getLedgerCOA(recordId).query({ recordId: recordId },
                      function (data, headers) {
                          if (data.length == 0) {
                              vm.terms = {};
                             // toastr.error("No Terms Created under this Session");
                          }
                          else {
                             // vm.terms = data;
                          }
                      });
            }
            else { }
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

        vm.save = function (coaForm, coaccount) {
            vm.errors = [];
            if (coaForm.$valid) {
            var coaccount = coaccount;
                coaccountSvc.save(coaccount)
            .$promise
            .then(function (response) {
                if (response.data != "" && response.data != null && response.data != undefined) {
                    for (var i = 0; i < response.data.length; i++) {
                        toastr.error(response.data[i]);
                    } 
                }
                else {
                 toastr.success("Save successful");
                 $state.go("coaccountEdit.list");
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

        vm.saveEdit = function (coaForm, coaccount) {
            vm.errors = [];
            if (coaForm.$valid) {
                var coaccount = coaccount;
                coaccountSvc.saveEdit(coaccount)
            .$promise
            .then(function (response) {
                toastr.success("Edit saved");
                $state.go("coaccountEdit.list");
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
            $state.go('coaccountEdit.list');
        }
        vm.fstatereload = function () {
            $state.go('coaccountEdit.list', { itemId: "" });
        }

    };
})()