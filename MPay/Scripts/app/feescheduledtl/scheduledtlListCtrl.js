(function (){
    'use strict';
    angular.module('mpayModule').controller('FeeScheduleDtlListCtrl', ["$scope", "$state", "scheduleSvc", "uiGridConstants", FeeScheduleDtlListCtrl]);

    function FeeScheduleDtlListCtrl($scope, $state, scheduleSvc, uiGridConstant) {
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
    }
})()
