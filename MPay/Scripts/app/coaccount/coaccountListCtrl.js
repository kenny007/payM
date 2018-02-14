(function (){
    'use strict';
    angular.module('mpayModule').controller('COAccountListCtrl', ["$scope", "$state", "coaccountSvc", "uiGridConstants", COAccountListCtrl]);

    function COAccountListCtrl($scope, $state, coaccountSvc, uiGridConstant) {
        var vm = this;
        vm.queryCOAs = function () {
            // var offset = (vm.pageSize) * (vm.currentPage - 1); //scheduledtlSvc
            coaccountSvc.getLedgerCOAs()
            .$promise
            .then(function (data, headers) { //getSchedulesDtl
                if (data.length == 0) {
                    toastr.error("No Ledger Accounts Created");
                }
                else {
                    vm.gridOptions.data = data;
                    toastr.success('Data successfully retrieved');
                }
            })
           .catch(function () {
             
           })

        }

        vm.queryCOAs();

        vm.showMe = function (recordID) {
            if (recordID != null && recordID != "") { //coaccountEdit.edit({recordId:null})
                $state.go('coaccountEdit.edit', { recordId: recordID });
            }
        };

        vm.coaDetails = function (entity) {
            if (entity.recordID != null && entity.recordID != "") {
                $state.go('coaccountEdit.edit', { recordId: entity.recordID });
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
                  displayName: 'AccountNumber', field: 'glAccountNumber', 
                  cellTemplate: '<a class="" ng-click="grid.appScope.vm.coaDetails(row.entity)">{{grid.getCellValue(row, col)}}</a>',
                  cellClass: 'grid-align'
              },
              { displayName: 'AccountName', field: 'glAccountName' },
              { displayName: 'Description', field: 'glAccountDescription' },
                {
                    name: 'EDIT', width: 100,
                    cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.recordID)">Edit</a>',
                    field: 'recordID', cellClass: 'grid-align'
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
