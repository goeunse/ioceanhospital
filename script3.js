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

// 아이오션 섹션
document.addEventListener("DOMContentLoaded", function() {
    // 아이오션 TV 섹션 애니메이션 감지
    const tvTargets = document.querySelectorAll('.tv-fade-up');
    
    const tvObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 }); // 화면에 20% 보일 때 작동

    tvTargets.forEach(target => tvObserver.observe(target));
});



// 칭찬카드
document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll('.praise-slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    
    let currentIndex = 0; // 현재 보여지는 슬라이드 번호

    // 특정 인덱스의 슬라이드를 보여주는 함수
    function showSlide(index) {
        // 1. 모든 슬라이드에서 active 클래스 제거 (숨김)
        slides.forEach(slide => slide.classList.remove('active'));
        
        // 2. 요청받은 인덱스의 슬라이드만 active 추가 (보여줌)
        slides[index].classList.add('active');
    }

    // 왼쪽(이전) 버튼 클릭
    prevBtn.addEventListener('click', () => {
        // 첫 번째에서 누르면 맨 마지막 사람으로 가고, 아니면 1씩 감소
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });

    // 오른쪽(다음) 버튼 클릭
    nextBtn.addEventListener('click', () => {
        // 마지막 사람에서 누르면 다시 첫 번째 사람으로 가고, 아니면 1씩 증가
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // 페이지네이션 숫자 클릭 시 active(진한 글씨) 클래스 이동
    const pageNumbers = document.querySelectorAll('.pg-num');
    
    pageNumbers.forEach(num => {
        num.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 이동 방지 (테스트용)
            
            // 모든 번호에서 active 제거
            pageNumbers.forEach(n => n.classList.remove('active'));
            
            // 클릭한 번호에만 active 추가
            this.classList.add('active');
        });
    });
});

// 플로팅 퀵 메뉴 + TOP 버튼
function initFloatingMenu() {
    const floatingMenu = document.querySelector('.floating-menu');

    if (!floatingMenu) return;

    const quickWrap = floatingMenu.querySelector('.quick-menu-wrap');
    const quickChar = floatingMenu.querySelector('.quick-char');
    const quickIcons = floatingMenu.querySelector('.quick-icons');
    const btnTop = floatingMenu.querySelector('.btn-top');

    function setMenuOpen(isOpen) {
        quickWrap.classList.toggle('is-open', isOpen);
        quickChar.setAttribute('aria-expanded', String(isOpen));
        quickChar.setAttribute(
            'aria-label',
            isOpen ? '퀵 메뉴 닫기' : '퀵 메뉴 열기'
        );

        // 닫힌 메뉴의 링크는 키보드로 선택되지 않게 처리
        quickIcons.inert = !isOpen;
    }

    setMenuOpen(false);

    // 마우스를 캐릭터 영역에 올리면 열기
    quickWrap.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'mouse') {
            setMenuOpen(true);
        }
    });

    // 캐릭터와 아이콘 영역을 벗어나면 닫기
    quickWrap.addEventListener('pointerleave', (event) => {
        if (event.pointerType === 'mouse') {
            setMenuOpen(false);
        }
    });

    // 터치 또는 키보드로 캐릭터 버튼을 누르면 열기/닫기
    quickChar.addEventListener('click', (event) => {
        const isMouseClick =
            event.detail > 0 &&
            window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        if (isMouseClick) {
            setMenuOpen(true);
        } else {
            setMenuOpen(!quickWrap.classList.contains('is-open'));
        }
    });

    // 키보드 포커스가 퀵 메뉴 밖으로 이동하면 닫기
    quickWrap.addEventListener('focusout', (event) => {
        if (!quickWrap.contains(event.relatedTarget)) {
            setMenuOpen(false);
        }
    });

    // TOP 버튼에 마우스를 올리거나 포커스하면 닫기
    btnTop.addEventListener('pointerenter', () => {
        setMenuOpen(false);
    });

    btnTop.addEventListener('focus', () => {
        setMenuOpen(false);
    });

    // TOP 버튼 클릭 시 맨 위로 이동
    btnTop.addEventListener('click', () => {
        setMenuOpen(false);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 바깥 영역 클릭 시 닫기
    document.addEventListener('pointerdown', (event) => {
        if (!quickWrap.contains(event.target)) {
            setMenuOpen(false);
        }
    });

    // ESC 키로 닫기
    floatingMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            quickChar.focus();
            setMenuOpen(false);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFloatingMenu);
} else {
    initFloatingMenu();
}