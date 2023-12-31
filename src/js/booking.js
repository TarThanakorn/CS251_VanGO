var data,dataseat;
var seat;
var total = 0;
var price = 0;
var SeatSelect = [];

angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
    document.getElementById("alert").innerHTML = "เลือกสถานที่ขึ้นรถ";
    window.setRid = function(){
        for (var i = 0; i < data.length; i++){
            if(data[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && data[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value && data[i].RDate == document.getElementById("date").options[document.getElementById("date").selectedIndex].value && data[i].RTime == document.getElementById("time").options[document.getElementById("time").selectedIndex].value){
                document.getElementById("RID").value = data[i].RouteID;
                price = data[i].RPrice;
                $scope.getSeat();
            }
        }
    }
    window.selectFrom = function () {
        total = 0;
        SeatSelect = [];
        document.getElementById("seatc").value = '0';
        document.getElementById("btns").innerHTML = "ซื้อตั๋ว";
        document.getElementById("alert").innerHTML = "เลือกปลายทาง";
        document.getElementById("e1").hidden = true;
        document.getElementById("e2").hidden = true;
        document.getElementById("e3").hidden = true;
        document.getElementById("e4").hidden = true;
        document.getElementById("e0").selected = true;

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

        $http({
            url: "http://localhost:3000/fetchRoute",
            method: "GET",
            params: {from: document.getElementById("from").options[document.getElementById("from").selectedIndex].value}
        }).then(function (response) {
            if(response != null){
                data = response.data;
                console.log(data);
                for (var i = 0; i < data.length; i++){
                    if (data[i].RExit == 1)
                        document.getElementById("e1").hidden = false;
                    else if (data[i].RExit == 2)
                        document.getElementById("e2").hidden = false;
                    else if (data[i].RExit == 3)
                        document.getElementById("e3").hidden = false;
                    else if (data[i].RExit == 4)
                        document.getElementById("e4").hidden = false;
                }
            }
        });
    };
    window.buyticket = function(){
        if(document.getElementById("seatc").value == '0')
            document.getElementById("alert").innerHTML = "กรุณาเลือกที่นั่ง";
        else{
            document.getElementById("alert").innerHTML = "กำลังทำรายการ";
            $http({
                url: "http://localhost:3000/bookings",
                method: "POST",
                params: {rid: document.getElementById("RID").value, selectseat: SeatSelect.sort(function(a, b) {return a - b;}), seatData: JSON.stringify(seat)}
            }).then(function (response) {
                console.log(response.data);
                document.getElementById("alert").innerHTML = response.data;
            });
            document.getElementById("alert").style.color = "Green";
            document.getElementById("alert").innerHTML = "ซื้อสำเร็จ";
            setTimeout(function(){
                window.location.replace("/payment?price="+total);
            }, 3000);
        }
    }
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
        });
    };
});

window.onload = function() {
    const elm = document.getElementById('from');
    const elm1 = document.getElementById('exit');
    const elm2 = document.getElementById('date');
    const elm3 = document.getElementById('time');
    if(elm)
        elm.addEventListener("change", selectFrom);
    if(elm1)
        elm1.addEventListener("change", selectDate);
    if(elm2)
        elm2.addEventListener("change", selectTime);
    if(elm3)
        elm3.addEventListener("change", setRid);
    for (var i = 0; i < 14; i++){
        document.getElementById("seat"+String(i+1)).addEventListener("click", selectSeat);
    }
    document.getElementById('btns').addEventListener("click", buyticket);
};

function selectDate(){
    total = 0;
    SeatSelect = [];
    document.getElementById("seatc").value = '0';
    document.getElementById("btns").innerHTML = "ซื้อตั๋ว";
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
    for (var i = 0; i < data.length; i++){
        if(data[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && data[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value){
            var option = document.createElement("option");
            option.text = data[i].RDate;
            document.getElementById("date").add(option);
        }
    }
}

function selectTime(){
    document.getElementById("alert").innerHTML = "เลือกเวลา";
    for (var i = 0; i < data.length; i++){
        if(data[i].REnter == document.getElementById("from").options[document.getElementById("from").selectedIndex].value && data[i].RExit == document.getElementById("exit").options[document.getElementById("exit").selectedIndex].value && data[i].RDate == document.getElementById("date").options[document.getElementById("date").selectedIndex].value){
            var option = document.createElement("option");
            option.text = data[i].RTime;
            document.getElementById("time").add(option);
        }
    }
}

function selectSeat(event){
    if( document.getElementById("RID").value != '0' && document.getElementById(event.target.id).src == 'http://localhost:3000/picture/Seat.png'){
        SeatSelect.push(parseInt(event.target.id.slice(4,6)));
        document.getElementById(event.target.id).src = 'http://localhost:3000/picture/SeatSelect.png';
        seat['s'+event.target.id.slice(4,6)] = '1';
        total = total + price;
        document.getElementById("btns").innerHTML = "ซื้อตั๋ว "+total+"฿";
        document.getElementById("DSeat").value = JSON.stringify(seat);
        document.getElementById("seatc").value = parseInt(document.getElementById("seatc").value)+1;
    } else if( document.getElementById("RID").value != '0' && document.getElementById(event.target.id).src == 'http://localhost:3000/picture/SeatSelect.png'){
        for( var i = 0; i < SeatSelect.length; i++){ 
            if ( SeatSelect[i] === parseInt(event.target.id.slice(4,6)))
            SeatSelect.splice(i, 1);
        }
        document.getElementById(event.target.id).src = 'http://localhost:3000/picture/Seat.png';
        seat['s'+event.target.id.slice(4,6)] = '0';
        total = total - price;
        if (parseInt(document.getElementById("seatc").value) > 0)
            document.getElementById("seatc").value = parseInt(document.getElementById("seatc").value)-1;
        if (document.getElementById("seatc").value == 0)
            document.getElementById("btns").innerHTML = "ซื้อตั๋ว";
        else
            document.getElementById("btns").innerHTML = "ซื้อตั๋ว "+total+"฿";
        document.getElementById("DSeat").value = JSON.stringify(seat);

    }
}