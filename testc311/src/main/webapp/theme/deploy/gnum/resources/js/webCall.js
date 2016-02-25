/**
 * Created by Administrator on 2015/5/20.
 */

$(function() {
	var uuid = getUUID();
	$("#makecall").attr("data-updateID",uuid);

    $(".keypad").click(function(){/*点击键盘按钮*/
        webCall.keypadShow();
    })
    $(".keyboardCon .closeKeyboard").click(function(){ /*点击键盘关闭按钮*/
        webCall.keypadHide();
    })

    $(".help a").click(function(){
        webCall.showpcSetting();
    })
    $(".closed").click(function(){
    	webCall.closed();
    })

});



var webCall = {
	    connecting:function(){/*打电话时*/
	        $(".call").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/call_btn_ds.png)center no-repeat #14e9e3"});
	        $(".portrait").addClass("halo").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/wave_red.png) center no-repeat"});/*调用光晕效果的class*/
	        $(".portrait").eq(1).addClass("middle");
	    },
	    dailing:function(){/*connecting*/
	        $(".call").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/call_btn_ds.png)center no-repeat #c24040"});
	        $(".portrait").addClass("halo").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/wave_red.png) center no-repeat"});/*调用光晕效果的class*/
	        $(".portrait").eq(1).addClass("middle");
	    },
	    connected:function(){/*电话接通时*/
	        $(".call").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/call_btn_red.png)center no-repeat #c24040"});
	        $(".portrait").addClass("halo").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/wave_green.png) center no-repeat"});/*调用光晕效果的class*/
	        $(".portrait").eq(1).addClass("middle");
	    },
	    keypadShow:function(){/*显示键盘*/
	        $(".shelter").show();
	        $(".keypad").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/keypad_rollover.png) center no-repeat"});
	        $(".keyboardNum tr td").off().click(function() {
	            var val = $(this).text();
	            var number = val.split(" ")[0];
	            var $keywordVal = $(".keyWord").val();
				GRCaller.dtmf(number);
	            if ($keywordVal.length > 17) {
	                $keywordVal = $keywordVal.replace($keywordVal[0], "")
	            }
	            $(".keyWord").val($keywordVal + number);
	        });
	    },
	    keypadHide:function(){ /*关闭键盘*/
	        $(".keypad").css({background:"url("
	                    + $path
	                    + "/resources/images/calling/keypad_def.png) center no-repeat"});
	        $(".shelter").hide()
	    },
	    hideAll:function(){
	        $(".shelter").hide();
	        $(".pcSetting").hide();
	        $(".leaveNumber").hide();
	        $(".missCall").hide();
	        $(".networkProblem").hide();
			$(".webcall-modal").show();
	    },
	    leaveNumber:function(){/*显示  ”Thank you for Using GNum" 页面*/
	        webCall.hideAll();
			$(".webcall-modal").show();
	        $(".leaveNumber").show();
	        $(".dropdown").dropdownMenu();
	    },
	    missCall:function(){/*显示 “sorry your call is missed" 页面*/
	        webCall.hideAll()
	        $(".missCall").show();
	        $(".dropdown").dropdownMenu();
	    },
	    showNetworkpage:function(){/*显示 networkProblem 页面*/
	    	 webCall.hideAll()
	    	 $(".networkProblem").show();
	    },
	    showpcSetting:function(){/*显示PCsetting页面*/
	        webCall.hideAll();
	        $(".pcSetting").show();

	        var bVersion = GRCaller.detect.browserVersion();
	        var bName = GRCaller.detect.browserName();
	        var sWebRTC = GRCaller.detect.isSupportWebRTC();
	        var fVersion = GRCaller.detect.flashVersion();
	        var fVersionNum = fVersion.substr(0, fVersion.indexOf("."));
	        $(".browserVersion").text(bName + " " + bVersion);
	        $(".flashVersion").text(fVersion);
	        $(".systemEnvironment").text(getOSInfo());
	        if (fVersionNum < 10) {
	            this.pcSettingWrong();
	        }
	    },
	    pcSettingWrong:function(){/*显示当pcSetting页面为信息错误时的页面css*/
	        $(".list ul:eq(0) li")
	            .css(
	            {
	                background : "url('"
	                    + $path
	                    + "/resources/images/calling/wrong_red.png') left no-repeat"
	            });
	        $(".list ul:eq(0) li:first-child").css({
	            background : "none"
	        });
	        $(".list ul:eq(1) li:gt(0)").css({
	            color : "#A95959"
	        });
	        $(".list ul:eq(1) li:eq(2) a").css({
	            textDecoration : "underline",
	            cursor : "pointer",
	            color : "#A95959"
	        }).text("Download or Update").attr("href",
	            "https://get.adobe.com/flashplayer/?loc=en");/* 跳到下载页面 */
	    },
	    closed:function(){/*点击关闭按钮*/
	    	webCall.hideAll();
	    },
		hangup:function(){
			$(".dial .call").css({background:"url("
			+ $path
			+ "/resources/images/calling/call_btn_ds.png) center no-repeat #fff"});
			$(".portrait").removeClass("halo");
			$(".portrait").eq(1).removeClass("middle");
		}
	}

function getOSInfo() // 获取系统的环境
{
	var ua = navigator.userAgent, system;
	if (ua.indexOf("Windows") > -1) {
		system = "Windows";
	} else if (ua.indexOf("iPhone") > -1) {
		system = "iPhone";
	} else if (ua.indexOf("SymbOS") > -1) {
		system = "SymbOS";
	} else {
		system = "Others";
	}
	;
	return system;
};

function getUUID(){
	var callname = $(".callName").text();
	var timestamp = new Date();
	return $.md5(callname + timestamp);
}
function saveAnonymousNumber(){
	var anonymousNumber = $("#anonymousNumber").val();
	var reg = new RegExp("^[0-9]{6,11}$");
	if(!reg.test(anonymousNumber)){
		Msg.alert("Please input a valide number");
		//webCall.closed();
		return ;
	}

	var number = $("#countryCode").val() + anonymousNumber;
	var updateId = $("#makecall").attr("data-updateID");
	webCall.closed();
	var url = "/makecall/leavenumber/?number="+number + "&updateId=" + updateId;
	$.get($path + url,function(data){
		console.log("save number result:" + data);
	});
}