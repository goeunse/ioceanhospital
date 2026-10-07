// header
$(function () {

    $(".submenu").hide();

    $(".gnb > li").mouseenter(function () {
        $(this).children(".submenu").stop().slideDown(200);
    });

    $(".gnb > li").mouseleave(function () {
        $(this).children(".submenu").stop().slideUp(200);
    });

});



$(function () {

    const slides = $(".banner-slide");
    const pagination = $(".swiper-pagination");

    let current = 0;
    let timer;

    // 페이지네이션 생성
    slides.each(function () {
        pagination.append("<span></span>");
    });

    const dots = pagination.find("span");

    // 첫 번째 배너 표시
    slides.hide().eq(0).show();
    dots.eq(0).addClass("active");


    // =========================
    // 배너 이동
    // =========================

    function moveSlide(index) {

        if (index === current) return;

        slides.eq(current)
            .stop(true, true)
            .fadeOut(600);

        slides.eq(index)
            .stop(true, true)
            .fadeIn(600);

        dots.removeClass("active");
        dots.eq(index).addClass("active");

        current = index;
    }


    // =========================
    // 자동 슬라이드
    // =========================

    function startAutoSlide() {

        timer = setInterval(function () {

            let next = current + 1;

            if (next >= slides.length) {
                next = 0;
            }

            moveSlide(next);

        }, 4000);
    }


    function resetAutoSlide() {

        clearInterval(timer);
        startAutoSlide();

    }


    startAutoSlide();


    // =========================
    // 페이지네이션 클릭
    // =========================

    dots.on("click", function () {

        const index = $(this).index();

        moveSlide(index);

        resetAutoSlide();

    });


    // =========================
    // 마우스 드래그 / 터치
    // =========================

    let startX = 0;
    let endX = 0;


    // 마우스 누르기
    $(".banner-slider").on("mousedown", function (e) {

        startX = e.pageX;

    });


    // 마우스 떼기
    $(".banner-slider").on("mouseup", function (e) {

        endX = e.pageX;

        const distance = endX - startX;

        // 왼쪽으로 드래그 → 다음
        if (distance < -50) {

            let next = current + 1;

            if (next >= slides.length) {
                next = 0;
            }

            moveSlide(next);
            resetAutoSlide();

        }

        // 오른쪽으로 드래그 → 이전
        else if (distance > 50) {

            let prev = current - 1;

            if (prev < 0) {
                prev = slides.length - 1;
            }

            moveSlide(prev);
            resetAutoSlide();

        }

    });


    // =========================
    // 모바일 터치
    // =========================

    $(".banner-slider").on("touchstart", function (e) {

        startX = e.originalEvent.touches[0].pageX;

    });


    $(".banner-slider").on("touchend", function (e) {

        endX = e.originalEvent.changedTouches[0].pageX;

        const distance = endX - startX;


        // 왼쪽 → 다음
        if (distance < -50) {

            let next = current + 1;

            if (next >= slides.length) {
                next = 0;
            }

            moveSlide(next);
            resetAutoSlide();

        }

        // 오른쪽 → 이전
        else if (distance > 50) {

            let prev = current - 1;

            if (prev < 0) {
                prev = slides.length - 1;
            }

            moveSlide(prev);
            resetAutoSlide();

        }

    });

});








// ---------------


$(function () {
    $('#tab .tab-list li a').on('click', function (e) {
        e.preventDefault(); // 기본 링크 튕김 방지

        // 클릭한 a 태그의 부모(li)에 'on'을 추가하고, 다른 li들의 'on'은 제거
        $(this).parent('li').addClass('on').siblings().removeClass('on');
    });
});








$(function () {
    /* ==========================================
       진료과목 탭
    ========================================== */

    $(".medical-tab").on("click", function () {

        // 클릭한 탭의 data-tab 가져오기
        let tabName = $(this).data("tab");


        // 탭 active 변경
        $(".medical-tab").removeClass("active");

        $(this).addClass("active");


        // 콘텐츠 변경
        $(".medical-content").removeClass("active");

        $("#" + tabName).addClass("active");

    });



    /* ==========================================
       카드 개수에 따라 자동으로 클래스 추가
    ========================================== */

    $(".medical-cards").each(function () {

        // 현재 카드 개수 확인
        let cardCount = $(this).find(".medical-card").length;


        // 기존 클래스 제거
        $(this).removeClass("cards-2 cards-3 cards-4");


        // 카드 개수에 맞는 클래스 추가
        if (cardCount === 2) {

            $(this).addClass("cards-2");

        } else if (cardCount === 3) {

            $(this).addClass("cards-3");

        } else if (cardCount === 4) {

            $(this).addClass("cards-4");

        }

    });

});




// 의료진 소개
$(function () {

    $(".doctor-more").click(function () {

        var url = $(this).data("url");

        window.open(url, "_blank");

    });

});

$(function () {

    var swiper = new Swiper('.card', {
        effect: 'cards',
        grabCursor: true,
    });

});


// 아이오션 소식
$(function () {

    const praiseSwiper = new Swiper(".praise-swiper", {

        slidesPerView: 1,

        loop: true,

        grabCursor: true,

        effect: "cards",

        cardsEffect: {
            perSlideOffset: 30,
            perSlideRotate: 2,
            rotate: true,
            slideShadows: false
        }

    });

});



// 둘러보기
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.tour-item');
    const btnPrev = document.querySelector('.tour-arrow.prev');
    const btnNext = document.querySelector('.tour-arrow.next');

    const totalItems = items.length;
    let currentIndex = 0; // 초기에 보여줄 중앙 아이템 인덱스

    // 아이템들의 상태 클래스를 갱신하는 핵심 함수
    function updateSlider() {
        items.forEach((item, index) => {
            // 기준점(currentIndex)으로부터의 거리차 계산
            let diff = index - currentIndex;

            // 무한 루프를 위한 오프셋 래핑 알고리즘 (-4 ~ +3 형태 등으로 변환)
            let offset = ((diff % totalItems) + totalItems) % totalItems;
            if (offset > Math.floor(totalItems / 2)) {
                offset -= totalItems; // 짧은 방향으로 매핑 (예: 7을 -1로)
            }

            // 기존 pos- 클래스 모두 제거
            item.className = 'tour-item';

            // 오프셋 값에 따라 새로운 위치 클래스 부여
            if (offset === 0) {
                item.classList.add('pos-0');
            } else if (offset === -1) {
                item.classList.add('pos-m1');
            } else if (offset === -2) {
                item.classList.add('pos-m2');
            } else if (offset === 1) {
                item.classList.add('pos-p1');
            } else if (offset === 2) {
                item.classList.add('pos-p2');
            } else {
                // -3, 3, 4 등의 위치는 화면 밖(가운데 숨김)으로 처리
                item.classList.add('pos-hidden');
            }
        });
    }

    // 이벤트: 이전 버튼
    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
        updateSlider();
    });

    // 이벤트: 다음 버튼
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // 이벤트: 양옆의 이미지를 직접 클릭했을 때 해당 이미지로 회전하며 이동
    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (currentIndex !== index) {
                currentIndex = index;
                updateSlider();
            }
        });
    });

    // 초기 렌더링 실행
    updateSlider();
});



// 기존 코드 하단 등에 추가
document.querySelectorAll('.btn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // e.preventDefault(); // 링크 이동을 막고 스크립트로 제어할 경우 주석 해제
        e.stopPropagation(); // 부모(.tour-item)의 클릭 이벤트로 전달되는 것을 방지
    });
});








// footer
$(function () {

    // 대표번호 클릭
    $(".footer-contact a").on("click", function () {

        console.log("아이오션병원 대표번호");

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