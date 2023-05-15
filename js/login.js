function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");

    form.action = "../index_login.html";
    form.method = "get";
    
    if (check.checked == true) {
        alert("쿠키를 저장합니다.");
        setCookie("id", id.value, 1);
        alert("쿠키 값 :" + id.value);
    } else {
        setCookie("id", id.value, 0);
    }

    if (id.value.length === 0 || password.value.length === 0) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else {
        form.submit();
    }

    // Increment login count and update cookie
    login_count();
}

function logout(){
    location.href='../index.html';

    // Increment logout count and update cookie
    logout_count();
}

function get_id(){
    var getParameters = function(paramName){
        var returnValue;
        var url = location.href;
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for(var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    };
    alert(getParameters('id') + '님 방갑습니다!');
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

// 로그인 횟수를 증가시키고 쿠키를 업데이트하는 함수
function login_count() {
    var count = getCookie("login_cnt");
    if (count) {
        count = parseInt(count) + 1;
    } else {
        count = 1;
    }
    setCookie("login_cnt", count, 365); // 1년 동안 유지되는 쿠키 설정
}

// 로그아웃 횟수를 증가시키고 쿠키를 업데이트하는 함수
function logout_count() {
    var count = getCookie("logout_cnt");
    if (count) {
        count = parseInt(count) + 1;
    } else {
        count = 1;
    }
    setCookie("logout_cnt", count, 365); // 1년 동안 유지되는 쿠키 설정
}



function init(){
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
        id.value = get_id; 
        check.checked = true; 
    }
}

// Helper function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Helper function to get a cookie value by name
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
                while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}


