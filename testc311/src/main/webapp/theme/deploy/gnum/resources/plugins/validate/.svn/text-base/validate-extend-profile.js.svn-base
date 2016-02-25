/** validation settings **/
$(document).ready(function(){
	  $.validator.setDefaults({
		    errorElement: "div",
	        errorPlacement: function(error, element){
	        	 //alert(error.length);
	             var $element = $(element);
				 $element.parent().find(".gnum-error").remove();
				 $element.parent().find(".gnum-loading").remove();
				 $element.parent().find(".gnum-success").remove();
				 $element.after(error.fadeIn());
	         }
	    });
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
		var val = $element.val();
		val = $.trim(val);
		if(val!="") {
            var wait = "Validating Handle";
            var $loadObj = $("<span class='gnum-loading'>" + wait + "</span>");
		 //$element.siblings().remove();
           $element.siblings(".gnum-success").remove();
           $element.siblings(".gnum-loading").remove();
           $element.siblings(".gnum-error").remove();
       	 $element.after($loadObj.fadeIn());
		}
        
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
                $element.siblings(".gnum-loading").remove();
                $element.siblings(".gnum-success").remove();
                if (valid) {
                    $("<div class='gnum-success'><i class='icon-ok-sign'></i>Available</div>").insertAfter($element);
                    
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
				var timeoutObj = '<div class="registerError" for="mobileNo" generated="true" style="display: block;">'
				+commonMsg.timeout+'</div>';
                $(element).siblings('.showError').empty().append(timeoutObj);
            }
        }, param));
        return "pending";
    },$.validator.messages.remoteVerify);
    
});