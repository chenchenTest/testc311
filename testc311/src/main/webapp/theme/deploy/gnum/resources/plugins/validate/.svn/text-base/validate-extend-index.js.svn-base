/** validation settings **/
$(document).ready(function(){
	/**
	 * setting of validate
	 */
	$.validator.setDefaults({
		errorElement: "p",
		errorClass: 'validation-false',
		highlight: function(element, errorClass){
			var $element = $(element);
			$element.parents("form").find("button[type='submit']").addClass("btn-disabled-large");
            $element.parents("form").find("button[type='submit']").attr("disabled", "disabled");
        },
        unhighlight: function(element, errorClass){
        	var $element = $(element);
        	$element.parents("form").find("button[type='submit']").removeClass("btn-disabled-large");
            $element.parents("form").find("button[type='submit']").removeAttr("disabled");
        },
		errorPlacement: function(error, element){
            var $element = $(element);
            
            $element.parent().find("p.validation-false").remove();
            $element.parent().find("p.validation-true").remove();
            $element.parent().append(error.fadeIn());
        }
	});
	
	
	var errorStatus;
	
	/**
	 * nicknameValid
	 * 验证昵称的合法性
	 */
	$.validator.addMethod("nicknameValid", function(value, element, params){
		var regex = /^[a-z,A-Z]{1}\w+(\w+)$/;
        return value=="" || regex.test(value);
	},"Unavailable");

	/**
	 * regex
	 * 自定义校验规则
	 */
	jQuery.validator.addMethod("regex", //addMethod第1个参数:方法名称 
		function(value, element, params) { //addMethod第2个参数:验证方法，参数（被验证元素的值，被验证元素，参数） 
		var exp = new RegExp(params); //实例化正则对象，参数为传入的正则表达式 
		return exp.test(value); //测试是否匹配 
		}, 
	"Illegal character!"); //addMethod第3个参数:默认错误信息 
	
	/**
	 * remoteVerify
	 * ajax远程校验
	 */
    $.validator.addMethod("remoteVerify", function(value, element, param){
		//extends validator
        if (this.optional(element)) 
            return "dependency-mismatch";
        
        var previous = this.previousValue(element);
        if (!this.settings.messages[element.name]) 
            this.settings.messages[element.name] = {};
        previous.originalMessage = this.settings.messages[element.name].remote;
        this.settings.messages[element.name].remote = previous.message;
        
        param = typeof param == "string" &&
        {
            url: param
        } ||
        param;
        
        if (this.pending[element.name]) {
            return "pending";
        }
        if (previous.old === value) {
            return previous.valid;
        }
          //add loading icon
        var $element = $(element);
		/*var val = $element.val();
		val = $.trim(val);
		if(val!="") {
            var wait = commonMsg.onLoad;
            var $loadObj = $("<span class='input-waiting-msg'>" + wait + "</span>");
       	 $element.after($loadObj.fadeIn());
		}*/
        $element.siblings("p").remove();
        /*if(value.length>=10) 
        	return false;*/
        $element.parents("form").find("button[type='submit']").addClass("btn-disabled-large");
        $element.parents("form").find("button[type='submit']").attr("disabled", "disabled");
        previous.old = value;
        var validator = this;
        this.startRequest(element);
        var data = {};
        data[element.name] = value;
        $.ajax($.extend(true, {
            url: param,
            mode: "abort",
            port: "validate" + element.name,
            dataType: "json",
            data: data,
            success: function(response){
                validator.settings.messages[element.name].remote = previous.originalMessage;
                //var valid = response === true;
                var valid = response;
                //删除loading
                //$loadObj.remove();
                $element.siblings("p.validation-true").remove();
                $element.siblings("p.validation-false").remove();
                $element.parents("form").find("button[type='submit']").removeClass("btn-disabled-large");
                $element.parents("form").find("button[type='submit']").removeAttr("disabled");
                
                if (valid) {
                    $("<p class='validation-true'>Available</p>").insertAfter($element);
                    
                    var submitted = validator.formSubmitted;
                    validator.prepareElement(element);
                    validator.formSubmitted = submitted;
                    validator.successList.push(element);
                    validator.showErrors();
                }
                else {
                    var errors = {};
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
			error: function(XMLHttpRequest, textStatus, errorThrown){
				var timeoutObj = '<p class="validation-false" for="front-main-unit-1-custom-url1" generated="true" style="display: block;">'
				+commonMsg.timeout+'</p>';
                $(element).siblings('.validation-false').remove();
                $(element).siblings('.validation-true').remove();
                $(element).parent().append(timeoutObj);
            }
        }, param));
        return "pending";
    },$.validator.messages.remoteVerify);
    
});