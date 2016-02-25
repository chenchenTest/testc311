
$(function(){
    $(".dashboard-left-menu .nav .arrow a").click(function (){
        var $navObj = $("#main");
        var $mainRight = $("#main-right");
       if($navObj.hasClass("open")){
           $navObj.removeClass("open");
       }else{
           $navObj.addClass("open");
       }
    });

    $(".mobile-right-head-image").click(function(){
        menu.mobileMenu.menu();
    });


    $(".dashboard a").click(function(){
        menu.dashboard(this);
    });
    $(".profile a").click(function(){
        menu.profile(this);
    });
    $(".contacts a").click(function(){
        menu.contacts(this);
    });
    $(".call-logs a").click(function(){
        menu.callLogs(this);
    });

});


var  menu = {
    //加载dashboard模块
    dashboard:function(obj){
    	menu.loadWait();
        $.get($path + "/dashboard/",function(data){
        	$("#main-title label").text("DASHBOARD");
            $("#main-title img").attr("src","../resources/images/dashboard/dashboard_title.png");
        	menu.changeClass(obj);
            if(menu.isJson(data)){
                menu.toLogin();
                return;
            }
            $("#data-container").html(data);
            menu.hideWait();
            menu.callback();
        });
    },
    //加载联系人模块
    contacts:function(obj){
    	menu.loadWait();
        $.get($path + "/contacts/",function(data){
        	$("#main-title").text("Contacts");
        	menu.c(obj);
            if(menu.isJson(data)){
                menu.toLogin();
                return;
            }
            $("#data-container").html(data);
            menu.hideWait();
            menu.callback();
        });

    },
    //加载profile模块
    profile:function(obj,val){
    	menu.loadWait();
        $.get($path + "/profile/",function(data){
        	$("#main-title label").text("PROFILE");
            $("#main-title img").attr("src","../resources/images/dashboard/profile_title.png");
        	menu.changeClass(obj);
            if(menu.isJson(data)){
                menu.toLogin();
                return;
            }
            $("#data-container").html(data);
            menu.hideWait();
            if(val != undefined){
            	$(val).focus();
            }
            menu.hideWait();
            menu.callback();
        });

    },
    //加载call log html
    callLogs:function(obj){
    	menu.loadWait();
        $.get($path + "/calllog/",function(data){
        	$("#main-title label").text("CALL LOGS");
            $("#main-title img").attr("src","../resources/images/dashboard/log_title.png");
        	menu.changeClass(obj);
            if(menu.isJson(data)){
                menu.toLogin();
                return;
            }
            $("#data-container").html(data);
            menu.hideWait();
            menu.callback();
            $(".data-title .time").css("display","block");
        });
    },
    //加载load遮盖层
    loadWait:function(){
    	$('#wait').modal({backdrop:'static',keyboard:false,show:true});
        $("body").css("padding-right","0px");
    },
    //隐藏load遮盖层
    hideWait:function(){
    	$('#wait').modal('hide');
    },
    //设置左边菜单高度
    menuHeight:function(){
        $(".dashboard-left-menu").height($("body").height());
    },
    //修改菜单栏a元素样式
    changeClass:function(obj){
        $(obj).addClass("active").parent().siblings().children("a").removeClass("active");
        var temp = $("#navbar-collapse-head").attr('aria-expanded');
        if(temp == 'true'){
            $(".navbar-header .navbar-toggle").click();
        }

    },
    //执行完加载模块html后统一回调方法
    callback:function(){
        $(".data-title .time").css("display","none");
        menu.menuHeight();
    },
    //判断是否为json，这里用于检测用户登录情况
    isJson:function(obj){
            try{
                eval("(" + obj +")");
                return true;
            }catch (e){
                return false;
            }
    },
    //跳转至登录页面
    toLogin : function (){
            location.href = $path + "/signin/";
    }
}