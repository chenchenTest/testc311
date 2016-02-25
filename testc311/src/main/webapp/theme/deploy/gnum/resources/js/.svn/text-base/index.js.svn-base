/**
 * Created by dengshuang
 on 2015/7/2.
 */

$(function(){
    var height=window.innerHeight;        //屏幕内高度
    var width=window.screen.width;          //屏幕宽度
    var content1Height=$(".content1").outerHeight();   //content1 三张图片高度
    if(width>768){
        $(".head .logo").attr("src",$("#topbar_logo_active").val())
        $(".top").height(height)
        //resize 改变窗口大小
        $(window).resize(function(){
            var heightResize=window.innerHeight
            $(".top").height(heightResize)
        })
    }
    var topHeight=$(".top").height();
//    learnMore 的点击事件动画效果
    $(".learnMore").click(function(e){
    var distanceY = window.pageYOffset || document.documentElement.scrollTop;   //滚轮的高度
    $('html, body').animate({scrollTop: height},'slow')
    })

    //menu 中product标签的点击事件
    //$(".productIndex").click(function(){
    //    alert(1)
    //    $('html, body').animate({scrollTop: content1Height},'slow')
    //})



//    滚轮事件的函数
    $(document).on("scroll",function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop;    //滚轮的高度
        if(width>768){
            if(distanceY>0){
                $(".head").removeClass("topHead");
                $(".head").removeClass("headWhite");
                $(".head").slideDown("slow")
                $(".head .logo").attr("src",$path +"/resources/images/index/footerlogohover.png")
            }
            else{
                $(".head").addClass("topHead")
                $("#head").fadeOut("slow")
                $(".head .logo").attr("src",$path +"/resources/images/index/topbar_logo_default.png")
            }
        }
    })
})


