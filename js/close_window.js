var close_time; // 시간 정보
var close_time2 = 10; // 10초 설정

function show_time() {
  let divClock = document.getElementById("Time");
  let msg = "남은 시간은 " + close_time2 + "초 입니다.";
  divClock.innerText = msg;
  close_time2--; // 1초씩 감소
  if (close_time2 < 0) { // 시간이 다 되면 창을 닫음
    close_window();
  } else {
    setTimeout(show_time, 1000); // 1초마다 갱신
  }
}

function close_window() { // 함수 정의
  window.close(); // 윈도우 닫기
}

close_time = setTimeout(close_window, 10000); // 1/1000 초 지정, 바로 시작
show_time(); // 실시간 시간 보여주기
