var close_time;
var close_time2 = 180; // 3분 설정

function show_time() {
  let divClock = document.getElementById("Time");
  let minutes = Math.floor(close_time2 / 60);
  let seconds = close_time2 % 60;
  let msg = "남은 시간은 " + minutes + "분 " + seconds + "초 입니다.";
  divClock.innerText = msg;
  close_time2--; // 1초씩 감소
  if (close_time2 < 0) { // 시간이 다 되면 창을 닫음
    close_window();
  } else {
    setTimeout(show_time, 1000); // 1초마다 갱신
  }
}

function close_logout() {
  window.close(); // 윈도우 닫기
}

close_time = setTimeout(close_window, 180000); // 3분(180,000 밀리초) 설정
show_time(); // 실시간 시간 보여주기
