
(function () {
    'use strict';
    angular.module('mpayModule').controller('InvoiceCtrl', ["$rootScope", "$state", "$uibModal", "$log", "invoiceSvc", "scheduleSvc",
        "scheduledtlSvc", "studentSvc", "uiGridConstants", InvoiceCtrl]);

    function InvoiceCtrl($rootScope, $state, $uibModal, $log, invoiceSvc, scheduleSvc, scheduledtlSvc, studentSvc, uiGridConstants) {
        var vm = this;
        vm.sessionsList = invoiceSvc.getSessions();
        vm.schedules = scheduleSvc.getSchedulesList();
        //vm.faculties  =
        vm.hideGrid = true;
        vm.hideGrid2 = true;

        vm.reset = function (feeschedule) {
            angular.copy({}, vm.feeschedule);
        }

        vm.getTerms = function () {
            var sessionId = vm.invoice.sessionID;
            if (sessionId != null && sessionId != undefined) {
                invoiceSvc.getSessionTerms(sessionId).query({ sessionId: sessionId },
                      function (data, headers) {
                          if (data.length == 0) {
                              vm.terms = {};
                              toastr.error("No Terms Created under this Session");
                          }
                          else {
                                vm.terms = data;
                          }
                       
                      });
                                  
            }
            else { }
        }

        vm.getSheduleItems = function (scheduleId) {
            var scheduleId = scheduleId;
            if (scheduleId != null && scheduleId != undefined) {
                scheduledtlSvc.getScheduleDtls(scheduleId).query({ scheduleId: scheduleId },
                 function (data, headers) { 
                     if (data.length == 0) {
                         toastr.error("No items yet in this schedule");
                         vm.gridOptions1.data = [];
                         vm.hideGrid = true;
                     }
                     else {
                         vm.gridOptions1.data = data;
                         vm.hideGrid = false;
                         toastr.success('Data successfully retrieved');
                     }
                 });  //

                studentSvc.getScheduleStudent(scheduleId).query({ scheduleId: scheduleId },
                function (data, headers) {      //
                    if (data.length == 0) {
                        toastr.error("No students with selected schedule");
                        vm.gridOptions2.data = [];
                        vm.hideGrid2 = true;
                    }
                    else {
                        vm.gridOptions2.data = data;
                        vm.hideGrid2 = false;
                        toastr.success('Data successfully retrieved');
                    }
                });
                
            }
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

        vm.gridOptions1 = {
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
              { displayName: 'ItemID', field: 'itemID',},
              { displayName: 'FeeAmount', aggregationType: uiGridConstants.aggregationTypes.sum, field: 'feeAmount', cellFilter: 'currency:"₦" : 2' },
              { displayName: 'FeeFactor', field: 'feeFactor'},
              { displayName: 'Remarks', field: 'remarks'}
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'feescheduleitem.csv',
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

        //this is the on click function to get selected row
        vm.processSelection = function (invoice) {
            var selectedStudent = [];
            var currentSelection = vm.gridApi.selection.getSelectedRows();
            for (var i = 0; i < currentSelection.length; i++) {
                // toastr.error(currentSelection[i].recordID);
                selectedStudent.push(currentSelection[i].recordID);
            }
            invoice.selectedStudent = selectedStudent.toString()
            invoiceSvc.processInvoice(invoice)
            .$promise
            .then(function (response) {
                if (response.Message != "success") {
                    toastr.error(response.Message);
                }
                else {
                    toastr.success("Invoice successfully processed");
                    $state.go("invoiceEdit.list");
                }
                //console.log('success', response)
            })
            .catch(function (response) {
                console.log('failure', response)
            });

           // console.log(selectedStudent);
        };

        vm.gridOptions2 = {
            enableRowSelection: true,
            enableSelectAll: true,
            selectionRowHeaderWidth: 35,
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
            ],
            onRegisterApi: function (gridApi) {
                vm.gridApi = gridApi;
            },
            enableSelectAll: true,
            exporterCsvFilename: 'studentinschedule.csv',
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

    };
})()