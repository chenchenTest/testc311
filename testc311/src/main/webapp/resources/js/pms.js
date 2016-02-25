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
	}
};

var checkboxs = function(e) {
		var that = e;
		$(e).closest('table').find('tr > td:first-child input:checkbox').each(function() {
			e.checked = that.checked;
			$(e).closest('tr').toggleClass('selected');
		});

};
$(function() {
	/**
	 * 默认验证规则设置
	 */
	$.validator.setDefaults(validDefaults);
	$('[data-rel=tooltip]').tooltip();
});

var getTime = function() {
	var date = new Date();
	date = date.getTime();
	return date;
}
var loadFile = function(path) {
	$("#main-content").empty().load(path + "?_" + getTime());
}
var delItem = function(ids) {
	bootbox.confirm("Are you sure delete these items?", function(result) {
		if (result) {
			bootbox.alert("You are sure!");
		}
	});
}
