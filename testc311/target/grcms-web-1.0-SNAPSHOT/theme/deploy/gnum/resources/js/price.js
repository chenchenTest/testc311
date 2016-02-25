/**
 * Created by dengshuang
 on 2015/7/7.
 */
$(function(){
    //    pc 下的函数
    $(".features img.pull-right").hover(function(e){
        var y= e.clientX;
        var x= e.clientY;
        var prevText=$(this).prev().text(); //当前元素"i"button的前一个元素的文字
        var selectArr=["MOBILE","LANDLINE","CALL LOG","DASHBOARD","ANALYTICS DASHBOARD","CUSTOMISED CALL BUTTON"];
        //text message array
        var textArr=["Tag your URL to your mobile phone.","Tag your URL to your home or office phone.","Flexibility of switching a different phone number to your URL, never miss an important call again.",
                   "Keep track of your minutes usage, and your caller.","Get to know your caller’s geographical location, IP addresses and URLs of pages which calls are initiated.","Get your own GNum call button, customised it with a profile picture or your company logo."]
        $(".addP").css({
            display:"block",
            top:x-30,
            left:y+25
        })
        //动态获取文字
         for(var j in selectArr){
            if(prevText==selectArr[j]){
                $(".addP").text(textArr[j])
            }
        }
    })


    //鼠标移开"i"button 时触发函数
    $(".features img.pull-right").mouseout(function(){
        $(".addP").css({
            display:"none"
        })
    })

    //mobile 下的函数
    $(".mobile img.pull-right").hover(function(e){
        var y= e.clientX;
        var x= e.clientY;
        var prevText=$(this).prev().text(); //当前元素"i"button的前一个元素的文字
        var selectArr=["MOBILE","LANDLINE","CALL LOG","DASHBOARD","ANALYTICS DASHBOARD","CUSTOMISED CALL BUTTON"];
        //text message array
        var textArr=["Tag your URL to your mobile phone.","Tag your URL to your home or office phone.","Flexibility of switching a different phone number to your URL, never miss an important call again.",
            "Keep track of your minutes usage, and your caller.","Get to know your caller’s geographical location, IP addresses and URLs of pages which calls are initiated.","Get your own GNum call button, customised it with a profile picture or your company logo."]
        var mobileWidth=$(".mobile").innerWidth();
        //动态获取文字
        for(var j in selectArr){
            if(prevText==selectArr[j]){
                $(".addP").text(textArr[j])
            }
        }
        $(".addP").css({
            display:"block",
            top:x-35,
            left:15,
            width:mobileWidth+"px"
        })
    });
    $(".addP").mouseout(function(){
        $(this).hide();
    })
    $(document).scroll(function () {
        $(".addP").hide();
    });

})


