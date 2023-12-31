angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
    window.createroute = function(){
        if(document.getElementById('from').value != '-' && document.getElementById('exit').value != '-' && document.getElementById('date').value != ''&& document.getElementById('time').value != '' && document.getElementById('price').value != ''){
            var datesend = '';
            var date = new Date(document.getElementById('date').value);
    
            datesend = datesend + date.getDate()+' ';
            if(date.getMonth() == 0)
                datesend = datesend + 'มกราคม '
            else if (date.getMonth() == 1)
                datesend = datesend + 'กุมภาพันธ์ '
            else if (date.getMonth() == 2)
                datesend = datesend + 'มีนาคม '
            else if (date.getMonth() == 3)
                datesend = datesend + 'เมษายน '
            else if (date.getMonth() == 4)
                datesend = datesend + 'พฤษภาคม '
            else if (date.getMonth() == 5)
                datesend = datesend + 'มิถุนายน '
            else if (date.getMonth() == 6)
                datesend = datesend + 'กรกฎาคม '
            else if (date.getMonth() == 7)
                datesend = datesend + 'สิงหาคม '
            else if (date.getMonth() == 8)
                datesend = datesend + 'กันยายน '
            else if (date.getMonth() == 9)
                datesend = datesend + 'ตุลาคม '
            else if (date.getMonth() == 10)
                datesend = datesend + 'พฤศจิกายน '
            else if (date.getMonth() == 11)
                datesend = datesend + 'ธันวาคม '
            var year = parseInt(date.getFullYear())+543;
            datesend = datesend + String(year);
    
            $http({
                url: "http://localhost:3000/newroute",
                method: "POST",
                params: {from: document.getElementById('from').value, exit: document.getElementById('exit').value, date: datesend, time: document.getElementById('time').value, price: document.getElementById('price').value}
            }).then(function (response) {
                document.getElementById("alert").innerHTML = response.data;
            });
            document.getElementById("alert").style.color = "Green";
            document.getElementById("alert").innerHTML = "สร้างสำเร็จ";
            setTimeout(function(){
                window.location.replace("/newroute");
            }, 3000);
        }
    }
});

window.onload = function() {
    const elm = document.getElementById('from');
    if(elm)
        elm.addEventListener("change", removeExit);
    document.getElementById('btns').addEventListener("click", createroute);
}

function removeExit(){
    document.getElementById('e0').selected = true;
    document.getElementById('e1').hidden = false;
    document.getElementById('e2').hidden = false;
    document.getElementById('e3').hidden = false;
    document.getElementById('e4').hidden = false;
    if(document.getElementById('from').value == '1')
        document.getElementById('e1').hidden = true;
    if(document.getElementById('from').value == '2')
        document.getElementById('e2').hidden = true;
    if(document.getElementById('from').value == '3')
        document.getElementById('e3').hidden = true;
    if(document.getElementById('from').value == '4')
        document.getElementById('e4').hidden = true;
}