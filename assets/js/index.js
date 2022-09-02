
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

$(document).ready(function map() {
    /**
   * ---------------------------------------
   * This demo was created using amCharts 4.
   * https://www.amcharts.com/
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
    //chart homeZoom và home GeoPoint là sẽ zoom đến điểm chỉ định, lấy chỉ số bằng cách vào f12 console gõ chart.homeZoomLevel - chart.homeGeoPoint
    // (Ko hiểu sao khi viết ra file riêng ko dùng 2 lệnh trên đc mà phải nhúng map trực tiếp vào html rồi nhập lệnh mới ra rồi lấy chỉ số gắn ngược lại đây)
    chart.homeZoomLevel = 3.3;
    chart.homeGeoPoint = {
        latitude: 21.405135621844433,
        longitude: 106.37697680683515
    };

    // chart.events.on("ready", function (ev) { //function chạy khi bắt đầu 
    //     // chart.zoomToMapObject(polygonSeries.getPolygonById("VN-HN")); //function chạy sẽ zoom đến khu vực chỉ định theo id (xem trong file của các nước trong geodata)

    // });

    //Các nút home và zoom của map
    let zoombutton = chart.zoomControl = new am4maps.ZoomControl();
    let button = chart.chartContainer.createChild(am4core.Button); // tạo nút home để ấn quay về ban đầu khi đang zoom
    button.padding(5, 5, 5, 5);
    button.align = "right";
    button.marginRight = 15;
    // button.width = 100; set width theo px
    // container.width = am4core.percent(100); set width theo %
    // button.fill = am4core.color("green"); Thay đổi màu nền
    // rect.stroke = am4core.color("red"); Thay đổi màu viền
    button.events.on("hit", function () {
        chart.goHome();
    });
    let icon_button = button.icon = new am4core.Sprite();
    icon_button.path = "M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 10 21 L 10 14 L 14 14 L 14 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z";

    // Click eventlistener
    polygonTemplate.events.on("hit", function (ev) { //bắt sự kiện click 'hit' của amchart tạo ra function truyền vào đối số ev 
        // function removeDiv() {
        //     document.getElementsByClassName('ampopup-content').style.display = "none";
        // }
        chart.closeAllPopups(); //khi function chạy sẽ đóng tất cả những popups có trước đó rồi mở popup dưới
        chart.openPopup( //mở popup
            "Bạn muốn khám phá những điểm du lịch tại <strong>" + ev.target.dataItem.dataContext.name + "</strong><br><br>" +
            "<div class='button-content'><a href='" + ev.target.dataItem.dataContext.id + "'>Đúng vậy! </a></div>"
            // + "<a href='#' onclick='" + removeDiv() + "'>No </a>"
        );
    });
    chart.chartContainer.wheelable = false; // Vô hiệu hóa zoom của bản đồ
}
)