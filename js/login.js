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
            alert("로그인이 제한되었습니다. 관리자에게 문의하세요.");
            return;
        }

        login_count(); // 카운트 증가
        session_set(); // 세션 생성
        
        setTimeout(function() {
            logout(); // 5분 후 자동 로그아웃
        }, 5 * 60 * 1000); // 5분을 밀리초로 변환

        form.submit();
    }
}


function logout() {
    session_del(); // 세션 삭제
    deleteCookie("id"); // 쿠키 삭제
    location.href = '../index.html';

    // Increment logout count and update cookie
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


/*function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}*/

// 로그인 횟수를 증가시키고 쿠키를 업데이트하는 함수


// Helper function to set a cookie
/*function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Helper function to get a cookie value by name
/*function getCookie(name) {
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
}*/


/*function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput");
	let password = document.querySelector("#floatingPassword");
        if (sessionStorage) {
        let en_text = encrypt_text(password.value);
        sessionStorage.setItem("Session_Storage_test", en_text);


    } else {
        alert("로컬 스토리지 지원 x");
    }
}



function session_get() { //세션 읽기
    if (sessionStorage) {
       return sessionStorage.getItem("Session_Storage_test");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}*/

/*function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
};

function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); 
}*/



function handleLoginFailure() {
    let loginFailCount = getCookie("login_fail_cnt") || 0;
    loginFailCount++;

    setCookie("login_fail_cnt", loginFailCount, 365); // 실패 횟수를 쿠키에 저장

    if (loginFailCount >= 3) {
        alert("로그인이 제한되었습니다. 관리자에게 문의하세요.");
        // 로그인 제한 처리를 위한 추가 작업 수행
        return;
    }
}







