window.onload = function() {
    if(localStorage.getItem("loadpage") == "2"){
        showReg();
    }else{
        showLogin();
    }
    document.getElementById('register').addEventListener("click", function(){
        showReg();
    });
    document.getElementById('back').addEventListener("click", function(){
        showLogin();
    });
    document.getElementById('submitregister').addEventListener("click", function(){
        localStorage.setItem("regUser",document.getElementById('regusername').value);
    });
    if(document.getElementById('error') && document.getElementById('error').innerHTML == "ลงทะเบียนสำเร็จ")
        localStorage.clear("regUser");
};
function showLogin(){
    document.getElementById('formlogin').hidden = false;
    document.getElementById('formregister').hidden = true;
    localStorage.setItem("loadpage", "1");
    localStorage.clear("regUser");
};
function showReg(){
    document.getElementById('formlogin').hidden = true;
    document.getElementById('formregister').hidden = false;
    document.getElementById('regusername').value = localStorage.getItem("regUser");
    localStorage.setItem("loadpage", "2");
}

