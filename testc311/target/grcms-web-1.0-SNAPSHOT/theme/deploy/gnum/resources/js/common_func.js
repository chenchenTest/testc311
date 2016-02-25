/**
 *ajax全局设定
 */
(function($) {
	if ( typeof $ === "undefined") {
		throw new Error("jQuery is required :(");
	}

	$(document).ajaxSuccess(function(evt, request, settings) {
		var data = request.responseText;
		try {
			var msg = $.parseJSON(data);
			// 若状态为301,则session为空
			if ("301" == msg.codeStatus) {
				location.href = $path + "/signin/";
			}
		} catch (e) {
		}
	});
})(jQuery);

/**
 * 提交表单请求
 *
 * @param e
 */
function submitForm(element) {
	var $e = $(element);
	var $form = $e.parents("form");
	$form.submit();
}

/**
 * 当表单验证通过后
 * 在表单提交时，阻止表单重复提交
 * @param self
 */
function waitOnSubmit(self) {
	var $form = self;
	var $subBtn = $form.find("button[type='submit']");
	var $input = $form.find("input");
	var $label = $form.find("label");
	$subBtn.data("text", $subBtn.text());
	var waitMsg = commonMsg.wait;
	$subBtn.html(waitMsg);

	var counter = 0;
	var intervalTime = setInterval(function() {
		counter++;
		waitMsg += ".";
		if (counter == 4) {
			waitMsg = commonMsg.wait;
			counter = 0;
		}
		$subBtn.html(waitMsg);
	}, 1000);

	$subBtn.addClass("btn-disabled");
	$subBtn.attr("disabled", "disabled");
	$input.attr("readonly", "readonly");
	$label.attr("readonly", "readonly");

	return intervalTime;
}

/**
 * ajax提交表单后恢复表单可编辑状态
 */
function resumeForm(self, intervalTime) {
	var $form = self;
	var $subBtn = $form.find("button[type='submit']");
	var $input = $form.find("input");
	var $label = $form.find("label");

	clearInterval(intervalTime);
	$subBtn.text($subBtn.data("text"));

	$subBtn.removeClass("btn-disabled");
	$subBtn.removeAttr("disabled");
	$input.removeAttr("readonly");
	$label.removeAttr("readonly");
}

/**
 *发送OTP
 * @param mobile 需要发送OTP的目标电话号码
 * @param countryCode 需要发送OTP的目标电话号码的国家代码
 * @param type 发送http请求的类型，默认为post方式,可选值为add:表示添加call number以get请求方式发送
 * @param callback 发送请求失败回调函数
 *
 */
function sendOTP(mobile, countryCode, type,callback) {
	if ((mobile == null) || (countryCode == null)) {
		throw new Error("param cannot be null");
	}
	var param = {
		phoneNumber : mobile,
		countryCode : countryCode
	};
    var sendResult = {"cancel":false};
	var url = $path + "/OTP/register/";
	var method = "post";
	if (type === "add") {
		url = $path + "/callnumber/add/otp/";
		method = "get";
	}

	$[method](url, param, function(data) {
		if ("true" === data) {
			Msg.alert("send otp success", "alert-success");
		} else {
			Msg.alert("send otp failed", "alert-warning");
            if (typeof callback ==="function") {
                callback.call(this);
            }
		}
	});
    return sendResult;
}

function verifyOTP(mobile, countryCode, otp, callback) {
	if ((mobile == null) || (countryCode == null) || (otp == null)) {
		throw new Error("param cannot be null");
	}
	var param = {
		phoneNumber : mobile,
		countryCode : countryCode,
		otpCode : otp
	};
	var url = $path + "/OTP/validOTP/";
	$.post(url, param, function(data) {
		if ("true" === data) {
			alert("otp验证成功。");
			//验证成功后,执行回调操作
			if ( typeof callback === "function") {
				callback(mobile, countryCode, otp);
			}
		}
	});
}

function addCallNumber(mobile, countryCode, otp, callback) {
	if ((mobile == null) || (countryCode == null) || (otp == null)) {
		throw new Error("param cannot be null");
	}
	var param = {
		phoneNumber : mobile,
		countryCode : countryCode,
		OTP : otp
	};
	var url = $path + "/callnumber/add/";
	$.post(url, param, function(data) {
		if ( typeof callback === "function") {
			callback(data);
		}
	});
}

//扩展String的方法
String.prototype.replaceAll = function(s1, s2) {
	return this.replace(new RegExp(s1, "gm"), s2);
};
//字符串工具方法
window.stringUtils = {};
//移除字符串中的'+'号
stringUtils.removePlus = function(str) {
	return str.replace(/\+/gm, "");
};
//获取地址栏中的参数
stringUtils.getParam = function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
};
//判断字符串是否为数字
stringUtils.isNum = function IsNum(s) {
	if (s != null && s != "") {
		return !isNaN(s);
	}
	return false;
};

/**
 * 刷新联系人列表
 */
function refreshData(url, e) {
	if ( typeof e != "undefined") {
		var $e = $(e);
		var $form = $e.parents("form");
		if ($form.length != 0) {
			var params = $form.serialize();
			url += "?" + params;
		}
	}
	//var $wrap = $("#data-list");
	$.ajax({
		url : url,
		dateType : "html",
		success : function(view) {
			$("#table-list-container").html(view);
			/*$("#data-list .dropdown").easyDropDown();*/
			// bindToggleOptions();
			//location.hash = "call-history";//让表格在刷新数据后保持原来的位置
			/*$("body").ECClose();*/
		}
	});
}

//提示消息工具类
var Msg = {
	/**
	 * @param  message 提示信息
	 * @param style 提示框应用的样式,如alert-success,alert-warning详见bootstrap http://getbootstrap.com/components/#alerts
	 * @param container 提示信息框要放置的位置,默认为#data-container
	 * @param autoClose 是否自动关闭提示信息框,true:自动关闭，false:不自动关闭默认情况下是3秒后自动关闭提示信息框
	 */
	alert : function(message, style, container, autoClose) {
        var $modalContainer = $('<div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="messageModal" aria-hidden="true"></div>');
        var $modal = $('<div class="modal-dialog"></div>');
        var $content = $('<div class="modal-content"></div>');
        var $header = $('<div class="modal-header"></div>');
        var $title = $('<h4 class="modal-title" id="myModalLabel"></h4>');
        var $body = $('<div class="modal-body">'+message+'</div>');
        $modalContainer.append($modal);
        $modal.append($content);
        //$content.append($header);
        //$header.append($title);
        $content.append($body);
        $modal.appendTo($modalContainer);
        $modalContainer.modal("show");
		if (autoClose !== false || autoClose != null) {
			setTimeout(function() {
                $modalContainer.modal("hide");
			}, 1500);
		}
	}
};
//弹出居中的浏览器窗体
function popupCenter(url, title, w, h) {
	// Fixes dual-screen position                       Most browsers      Firefox
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	var left = ((screen.width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((screen.height / 2) - (h / 2)) + dualScreenTop;
	var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

	// Puts focus on the newWindow
	if (window.focus) {
		newWindow.focus();
	}
}
