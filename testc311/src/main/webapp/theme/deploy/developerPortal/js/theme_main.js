/**
 * 设置默认验证规则参数
 */
var validDefaults = {
	errorElement : 'label',
	errorClass : 'text-danger',
	focusInvalid : false,
	highlight : function(e) {
		$(e).closest('.form-group').addClass('has-error');
	},
	success : function(e) {
		$(e).closest('.form-group').removeClass('has-error');
	},
	errorPlacement : function(error, element) {
		if (element.is(':checkbox') || element.is(':radio')) {
			var controls = element.closest('.controls');
			if (controls.find(':checkbox,:radio').length > 1)
				controls.append(error);
			else
				error.insertAfter(element.nextAll('.lbl').eq(0));
		} else if (element.is('.chzn-select')) {
			error.insertAfter(element.nextAll('[class*="chzn-container"]').eq(0));
		} else {
			error.insertAfter(element);
		}
	},
	submitHandler:function(form){
		var $form = $(form);
    	var url = $form.attr("action");
    	var method = $form.attr("method");
    	var nvp = $form.serialize();
    	$.ajax({
			url:url,
			type:method,
			data:nvp,
			success:function(data){
				var data = eval('(' + data + ')');
                 if(data){
   	              	tips.success("保存成功");
                 }else{
                	tips.error("保存失败");
                 }
			}
		});
	}
};



$(function() {
	$.validator.setDefaults(validDefaults);
	$("#memberRegisterForm").validate({
		rules:{
			accountType:{
				required:true
			},
			firstname:{
				required:true
			},
			lastname:{
				required:true
			},
			email:{
				required:true,
				email:true,
				remote:path + "/ldap/email/available"
			},
			loginId:{
				required:true,
				remote:path + "/ldap/member/available"
			},
			password:{
				required:true
			},
			confirmPassword:{
				required:true,
				equalTo:"#password"
			}
		},
		messages:{
			accountType:{
				required:"Please choose an account type"
			},
			firstname:{
				required:"Please provide a first name"
			},
			lastname:{
				required:"Please provide a last name"
			},
			email:{
				required:"Please provide an email address",
				email:"Its not a email address",
				remote:"The email is exist,please use anther one"
			},
			loginId:{
				required:"Please provide a login id",
				remote:"The login id is exist,please use anther one"
			},
			password:{
				required:"Please provide a password"
			},
			confirmPassword:{
				required:"The two passwords are not the same"
			}
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element);
		},
		submitHandler : function(form) {
			var $form = $(form);
			var url = $form.attr("action");
			var method = $form.attr("method");
			var nvp = $form.serialize();
			var $btn = $form.find(":submit");
			$btn.button("loading");

			$.ajax({
				url : url,
				type : method,
				data : nvp,
				dataType : "json",
				success : function(result) {
					$btn.button("reset");
					if (result == true) {
						$("#registerModal").modal("hide");
						alert("Register success");
						form.reset();
					} else {
						alert("Register failed:" + result.code + "," + result.message);
					}
				}
			});
		}
	});
	$("#memberLoginForm").validate({
		rules:{
			loginId:{
				required:true
			},
			password:{
				required:true
			},
			verifyCode:{
				required:true,
				remote:path + "/verifycode/available"
			}
		},
		messages:{
			loginId:{
				required:"Please provide a login id"
			},
			password:{
				required:"Please provide a password"
			},
			verifyCode:{
				required:"Please provide a verify code",
				remote:"Verify Code is not correct"
			}
		},
		errorPlacement : function(error, element) {
			error.insertAfter(element);
		},
		submitHandler : function(form) {
			var $form = $(form);
			var url = $form.attr("action");
			var method = $form.attr("method");
			var nvp = $form.serialize();
			var $btn = $form.find(":submit");
			$btn.button("loading");
			
			$.ajax({
				url : url,
				type : method,
				data : nvp,
				dataType : "json",
				error:function (XMLHttpRequest, textStatus, errorThrown) {
					$btn.button("reset");
					alert("error");
				},
				statusCode: {
					404: function() {
						$btn.button("reset");
						alert('page not found');
					},
					500:function(){
						$btn.button("reset");
						alert('500 error');
					},
					503:function(){
						$btn.button("reset");
						alert('503 error');
					}
				},
				success : function(result) {
					$btn.button("reset");
					if (result == true) {
						$("#loginModal").modal("hide");
						alert("Login success");
						form.reset();
					} else {
						alert("Login failed:" + result.code + "," + result.message);
					}
				}
			});
		}
	});
	
	$("#memberRegisterForm").find(":submit").attr("disabled","disabled");
	$("#agree").on("change",function(){
		if($(this).prop("checked")){
			$("#memberRegisterForm").find(":submit").removeAttr("disabled");
		}else{
			$("#memberRegisterForm").find(":submit").attr("disabled","disabled");
		}
	})
	
});

