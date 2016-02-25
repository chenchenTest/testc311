/**
 * Created by Administrator on 2015/7/7.
 */
/*pc log in slide animation*/
$(function () {
    $(".signed").hover(function(){
        $(".hoverSigned").slideDown()
    },function(){
        $(".hoverSigned").hide()
    })

    //adjust ios not support css(fixed)
    var isiPhone=navigator.userAgent.indexOf("iPhone")>0;    //is iPhone or not
        $("input,textarea").on("focus",function(){
           // alert("focus");
            if(isiPhone){
                $(".head").css({
                    position:"absolute"
                })
            }
        })
    $("input,textarea").on("blur",function(){
        if(isiPhone){
            $(".head").css({
                position:"fixed"
            })
        }
    })
});

