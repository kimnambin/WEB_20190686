function session_set() {
  let id = document.querySelector("#floatingInput").value;
  let password = document.querySelector("#floatingPassword").value;
  let random = new Date(); // 랜덤 타임스탬프

  const obj = { // 객체 선언
    id: id,
    otp: random
  };

  if (sessionStorage) {
    let en_text = encrypt_text(password);
    sessionStorage.setItem("Session_Storage_object", objString);
    sessionStorage.setItem("Session_Storage_encrypted", en_text);


    console.log("세션에 비밀번호를 암호화하여 저장했습니다.");
    console.log("저장된 세션 객체:", obj);
  } else {
    alert("세션 스토리지 지원 x");
  }
}

function get_id() {
  if (true) {
    decrypt_text();
  } else {
    
  }
}

function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='index_login.html'; // 로그인된 페이지로 이동
    }
}

function session_del() {//세션 삭제
    if (sessionStorage) {
        
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert('세션 스토리지 지원 x');
    }
}


function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}


function session_get() { //세션 읽기
  if (sessionStorage) {
    return sessionStorage.getItem("Session_Storage_encrypted");
  } else {
    alert("세션 스토리지 지원 x");
  }
}

function session_join_get() {
  let sessionData = sessionStorage.getItem("join_data");

  if (sessionData) {
    let signUpData = JSON.parse(sessionData);
    console.log("First Name: ", signUpData.firstName);
    console.log("Last Name: ", signUpData.lastName);
    console.log("Birthday Date: ", signUpData.birthdayDate);
    console.log("Gender: ", signUpData.gender);
    console.log("Email Address: ", signUpData.emailAddress);
    console.log("Phone Number: ", signUpData.phoneNumber);
    console.log("Class Number: ", signUpData.classNumber);
    console.log("Random: ", signUpData.random);
  } else {
    console.log("No sign-up data available.");
  }
}
