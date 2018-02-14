
(function () {
    'use strict';
    angular.module('mpayModule').controller('scholarshipEditCtrl', ["$rootScope", "$scope", "$mdDialog", "scholarshipSvc", "scheduleSvc", "scholarshipObj", "uiGridConstants",
                                                                      "$state","$uibModal", "$log", scholarshipEditCtrl]);

    function scholarshipEditCtrl($rootScope, $scope, $mdDialog, scholarshipSvc, scheduleSvc, scholarshipObj, uiGridConstant, $state, $uibModal, $log) {
        var vm = this;
        vm.showGrid = true;
        var scholarshipdtl = [];
        vm.scholarship = {};
        //vm.gridOptions = {};
        vm.scholarship = scholarshipObj;
        vm.partial = false;
        if (vm.scholarship && vm.scholarship.schorlarshipID) {
            vm.title = "Edit: " + vm.scholarship.name + " - " + vm.scholarship.description
            vm.subtitle = "Edit Scholarship";
        }
        else {
            vm.title = "New Scholarship Type";
            vm.subtitle = "Add Scholarship"
        }

        vm.reset = function (scholarship) {
            //angular.copy({}, studentForm);
            angular.copy({}, vm.scholarship);
            //vm.student = angular.copy(vm.initial); //[{}];
        }

        $scope.onChange = function (ev,partial) {
            if (partial === true) {
                $mdDialog.show({
                    controller: scholarModalCtrl,
                    controllerAs: 'ctrl',
                    bindToController: true,
                    templateUrl: '/Scripts/app/scholarship/views/scholdtleditPV.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    locals: { },
                    clickOutsideToClose: false
                })
             .then(function () {
                 $scope.status = 'You saved the data.';
             }, function () {
                 $scope.status = 'You cancelled the dialog.';
             });
            }
        }

        vm.save = function (scholarshipForm, scholarship) {
            vm.errors = [];
            if (scholarshipForm.$valid) {
                var scholarship = scholarship;
                scholarship.partial = vm.partial;
                scholarship.scholarshipdtl = scholarshipdtl;
                scholarshipSvc.save(scholarship)
            .$promise
            .then(function (response) {
                if (response.Message != "success" && response.Message != null) {
                    toastr.error(response.Message);
                }
                else {
                 toastr.success("Save successful");
                 $state.go("scholarshipEdit.list");
                }             
                //console.log('success', response)
            })
            .catch(function (response) {
                console.log('failure', response)
            });
            } else {
                toastr.error("Please correct the validation errors");
            }
        }

        vm.saveEdit = function (scholarshipForm, scholarship) {
            vm.errors = [];
            if (scholarshipForm.$valid) {
                var scholarship = scholarship;
                scholarship.partial = vm.partial;
                scholarshipSvc.saveEdit(scholarship)
            .$promise
            .then(function (response) {
                toastr.success("Edit saved");
                $state.go("scholarshipEdit.list");
            })
            .catch(function (response) {
                console.log('failure', response)
            });
            } else {
                toastr.error("Please correct the validation errors");
            }
        }

        vm.cancel = function () {
            $state.go('scholarshipEdit.list');
        }

        $rootScope.$on('scholarshipDet', function (event, data) {
            scholarshipdtl.push(angular.copy(data));
            vm.gridOptions.data = scholarshipdtl;
            gridPopulate();
        });

        function gridPopulate(){
            if (vm.gridOptions.data !=="" && vm.gridOptions.data !== null) {
                vm.showGrid = false;
            }
        }

        vm.gridOptions = {
            rowHeight: 35,
            paginationPageSizes: [10, 20, 30],
            paginationPageSize: 10,
            enableFiltering: true,
            enableSorting: true,
            enablePagination: true,
            enablePaginationControls: true,
            resizable: true,
            enableColumnResizing: true,
            enableFiltering: true,
            enableGridMenu: true,
            showGridFooter: true,
            showColumnFooter: true,
            columnDefs: [
              { displayName: 'ItemID', field: 'itemID', width: 100 },
              { displayName: 'Value', field: 'value' }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
        };

        var scholarModalCtrl = function ($window, $mdDialog, $scope, $q, $log, $timeout, scheduledtlSvc) {
            var ctrl = this;
           // var scholarshipdtlinit = [];
            ctrl.scholarshipdtl = {};
            //ctrl.detailHdr = detailHdr;
            //$scope.scholarshipdtl = scholarshipdtl;
            //if (scholarshipdtl != null && scholarshipdtl.recordID !='') {
            //    $scope.title = "Edit";
            //}
            //else {
                $scope.title = "Add";
            //}
            //ctrl.selectedItem = feescheduledtl.itemName;
           
            ctrl.simulateQuery = false;
            ctrl.isDisabled = false;
            ctrl.selectedItem = '';
            ctrl.noCache = false;
            ctrl.itemz = loadAll();
            ctrl.querySearch = querySearch;
            ctrl.selectedItemChange = selectedItemChange;
            ctrl.searchTextChange = searchTextChange;
            ctrl.newState = newState;

            ctrl.save = function (scholarshipdtlForm, obj, scholarshipdtl) {
                if (scholarshipdtlForm.$valid) {
                    scholarshipdtl.itemID = obj.itemID;
                    scholarshipdtl.itemValue = scholarshipdtl.value;
                    //scholarshipdtlinit.push(scholarshipdtl);  
                    $rootScope.$emit('scholarshipDet', scholarshipdtl);                   
                   // ctrl.scholarshipdtl = {};
                    toastr.success("Item added");
                    ctrl.selectedItem = '';
                }
            }
            ctrl.saveEdit = function (scholarshipdtlForm, feescheduledtl) {
                if (feescheduledtlForm.$valid) {
                    feescheduledtl.parentId = ctrl.detailHdr.recordID;
                    feescheduledtl.itemID = feescheduledtl.itemID;
                    //feescheduledtl.remarks = obj.itemName;
                    scheduledtlSvc.saveEdit(feescheduledtl)
                .$promise
                .then(function (response) {
                    toastr.success("Edit saved");
                    ctrl.cancel();
                    $rootScope.$emit('detailR', 'ScheduleDetails');
                    //console.log('success', response)
                })
                .catch(function (response) {
                    toastr.error("An error occured");
                });
                } else {
                    toastr.error("Please correct the validation errors");
                    // alert("Please correct the validation errors first");
                }
            }

            ctrl.cancel = function ($event) {
                $mdDialog.cancel();
            };

            function newState(fitem) {
                alert("Sorry! You'll need to create a Constitution for " + fitem + " first!");
            }

            function querySearch(query) {
                var results = query ? ctrl.itemz.filter(createFilterFor(query)) : ctrl.itemz,
                    deferred;
                if (ctrl.simulateQuery) {
                    deferred = $q.defer();
                    $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                    return deferred.promise;
                } else {
                    return results;
                }
            }

            function searchTextChange(text) {
                $log.info('Text changed to ' + text);
            }

            function selectedItemChange(item) {
                $log.info('Item changed to ' + JSON.stringify(item));
            }

            function loadAll() {
                var allItems = scheduledtlSvc.getInventory();
                return allItems;
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);

                return function filterFn(fitem) {
                    return (fitem);
                };

            }

            /**
             * Build `states` list of key/value pairs
             */
        
            if (ctrl.feeschedule && ctrl.feeschedule.scheduleID) {
                vm.title = "Edit: " + vm.feeschedule.description + " - " + vm.feeschedule.scheduleID
                vm.subtitle = "Edit Fee Schedule Details"
                vm.name = scheduleditObj.scheduleID;
                vm.description = scheduleditObj.description;
                vm.hideEdit = false;
                vm.hideNew = true;
            }
            else {
                ctrl.title = "Schedule Details";
                ctrl.subtitle = "Add Fee Schedule Details"
            }
        };

    };
})()