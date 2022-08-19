
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

function map() {
    /**
   * ---------------------------------------
   * This demo was created using amCharts 4.
   *
   * For more information visit:
   * https://www.amcharts.com/
   *
   * Documentation is available at:
   * https://www.amcharts.com/docs/v4/
   * ---------------------------------------
   */

    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart); //lấy chartdiv rồi tạo mapchart trong div

    // Set map definition
    chart.geodata = am4geodata_vietnamLow; //Sử dụng map ở Vietnam (phải kết nối file js của VN ở html bằng js <script src="https://www.amcharts.com/lib/4/geodata/vietnamLow.js"></script> của nước nào dùng nước đó hoặc của thế giới thì dùng worldLow, trong thư mục geodata sẽ có hết)
    chart.geodataNames = am4geodata_lang_VI; //Ngon ngữ để sử dụng bản đồ (cũng phải kết nối file ngôn ngữ JS ở HTML <script src="https://www.amcharts.com/lib/4/geodata/lang/VI.js"></script>)

    // Set projection
    chart.projection = new am4maps.projections.Miller(); //tìm hiểu thêm

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Exclude Antartica
    polygonSeries.exclude = ["AQ"];

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}"; //Hover vào sẽ hiện tên các tỉnh
    polygonTemplate.fill = am4core.color("gray"); //màu bản đồ

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover"); //tạo ra hover
    hs.properties.fill = am4core.color("aqua"); //thay đổi màu địa phận khi hover vào

    chart.events.on("ready", function (ev) { //function chạy khi bắt đầu 
        chart.zoomLevel = 5;
        // chart.zoomToMapObject(polygonSeries.getPolygonById("VN-HN")); //function chạy sẽ zoom đến khu vực chỉ định theo id (xem trong file của các nước trong geodata)
    });
}
map();