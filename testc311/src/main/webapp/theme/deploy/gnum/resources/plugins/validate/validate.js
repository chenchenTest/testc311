$(document).ready(function(){
	// Validate sign in
	if($('#formSignIn').length>0){
		$('#formSignIn').validate({
			rules: {
				account: {
					required: true,
					/*accountValid: true,*/
					remote:{
						url:$path+"/signin/check/",
						type:"GET",
						data:{
							nickname: function(){
								return $('#username').val();
							},
							password:function(){
								return $('#password').val();
							}
						}
					}
				},
				password: {
					required: true,
					rangelength: [6,20]
					/*remote:{
						url:$path+"/signin/verificLogin/",
						type:"POST",
						data:{
							account:function(){
								return $('#username').val();
							},
							password:function(){
								return $('#password').val();
							}
						}
					}*/
				}
			},
			messages: {
				account: {
					required: signinMsg.account.required,
					accountValid: signinMsg.account.accountValid,
					remote:signinMsg.account.remote
				},
				password: {
					required: signinMsg.password.required,
					rangelength: signinMsg.password.rangelength,
					remote:signinMsg.password.remote
				}
			},
			/*errorPlacement: function(error, element){
		            var $element = $(element);
		            if(error.attr("for")=="password"){
		            	$("#password").removeClass("error-tips");
		        		//error.addClass("error-tips-pwd");
		        	}
		            $element.after(error);
		        },*/
			errorPlacement:function(error){
				if ($("#errorBox").html() != "")
                    return false;

                $("#errorBox").html(error);
			},
			submitHandler: function(form){
				$.ajax({
					type:"post",
					url:$path+"/signin/verificLogin/",
					data:{account:function(){
						return $('#username').val();
					},
					password:function(){
						return $('#password').val();
					}},
					success:function(data){
						
						if(data=="true"){
							
							form.submit();
						}else{
							$("#errorBox").show();
							$("#errorBox li:not(0)").remove();
							$("#errorBox").append("<li><label id='password-error' class='error-tips' style='display: inline-block;' for='password'></label></li>");
							$(".error-tips").html("The call name or password is invalid");
						}
					}
				});
				//form.submit();
				//waitOnSubmit($(form));
			}
		});
	}
	
	if($('#forget-callname-form').length>0){
		$('#forget-callname-form').validate({
			//debug : true,
			//errorClass : "gnum-error",
			rules : {
				email : {
					required:true,
					email : true,
					remote : {
						url : $path + '/forget/email/exist/',
						type : 'get',
						dateType : "json",
						data : {
							email : function() {
								return $('#forget-callname-form').find(
										"input[name='email']").val();
							}
						}
					}
				}
			},
			messages : {
				email : {
					required:"Email can not be empty.",
					remoteVerify : "Email address cannot be found"
				}
			},
			submitHandler : function(form) {
				var $submit = $(form).find(":submit");
				$submit.button('loading');
				form.submit();
			}
		});
	}
	
	if($('#forget-password-form').length>0){
		$('#forget-password-form').validate({
			rules : {
				email : {
					required:true,
					email : true,
					remote : {
						url : $path + '/forget/email/exist/',
						type : 'get',
						dateType : "json",
						data : {
							email : function() {
								return $('#forget-password-form').find(
										"input[name='email']").val();
							}
						}
					}
				}
			},
			messages : {
				email : {
					required:"Email can not be empty.",
					remoteVerify : "Email address cannot be found"
				}
			},
			submitHandler : function(form) {
				var $submit = $(form).find(":submit");
				$submit.button('loading');
				form.submit();
				/* var url = $form.attr("action");
				var method =  $form.attr("method");
				var params = $(form).serialize();
				$.ajax({
					type:method,
					url:url,
					data:params,
					success:function(data){
						
					}
				}); */
			}
		});
	}
	
	if($('#register-form').length>0){
		//得到网站根路径
		var baseURL = $("#basePath").val();
		var _validateter=$('#register-form').validate({
			errorClass: 'valid-error',
	        errorElement: "span",
	        onkeyup:false,
	        //focusInvalid : true,
			rules: {
				nickname: {
					required:true,
					rangelength: [3, 15],
					//nicknameValid: true,
					remote: {
						url: baseURL + '/register/check/nickname/',
						type: 'get',
						dateType: "json",
						data: {
							nickname: function(){
								return $('#registerGnumUrlInput').val();
							}
						}
					}
				},
				name:{
					required: true,
					nameValid: true,
				},
				phonenumber: {
					required: true,
					mobileNumberValid: true,
					remote: {
						url: baseURL + '/register/check/phonenumber/',
						type: 'get',
						dateType: "json",
						data: {
							phonenumber: function(){
								return $("#countryCode").val() + $('#registerMobileNumberInput').val();
							}
						}
					}
				},
				email: {
					required: true,
					email: true,
					remote: {
						url: baseURL + '/register/check/email/',
						type: 'get',
						dateType: "json",
						data: {
							email: function(){
								return $('#registerEmailInput').val();
							}
						}
					}
				},
				otpCode: {
					required: true,
					remote: {
						url: baseURL + "/OTP/validOTP/",
						type: 'get',
						dateType: "json",
						data: {
							phoneNumber: function(){
								return $("#registerMobileNumberInput").val();
							},
							countryCode:function(){
								return $('#countryCode').val();
							},
							otpCode: function(){
								return $('#otpCode').val();
							}
						}
					}
				},
				password: {
					required: true,
					gnumPwd: true
				}
			},
			messages: {
				nickname: {
					required: registerMsg.gnumUrl.required,
					rangelength: registerMsg.gnumUrl.rangelength,
					nicknameValid: registerMsg.gnumUrl.nicknameValid,
					remote: registerMsg.gnumUrl.remote
				},
				phonenumber: {
					required: registerMsg.mobileNumber.required,
					mobileNumberValid: registerMsg.mobileNumber.mobileNumberValid,
					sgMobile: registerMsg.mobileNumber.mobileNumberValid,
					remote: registerMsg.mobileNumber.remote
				},
				name: {
					required: registerMsg.name.required,
				},
				email: {
					required: registerMsg.email.required,
					email: registerMsg.email.email,
					remote: registerMsg.email.remote
				},
				otpCode: {
					required: "Please enter the OTP that was sent to you via SMS",
					remote: "please enter a valid OTP code"
				},
				password: {
					required: registerMsg.password.required
				}
			},
			highlight: function(element, errorClass){
	            //验证错误的表单设置高亮  
				$(element).closest(".form-group").addClass("has-error has-feedback");
	        },
	        unhighlight: function(element, errorClass){
	            //验证正确的表单取消高亮 
	        	var $icon = $(element).siblings(".glyphicon");
	        	if($icon.length > 0) {
	        		$icon.remove();
	        	}
	        	$(element).closest(".form-group").removeClass("has-error has-feedback");
	        },
	        errorPlacement: function(error, element){
				 var $wraper = $(element).parents(".form-group").find(".error-wrap");
				 $wraper.empty().append(error.fadeIn());
	         },
			submitHandler: function(form){
				var $submit = $(form).find(":submit");
				$submit.button('loading');
				form.submit();
			}
		});
	}
	
	
	
	if($("#refer-form").length>0) {
		$("#refer-form").validate({
			debug: true,
			errorClass: "error-tips-top",
			submitHandler: function(){
				alert('refered');
			},
			rules: {
				refer_mobileNumber: {
					required: true,
					mobileNumberValid: true
				}
			},
			messages: {
				refer_mobileNumber: {
					required: registerMsg.mobileNumber.required,
					mobileNumberValid: registerMsg.mobileNumber.mobileNumberValid
				}
			}
		});
	}
	
	
	// 添加联系人校验
	if($("#add-contact-form").length>0) {
		$("#add-contact-form").validate({
			errorClass: "error-tips-top",
			ignore:'.ignore',
			debug: true,
			rules: {
				contactsName: {
				//	required: true,
					maxlength: 50
				},
				phonenumber: {
//					required: true,
//					mobileNumberValid: true
				},
				gnumURL: {
//					required: true,
//					urlBasicCheck: true
					/*,
					remoteVerify: {
						url: 'isPhoneNumberAvailable',
						type: 'get',
						dateType: "json",
						data: {
							phonenumber: function(){
								return $('#registerMobileNumberInput').val();
							}
						}
					}*/
				}
			},
			messages: {
				contactsName: {
					maxlength: contactsMsg.contactsName.maxlength
				},
				phonenumber: {
					required: contactsMsg.phonenumber.required,
					mobileNumberValid: contactsMsg.phonenumber.mobileNumberValid,
					remoteVerify: contactsMsg.phonenumber.mobileNumberValid
				},
				gnumURL: {
					required: contactsMsg.gnumURL.required,
					urlBasicCheck: contactsMsg.gnumURL.urlBasicCheck
				}
			}
			/*submitHandler: function(form){
				var $form = $(form);
				var $phonenumber = $form.find("input[name='phonenumber']")
				var $gnumURL = $form.find("input[name='gnumURL']")
				var phonenumber = $phonenumber.val();
				var gnumURL = $gnumURL.val();
				
				//若电话号码和GNUM URL都为空，则提示错误
				if(phonenumber == "" && gnumURL == "") {
					//$.ECAlert("Pls fill in phone number or Gnum URL","warn");
					showPannelInfo("gnumInfoPannel","Pls fill in phone number or Gnum URL","warning");
				}else{
					addContacts($form);
				}
			}*/
		});
		$("#add-contact-submit-btn").mousedown(function(event){
			var $form = $(this).closest("form");
			if($form.valid()){
				event.stopPropagation();
				var $phonenumber = $form.find("input[name='phonenumber']");
				var $gnumURL = $form.find("input[name='gnumURL']");
				var phonenumber = $phonenumber.val();
				var gnumURL = $gnumURL.val();
				//若电话号码和GNUM URL都为空，则提示错误
				if(phonenumber == "" && gnumURL == "") {
					//$.ECAlert("Pls fill in phone number or Gnum URL","warn");
					showPannelInfo("gnumInfoPannel","Pls fill in phone number or Gnum URL","warning");
				}else{
					addContacts($form);
				}
			}
		})
	}

	
	/**
	 * 添加call number校验
	 */
	if($("#add-callnumber-form").length>0) {
		$("#add-callnumber-form").validate({
			errorClass: "error-tips-top",
			rules: {
				phoneNumber: {
					required: true,
					maxlength: 15,
					minlength: 6
				},
				OTP: {
					required: true,
					maxlength: 4,
					minlength: 4,
					digits: true,
					remoteVerify: {
						url: $path + "/callnumber/OTP/verify/",
						type: 'get',
						dateType: "json",
						data: {
							phoneNumber: function(){
								return $("input[name='phoneNumber']").val();
							},
							OTP: function() {
								return $("input[name='OTP']").val();
							}
						}
					}
				}
			},
			messages: {
				phoneNumber: {
					required: callNumberMsg.phonenumber.required
				},
				OTP: {
					required: callNumberMsg.OTP.required,
					digits: callNumberMsg.OTP.digits,
					remoteVerify: callNumberMsg.OTP.remoteVerify
				}
			},
			submitHandler: function(form){
				addCallnumber($(form));
				return false;
			}
		});
	}
	
	/**
	 * 找回密码表单校验
	 */
	$("#resetPwdForm").validate({
		/*errorClass : "gnum-error",*/
		rules : {
			newPwd: {
				required: true,
				rangelength: [6,20],
				gnumPwd: true
			},
			confPwd: {
				required: true,
				rangelength: [6,20],
				gnumPwd: true,
				equalTo: "#newpwd"
			}
		},
		messages : {
			newPwd: {
				required: registerMsg.password.required,
				rangelength: registerMsg.password.rangelength
			},
			confPwd: {
				required: registerMsg.confirmPassword.required,
				rangelength: registerMsg.confirmPassword.rangelength,
				equalTo: registerMsg.confirmPassword.equalTo
			}
		},
		submitHandler : function(form) {
			var $form =  $(form);
			var url = $form.attr("action");
			var params = $form.serialize();
			var method = $form.attr("method");
			$.ajax({
				type:method,
				url:url,
				data:params,
				dataType:"json",
				success:function(result){
					if(result){
						//showPannelInfo('gnumInfoPannel',"Reset password successful.",'success');
						alert("修改密码成功");
						setTimeout(function(){
							window.location.href=$path + "/signin/";
						}, 1000);
					}else{
						//showPannelInfo('gnumInfoPannel',"Reset password failed.",'danger');
					}
				}
			});
		}
	});
	
});

