const content = document.getElementsByTagName('p')[0];

if (document.body.clientWidth < 800) {
    content.innerHTML = null;
    content.innerHTML += `<a href="https://github.com/EscA-phera/dshs_cafeteria_issue_tracker/issues/5">업데이트</a> <a href="https://github.com/EscA-phera/dshs_cafeteria_issue_tracker/issues/1">오류</a> <a href="https://github.com/EscA-phera/dshs_cafeteria_issue_tracker/issues/4">질문 및 건의사항</a>`;
}