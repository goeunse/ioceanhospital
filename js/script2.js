//헤더
$(function () {

    $(".submenu").hide();

    $(".gnb > li").mouseenter(function () {
        $(this).children(".submenu").stop().slideDown(200);
    });

    $(".gnb > li").mouseleave(function () {
        $(this).children(".submenu").stop().slideUp(200);
    });

    // ▼▼▼ 여기에 클릭 이벤트 코드를 추가합니다 ▼▼▼
    $(".gnb > li > a").click(function () {
        // 1. 모든 메인 메뉴 버튼에서 active 클래스를 제거 (초기화)
        $(".gnb > li > a").removeClass("active");

        // 2. 현재 클릭한 메뉴 버튼에만 active 클래스를 추가
        $(this).addClass("active");
    });

});



// 배너 메뉴 클릭 시 active 변경 및 부드러운 스크롤 이동
document.addEventListener('DOMContentLoaded', function () {
    // .hero-menu 안의 모든 a 태그를 가져옵니다.
    var menuLinks = document.querySelectorAll('.hero-menu > li > a');

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 기본 앵커 이동(깜빡임) 방지 (부드러운 스크롤을 위해)

            // 1. 모든 메뉴에서 'active' 클래스를 지워줍니다.
            menuLinks.forEach(function (item) {
                item.classList.remove('active');
            });

            // 2. 현재 클릭한 메뉴에만 'active' 클래스를 추가합니다.
            this.classList.add('active');

            // 3. 이동할 대상 섹션 찾기 및 스크롤 이동
            var targetId = this.getAttribute('href'); // href 속성값 가져오기 (예: "#tv-section")
            var targetElement = document.querySelector(targetId); // 해당 ID를 가진 요소 찾기

            if (targetElement) {
                // 대상 요소가 화면에 부드럽게 스크롤 되도록 합니다.
                targetElement.scrollIntoView({ 
                    behavior: 'smooth', // 부드럽게 이동
                    block: 'start'      // 화면 상단에 맞춤
                });
            }
        });
    });
});




// 입원 절차
document.addEventListener("DOMContentLoaded", function() {
    // 1. 관찰할 대상(아이콘 박스들)을 모두 찾습니다.
    const targets = document.querySelectorAll('.fade-target');

    // 2. 화면에 요소가 나타나는지 감지하는 옵저버를 만듭니다.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // 화면에 요소가 들어왔다면
            if (entry.isIntersecting) {
                // 'show' 클래스를 추가하여 애니메이션을 실행합니다.
                entry.target.classList.add('show');
                
                // 한 번 나타난 후에는 더 이상 감지하지 않도록 옵저버를 끕니다.
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.2 // 요소가 화면에 20% 정도 보일 때 실행
    });

    // 3. 찾아둔 대상들에게 옵저버를 붙여줍니다.
    targets.forEach(target => {
        observer.observe(target);
    });
});


// 입원 생활 안내
document.addEventListener("DOMContentLoaded", function() {
    // 모든 아코디언 헤더를 가져옵니다.
    const headers = document.querySelectorAll('.acc-header');

    headers.forEach(header => {
        header.addEventListener('click', function() {
            // 클릭한 헤더의 부모 요소(li.accordion-item)를 찾습니다.
            const parentItem = this.parentElement;

            // 이미 열려있는 상태라면 닫습니다.
            if (parentItem.classList.contains('active')) {
                parentItem.classList.remove('active');
            } else {
                // 열려있지 않다면
                // 1. 다른 열려있는 모든 아이템들을 먼저 닫습니다.
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // 2. 방금 클릭한 아이템만 엽니다. (화살표 회전 + 박스 열림)
                parentItem.classList.add('active');
            }
        });
    });
});

// 퇴원 절차
document.addEventListener("DOMContentLoaded", function() {
    const targets = document.querySelectorAll('.fade-target');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    targets.forEach(target => observer.observe(target));
});


// 퇴원 후 주의사항
document.addEventListener("DOMContentLoaded", function() {
    // 퇴원 후 주의사항 섹션 애니메이션 타겟
    const pdTargets = document.querySelectorAll('.pd-fade-up');
    
    const pdObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    pdTargets.forEach(target => pdObserver.observe(target));
});


// ==========================================
// 탑 버튼 클릭 시 부드럽게 맨 위로 이동
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnTop = document.querySelector('.btn-top');

    if (btnTop) {
        btnTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});