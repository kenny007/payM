(function (){
    'use strict';
    angular.module('mpayModule').controller('ScholarshipListCtrl', ["$scope", "$state", "$uibModal", "scholarshipSvc", "uiGridConstants", ScholarshipListCtrl]);

    function ScholarshipListCtrl($scope, $state, $uibModal, scholarshipSvc, uiGridConstant) {
        var vm = this;
        vm.title = "Scholarships";
       
        //$scope.aError = false;
        
        vm.querySt = function () {
            scholarshipSvc.getScholarships()
            .$promise
            .then(function (data, headers) {
                if(data.length != 0){
                    toastr.success('Data successfully retrieved');
                    vm.gridOptions.data = data;
                } else {
                    toastr.error('No scholarship found!');
                }
            })
            .catch(function () {

            })
        }

        vm.querySt();

        //paging  
        vm.totalRecordsCount = 0;
        vm.pageSize = 10;
        vm.currentPage = 0;

        vm.pageChanged = function (page) {
            vm.currentPage = page;
        };

        //ngGrid Options
        vm.showMe = function (schorlarshipID) {
            if (schorlarshipID != null && schorlarshipID != "") {
                $state.go('scholarshipEdit.edit', { recordId: schorlarshipID });
            }
        };

        //vm.copyMe = function (entity) {
           
        //};

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
              { displayName: 'ScholarshipID', field: 'schorlarshipID'},
              { displayName: 'Name', field: 'name' },
              { displayName: 'Description', field: 'description' },
              {
                  name: 'EDIT', width: 100,
                  cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.schorlarshipID)">Edit</a>',
                  field: 'schorlarshipID', cellClass: 'grid-align'
              },
               {
                   name: 'COPY', width: 100,
                   cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.copyMe(row.entity)">Copy</a>',
                   field: 'schorlarshipID', cellClass: 'grid-align'
               }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'fee items.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Fee Items List", style: 'headerStyle' },
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

        vm.copyMe = function (entity) {
            var modalInstance = $uibModal.open({
                animation: true,
                backdrop: 'static',
                keyboard: false,
                backdropClick: false,
                templateUrl: '/Scripts/app/scholarship/views/scholarshipCopy.html',
                controller: scholarshipCtrl,
                controllerAs: 'vm',
                resolve: {
                    scholarRef: function () {
                        return entity;
                    }
                }
            });
            modalInstance.result.then(function (codes) {
                vm.selected = codes;
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        };

        var scholarshipCtrl = function ($window, $uibModalInstance, $log, $timeout, scholarshipSvc, scholarRef,uiGridConstants) {
            var vm = this;

            vm.term = {};

            vm.scholarRef = scholarRef;

           

            vm.copyscholar = function (sessiondtlForm, term) {
                if (sessiondtlForm.$valid) {
                    term.parentID = termRef.recordID;
                    $timeout(function () {
                        scholarshipSvc.saveSessionDTL(term)
                        .$promise
                        .then(function (response) {
                            if (response.data != "" && response.data != null && response.data != undefined) {
                                toastr.error(response.data);
                            }
                            else {
                                toastr.success("Save successful");
                                //$uibModalInstance.dismiss('cancel');
                                vm.cancel();
                            }
                        })
                        .catch(function (response) {
                             toastr.error("An error occured");
                         });
                    }, 3000);
                }
                else {
                    toastr.error("Please correct the validation errors");
                }
            }

            vm.cancel = function (mode) {
                $uibModalInstance.dismiss('cancel');
            };

            //Grid section and selection
            vm.gridOptions = {
                rowHeight: 30,
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
                { displayName: 'ItemID', field: 'ItemID', },
                { displayName: 'Value', field: 'Value' },
                {
                    name: 'EDIT', width: 100,
                    cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.schorlarshipID)">Edit</a>',
                    field: 'schorlarshipID', cellClass: 'grid-align'
                }
               ],
                onRegisterApi: function (gridApi) {
                    vm.gridApi = gridApi;
                }
            };

            if (scholarRef.recordID != null && scholarRef.recordID != "") {
                scholarshipSvc.copyScholarship(scholarRef.recordID)
                .$promise
                .then(function (data, headers) {
                    vm.scholarRef = data;
                    vm.gridOptions.data = data.Scholarshipdetials; // Scholarshipdetials = details.ToList()
                })
                .catch(function () {

                })
            }

            if (vm.scholarRef && vm.scholarRef.recordID) {
                vm.title = "Copy Scholarship: " + vm.scholarRef.schorlarshipID;
            }
            else {
                vm.title = "Edit: " + vm.scholarRef.description
            }

        };
    }
})()
