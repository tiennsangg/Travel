
function headerBackground() {
    window.onscroll = function () { myFunction() };

    function myFunction() {
        if (document.documentElement.scrollTop > 20) {
            document.getElementById("header").className = "show-background-header";
        } else {
            document.getElementById("header").className = "";
        }
    }
}
headerBackground();
$(document).ready(function () {
    $("body").on("cut copy", function () {
        return false;
    });
});

// slide - banner
$('.banner-slide').flickity({
    // options
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    autoPlay: 5000,
});

// show language
$(".button-lang").click(function (e) {
    $(".ul-lang").toggle("");
    e.stopPropagation();
    $(document).click(function (e) {
        $('.ul-lang').fadeOut(300);
    });
});
$(document).ready(function menuMobile() {
    $(".nav-bar-mobile").click(function () { //Tìm class header__bar và bắt sự kiện click vào class đó tạo ra function
        $(".overlay").addClass("overlay-active");
        $(".menu-mobile").addClass("menu-mobile-active");
    });
    // show search
    $(".button-search").click(function () {
        $(".overlay").addClass("overlay-active");
        $(".search-wrap").addClass("search-active");
    });
    // overlay remove
    $(".overlay").click(function () {
        $(".button-lang").removeClass("ul-lang-active");
        $(".search-wrap").removeClass("search-active");
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
        $(".box-search_header").removeClass("active");
        $('.cart-quickview').removeClass('active');
        $('.product__sidebar').removeClass('active');
        $('.search__mobile').removeClass('active');

    });
    // icon close remove
    $(".menu-mobile-close").click(function () {
        $(".overlay").removeClass("overlay-active");
        $(".menu-mobile").removeClass("menu-mobile-active");
    });
    // search close remove
    $(".close-search").click(function () {
        $(".overlay").removeClass("overlay-active");
        $(".search-wrap").removeClass("search-active");
    });
    // $('.menu-mobile').show();    
    $(".menu-mobile ul li.menu-item-has-children>ul").before(`<span class="li-plus"></span>`);
    $(".menu-mobile ul li.current-menu-parent.menu-item-has-children .li-plus").addClass("clicked");
    // if ($(".li-plus").length) {
    $(".li-plus").click(function (e) {
        if ($(this).hasClass("clicked")) {
            $(this).removeClass('clicked').siblings('ul').slideUp(); //Xóa class clicked biến trừ thành cộng, sibling(ul) cùng cấp với thằng đang ấn li-plus nó add thêm slideUp để đóng vào 
        } else {
            $(this).parent().siblings('li').find('.li-plus').removeClass('clicked').find("ul").slideUp(); //
            $(this).parent().siblings().find("ul").slideUp();
            $(this).addClass('clicked').siblings('ul').slideDown();
        }
    });
    // }

}
)
