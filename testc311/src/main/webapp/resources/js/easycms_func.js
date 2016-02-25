$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/** *********生成随机密码工具**************** */
/** *************************************** */
/** *************************************** */
/**
 * 得到指定长度中的随机数，例如：从0～10，得到0到10之间的数
 * 
 * @param {Object}
 *            lbound 下标
 * @param {Object}
 *            ubound 长度
 */
function getRandomNum(lbound, ubound) {
	return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}


function conver2array(src) {
	var array = new Array();
	var sa = src.split(",")
	return sa;
}

/**
 * 
 * @param {Object}
 *            num 密码长度
 */
function makeRandomPwd(num) {
	var numberChars = "0123456789";
	var lowerChars = "abcdefghijklmnopqrstuvwxyz";
	var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var charSet = numberChars + lowerChars + upperChars;
	if (typeof num == "undefined")
		num = 8;
	var result = "";
	for (var i = 0; i < num; i++) {
		result += charSet.charAt(getRandomNum(0, charSet.length));
	}
	return result;
}

/**
 * 显示验证码
 * 
 * @param element
 * @param path
 */
function verifycode(element, path) {
	var $e = $(element);
	path += '?' + Math.floor(Math.random() * 100);
	var $img = $('<img alt="Loading verify code" src="'
			+ path
			+ '" height="30" style="vertical-align:middle;cursor: pointer;" onclick="verifycode(this,\''
			+ path + '\');"/>');
	$e.siblings("img").remove();
	$e.after($img.fadeIn());
	if ("A" == $e[0].tagName || "IMG" == $e[0].tagName) {
		$e.remove();
	}
}
/**
 * 全选
 */
function checkAll(e) {
	var $operator = $(e);
	var $items = $operator.parents("table").find("[type='checkbox']").not(
			$operator);
	if ($operator.prop("checked")) {
		$items.prop("checked", true);
	} else {
		$items.prop("checked", false);
	}
}

/**
 * 检查表单值是否为空
 */
function isFormEmpty($form) {
	var params = $form.serialize();
	if (params == "") {
		return true;
	}

	var entries = params.split("&");
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=");
		if ($.trim(entry[entry.length - 1]) != "" && entry[i] != "queryType") {
			return false;
		}
	}
	return true;
}

function getJsonLength(jsonData) {

	var jsonLength = 0;

	for ( var item in jsonData) {

		jsonLength++;

	}

	return jsonLength;

}

var formatter = {
	isNull : function(string) {
		if (string == null || string == "" || typeof string == "undefined") {
			return true;
		}

		return false;
	},
	combinURL : function(url, params) {
		if (formatter.isNull(url)) {
			return null;
		}
		params = formatter.isNull(params) == true ? "" : params;

		var array = url.split("?");
		if (array.length > 1) {
			url = array[0];
			params += "&" + array[1];
		}
		url += "?" + params;
		return url;
	}
};
// 全选反选
// 参数:selected:传入this,表示当前点击的组件
// treeMenu:要操作的tree的id；如：id="userTree"
function treeChecked(selectAll, tree) {
	var checkAll = function($e, $children) {
		$e.on("change", function() {
			if ($e.prop("checked")) {
				$children.prop("checked", true);
			} else {
				$children.prop("checked", false);
			}
		})
	}

	// 子菜单选中则选中父菜单，所有子菜单都不选中则父菜单不选中
	var uncheckRoot = function(e) {
		$e = $(e);
		// 父菜单
		var $parent = $e.closest("li").parent("ul").prev("label").find(
				"[type='checkbox']");

		// 同级菜单
		var $brothers = $e.closest("li").siblings("li");

		$e.on("change", function() {
			var i = 0;
			// 子菜单选中则选中父菜单
			if ($(this).prop("checked")) {
				if (typeof $parent.attr("id") == "undefined") {
					$parent.prop("checked", true);
				}
			} else {
				// 所有子菜单不选中，则父菜单不选中
				$brothers.each(function() {
					$brother = $(this).find("[type='checkbox']");
					if (!$brother.prop("checked")) {
						i++;
					}
				});
				if (i == $brothers.length) {
					$parent.prop("checked", false);
				}
			}
		});
	}

	var $selectAll = $(selectAll);
	var $tree = $(tree);
	var $items = $tree.find("[type='checkbox']");
	checkAll($selectAll, $items);

	$items.each(function(i) {
		uncheckRoot(this);
		var $self = $(this);

		var $childRoot = $self.closest("label").next("ul");
		if ($childRoot.length == 1) {
			var $children = $childRoot.find("[type='checkbox']");
			checkAll($self, $children);
		}
	});

	// var roots = $(treeMenu).tree('getRoots');// 返回tree的所有根节点数组
	// if (selected.checked) {
	// for (var i = 0; i < roots.length; i++) {
	// var node = $(treeMenu).tree('find', roots[i].id);// 查找节点
	// $(treeMenu).tree('check', node.target);// 将得到的节点选中
	// }
	// } else {
	// for (var i = 0; i < roots.length; i++) {
	// var node = $(treeMenu).tree('find', roots[i].id);
	// $(treeMenu).tree('uncheck', node.target);
	// }
	// }
}

/**
 * 显示时间面板
 * 
 * @param setting
 */
function timePannel(setting) {
	var defaultSetting = {
		max : "",
		min : "",
		lang : 'en',
		now : "%y-%M-%d",
		dateFmt : "yyyy-MM-dd"
	};
	setting = $.extend({}, defaultSetting, setting || {});
	var minDate = setting.min == "" ? "" : "#F{$dp.$D(\'" + setting.min
			+ "\')}";
	var maxDate = setting.max == "" ? setting.now : "#F{$dp.$D(\'"
			+ setting.max + "\')}";
	WdatePicker({
		dateFmt : setting.dateFmt,
		lang : setting.lang,
		readOnly : true,
		minDate : minDate,
		maxDate : maxDate
	});
}

/**
 * 撤销事件，当按下删除<--键，清空该表单字段所有内容
 */
function repeal(event) {
	var target = event.srcElement || event.target;
	var code = event.keyCode;
	if (code == 8) {
		$(target).val("");
	}
}

/** **************************************************************** */
/** **********************ACE STYLE 方法************************* */
/** **********************Date : 2015.03.26***************************** */
/** **********************Author:jiepeng*************************************** */
var getTime = function() {
	var date = new Date();
	date = date.getTime();
	return date;
}

/**
 * 加载文件
 */
var loadFile = function(path, selector) {
	// $("#main-content").load(path + "?_" + getTime());
	var $wraper = $("#main-content");
	if(typeof selector != "undefined") {
		$wraper = $(selector);
	}
	$.ajax({
				url : path,
				type : "get",
				beforeSend : function(XMLHttpRequest) {
					$wraper
							.empty()
							.append(
									'<i class="icon-spinner icon-spin orange bigger-125"></i>');

				},
				success : function(data) {
					console.info("sssssssssss");
					$wraper.empty().append(data);
				}
			});
}
var appendFile = function(path) {
	$.get(path, function(data) {
		$("body").append(data);
	});
}

var confirm = function(path, msg,callback) {
	if(typeof msg == "function") {
		callback = msg;
		msg = undefined;
	}
	var tip = typeof msg == "undefined" ? "确认删除这条记录?" : msg;
	bootbox.confirm(tip, "取消", "确认", function(result) {
		if (result) {
			$.ajax({
				url : path,
				type : "get",
				dataType:"json",
				success : function(data) {
					if (data.code == "1000") {
						dataTable.refresh();
						tips.success("操作成功");
					} else {
						tips.error("操作失败:" + data.message);
					}
					if(callback) {
						callback(data);
					}
				}
			});
			// bootbox.alert("You are sure!");
		}
	});
}
var batchConfirm = function(e, path,tipTxt, msg,callback) {
	if(typeof tipTxt == "function") {
		callback = tipTxt;
		tipTxt = undefined;
	}
	
	if(typeof msg == "function") {
		callback = msg;
		msg = undefined;
	}
	var tip = typeof tipTxt == "undefined" ? "请选择至少一条记录进行删除!" : tipTxt;
	var checkboxes = $(e).find(":checked");
	if (checkboxes.length == 0) {
		tips.warning(tip);
	} else {
		var ids = "";
		checkboxes.each(function(i) {
			var key = $(this).attr("name");
			ids += key + "=" + $(this).val() + "&";
		});
		if(path.indexOf("?") != -1) {
			path = path + "&" + ids;
		}else{
			path = path + "?" + ids;
		}
		
		
		confirm(path,msg,callback);
	}
}
var tips = {
	createDom : function() {
		if (typeof $("#tipsBox").html() == "undefined") {
			var $wrap = $('<div id="tipsBox"></div>');
			$wrap.css("position", "absolute").css("width", "80%").css("left",
					"200px").css("top", "-5px");
			$("div.page-header").prepend($wrap.fadeIn("fast"));
		}
	},
	success : function(msg) {
		Messenger().post({
			id : "Only-one-message",
			message : msg,
			type : 'success',
			showCloseButton : true
		});
		// tips.createDom();
		// var e = "#tipsBox";
		// var string = '<div class="alert alert-block alert-success">'
		// + '<button type="button" class="close" data-dismiss="alert"><i
		// class="icon-remove"></i></button>'
		// + '<p>' + '<strong><i class="icon-ok"></i></strong>' + msg
		// + '</p></div>';
		// $(e).empty().append(string);
		// setTimeout(function() {
		// $(e).fadeOut("slow",function(){$(e).remove();});
		// }, 5000)
	},
	error : function(msg) {
		Messenger().post({
			id : "Only-one-message",
			message : msg,
			type : 'error',
			showCloseButton : true
		});
		// tips.createDom();
		// var e = "#tipsBox";
		// var string = '<div class="alert alert-block alert-error">'
		// + '<button type="button" class="close" data-dismiss="alert"><i
		// class="icon-remove"></i></button>'
		// + '<p>' + '<strong><i class="icon-remove"></i></strong>' + msg
		// + '</p></div>';
		// $(e).empty().append(string);
		// setTimeout(function() {
		// $(e).fadeOut("slow",function(){$(e).remove();});
		// }, 5000)
	},
	warning : function(msg) {
		Messenger().post({
			id : "Only-one-message",
			message : msg,
			type : 'error',
			showCloseButton : true
		});
		// tips.createDom();
		// var e = "#tipsBox";
		// var string = '<div class="alert alert-block alert-warning">'
		// + '<button type="button" class="close" data-dismiss="alert"><i
		// class="icon-remove"></i></button>'
		// + '<p>' + '<strong>!</strong>' + msg + '</p></div>';
		// $(e).empty().append(string);
		// setTimeout(function() {
		// $(e).fadeOut("slow",function(){$(e).remove();});
		// }, 5000)
	}
}

/**
 * 校验规则封装对象
 */
var formValidtor = {
	// 模态校验规则
	modalValid : function(setting) {
		var valid = {
			handler : "",
			rules : {},
			messages : {},
			submitHandler : function(form) {
				var $form = $(form);
				var url = $form.attr("action");
				var method = $form.attr("method");
				var nvp = $form.serialize();
				$.ajax({
					url : url,
					type : method,
					data : nvp,
					dataType:"json",
					success : function(data) {
						if (data.code == "1000") {
							$modal.modal('hide');
							dataTable.refresh();
							tips.success("Operate success");
						} else {
							tips.error("Failed,ERROR:" + data.message);
						}
						if(setting.callbackFunc != undefined){
							setting.callbackFunc(data);
						}
					}
				});
			}
		}

		var settings = $.extend({}, valid, setting);
		var $form = $(settings.handler);
		var $modal = $form.closest("[role='dialog']");
//		$modal.modal({
//			show : true
//		});
//		$modal.on('hidden.bs.modal', function(e) {
//			$modal.remove();
//		})
		// 进行表单验证
		var url = $form.attr("action");

		$form.validate({
			errorPlacement : function(error, element) {
				$(element).parent().append(error);
			},
			rules : settings.rules,
			messages : settings.messages,
			submitHandler : settings.submitHandler
		});
	},
	valid : function(setting) {
		var valid = {
			handler : "",
			rules : {},
			messages : {},
			submitHandler : function(form) {
				if(CKEDITOR.instances) {
					for(instance in CKEDITOR.instances) {
						CKEDITOR.instances[instance].updateElement();
					}
				}
				var $form = $(form);
				var url = $form.attr("action");
				var method = $form.attr("method");
				var nvp = $form.serialize();
				$.ajax({
					url : url,
					type : method,
					data : nvp,
					dataType:"json",
					success : function(data) {
						if (data.code == "1000") {
							tips.success("Operate success");
						} else {
							tips.error("Failed,Error:" + data.message);
						}
						if(setting.callbackFunc != undefined){
							setting.callbackFunc(data);
						}
					}
				});
			}
		}

		var settings = $.extend({}, valid, setting);
		// 进行表单验证
		var $form = $(settings.handler);
		var url = $form.attr("action");

		$form.validate({
			errorPlacement : function(error, element) {
				$(element).parent().append(error);
			},
			rules : settings.rules,
			messages : settings.messages,
			submitHandler : settings.submitHandler
		});
	}
}
/**
 * 数据表格
 */
var dataTable = {
	tableID : "",
	showType : "list",// 表格类型，list为普通数据表格，tree为树形表格
	url : "",
	callback : function() {
	},
	remote : function() {
		$.ajax({
			url : dataTable.url,
			type : "post",
			success : function(data) {
				if (data) {
					// alert(dataTable.tableID)
					$(dataTable.tableID).find("tbody").empty().append(data);
					$(dataTable.tableID).find("tbody").treetable("loadBranch",
							data);
					$(dataTable.tableID).treetable({
						expandable : true,
						force : true
					});
					dataTable.callback();
				}
			}
		});
	},
	initTable : function(options) {
		dataTable.tableID = options.tableID;
		dataTable.url = options.url;
		dataTable.showType = options.showType;
		dataTable.callback = typeof options.callback == "undefined" ? dataTable.callback
				: options.callback;
		switch (dataTable.showType) {
		case "tree":
			$
					.ajax({
						url : dataTable.url,
						type : "post",
						success : function(data) {
							if (data) {
								$(dataTable.tableID).find("tbody").empty().append(data);
								$(dataTable.tableID).treetable({
									expandable : true
								});
								dataTable.callback();
							}
						}
					});
			break;
		default:
			var remote = {
				"ajax" : {
					"url" : dataTable.url,
					"type" : options.type == null ? "POST" : options.type,
					"data" : function(d) {
						var start = Number(d.start);
						var pagesize = Number(100);
						var page = (start / pagesize) + 1;
						d.page = (start / pagesize) + 1;
						d.rows = pagesize;
						d.columns = "";
						d.order = "";
					}
				}
			}
			options = $.extend({}, options, remote);
		console.info("options====="+options);
			$(dataTable.tableID).dataTable(options);
			dataTable.callback();
			break;
		}
		return dataTable;
	},
	refresh : function() {
		switch (dataTable.showType) {
		case "tree":
			$.ajax({
				url : dataTable.url,
				type : "post",
				success : function(data) {
					if (data) {
						$(dataTable.tableID).find("tbody").empty();
						$(dataTable.tableID).treetable("loadBranch", null, data);
//						$(dataTable.tableID).find("tbody").empty().append(data);
						$(dataTable.tableID).treetable("collapseAll");
						dataTable.callback();
					}
				}
			});
			break;
		default:
			$(dataTable.tableID).DataTable().ajax.reload();
			dataTable.callback();
			break;
		}
	}
}

/**
 * 模态框动作 2015.04.28
 */
var modal = {
	id : null,
	open : function(setting) {
		$("#holdon").modal({show:true,backdrop:'static'});
		var initModal = function($modal, isRemove) {
			$modal.on('show.bs.modal', function (e) {
				$("#holdon").modal("hide");
			})
			var width = $modal.width();
			width = width ? width : "auto";
			$modal.modal({
				show : true
			}).css({
				width : width,
				'margin-left' : function() {
					return -($(this).width() / 2);
				}
			});
			if (true == isRemove) {
				$modal.on('hidden.bs.modal', function(e) {
					$modal.remove();
					modal.id = null;
				});
			}
		}

		var defaultSetting = {
			id : null,
			url : null
		}

		var conf = $.extend({}, defaultSetting, setting);
		var $modal = null;

		// 若URL不为空，则进行AJAX获取远程页面
		if (conf.url != null) {
			$.get(conf.url, function(data) {
				var id = "modal_" + getTime();
				modal.id = id;
				$("body").append($(data).attr("id", modal.id));
				$modal = $("#" + modal.id);
				initModal($modal, true);
			}, "html");
		} else if (conf.id != null) {
			modal.id = conf.id;
			$modal = $("#" + modal.id);
			initModal($modal, false);
		}
	},
	close : function() {
		if (modal.id != null) {
			$("#" + modal.id).modal('hide');
		}
		$(".select2-container").remove();
	}
}

var refreshMenu = function(url) {
	$.ajax({
		url : url,
		type : "get",
		dataType:"json",
		success : function(record) {
			if(record.code == "1000") {
				alert("Refresh success!");
				location.reload();
			}else{
				alert("Refresh failed!");
			}
		}
	});
}
