(function (){
    'use strict'
    angular.module('mpayModule')
        .controller('StudentEditPaymentCtrl', ["$rootScope", "studentSvc", "$location", "studentObj", "$state", "$window", 
            StudentEditPaymentCtrl])
   
 
    function StudentEditPaymentCtrl($rootScope, studentSvc, $location, studentObj, $state, $window) {
        var vm = this;
        vm.student = studentObj;
  };
})()

//