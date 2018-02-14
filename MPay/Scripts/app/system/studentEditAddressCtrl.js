(function () {
    'use strict'
        angular.module('mpayModule').controller('StudentEditAddressCtrl', ["$rootScope", "$state", "$window","$log", "studentSvc", "studentObj", StudentEditAddressCtrl]);

    function StudentEditAddressCtrl($rootScope, studentSvc, studentObj, $state, $window, $uibModal, $log) {
        var vm = this;

        vm.student = studentObj;

        vm.getAddress = function () {
            studentSvc.getAddress(studentObj.recordID).query({ recordID: studentObj.recordID },
              function (data, headers) {
                  if (data == 0) {
                      // vm.items = [];
                  }
                  else {
                      vm.getAddress = data;
                      toastr.success('Address successfully retrieved');
                  }
              });
        }

          

        $rootScope.$on('Address', function (event, data) {
            studentSvc.getAddress().query({ recordID: studentObj.recordID },
               function (data, headers) {
                   if (data == 0) {
                       // vm.items = [];
                   }
                   else {
                       vm.getAddress = data;
                       toastr.success('Address retrieved');
                   }
               });
        });

        if (vm.student && vm.student.recordID) {
            vm.title = "Edit: " + vm.student.lastName + " " + vm.student.firstName
            vm.hideEdit = false;
            vm.hideNew = true;
        }
        else {
            vm.title = "New Student";
        }

        vm.openaddressForm = function () {
            if (vm.student && vm.student.recordID) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    keyboard: false,
                    backdropClick: false,
                    templateUrl: '/Scripts/app/students/newaddress.html',
                    controller: addressModalCtrl,
                    resolve: {
                        studentRef: function () { return vm.student; }
                    }
                });
                modalInstance.result.then(function (codes) {
                    vm.selected = codes;
                }, function () {
                    toastr.success("Address successfully added");
                    $log.info('Modal dismissed at: ' + new Date());
                    vm.$emit('Address', studentObj);
                });
            }
            else {
                toastr.error("Please create general information!")
            }
        }

        vm.cancel = function () {
            $state.go('studentList');
        }
        function getSt() {
            vm.querySt = function () {
                // var offset = (vm.pageSize) * (vm.currentPage - 1);
                $scope.$watchCollection('[search.mat, search.fac, search.dept]',
                    function (newValue, oldValue) {
                        studentSvc.getStudents().query({
                            mat: '',
                            fac: 1,
                            dept: 2,
                            page: 0,
                            pageSize: 0
                        },
                    function (data, headers) {
                        if (data == 0) {
                            vm.items = [];
                            vm.totalRecordsCount = 0;
                            vm.amessage = "Sorry we don't have any record matching your search";
                            vm.aError = true;
                        }
                        else {
                        }
                    });
                    })
            }
        }
        //vm.getprogtype = studentSvc.getprogtype();
        vm.studentsList = getSt();
        //});

        var addressModalCtrl = function (vm, $window, $uibModalInstance, $log, $timeout, studentSvc, studentRef) {
            vm.studentRef = studentRef;

            vm.addAddress = function (address) {
                address.entityType = 2;
                address.parentID = studentRef.recordID;
                address.addressType = 1;
                studentSvc.saveAddress(address);
                $uibModalInstance.dismiss('cancel');
            }

            vm.cancel = function (address) {
                $uibModalInstance.dismiss('cancel');
            };
        };
    }

})()


