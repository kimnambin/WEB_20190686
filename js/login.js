function addJavascript(jsname) { // 자바스크립트 외부 연동
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
    session_check(); // 세션 유무 검사
}


 function login() {
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");

    form.action = "../index_login.html";
    form.method = "get";

    function login_check() {
        let idRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
        let passwordRegex = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

        let id = document.querySelector("#floatingInput").value;
        let password = document.querySelector("#floatingPassword").value;

        if (!idRegex.test(id)) {
            alert("올바른 id 형식이 아닙니다.");
            return false; // 로그인이 되지 않도록 함
        }

        if (!passwordRegex.test(password)) {
            alert("올바른 패스워드 형식이 아닙니다.");
            return false; // 로그인이 되지 않도록 함
        }

        return true; // 로그인 조건을 모두 통과하면 true 반환
    }

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
        let loginFailCount = getCookie("login_fail_cnt") || 0;

        if (loginFailCount >= 3) {
            alert("로그인이 제한되었습니다. 3분 후에 다시 시도해주세요.");
			window.location.href = "../login x .html";
			form.method = "get";
            return; // 로그인이 되지 않도록 함
        }

        if (!login_check()) {
            // login_check() 함수를 호출하여 로그인 조건을 체크
            loginFailCount++; // 로그인 실패 횟수 증가
            setCookie("login_fail_cnt", loginFailCount, 0); // 쿠키에 로그인 실패 횟수 저장
            return; // 로그인이 되지 않도록 함
        } else {
            // 로그인 처리 코드
            // ...

            loginFailCount = 0; // 로그인 성공 시 로그인 실패 횟수 초기화
            deleteCookie("login_fail_cnt"); // 쿠키 삭제
			
			
        }
    }
}



function logout() {
    session_del(); // 세션 삭제
    deleteCookie("id"); // 쿠키 삭제
    location.href = '../index.html';

    logout_count();
}


function get_id() {
    if (true) {
        decrypt_text();
    } else {
        var getParameters = function(paramName) {
            var returnValue;
            var url = location.href;
            var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
            for (var i = 0; i < parameters.length; i++) {
                var varName = parameters[i].split('=')[0];

                if (varName.toUpperCase() == paramName.toUpperCase()) {
                    returnValue = parameters[i].split('=')[1];
                    return decodeURIComponent(returnValue);
                }
            }
        };
        alert(getParameters('id') + '님 방갑습니다!');
    }
}




