var ticket, nowshow = 0;
var t1status = true,t2status = true;
angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
	$scope.init = function () {
        $scope.page = 1;
		$http({
			url: "http://localhost:3000/fetchData",
			method: "GET",
		}).then(function (response) {  
			data = response.data;
            $scope.user = data.Username.toUpperCase();
			$scope.id = data.UID;
            document.getElementById('profilepicture').src = './profile/'+data.ProfilePic;
		});
        $http({
			url: "http://localhost:3000/track",
			method: "GET",
		}).then(function (response) { 
            if(response.data.length > 0){
                ticket = response.data;
                console.log(ticket);
                $http({
                    url: "http://localhost:3000/getroute?rid="+ticket[0].RouteID,
                    method: "GET",
                }).then(function (response) { 
                    var route = response.data[0];
                    console.log(route);
                    $scope.enter1 = rdp(route.REnter);
                    $scope.exit1 = rdp(route.RExit);
                    $scope.day1 = route.RDate;
                    $scope.time1 = route.RTime;
                    $scope.seat1 = ticket[0].TSeat;
                    document.getElementById('t1').style.pointerEvents = "auto";
                    if(route.RStatus == 4){
                        document.getElementById('t1').src = "../picture/TicketPassed.png";
                        document.getElementById('t1').style.cursor = 'default';
                        t1status = false;
                    }
                });
                if(ticket.length > 1){
                    $http({
                        url: "http://localhost:3000/getroute?rid="+ticket[1].RouteID,
                        method: "GET",
                    }).then(function (response) { 
                        var route = response.data[0];
                        console.log(route);
                        $scope.enter2 = rdp(route.REnter);
                        $scope.exit2 = rdp(route.RExit);
                        $scope.day2 = route.RDate;
                        $scope.time2 = route.RTime;
                        $scope.seat2 = ticket[1].TSeat;
                        document.getElementById('t2').style.pointerEvents = "auto";
                        if(route.RStatus == 4){
                            document.getElementById('t2').src = "../picture/TicketPassed.png";
                            document.getElementById('t2').style.cursor = 'default';
                            t2status = false;
                        }
                    });
                }
                nowshow = 2;
            }
		});
	};
    window.nextPage = function(){
        if(ticket != undefined && nowshow < ticket.length){
            document.getElementById('page').innerHTML = parseInt(document.getElementById('page').innerHTML)+1;
            nowshow+=2;
            $http({
                url: "http://localhost:3000/getroute?rid="+ticket[nowshow-2].RouteID,
                method: "GET",
            }).then(function (response) { 
                document.getElementById('t1').src = "../picture/Ticket.png";
                document.getElementById('t1').style.cursor = 'pointer';
                t1status = true;
                var route = response.data[0];
                $scope.enter1 = rdp(route.REnter);
                $scope.exit1 = rdp(route.RExit);
                $scope.day1 = route.RDate;
                $scope.time1 = route.RTime;
                $scope.seat1 = ticket[nowshow-2].TSeat;
                if(route.RStatus == 4){
                    document.getElementById('t1').src = "../picture/TicketPassed.png";
                    document.getElementById('t1').style.cursor = 'default';
                    t1status = false;
                }

            });
            if(nowshow - ticket.length < 1){
                $http({
                    url: "http://localhost:3000/getroute?rid="+ticket[nowshow-1].RouteID,
                    method: "GET",
                }).then(function (response) { 
                    document.getElementById('t2').src = "../picture/Ticket.png";
                    document.getElementById('t2').style.cursor = 'pointer';
                    t2status = true;
                    var route = response.data[0];
                    $scope.enter2 = rdp(route.REnter);
                    $scope.exit2 = rdp(route.RExit);
                    $scope.day2 = route.RDate;
                    $scope.time2 = route.RTime;
                    $scope.seat2 = ticket[nowshow-1].TSeat;
                    if(route.RStatus == 4){
                        document.getElementById('t2').src = "../picture/TicketPassed.png";
                        document.getElementById('t2').style.cursor = 'default';
                        t2status = false;
                    }
                });
            }else{
                $scope.enter2 = null;
                $scope.exit2 = null;
                $scope.day2 = null;
                $scope.time2 = null;
                $scope.seat2 = null;
                document.getElementById('t2').src = "../picture/TicketPassed.png";
                document.getElementById('t2').style.cursor = 'default';
            }
        }
    }
    window.prevPage = function(){
        if(nowshow > 2){
            document.getElementById('page').innerHTML = parseInt(document.getElementById('page').innerHTML)-1;
            nowshow-=2;
            $http({
                url: "http://localhost:3000/getroute?rid="+ticket[nowshow-2].RouteID,
                method: "GET",
            }).then(function (response) { 
                document.getElementById('t1').src = "../picture/Ticket.png";
                document.getElementById('t1').style.cursor = 'pointer';
                t1status = true;
                var route = response.data[0];
                $scope.enter1 = rdp(route.REnter);
                $scope.exit1 = rdp(route.RExit);
                $scope.day1 = route.RDate;
                $scope.time1 = route.RTime;
                $scope.seat1 = ticket[nowshow-2].TSeat;
                if(route.RStatus == 4){
                    document.getElementById('t1').src = "../picture/TicketPassed.png";
                    document.getElementById('t1').style.cursor = 'default';
                    t1status = false;
                }
            });
            if(nowshow - ticket.length < 1){
                $http({
                    url: "http://localhost:3000/getroute?rid="+ticket[nowshow-1].RouteID,
                    method: "GET",
                }).then(function (response) { 
                    document.getElementById('t2').src = "../picture/Ticket.png";
                    document.getElementById('t2').style.cursor = 'pointer';
                    t2status = true;
                    var route = response.data[0];
                    $scope.enter2 = rdp(route.REnter);
                    $scope.exit2 = rdp(route.RExit);
                    $scope.day2 = route.RDate;
                    $scope.time2 = route.RTime;
                    $scope.seat2 = ticket[nowshow-1].TSeat;
                    if(route.RStatus == 4){
                        document.getElementById('t2').src = "../picture/TicketPassed.png";
                        document.getElementById('t2').style.cursor = 'default';
                        t2status = false;
                    }
                });
            }else{
                $scope.enter2 = null;
                $scope.exit2 = null;
                $scope.day2 = null;
                $scope.time2 = null;
                $scope.seat2 = null;
            }
        }
    }
});

window.onload = function() {
    document.getElementById('next').addEventListener("click", nextPage);
    document.getElementById('prev').addEventListener("click", prevPage);
    document.getElementById('t1').addEventListener("click", editT1);
    document.getElementById('t2').addEventListener("click", editT2);
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

function editT1(){
    if(nowshow > 0 && t1status)
        location.href = "/ticket?tid="+ticket[nowshow-2].TID;
}

function editT2(){
    if(ticket[nowshow-1] && nowshow > 0 && t2status)
        location.href = "/ticket?tid="+ticket[nowshow-1].TID;
}