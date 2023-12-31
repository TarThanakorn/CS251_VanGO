var data;
angular.module("formModule", [])
.controller("formController", function ($scope, $http, $sce) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3000/fetchSelectedRoute"+window.location.search,
			method: "GET",
		}).then(function (res) {
            data = res.data[0];
			console.log(data)
			$scope.rid = data.RouteID;
			$scope.from = rdp(data.REnter);
			$scope.exit = rdp(data.RExit);
			$scope.date = data.RDate;
			$scope.time = data.RTime;
			$scope.price = data.RPrice;
			document.getElementById("status").value = data.RStatus;
		});
		
	}
	window.editroute = function(){
        $http({
			url: "http://localhost:3000/updateroute",
			method: "POST",
			params: {rid: data.RouteID, status: document.getElementById('status').value}
		}).then(function (response) {
			document.getElementById("alert").innerHTML = response.data;
		});
		alert("แก้ไขสำเร็จ");
		setTimeout(function(){
			window.location.replace("/statusroute");
		}, 3000);
    }
});

window.onload = function() {
    document.getElementById('btns').addEventListener("click", editroute);
}

function rdp(routecode){
    if(routecode == 1)
        return 'ม.ธรรมศาสตร์';
    else if(routecode == 2)
        return 'ฟิวเจอร์ปาร์ค';
    else if(routecode == 3)
        return 'อนุสาวรีย์ชัยฯ';
    else if(routecode == 4)
        return 'BTSหมอชิต';
}