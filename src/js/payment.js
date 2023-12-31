var userid = null;
angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
    $scope.init = function () {
        $scope.price = window.location.search.slice(7);
    };
    document.getElementById("btn").addEventListener("click", function(){
        alert("ชำระเงินสำเร็จ");
        window.location.replace("/tracking");
    });
});

