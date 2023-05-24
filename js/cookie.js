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

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}

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