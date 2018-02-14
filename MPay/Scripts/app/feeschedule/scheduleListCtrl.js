(function (){
    'use strict';
    angular.module('mpayModule').controller('FeeScheduleListCtrl', ["$scope", "$state", "scheduleSvc", "uiGridConstants", FeeScheduleListCtrl]);

    function FeeScheduleListCtrl($scope, $state, scheduleSvc, uiGridConstant) {
        var vm = this;
        vm.querySt = function () {
            // var offset = (vm.pageSize) * (vm.currentPage - 1);
            $scope.$watchCollection('[search.mat, search.fac, search.dept]',
                function (newValue, oldValue) {
                    scheduleSvc.getSchedules().query({
                        mat: '',
                        fac: 1,
                        dept: 2,
                        page: vm.currentPage,
                        pageSize: vm.pageSize
                    },
                function (data, headers) {
                    if (data == 0) {
                        vm.items = [];
                        vm.totalRecordsCount = 0;
                        vm.amessage = "Sorry we don't have any record matching your search";
                        vm.aError = true;
                    }
                    else {
                        vm.gridOptions.data = data;
                        toastr.success('Data successfully retrieved');
                        var paginationHeader = angular.fromJson(headers("X-Pagination"));
                        //   console.log(paginationHeader);
                        vm.totalRecordsCount = paginationHeader.TotalCount;
                        vm.aError = false;
                    }
                });
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
        vm.showMe = function (scheduleID) {
            if (scheduleID != null && scheduleID != "") {
                $state.go('scheduleEdit.feeitem', { scheduleId: scheduleID });
            }
        };

        vm.scheduleDetails = function (entity) {
            if (entity.recordID != null && entity.recordID != "") {
                $state.go('scheduleEditdetails', { recordId: entity.recordID });
            }
        };

        //vm.gridOptions = {};
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
              {
                  displayName: 'ScheduleID', field: 'scheduleID', 
                  cellTemplate: '<a class="" ng-click="grid.appScope.vm.scheduleDetails(row.entity)">{{grid.getCellValue(row, col)}}</a>',
                  width: 100, cellClass: 'grid-align'
              },
              { displayName: 'Description', field: 'description' },
              { displayName: 'Remarks', field: 'remarks' },
              {
                  name: 'EDIT', width: 100,
                  cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.scheduleID)">Edit</a>',
                  field: 'scheduleID', cellClass: 'grid-align'
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
    }
})()
