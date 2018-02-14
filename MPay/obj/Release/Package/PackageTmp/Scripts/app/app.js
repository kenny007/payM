(function () {
    'use strict';
    angular.module('mpayModule', ['commonServices', 'ui.router','angular-loading-bar','ngAnimate', 'ngMaterial','ui.mask', 'ngTouch', 'ngResource', 'ui.bootstrap', 'ui.grid',
                    'ui.grid.resizeColumns', 'ui.grid.moveColumns', 'ui.grid.pinning', 'ui.grid.pagination', 'ui.grid.selection', 'ui.grid.exporter'])
                    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
                        var studentfolder = "/Scripts/app/students/views";
                        var invfolder = "/Scripts/app/inventoryitems/views";
                        var schedulefolder = "/Scripts/app/feeschedule/views";
                        var scheduledtlfolder = "/Scripts/app/feescheduledtl/views";
                        var sessionfolder = "/Scripts/app/sessionterm/views";
                        var invoicefolder = "/Scripts/app/invoices/views";
                        var scholarfolder = "/Scripts/app/scholarship/views";
                        var payfolder = "/Scripts/app/payment/views";
                        var coafolder = "/Scripts/app/coaccount/views";
                        $urlRouterProvider.otherwise("/");
                        $stateProvider
                        .state("home", {
                            url: "/",
                            templateUrl: studentfolder + "/dashboard.html"
                        })
                        .state("sessionTermEdit", {//This prevent the activation of this state without the child state if it doesn't make sense
                            abstract: true,   //An abstract state is one that can't be explicitly activated
                            url: "/Student/edit/:recordId",
                            templateUrl: sessionfolder + '/sessionTermEditView.html', controller: 'SessionTermEditCtrl as vm',
                            resolve: {
                                sessionTermSvc: "sessionTermSvc",
                                sessionObj: function (sessionTermSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return sessionTermSvc.getSession(recordId).$promise;
                                    }
                                }
                            } 
                        })
                        .state("sessionTermEdit.edit", {
                            url: "/session", templateUrl: sessionfolder + '/sessionEditBasicView.html', params: {
                                recordId: null
                            },
                            resolve: {
                                sessionTermSvc: "sessionTermSvc",
                                sessionObj: function (sessionTermSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return null;
                                        //sessionTermSvc.getSession(recordId).$promise;
                                    }
                                }
                            }
                        })
                        .state("sessionTermEdit.list", {
                            url: "/list",
                            templateUrl: sessionfolder + '/sessionListView.html', controller: 'SessionTermListCtrl as vm'
                        })
                        .state("invoiceEdit", {//This prevent the activation of this state without the child state if it doesn't make sense
                             abstract: true,   //An abstract state is one that can't be explicitly activated
                             url: "/Invoice",
                             templateUrl: invoicefolder + '/invoiceEditView.html', controller: 'InvoiceCtrl as vm',
                             resolve: {
                                 invoiceSvc: "invoiceSvc",
                                 studentObj: function (invoiceSvc, $stateParams) {
                                     var recordId = $stateParams.recordId;
                                     if (recordId != null && recordId !== "") {
                                         return null;
                                         //sessionTermSvc.getSession(recordId).$promise;
                                     }
                                 }
                             }
                         })
                        .state("invoiceEdit.process", {
                            url: "/Process", templateUrl: invoicefolder + '/invoiceeditPartialView.html', params: {
                                recordId: null
                            },
                            resolve: {
                                invoiceSvc: "invoiceSvc",
                                studentObj: function (invoiceSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return null;  //sessionTermSvc.getSession(recordId).$promise;
                                    }
                                }
                            }
                        })
                        .state("invoiceEdit.list", {
                            url: "/invoicelist",
                            templateUrl: invoicefolder + '/invoiceListView.html'
                        })                       
                        .state("scholarshipEdit", {//This prevent the activation of this state without the child state if it doesn't make sense
                            abstract: true,   //An abstract state is one that can't be explicitly activated
                            url: "/scholarship",
                            templateUrl: scholarfolder + '/scholarshipEditView.html', controller: 'scholarshipEditCtrl as vm',
                            resolve: {
                                scholarshipSvc: "scholarshipSvc",
                                scholarshipObj: function (scholarshipSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "" && recordId != undefined) {
                                        //return null;
                                       return scholarshipSvc.getScholarship().$promise;
                                        //sessionTermSvc.getSession(recordId).$promise;
                                    }
                                    return null;
                                }
                            }
                        })
                        .state("scholarshipEdit.edit", {
                            url: "/edit", templateUrl: scholarfolder + '/scholarshipeditPartialView.html', params: {
                                recordId: null
                            },
                            resolve: {
                                scholarshipSvc: "scholarshipSvc",
                                scholarshipObj: function (scholarshipSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                         return scholarshipSvc.getScholarship().$promise;
                                        //sessionTermSvc.getSession(recordId).$promise;
                                    }
                                    else {
                                        return null;
                                    }
                                   
                                }
                            }
                        })
                        .state("scholarshipEdit.list", {
                            url: "/list",
                            templateUrl: scholarfolder + '/scholarshipListView.html', controller: 'ScholarshipListCtrl as vm'
                        })                   
                        .state("studentOverview", {
                            url: "/Student/Overview",
                            templateUrl: studentfolder + '/overview.html'
                        })
                        .state("studentList", {
                            url: "/Student/List",
                            templateUrl: studentfolder + '/studentListView.html', controller: 'StudentListCtrl as vm'
                        })
                        .state("studentCreate", {
                            url: "/Student/Create",
                            templateUrl: studentfolder + '/studentEditView.html', controller: 'StudentEditCtrl as vm'
                        })
                        .state("studentEdit", {//This prevent the activation of this state without the child state if it doesn't make sense
                            abstract: true,   //An abstract state is one that can't be explicitly activated
                            url: "/Student/edit/:recordId",
                            templateUrl: studentfolder + '/studentEditView.html', controller: 'StudentEditCtrl as vm',
                            resolve: {
                                studentSvc: "studentSvc",
                                studentObj: function (studentSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return studentSvc.getStudent(recordId).$promise;
                                    }
                                }
                            } //, redirectTo: 'studentEdit.basic'
                        })
                        .state("studentEdit.basic", {
                            url: "/basic", templateUrl: studentfolder + '/studentEditBasicView.html', params: {
                                recordId: null
                            },
                            resolve: {
                                studentSvc: "studentSvc",
                                studentObj: function (studentSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return studentSvc.getStudent(recordId).$promise;
                                    }
                                }
                            }
                        })
                        .state("studentEdit.address", {
                            url: "/address", templateUrl: studentfolder + '/studentEditAddressView.html',
                            controller: 'StudentEditAddressCtrl as vm'
                        })
                        .state("studentEdit.payments", {
                            url: "/payments", templateUrl: studentfolder + '/studentEditPaymentsView.html',
                            controller: 'StudentEditPaymentCtrl as vm'
                        })
                        .state("studentEdit.invoices", {
                            url: "/invoices", templateUrl: studentfolder + '/studentEditInvoicesView.html',
                            controller: 'StudentEditInvoiceCtrl as vm'
                        })
                        .state("inventoryEdit", {
                            abstract: true, 
                            url: "/Inventory/edit/:itemId",
                            templateUrl: invfolder + '/feeitemEditView.html', controller: 'FeeItemEditCtrl as vm',
                            resolve: {
                                feeitemSvc: "feeitemSvc",
                                inventoryObj: function (feeitemSvc, $stateParams) {
                                    var itemId = $stateParams.itemId;
                                    if (itemId != null && itemId !== "") {
                                        return feeitemSvc.getItem(itemId).$promise;
                                    }
                                }
                            } 
                         })
                        .state("inventoryEdit.item", {
                             url: "/item", templateUrl: invfolder + '/feeeditPartialView.html', 
                             resolve: {
                                 feeitemSvc: "feeitemSvc",
                                 inventoryObj: function (feeitemSvc, $stateParams) {
                                     var itemId = $stateParams.itemId;
                                     if (itemId != null && itemId !== "") {
                                         return feeitemSvc.getItem(itemId).$promise;
                                     }
                                 }
                             }
                         })
                        .state("inventoryEdit.list", {
                            url: "/list",
                            templateUrl: invfolder + '/feeitemListView.html', controller: 'FeeItemListCtrl as vm'
                        })
                        .state("scheduleEdit", {
                            abstract: true,
                            url: "/FeeSchedule/edit/:scheduleId",
                            templateUrl: schedulefolder + '/scheduleEditView.html', controller: 'FeeScheduleCtrl as vm',
                            resolve: {
                                scheduleSvc: "scheduleSvc",
                                scheduleObj: function (scheduleSvc, $stateParams) {
                                    var reportId = $stateParams.reportId;
                                    var scheduleId = $stateParams.scheduleId;
                                    if (scheduleId != null && scheduleId !== "") {
                                        return scheduleSvc.getSchedule(scheduleId).$promise;
                                    }
                                }
                            }
                        })
                        .state("scheduleEdit.feeitem", {
                            url: "/feeitem", templateUrl: schedulefolder + '/scheduleeditPartialView.html',
                            resolve: {
                                scheduleSvc: "scheduleSvc",
                                scheduleObj: function (scheduleSvc, $stateParams) {
                                    var scheduleId = $stateParams.scheduleId;
                                    if (scheduleId != null && scheduleId !== "") {
                                        return scheduleSvc.getSchedule(scheduleId).$promise;
                                    }
                                }
                            }
                        })
                        .state("scheduleEdit.list", {
                            url: "/list",
                            templateUrl: schedulefolder + '/scheduleListView.html', controller: 'FeeScheduleListCtrl as vm'
                        })
                        .state("scheduleEditdetails", {
                            url: "/FeeScheduleDtl/edit/:recordId",
                            templateUrl: scheduledtlfolder + '/scheduledtlEditView.html', controller: 'FeeScheduleDtlCtrl as vm',
                            params:{recordId: null},
                            resolve: {
                                scheduledtlSvc: "scheduledtlSvc",
                                scheduledtlObj: function (scheduledtlSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return scheduledtlSvc.getScheduleDtl(recordId).$promise;
                                    }
                                },
                                scheduleditObj: function (scheduledtlSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {
                                        return scheduledtlSvc.getScheduleR(recordId).$promise;
                                    }
                                }
                            }
                        })
                        .state("paymentEdit", {
                            abstract: true,
                            url: "/Payment/Index",
                            templateUrl: payfolder + '/invoiceList.html', controller: 'paymentEditCtrl as vm',
                            resolve: {
                                scheduleSvc: "paymentSvc",
                                scheduleObj: function (paymentSvc, $stateParams) {
                                    var reportId = $stateParams.reportId;
                                    if (reportId != null && reportId !== "") {
                                        return paymentSvc.getInvoice(recordId).$promise;
                                    }
                                }
                            }
                        })
                        .state("coaccountEdit", {
                             abstract: true,
                             url: "/LedgerCOA/:recordId",
                             templateUrl: coafolder + '/coaEditView.html', controller: 'COAccountEditCtrl as vm',
                             resolve: {
                                 coaccountSvc: "coaccountSvc",
                                 coaccountObj: function (coaccountSvc, $stateParams) {
                                     var recordId = $stateParams.recordId;
                                     if (recordId != null && recordId !== "") {
                                         return coaccountSvc.getCOA(recordId).$promise; //
                                     }
                                 }
                             }
                         })
                        .state("coaccountEdit.edit", {
                            url: "/coaedit", templateUrl: coafolder + '/coaeditPartialView.html', params: {
                                recordId: null
                            },
                            resolve: {
                                coaccountSvc: "coaccountSvc",
                                coaccountObj: function (coaccountSvc, $stateParams) {
                                    var recordId = $stateParams.recordId;
                                    if (recordId != null && recordId !== "") {  
                                        return coaccountSvc.getCOA(recordId).$promise;
                                    } 
                                }
                            }
                        })
                        .state("coaccountEdit.list", {
                            url: "/list",
                            templateUrl: coafolder + '/coaListView.html', controller: 'COAccountListCtrl as vm'
                        })
                        $locationProvider.html5Mode({
                            enabled: true, requireBase: false
                        });
                    });
})()

//  .config(['$resourceProvider', function ($resourceProvider) {
//// Don't strip trailing slashes from calculated URLs
//$resourceProvider.defaults.stripTrailingSlashes = false;
//  }]
//});

var commonServices = angular.module('commonServices', ['ngResource'])
