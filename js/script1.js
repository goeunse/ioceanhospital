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


// 인사말
$(function () {

    // 처음에는 살짝 아래에서 시작
    $(".greeting-text, .greeting-image").css({
        opacity: 0,
        transform: "translateY(30px)"
    });

    $(window).on("scroll", function () {

        var scrollTop = $(window).scrollTop();
        var sectionTop = $(".hospintro").offset().top;
        var windowHeight = $(window).height();

        if (scrollTop + windowHeight > sectionTop + 100) {

            $(".greeting-text").stop().animate({
                opacity: 1
            }, 700);

            $(".greeting-image").stop().animate({
                opacity: 1
            }, 900);

            $(".greeting-text, .greeting-image").css({
                transform: "translateY(0)"
            });
        }

    });

});

// 둘러보기
document.addEventListener('DOMContentLoaded', () => {
    const tabItems = document.querySelectorAll('.tour-tab-item');
    const panels = document.querySelectorAll('.tour-panel');

    function activateTab(targetTab) {
        const targetPanelId = targetTab.getAttribute('aria-controls');

        // 모든 탭 비활성화 후 선택된 탭만 활성화
        tabItems.forEach((tab) => {
            tab.classList.remove('is-active');
            tab.setAttribute('aria-selected', 'false');
        });
        targetTab.classList.add('is-active');
        targetTab.setAttribute('aria-selected', 'true');

        // 매칭되는 이미지 패널 노출
        panels.forEach((panel) => {
            if (panel.id === targetPanelId) {
                panel.classList.add('is-active');
            } else {
                panel.classList.remove('is-active');
            }
        });
    }

    tabItems.forEach((tab) => {
        // 마우스 클릭 시 사진 전환
        tab.addEventListener('click', () => {
            activateTab(tab);
        });

        // Tab 키로 포커스 이동 후 Enter 또는 Space 키 입력 시 사진 전환
        tab.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateTab(tab);
            }
        });
    });
});


// 의료진 소개
document.addEventListener("DOMContentLoaded", function () {
    const profiles = document.querySelectorAll('.doctor-profile');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.2 // 20% 정도 보일 때 애니메이션 실행
    });

    profiles.forEach(profile => {
        observer.observe(profile);
    });
});



// 캐릭터 소개
document.addEventListener('DOMContentLoaded', function() {
    // 애니메이션 적용 대상을 모두 선택
    const charBlocks = document.querySelectorAll('.char-animate');
    
    // 화면에 나타날 때 show 클래스 추가
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // 한 번 애니메이션 후 감시 해제
            }
        });
    }, {
        threshold: 0.2 // 요소가 20% 보일 때 실행
    });

    charBlocks.forEach(block => {
        observer.observe(block);
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