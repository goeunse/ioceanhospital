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




// 배너
document.addEventListener('DOMContentLoaded', function () {
    // .hero-menu 안의 모든 a 태그를 가져옵니다.
    var menuLinks = document.querySelectorAll('.hero-menu > li > a');

    menuLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // a 태그 클릭 시 페이지 이동(새로고침) 방지

            // 1. 먼저 모든 메뉴에서 'active' 클래스를 지워줍니다.
            menuLinks.forEach(function (item) {
                item.classList.remove('active');
            });

            // 2. 현재 클릭한 메뉴에만 'active' 클래스를 추가합니다.
            this.classList.add('active');
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