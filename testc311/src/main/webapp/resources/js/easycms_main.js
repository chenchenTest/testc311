/**
 * 全局AJAX默认配置
 */


$.ajaxSetup({
	global : false,
	type : "get",
	dataType : "html",
	cache : false,
	beforeSend:function(XMLHttpRequest){
		loadingBtn();
//		if(operator.defaultSetting.table != null){
//			$(operator.defaultSetting.table).datagrid("loading");
//		}
		
	}
	,complete:function(XMLHttpRequest, textStatus){
		resetBtn();
//		if(operator.defaultSetting.table != null){
//			$(operator.defaultSetting.table).datagrid("loaded");
//		}
		
	}
	,error : function(XMLHttpRequest, textStatus, errorThrown) {
		resetBtn();
		$("#holdon").modal("hide");
//		$.messager.alert(XMLHttpRequest.status + " Error",
//				XMLHttpRequest.status + " Error,"
//				+ XMLHttpRequest.statusText, "error");
		if(XMLHttpRequest.status == 200 || XMLHttpRequest.status == "200") {
			return false;
		}
		bootbox.alert('Eror ['+XMLHttpRequest.status+'],' + XMLHttpRequest.statusText);
//		bootbox.dialog({
//			backdrop: false,
//			title: "提示信息",
//			message:'发生['+XMLHttpRequest.status+']错误,' + XMLHttpRequest.statusText
//			});
	}
	,statusCode:{
		200: function() {
		    resetBtn();
		  }
	}	
});

var resetBtn = function(){
	if(typeof $("[data-loading-text]").html() != "undefined") {
			var btn = $("[data-loading-text]");
			btn.bootstrapBtn('reset')
		}
}
var loadingBtn = function() {
	if(typeof $("[data-loading-text]").html() != "undefined") {
			var btn = $("[data-loading-text]");
			btn.bootstrapBtn('loading')
			setTimeout(function () {
				btn.bootstrapBtn('reset')
			}, 15000)
		}
}

var validTimer = {
	username : null
};
/**
 * 扩展校验规则
 */
/*$.extend(
				$.fn.validatebox.defaults.rules,
				{
					minLength : {// 最小长度
						validator : function(value, param) {
							return value.length >= param[0];
						},
						message : '请输入至少（2）个字符.'
					},
					equals : {// 两个值是否相等
						validator : function(value, param) {
							return value == $(param[0]).val();
						},
						message : '两次密码不一致.'
					},
					select : {
						validator : function(value, param) {
							try {
								console
										.log(value
												+ ","
												+ (typeof value != "undefined" && value != ""));
							} catch (e) {
								// TODO: handle exception
							}
							return typeof value != "undefined" && value != ""
									&& value != "tip";
						},
						message : '请选择一个值.'
					},
					customRemote : {
						validator : function(value, param) {
							$.data("");
							var url = param[0] || "";
							var paramName = param[1] || "";
							var method = param[2] || "get";
							clearTimeout(validTimer.username);
							validTimer.username = setTimeout(function() {
								$.ajax({
									async : false,
									url : url,
									type : method,
									data : paramName + "=" + value,
									success : function(result) {
										var obj = $.parseJSON(result);
										return obj;
									}
								});
							}, 500);
						},
						message : '该字段已被占用'
					}
				});*/
$(function() {
	$('a').bind('focus', function() {
		if (this.blur) {
			this.blur();
		}
		;
	});
	$('input:submit').bind('focus', function() {
		if (this.blur) {
			this.blur();
		}
		;
	});
	$('input:button').bind('focus', function() {
		if (this.blur) {
			this.blur();
		}
		;
	});
});

var echoError = function($form, name,text){
	var $element = $form.find("[name='" + name + "']").eq(0);
	if ($element == null || (typeof $element[0] == "undefined")) {
		return;
	}
	var $error = $("<" + validDefaults.errorElement + "  for='"+name+"' generated='true'></"
			+ validDefaults.errorElement + ">");
	$error.addClass(validDefaults.errorClass);
	var $parent = $element.parent();
	$parent.append($error);
	$parent.parent().removeClass("info").addClass("error");
	$error.text(text);
}
/**
 * 设置默认验证规则参数
 */
//var validDefaults = {
//	timer : null,
//	bindError : function($form, name,text) {
//		var $element = $form.find("[name='" + name + "']").eq(0);
//		if ($element == null || (typeof $element[0] == "undefined")) {
//			return;
//		}
//		var $error = $form.data(name);
//		if($error == null) {
//			$error = $("<" + validDefaults.errorElement + "  for='"+name+"' generated='true'></"
//					+ validDefaults.errorElement + ">");
//			$error.text(text);
//			$error.addClass(validDefaults.errorClass);
//			$form.data(name,$error);
//			$element.parent().append($error.fadeIn());
//		}else{
//			$error.fadeIn();
//		}
//	},
//	onkeyup : function(element) {
//		clearTimeout(loginValid.timer);
//		validDefaults.timer = setTimeout(function() {
//			$(element).valid();
//		}, 500);
//	},
//	errorClass : 'EC-form-error',
//	errorElement : "span",
//	ignore : ".ignore",
//	highlight : function(element, errorClass) {
//		// 验证错误的表单设置高亮
//		$(element).addClass("EC-form-highlight");
//	},
//	unhighlight : function(element, errorClass) {
//		// 验证正确的表单取消高亮
//		$(element).removeClass("EC-form-highlight");
//	},
//	errorPlacement : function(error, element) {
//		var $element = $(element);
//		// var offset = $element.offset();
//		// var left = offset.left;
//		// var top = offset.top;
//		$element.parent().append(error.fadeIn());
//	}
//};

/**
 * 设置默认验证规则参数
 */
var validDefaults = {
	errorElement : 'span',
	errorClass : 'help-inline',
	focusInvalid : false,
	invalidHandler : function(event, validator) {//display error alert on form submit
		$('.alert-error', $('.login-form')).show();
	},
	highlight : function(e) {
		$(e).closest('.control-group').removeClass('info').addClass('error');
	},
	success : function(e) {
		$(e).closest('.control-group').removeClass('error').addClass('info');
		$(e).remove();
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
			dataType : "json",
			success:function(data){
                 if(data.code == "1000"){
   	              	tips.success("Save Success");
                 }else{
                	tips.error("Save Failed," + data.message);
                 }
			}
		});
	}
};



$(function() {
	/**
	 * 初始化Messager
	 */
	Messenger.options = {
		    extraClasses: 'messenger-fixed messenger-on-top',
		    theme: 'block'
		}
	
	/**
	 * 初始化datatables
	 */
	$.extend( $.fn.dataTable.defaults, {
		processing:true,
		//"order": [[ 0, "desc" ]],
		//国际化配置  
		// "language": {
		//	 	"processing": "正在获取数据，请稍后...",
	     //       "lengthMenu": "显示 _MENU_ 条",
	     //       "zeroRecords": "没有您要搜索的内容",
	     //       "info": "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
	     //       "infoEmpty": "记录数为0",
	     //       "infoFiltered": "(全部记录数 _MAX_ 条)",
	     //       	"infoPostFix" : "",
	     //       	"search" : "搜索",
	     //       	"url" : "",
	     //       	"paginate": {
	     //       		"first" : "第一页",
	     //       		"previous" : "上一页",
	     //       		"next" : "下一页",
	     //       		"last" : "最后一页"
	     //       	}
	     //   },
	        "createdRow": function ( row, data, index ) {
	        	var $styleTr = $(this).find("tr:first-child");
	        	var $thItems = $styleTr.children("th");
	        	$thItems.each(function(i){
	        		if(typeof $(this).attr("class") != "undefined") {
	        			$("td",row).eq(i).attr("class",$(this).attr("class"));
	        		}
	        	});
	        	var $opWrap = $(row).children().last();
            	var $checkbox = $(row).children().first();
            	$checkbox.addClass("center");
            	if(data != null && data.links != null && data.links.length > 1) {
            		var $optools = $("<div class='hidden-phone visible-desktop btn-group'></div>");
            		var $phoneOPtools = $('<ul class="dropdown-menu dropdown-icon-only dropdown-yellow pull-right dropdown-caret dropdown-close"></ul>');
            		for(var i=0; i<data.links.length;i++) {
            			var option = data.links[i];
            			if(option.title != null) {
	            			var $opButton = $("<button class='btn btn-mini tooltip-info " + option.clz + "'  data-rel='tooltip' title='"+ option.title +"' onclick=\"" + option.onclick + "\"><i class='"+ option.icon + "'></i></button>");
	            			$opButton.tooltip();
	            			$optools.append($opButton);
	            			
	            			var $phoneOPButton = $("<button class='btn btn-mini tooltip-info " + option.clz + "'  data-rel='tooltip' data-placement='left' title='"+ option.title +"' onclick=\"" + option.onclick + "\"><i class='"+ option.icon + "'></i></button>");
	            			$phoneOPButton.tooltip();
	            			var $li = $("<li></li>");
	            			$li.append($phoneOPButton);
	            			$phoneOPtools.append($li);
            			}
            		}
            		var $phoneOPWraper = $('<div class="hidden-desktop visible-phone"></div>');
            		var $phoneOPBox = $('<div class="inline position-relative"></div>');
            		$phoneOPBox.append('<button class="btn btn-minier btn-yellow dropdown-toggle" data-toggle="dropdown"><i class="icon-caret-down icon-only"></i></button>')
            		.append($phoneOPtools);
            		$phoneOPWraper.append($phoneOPBox);
        			$opWrap.empty().append($optools).append($phoneOPWraper);
            	}else{
            		$opWrap.empty().append("<span>-</span>");
            	}
            },
            "lengthMenu": global_pageList,
            "pageLength": global_pageList[0]
	} );
	/**
	 * 默认验证规则设置
	 */
	$.metadata.setType('attr','validate');
	$.validator.setDefaults(validDefaults);
	$("#sideNav").children("li").each(function(){
		var $li = $(this);
		$li.children("a").on("click",function(){
			$("#sideNav").children("li").removeClass("active");
			$li.addClass("active");
	});
	})
});

/**
 * 登录校验规则
 */
var loginValid = {
	rules : {
		username : {
			required : true
		},
		password : {
			required : true
		},
		verifyCode : {
			required : true,
			remote : path + "/management/verifycode/valid"
		}
	},
	messages : {
		username : {
			required : "Username can not be empty"
		},
		password : {
			required : "Password can not be empty"
		},
		verifyCode : {
			required : "Verify code can not be empty",
			remote : "Verify code not correct"
		}
	},
	highlight : function(e) {
		$(e).closest('.control-group').removeClass('info').addClass('error');
	},
	success : function(e) {
		$(e).closest('.control-group').removeClass('error').addClass('info');
		$(e).remove();
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
			error.insertAfter(element.parent());
		}
	},
	submitHandler : function(form) {
		var times = $("#loginTimes").val();
		var time = $("#loginTime").val();
		console.info("time====="+time);
		if("3"==times && "0"!=time){
			alert("your account have been locked for 30 minutes");
			return;
		}
		var $form = $(form);
		var url = $form.attr("action");
		var method = $form.attr("method");
		var nvp = $form.serialize();
		var $submit = $form.find("button").eq(0);

		$.ajax({
			url : url,
			type : method,
			data : nvp,
			dataType : "json",
			success : function(data) {
				console.info("data===="+data)
				if (data.code == "1000") {
					$("#loginTimes").val("0");
					clearInterval(loginTime);  
					$("#loginTime").val("1800");
					window.location.href = path + "/management/index";
				} else {
					loginTimes();
					var time = $("#loginTime").val();
					if("18"==time){
						var dsqId = setInterval(loginTime,1000);
						$("#dsqId").val(dsqId);
						console.info("定时器ID===="+dsqId);
					}else{
						
					}
					echoError($form, "username","Username or password not correct");
				}
			}
		});
	}
};

function loginTime(){
	var time = $("#loginTime").val();
	if("1"==time){
		$("#loginTime").val("0");
		var dsqId = $("#dsqId").val();
		console.info("停止时定时器Id===="+dsqId)
		window.clearInterval(dsqId);
	}else{
		time = time-1;
		$("#loginTime").val(time);
	}
	
}

function loginTimes(){
	var times = $("#loginTimes").val();
	times = parseFloat(times)+1;
	$("#loginTimes").val(times);
	if("3"==times){
		$("#loginTime").val("18");
	}
}