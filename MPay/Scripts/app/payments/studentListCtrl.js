(function (){
    'use strict';
    angular.module('mpayModule').controller('StudentListCtrl', ["$scope", "$state", "studentSvc", "uiGridConstants", StudentListCtrl]);

    function StudentListCtrl($scope,$state, studentSvc, uiGridConstant) {
        var vm = this;
        vm.querySt = function () {
            // var offset = (vm.pageSize) * (vm.currentPage - 1);
            $scope.$watchCollection('[search.mat, search.fac, search.dept]',
                function (newValue, oldValue) {
                    studentSvc.getStudents().query({
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
        vm.pageSize = 20;
        vm.currentPage = 0;

        vm.pageChanged = function (page) {
            vm.currentPage = page;
        };

        //ngGrid Options
        vm.showMe = function (recordID) {
            if (recordID != null && recordID != "") {
                $state.go('studentEdit.basic', { recordId: recordID });
            }
        };

        //vm.gridOptions = {};
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
              { displayName: 'RecordID', field: 'recordID', width: 100 },
              { displayName: 'FirstName', field: 'firstName' },
              { displayName: 'LastName', field: 'lastName' },
              { displayName: 'Email', field: 'emailAddress', enableSorting: false },
              { displayName: 'MatricNo', field: 'matricNo' },
              { displayName: 'MobilePhone', field: 'mobilePhone' },
              { displayName: 'Fee Schedule', field: 'payTemplateNo' },
              { field: 'programType' },
              {
                  name: 'EDIT',
                  cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.recordID)">Edit</a>',
                  field: 'recordID', cellClass: 'grid-align'
              }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'students.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Students List", style: 'headerStyle' },
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
