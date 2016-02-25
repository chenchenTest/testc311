$(function() {
/*	//初始化右侧下拉选框
	$("#right-slider .dropdown").dropdownMenu();
	//右侧拨打电话号码盘初始化
	var $form = $("#make-call-form");
	$form.validate({
		onkeyup : function(element) {
			return $(element).valid();
		},
		errorPlacement : function(error, e) {
			$(e).parents(".call-input").after(error);
		},
		rules : {
			"callname-or-phone" : {
				required : true,
				validCallNameOrPhone : {
					url : $path + "/signin/check/",
					type : 'get',
					dateType : "json",
					data : {
						nickname : function() {
							return $('input[name="callname-or-phone"]').val();
						}
					}
				}
			}
		},
		messages : {
			"callname-or-phone" : {
				required : "please input call name or phone number",
				validCallNameOrPhone : "invalid callname or phone number",
				remote : "invalid callname or phone number"
			}
		},
		submitHandler : function(form) {
			var callnameOrPhone = $(form).find("input[name]").val();
			//获取输入框内的内容
			var countryCode = $(form).find(".dropdown .content").attr("data-content");
			var isNum = stringUtils.isNum(callnameOrPhone);
			if (isNum) {//以电话号码方式拨打
				window.open($path + "/" + countryCode + callnameOrPhone, "call");
			} else {//以callhandle方式拨打
				window.open($path + "/" + callnameOrPhone, "call");
			}
			return false;
		}
	});

	$("#make-call-form .call-icon").click(function() {
		$form.submit();
	});*/
	//初始化copy按钮
	$('.copy-area').zclip({
		path : $path+'/resources/plugins/zclip/ZeroClipboard.swf',
		copy : function() {
			var copy_text = $('.copy-area .hidden').text();
			return copy_text;
		},
		afterCopy : function() {
			Msg.alert("copy success","alert-success");
		}
	});
    /******************right sidebar facebook,twitter,linkedin 链接分享******************/
	$('.facebook-area').click(function(event) {
		event.preventDefault();
		var url = location.host+"/"+$('input[name="call-name"]').val();
		var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://"+url);
		popupCenter(url, "Facebook", 626, 436);
	});
	
	$('.twitter-area').click(function(event) {
		event.preventDefault();
		var url = location.host+"/"+$('input[name="call-name"]').val();
		var content="Call me at "+url+" for FREE! Get yours today at gnum.com. #freecalls #GNumSG #sgfreecalls @gnumsg";
		var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(content);
		popupCenter(url, "Twitter", 626, 436);
	});
	
	$('.linkedin-area').click(function(event) {
		event.preventDefault();
		var url = location.host+"/"+$('input[name="call-name"]').val();
		var url = "http://linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent("http://"+url)+"&title="+"Join Us!"+"&source="+encodeURIComponent("MY_BLOG_URL");
		popupCenter(url, "Linkedin", 626, 436);
		
	});
	/******************right sidebar连接分享结束******************/
});
