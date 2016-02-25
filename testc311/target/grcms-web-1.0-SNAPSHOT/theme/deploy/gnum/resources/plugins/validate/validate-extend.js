/** validation settings **/
$(document).ready(function() {
	var errorStatus;
	/**
	 * mobileNumberValid
	 * 符合电话号码的规则:4-13位数字
	 */
	$.validator.addMethod("mobileNumberValid", function(value, element, params) {
		var regex = /^\d{4,13}$/;
		return regex.test(value);
	}, "Please enter a valid phone number");

	/**
	 * accountValid
	 * 符合登陆账号的规则
	 */
	$.validator.addMethod("accountValid", function(value, element, params) {
		var regex = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,14}$/;
		return regex.test(value) || isValidNumber(value);
	}, "The number is invalid.");

	/**
	 * urlBasicCheck
	 * 验证gnumUrl的合法性
	 */
	$.validator.addMethod("urlBasicCheck", function(value, element, params) {
		var regex = /^[a-zA-Z0-9_]{3,15}/;
		return regex.test(value);
	}, "The URL is invalid.");

	/**
	 * nicknameValid
	 * 验证昵称的合法性
	 */
	$.validator.addMethod("nicknameValid", function(value, element, params) {
		var regex = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,14}$/;
		return value == "" || regex.test(value);
	}, "The nickname is invalid.");

	// 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。
	$.validator.addMethod("gnumPwd", function(value, element) {
		var regex = /^[A-Za-z0-9]{6,20}$/;
		//if the password is valid then add a prompt message
		var $element = $(element);
		var isValid = regex.test(value);
		//		if(isValid&&$element.siblings("div.input-success-msg").size()==0){
		//			$("<div class='input-success-msg'></div>").insertAfter($element);
		//		}

		return regex.test(value);
	}, "Please enter a password of length between 6 and 20 characters using letter and number");

	$.validator.addMethod("nameValid", function(value, element) {
		var regex = /^[A-Za-z]{1}[a-zA-Z0-9 | \s]{2,99}$/;

		var form = $(element).parents("form")[0];
		//if the form is profileForm then return
		if (form.id == "profileForm") {
			$(element).siblings("div.gnum-success").remove();
			//if the name is valid then add tips
			if (regex.test(value)) {
				$("<div class='gnum-success'><i class='icon-ok-sign'></i>Available</div>").insertAfter($(element));
			}
			return regex.test(value);
		}
		//if the name is valid then add a prompt message
		var $element = $(element);
		var isValid = regex.test(value);
		//		if(isValid&&$element.siblings("div.input-success-msg").size()==0){
		//			$("<div class='input-success-msg'></div>").insertAfter($element);
		//		}

		return regex.test(value);
	}, "The name is invalid");

	/**
	 * regex
	 * 自定义校验规则
	 */
	jQuery.validator.addMethod("regex", //addMethod第1个参数:方法名称
	function(value, element, params) {//addMethod第2个参数:验证方法，参数（被验证元素的值，被验证元素，参数）
		var exp = new RegExp(params);
		//实例化正则对象，参数为传入的正则表达式
		return exp.test(value);
		//测试是否匹配
	}, "Illegal character!");
	//addMethod第3个参数:默认错误信息

	/**
	 * remoteVerify
	 * ajax远程校验
	 */
	$.validator.addMethod("remoteVerify", function(value, element, param) {
		//extends validator
		if (this.optional(element))
			return "dependency-mismatch";
		//清除成功提示信息
		$(element).siblings(".input-success-msg").remove();

		var previous = this.previousValue(element);
		if (!this.settings.messages[element.name])
			this.settings.messages[element.name] = {};
		previous.originalMessage = this.settings.messages[element.name].remote;
		this.settings.messages[element.name].remote = previous.message;

		param = typeof param == "string" && {
			url : param
		} || param;

		if (this.pending[element.name]) {
			return "pending";
		}
		//如果是原先的值则添加正确提示符号然后直接返回
		if (previous.old === value) {
			$("<div class='input-success-msg'></div>").insertAfter(element);
			return previous.valid;
		}
		//add loading icon
		var $element = $(element);
		var val = $element.val();
		val = $.trim(val);
		if (val != "") {
			var wait = commonMsg.onLoad;
			var $loadObj = $("<span class='input-waiting-msg'>" + wait + "</span>");
			//$element.siblings().remove();
			$element.siblings(".input-success-msg").remove();
			$element.siblings(".input-waiting-msg").remove();
			$element.siblings(".error-tips").remove();
			$element.parent().append($loadObj.fadeIn());
		}

		previous.old = value;
		var validator = this;
		this.startRequest(element);
		var data = {};
		data[element.name] = value;
		$.ajax($.extend(true, {
			url : param,
			mode : "abort",
			port : "validate" + element.name,
			dataType : "json",
			data : data,
			success : function(response) {
				validator.settings.messages[element.name].remote = previous.originalMessage;
				//var valid = response === true;
				var valid = response;
				//删除loading
				$loadObj.remove();
				$element.siblings(".input-waiting-msg").remove();
				$element.siblings(".input-success-msg").remove();
				if (valid) {
					$("<div class='input-success-msg'></div>").insertAfter($element);
					var submitted = validator.formSubmitted;
					validator.prepareElement(element);
					validator.formSubmitted = submitted;
					validator.successList.push(element);
					validator.showErrors();
				} else {
					var errors = {};
					response = response || {};
					var message = response.available || validator.defaultMessage(element, "remoteVerify");
					/*if(errorStatus != 1000) {
					 message = commonMsg.sysError +'  <br/>Error code:<font color="#DA6015">' + errorStatus
					 +'</font><br/>Error Description:<font color="#DA6015">' + errorDescrip + '</font>';
					 }*/
					errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
					validator.showErrors(errors);
				}
				previous.valid = valid;
				validator.stopRequest(element, valid);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				var timeoutObj = '<div class="registerError" for="mobileNo" generated="true" style="display: block;">' + commonMsg.timeout + '</div>';
				$(element).siblings('.showError').empty().append(timeoutObj);
			}
		}, param));
		return "pending";
	}, $.validator.messages.remoteVerify);

	$.validator.addMethod("passwordValid", function(value, element, param) {
		if (this.optional(element)) {
			return "dependency-mismatch";
		}
		if (value === null || value.length === 0) {
			return true;
		}
		return $.validator.methods.remote.call(this, value, element, param);

	}, "password invalid");
	$.validator.addMethod("validCallNameOrPhone", function(value, element, param) {
		if (this.optional(element)) {
			return "dependency-mismatch";
		}
		if (value === null || value.length === 0) {
			return true;
		}
		if(stringUtils.isNum(value)){
			return isOK = $.validator.methods.mobileNumberValid.call(this,value,element,param);
		}else{
			return isOK = $.validator.methods.remote.call(this, value, element, param);
		}

	}, "plsease input valid callname or phone number");
}); 