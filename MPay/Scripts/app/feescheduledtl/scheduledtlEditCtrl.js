
(function () {
    'use strict';
    angular.module('mpayModule').controller('FeeScheduleDtlCtrl', ["$rootScope", "$scope","$mdDialog","uiGridConstants", "scheduledtlSvc", "scheduledtlObj", "scheduleditObj", "$state",
                                                                "$uibModal", "$log", FeeScheduleDtlCtrl]);

    function FeeScheduleDtlCtrl($rootScope,$scope,$mdDialog,uiGridConstants, scheduledtlSvc, scheduledtlObj,scheduleditObj, $state, $uibModal, $log) {
        var vm = this;
        vm.feeschedule = scheduleditObj;
        vm.feescheduledtl = scheduledtlObj;
        if (vm.feeschedule && vm.feeschedule.scheduleID) {
            vm.title = "Schedule Description: " + vm.feeschedule.description + " - " + vm.feeschedule.scheduleID;
            vm.name = scheduleditObj.scheduleID;
            vm.description = scheduleditObj.description;
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "Schedule Details";
            vm.subtitle = "Add Fee Schedule Details"
        }

        vm.reset = function (feescheduledtl) {
            //angular.copy({}, studentForm);
            angular.copy({}, vm.feescheduledtl);
        }
        $scope.customFullscreen = false;
        vm.addDetail = function (ev,feeschdet) {
              $mdDialog.show({
              controller: detailModalCtrl,
              controllerAs: 'ctrl',
              bindToController: true,
              templateUrl: '/Scripts/app/feescheduledtl/views/scheduledtleditPartialView.html',
              parent: angular.element(document.body),
              targetEvent: ev,
              locals: { detailHdr: vm.feeschedule, feescheduledtl: feeschdet },
              clickOutsideToClose: false
            })
            .then(function () {
                $scope.status = 'You saved the data.';
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
            
  };

        $rootScope.$on('detailR', function (event, data) {
            vm.querySD = vm.querySD(scheduleditObj.recordID);
        });

        vm.querySD = function (recordId) {
            // var offset = (vm.pageSize) * (vm.currentPage - 1); //scheduledtlSvc
            scheduledtlSvc.getSchedulesDtl(recordId).query({ recordId: recordId },
                function (data, headers) { //getSchedulesDtl
                    if (data.length == 0) {
                        toastr.error("There are no items yet in the schedule");
                    }
                    else {
                        vm.gridOptions.data = data;
                        toastr.success('Data successfully retrieved');
                    }
                });
        }

        vm.querySD(scheduleditObj.recordID);

        vm.gridOptions = {};
        vm.gridOptions = {
            rowHeight: 35,
            paginationPageSizes: [6, 12, 18],
            paginationPageSize: 6,
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
              { displayName: 'Remarks', field: 'remarks' },
              { displayName: 'FeeAmount',aggregationType: uiGridConstants.aggregationTypes.sum, field: 'feeAmount', cellFilter: 'currency:"₦" : 2' },
              { displayName: 'FeeFactor', field: 'feeFactor' },
              {
                   name: 'EDIT', width: 100, cellClass: 'grid-align',
                   cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.addDetail($event,row.entity)">Edit</a>',
                   field: 'recordID'
              }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'feeschedule.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Fee Schedule List", style: 'headerStyle' },
            exporterPdfFooter: function (currentPage, pageCount) {
                return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
            },
            exporterPdfCustomFormatter: function (docDefinition) {
                docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
                docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
                return docDefinition;
            },
            exporterPdfOrientation: 'landscape',
            exporterPdfPageSize: 'LETTER',
            exporterPdfMaxGridWidth: 500,
            exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location"))
        };

        var detailModalCtrl = function ($window, $mdDialog, $scope, $q, $log, $timeout, scheduledtlSvc, detailHdr, feescheduledtl) {
            var ctrl = this;
            ctrl.feescheduledtl = {};
            ctrl.detailHdr = detailHdr;
            $scope.feescheduledtl = feescheduledtl;
            if (feescheduledtl != null && feescheduledtl.recordID !='') {
                $scope.title = "Edit";
            }
            else {
                $scope.title = "Add";
            }
            //ctrl.selectedItem = feescheduledtl.itemName;
           
            ctrl.simulateQuery = false;
            ctrl.isDisabled = false;
            ctrl.noCache = false;
            ctrl.itemz = loadAll();
            ctrl.querySearch = querySearch;
            ctrl.selectedItemChange = selectedItemChange;
            ctrl.searchTextChange = searchTextChange;
            ctrl.newState = newState;

            ctrl.save = function (feescheduledtlForm, obj, feescheduledtl) {
                if (feescheduledtlForm.$valid) {
                    feescheduledtl.parentId = ctrl.detailHdr.recordID;
                    feescheduledtl.itemID = obj.itemID; feescheduledtl.remarks = obj.itemName;
                    scheduledtlSvc.save(feescheduledtl)
                .$promise
                .then(function (response) {
                    if (response.data != "" && response.data != null && response.data != undefined) {
                        //for (var i = 0; i < response.data.length; i++) {
                            toastr.error(response.data);
                        //}
                      }
                    else {
                        toastr.success("Save successful");
                        ctrl.cancel();
                        $rootScope.$emit('detailR', 'ScheduleDetails');
                        //$state.go("scheduleEdit.list");
                    }
                })
                .catch(function (response) {
                    toastr.error("An error occured");
                });
                } else {
                    toastr.error("Please correct the validation errors");
                }
            }

            ctrl.saveEdit = function (feescheduledtlForm, feescheduledtl) {
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