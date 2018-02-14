
(function () {
    'use strict';
    angular.module('mpayModule').controller('FeeItemEditCtrl', ["$rootScope", "feeitemSvc","inventoryObj", "$state", 
                                                                "$uibModal", "$log", FeeItemEditCtrl]);

    function FeeItemEditCtrl($rootScope, feeitemSvc, inventoryObj, $state, $uibModal, $log) {
        var vm = this;
        vm.feeitem = inventoryObj;
        if (vm.feeitem && vm.feeitem.itemID) {
            vm.title = "Edit: " + vm.feeitem.itemName + " - " + vm.feeitem.itemID
            vm.subtitle= "Edit Receivable Item"
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "New Fee Item";
            vm.subtitle = "Add Receivable Item";
        }

        vm.glItems = feeitemSvc.getLedgerCOAs();
        vm.getitemtypes = feeitemSvc.getInvItemType();


        vm.reset = function (feeitem) {
            //angular.copy({}, studentForm);
            angular.copy({}, vm.feeitem);
            //vm.student = angular.copy(vm.initial); //[{}];
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

        vm.save = function (inventoryForm, feeitem) {
            vm.errors = [];
            if (inventoryForm.$valid) {
                var feeitem = feeitem;
                feeitemSvc.save(feeitem)
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
                 $state.go("inventoryEdit.list");
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

        vm.saveEdit = function (inventoryForm, feeitem) {
            vm.errors = [];
            if (inventoryForm.$valid) {
                var feeitem = feeitem;
                feeitemSvc.saveEdit(feeitem)
            .$promise
            .then(function (response) {
                toastr.success("Edit saved");
                $state.go("inventoryEdit.list");
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
            $state.go('inventoryEdit.list');
        }
        vm.fstatereload = function () {
            $state.go('inventoryEdit.item', { itemId: "" });
        }
    };
})()