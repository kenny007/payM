(function () {
    'use strict'
    angular.module('mpayModule').controller('StudentEditAddressCtrl', ["$rootScope", "$scope", "$mdDialog", "$state", "$log","$window",
               "studentSvc", "studentObj", StudentEditAddressCtrl]);

    function StudentEditAddressCtrl($rootScope, $scope, $mdDialog, $state, $log,$window, studentSvc, studentObj) {
        var vm = this;

        vm.student = studentObj;

        vm.getAddressList = function () {
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

        function getAddressLoaded(){
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

        getAddressLoaded();
        $rootScope.$on('Address', function (event, data) {
            studentSvc.getAddress().query({ recordID: studentObj.recordID },
               function (response, headers) {
                   if (response.length > 0) {
                       vm.getAddress = response;
                       toastr.success('Address retrieved');
                   }
                   else {
                       toastr.error('No Items found');
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

        vm.openaddressForm = function (ev) {
            $mdDialog.show({
                controller: addressModalCtrl,
                controllerAs: 'vm',
                bindToController: true,
                templateUrl: '/Scripts/app/students/newaddress.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: { studentRef: vm.student },
                clickOutsideToClose: false
            })
          .then(function () {
              $scope.status = 'You saved the data.';
          }, function () {
              $scope.status = 'You cancelled the dialog.';
          });

        };

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

        var addressModalCtrl = function ($mdDialog, $log, $timeout, studentSvc, studentRef) {
            var vm = this;
            vm.studentRef = studentRef;

            vm.addAddress = function (address) {
                address.entityType = 2;
                address.parentID = studentRef.recordID;
                address.addressType = 1;
                studentSvc.saveAddress(address)
                 .$promise
                .then(function (response) {
                    if (response.data != "" && response.data != null && response.data != undefined) {
                        //for (var i = 0; i < response.data.length; i++) {
                        toastr.error(response.data);
                        //}
                    }
                    else {
                        toastr.success("Save successful");
                        vm.cancel();
                        $rootScope.$emit('Address', 'ScheduleDetails');
                        //$state.go("scheduleEdit.list");
                    }
                })
                .catch(function (response) {
                    toastr.error("An error occured");
                });            
            }

            vm.cancel = function ($event) {
                $mdDialog.cancel();
            };
            //vm.cancel = function (address) {
            //    $uibModalInstance.dismiss('cancel');
            //};
        };
    }

})()


