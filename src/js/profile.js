var userid = null;
angular.module("formModule", [])
.controller("formController", function ($scope, $http) {
	$scope.init = function () {
		$http({
			url: "http://localhost:3000/fetchData",
			method: "GET",
		}).then(function (response) {  
			data = response.data;
            console.log(data);
            $scope.user = data.Username;
			$scope.id = data.UID;
            userid = data.UID;
			$scope.fname = data.FName;
			$scope.lname = data.LName;
            $scope.tel = data.Tel;
            if(data.Birthday != null){
                var date = new Date(data.Birthday.slice(0, 10));
                date.setDate(date.getDate() + 1);
                $scope.bdate = date.toISOString().split('T')[0];
            }
            if(data.Gender == 'M')
                document.getElementById('g1').selected = true;
            else if (data.Gender == 'F')
                document.getElementById('g2').selected = true;
            else if (data.Gender == 'L')
                document.getElementById('g3').selected = true;
            else if (data.Gender == '-')
                document.getElementById('g4').selected = true;
            if(data.Status == 1){
                $scope.acctype = 'ผู้ใช้ทั่วไป';
            }
            else if(data.Status == 2){
                $scope.acctype = 'พนักงานขายตั๋ว';
            }
            else if(data.Status == 3){
                $scope.acctype = 'พนักงานขับรถตู้';
            }
            else if(data.Status == 4){
                $scope.acctype = 'ผู้ดูแลระบบ';
            }
            document.getElementById('profilepicture').src = data.ProfilePic;
		});
	};
});

window.onload = function() {
    localStorage.clear()
    const elm = document.getElementById('file');
    if(elm){
        elm.addEventListener("change", changeImg);
    }
};

function changeImg(){
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        localStorage.setItem("upload-profile", reader.result);
    });
    reader.readAsDataURL(this.files[0]);
    setTimeout(function () {
    var uploadImgURL =  localStorage.getItem("upload-profile")
    if(localStorage.getItem("upload-profile")){
        document.querySelector('#profilepicture').setAttribute("src",uploadImgURL);
    }
    document.getElementById('afterchangeimg1').style.opacity = 0.4;
    document.getElementById('afterchangeimg1').style.backgroundColor = "white";
    document.getElementById('afterchangeimg2').style.color = "black";
    document.getElementById('afterchangeimg2').innerHTML = "Preview Profile";}, 100);
}

