document.getElementById("search_btn").addEventListener('click', search_message);

var search_array = [];

function search_message(){
  let search_str = document.querySelector("#search_txt");
  
  if (search_str.value.length === 0) {
    alert("검색어가 비었습니다. 입력해주세요");
    return;
  }
  
  if (search_array.length >= 10) {
    search_array.shift(); // 맨 앞 요소 삭제
  }
  
  search_array.push(search_str.value);
  
  document.getElementById("search_message").innerHTML = search_array.toString();
  console.log(search_str.value);
}
