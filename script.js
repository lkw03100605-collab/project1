// HTML 엘리먼트 가져오기
const uploadForm = document.getElementById('uploadForm');
const postFeed = document.getElementById('postFeed');

// 폼 등록 버튼 클릭 이벤트 리스너
uploadForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 폼 제출 시 페이지가 새로고침되는 것을 방지

    // 입력된 값들 가져오기
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const imageInput = document.getElementById('imageInput');
    
    // 오늘 날짜 생성 (예: 2026-5-18)
    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // 이미지 파일이 선택되었는지 확인
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        
        // 파일 읽기가 완료되면 실행될 함수 정의
        reader.onload = function(e) {
            const imageUrl = e.target.result; // 이미지의 임시 주소(Data URL)
            createPost(author, dateString, content, imageUrl);
        }
        
        // 파일을 주소 형태로 읽어오기
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // 사진이 없는 경우 글만 포함하여 게시물 생성
        createPost(author, dateString, content, null);
    }

    // 업로드가 끝난 후 입력창 비우기
    uploadForm.reset();
});

// 화면에 새 게시물 카드를 추가하는 함수
function createPost(author, date, content, imageUrl) {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';

    // 이미지 유무에 따른 HTML 처리
    let imageHtml = '';
    if (imageUrl) {
        imageHtml = `<img src="${imageUrl}" alt="업로드 이미지" class="post-image">`;
    }

    // 카드 내부 채우기
    postCard.innerHTML = `
        <div class="post-header">
            <span class="post-author">👤 ${author} 학생</span>
            <span class="post-date">📅 ${date}</span>
        </div>
        ${imageHtml}
        <div class="post-content">${content}</div>
    `;

    // 최신 글이 가장 위에 보이도록 최상단(firstChild)에 삽입
    postFeed.insertBefore(postCard, postFeed.firstChild);
}