document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = [];//빈 배열 - 전역 변수

function search_message(){
   alert("검색을 수행합니다!"); 
	search_array.push(search_str.value); // 배열에 검색어 추가
	   let search_str = document.querySelector("#search_txt"); // 변수에 저장
   document.getElementById("search_message").innerHTML = search_array.toString(); // 값 변환
   console.log(search_str.value); // 콘솔에 출력
}

