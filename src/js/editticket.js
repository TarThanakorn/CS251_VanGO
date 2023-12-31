var data, seat, route, selroute, selectSeatcount, SeatSelect, removeOldSeat, oldrid, useOldroute;
angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
    $scope.init = function () {
		$http({
			url: "http://localhost:3000/fetchTicket?tid="+window.location.search.slice(5),
			method: "GET",
		}).then(function (response) {  
			data = response.data[0];
			console.log(data)
			seatold = data.TSeat.split(",");
			$http({
				url: "http://localhost:3000/getroute?rid="+data.RouteID,
				method: "GET",
			}).then(function (response) { 
				route = response.data[0];
				removeOldSeat = JSON.parse(route.SeatInf);
				for(var i=0; i < seatold.length ; i++){
					removeOldSeat['s'+seatold[i]] = '0';
				}
				oldrid = data.RouteID;
				document.getElementById("from").selectedIndex = route.REnter;
				document.getElementById("exit").selectedIndex = route.RExit;
				$scope.date = route.RDate;
				$scope.time = route.RTime;
				selectDate();
			});
		});
		$http({
			url: "http://localhost:3000/fetchSelRoute"+window.location.search,
			method: "GET",
		}).then(function (response) {  
			selroute = response.data;
			console.log(selroute)
		});
    };
	$scope.getSeat = function () {
        document.getElementById("alert").innerHTML = "เลือกที่นั่ง";
        document.getElementById("pbook").style.opacity = '1';
        document.getElementById("pbook").style.animation = '2s anim-popoutin ease infinite';
        $http({
            url: "http://localhost:3000/fetchSeat",
            method: "GET",
            params: {rid: document.getElementById("RID").value}
        }).then(function (response) {
            dataseat = response.data;
            seat = JSON.parse(dataseat[0].SeatInf);
            for(var i = 0; i<14;i++){
                if(Object.values(seat)[i] == '1'){
                    document.getElementById("seat"+String(i+1)).src = './picture/SeatSelected.png';
                }else{
                    document.getElementById("seat"+String(i+1)).style.cursor = 'pointer';
                }
            }
			if(document.getElementById("RID").value == oldrid){
				for(var i=0; i<seatold.length; i++){
					document.getElementById("seat"+seatold[i]).src = './picture/SeatSelect.png';
					document.getElementById("seat"+seatold[i]).style.cursor = 'pointer';
					selectSeatcount += 1;
					document.getElementById("seatc").value = selectSeatcount+'/'+seatold.length;
					SeatSelect.push(parseInt(seatold[i]));
				}
				useOldroute = true;
			}else{
				useOldroute = false;
			}
        });
    };
	
	function selectDate(){
		total = 0;
		SeatSelect = [];
		selectSeatcount = 0;
		document.getElementById("seatc").value = '0/'+seatold.length;
		document.getElementById("alert").innerHTML = "เลือกวันที่";
	
		document.querySelectorAll('#date option').forEach(o => o.remove());
		var dateopt = document.createElement("option");
		dateopt.text = "เลือก";
		dateopt.selected = true;
		dateopt.disabled = true;
		dateopt.hidden = true;
		document.getElementById("date").add(dateopt);
	
		document.querySelectorAll('#time option').forEach(o => o.remove());
		var timeopt = document.createElement("option");
		timeopt.text = "เลือก";
		timeopt.selected = true;
		timeopt.disabled = true;
		timeopt.hidden = true;
		document.getElementById("time").add(timeopt);
	
		document.getElementById("RID").value = '0';
		document.getElementById("pbook").style.opacity = '0';
		document.getElementById("pbook").style.animation = '';
		for(var i = 0; i<14;i++){
			document.getElementById("seat"+String(i+1)).src = './picture/Seat.png';
			document.getElementById("seat"+String(i+1)).style.cursor = 'not-allowed';
		
		}
	
		document.getElementById("alert").innerHTML = "เลือกวันที่";
		console.log(selroute);
		for (var i = 0; i < selroute.length; i++){
			if(selroute[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && selroute[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value){
				var option = document.createElement("option");
				option.text = selroute[i].RDate;
				document.getElementById("date").add(option);
			}
		}
	}
	window.selectTime = function(){
		total = 0;
		SeatSelect = [];
		selectSeatcount = 0;
		document.getElementById("seatc").value = '0/'+seatold.length;
		document.querySelectorAll('#time option').forEach(o => o.remove());
		var timeopt = document.createElement("option");
		timeopt.text = "เลือก";
		timeopt.selected = true;
		timeopt.disabled = true;
		timeopt.hidden = true;
		document.getElementById("time").add(timeopt);
		document.getElementById("RID").value = '0';
		document.getElementById("pbook").style.opacity = '0';
		document.getElementById("pbook").style.animation = '';
		for(var i = 0; i<14;i++){
			document.getElementById("seat"+String(i+1)).src = './picture/Seat.png';
			document.getElementById("seat"+String(i+1)).style.cursor = 'not-allowed';
		
		}
		document.getElementById("alert").innerHTML = "เลือกเวลา";
		for (var i = 0; i < selroute.length; i++){
			if(selroute[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && selroute[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value && selroute[i].RDate == document.getElementById("date").options[document.getElementById("date").selectedIndex].value){
				var option = document.createElement("option");
				option.text = selroute[i].RTime;
				document.getElementById("time").add(option);
			}
		}
	}
	window.setRid = function(){
        for (var i = 0; i < selroute.length; i++){
            if(selroute[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && selroute[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value && selroute[i].RDate == document.getElementById("date").options[document.getElementById("date").selectedIndex].value && selroute[i].RTime == document.getElementById("time").options[document.getElementById("time").selectedIndex].value){
                document.getElementById("RID").value = selroute[i].RouteID;
                $scope.getSeat();
            }
        }
    }
	window.selectSeat = function(event){
		if( document.getElementById("RID").value != '0' && document.getElementById(event.target.id).src == 'http://localhost:3000/picture/Seat.png' && selectSeatcount < seatold.length){
			SeatSelect.push(parseInt(event.target.id.slice(4,6)));
			document.getElementById(event.target.id).src = 'http://localhost:3000/picture/SeatSelect.png';
			seat['s'+event.target.id.slice(4,6)] = '1';
			document.getElementById("DSeat").value = JSON.stringify(seat);
			selectSeatcount += 1;
			document.getElementById("seatc").value = selectSeatcount+'/'+seatold.length;
		} else if( document.getElementById("RID").value != '0' && document.getElementById(event.target.id).src == 'http://localhost:3000/picture/SeatSelect.png'){
			for( var i = 0; i < SeatSelect.length; i++){ 
				if ( SeatSelect[i] === parseInt(event.target.id.slice(4,6)))
					SeatSelect.splice(i, 1);
			}
			document.getElementById(event.target.id).src = 'http://localhost:3000/picture/Seat.png';
			seat['s'+event.target.id.slice(4,6)] = '0';
			if (selectSeatcount > 0){
				selectSeatcount -= 1;
				document.getElementById("seatc").value = selectSeatcount+'/'+seatold.length;
			}
			document.getElementById("DSeat").value = JSON.stringify(seat);
		}
		console.log(seat);
		console.log(SeatSelect);
	}
	window.editticket = function(){
        if(selectSeatcount !== seatold.length)
            document.getElementById("alert").innerHTML = "กรุณาเลือกที่นั่งให้ครบ";
        else{
			window.repage = true;
            document.getElementById("alert").innerHTML = "กำลังทำรายการ";
            $http({
                url: "http://localhost:3000/edittic",
                method: "POST",
                params: {rid: document.getElementById("RID").value, selectseat: SeatSelect.sort(function(a, b) {return a - b;}), seatData: JSON.stringify(seat), tid: data.TID, oldrid: oldrid, removeSeat: removeOldSeat, useOldroute: useOldroute}
            }).then(function (response) {
                document.getElementById("alert").innerHTML = response.data;
				window.repage = false;
            });
			if(window.repage){
				document.getElementById("alert").style.color = "Green";
				document.getElementById("alert").innerHTML = "แก้ไขเรียบร้อย";
				setTimeout(function(){
					window.location.replace("/ticket?tid="+data.TID);
				}, 3000);
			}
        }
    }
});

window.onload = function() {
	const elm2 = document.getElementById('date');
	const elm3 = document.getElementById('time');
    if(elm2)
        elm2.addEventListener("change", selectTime);
	if(elm3)
        elm3.addEventListener("change", setRid);
    for (var i = 0; i < 14; i++){
        document.getElementById("seat"+String(i+1)).addEventListener("click", selectSeat);
    }
	document.getElementById("btn").addEventListener("click", editticket);
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