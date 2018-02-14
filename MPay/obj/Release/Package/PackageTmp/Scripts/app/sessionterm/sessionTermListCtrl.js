(function (){
    'use strict';
    angular.module('mpayModule').controller('SessionTermListCtrl', ["$uibModal", "$scope", "$state", "sessionTermSvc", "uiGridConstants", SessionTermListCtrl]);

    function SessionTermListCtrl($uibModal, $scope, $state, sessionTermSvc, uiGridConstant) {
        var vm = this;
        vm.querySessions = function () {
            // var offset = (vm.pageSize) * (vm.currentPage - 1); //scheduledtlSvc
            sessionTermSvc.getSessions()
            .$promise
            .then(function (data, headers) { //getSchedulesDtl
                if (data.length == 0) {
                    toastr.error("There are no session created yet");
                }
                else {
                    vm.gridOptions.data = data;
                    toastr.success('Data successfully retrieved');
                }
            })
           .catch(function () {

           })

        }
        vm.querySessions();

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
              { displayName: 'RecordID', field: 'recordID'},
              { displayName: 'SessionID', field: 'sessionID' },
              { displayName: 'Description', field: 'description' },
              { displayName: 'StartDate', field: 'startDate', enableSorting: false, type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'' },
              { displayName: 'EndDate', field: 'endDate', type: 'date', cellFilter: 'date:\'yyyy-MM-dd\'' },
              { displayName: 'NoOfTerms', field: 'noOfTerms' },
              {
                  name: 'EDIT',
                  cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.showMe(row.entity.recordID)">Edit</a>',
                  field: 'recordID', cellClass: 'grid-align'
              },
              {
                  name: 'TERM',
                  cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.vm.openTermForm(row.entity)">Add Term</a>',
                  field: 'recordID', cellClass: 'grid-align'
              }
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'sessions.csv',
            exporterPdfDefaultStyle: { fontSize: 9 },
            exporterPdfTableStyle: { margin: [30, 30, 30, 30] },
            exporterPdfTableHeaderStyle: { fontSize: 10, bold: true, italics: true, color: 'red' },
            exporterPdfHeader: { text: "Sessions List", style: 'headerStyle' },
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


        //ngGrid Options
        vm.showMe = function (recordID) {
            if (recordID != null && recordID != "") {
                $state.go('sessionTermEdit.edit', { recordId: recordID });
            }
        };

        vm.openTermForm = function (entity) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    backdrop: 'static',
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/sessionterm/views/terms.html',
                    controller: termModalCtrl,
                    controllerAs: 'vm',
                    resolve: {
                        termRef: function () {
                            return entity;
                        }
                    }
                });
                modalInstance.result.then(function (codes) {
                    vm.selected = codes;
                }, function () {
                    //$log.info('Modal dismissed at: ' + new Date());
                });
            //if (recordID != null && recordID != "") {
            //    $state.go('sessionTermEdit.edit', { recordId: recordID });
            //}
        };

        var termModalCtrl = function ($window, $uibModalInstance, $log, $timeout, sessionTermSvc, termRef) {
            var vm = this;

            vm.term = {};

            vm.termRef = termRef;

            if (vm.termRef && vm.termRef.recordID) {
                vm.title = "Add New Term/Semester: " + vm.termRef.sessionID;
            }
            else {
                vm.title = "Edit: " + vm.termRef.description
            }

            vm.addTerm = function (sessiondtlForm, term) {
                if (sessiondtlForm.$valid) {
                    term.parentID = termRef.recordID;
                    $timeout(function () {
                    sessionTermSvc.saveSessionDTL(term)
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
        };

    }
})()
