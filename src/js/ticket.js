var data, seat, route;
angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
    $scope.init = function () {
		$http({
			url: "http://localhost:3000/fetchTicket?tid="+window.location.search.slice(5),
			method: "GET",
		}).then(function (response) {  
			data = response.data[0];
			console.log(data)
			seat = data.TSeat.split(",");
			$http({
				url: "http://localhost:3000/getroute?rid="+data.RouteID,
				method: "GET",
			}).then(function (response) { 
				route = response.data[0];
				console.log(route);
				$scope.from = rdp(route.REnter);
				$scope.exit = rdp(route.RExit);
				$scope.date = route.RDate;
				$scope.time = route.RTime;
				$scope.seatc = seat.length;
				for(var i = 1; i<15;i++){
					for(var j = 0; j < seat.length; j++){
						if(i == parseInt(seat[j]))
							document.getElementById("seat"+String(i)).src = './picture/SeatSelect.png';
						else
							document.getElementById("seat"+String(i)).style.cursor = 'pointer';
					}
				}
				console.log(route.RStatus)
				if(route.RStatus != 1){
					document.getElementById("btn").style.height = '0px';
					document.getElementById("btn").style.visibility = 'hidden';
				}
				if(route.RStatus == 1)
					$scope.status = 'ยังไม่ออกเดินทาง';
				else if (route.RStatus == 2)
					$scope.status = 'เตรียมตัวออกเดินทาง';
				else if (route.RStatus == 3)
					$scope.status = 'กำลังเดินทาง';
				else if (route.RStatus == 4)
					$scope.status = 'ถึงจุดหมายแล้ว';
			});
		});
    };
});

window.onload = function() {
	document.getElementById("btn").addEventListener("click", function (){
		location.href = "/editticket?tid="+data.TID+"&from="+route.REnter+"&exit="+route.RExit+"&seat="+seat;
	});
};

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