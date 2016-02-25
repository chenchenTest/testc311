var APIFunc = {
		getAPIKey:function(e){
			$.ajax({
				type : "get",
				url : path+"/api/security/user?func=API_KEY",
				success : function(data) {
					var $e = $(e);
					$e.siblings("input").val(data);
				}
			});
		},
		getSecurityKey:function(e){
			$.ajax({
				type : "get",
				url : path+"/api/security/user?func=SECURIT_KEY",
				success : function(data) {
					var $e = $(e);
					$e.siblings("input").val(data);
				}
			});
		},
		createPolicyBox:function(e,policy){
			if("IP_AUTH" == policy){
				var $e = $(e);
				var $td = $e.parents("td");
				var $pArray = $td.find("p");
				var index = $pArray.length + 1;
				var $p = $("<p></p>");
				var $policyBox = $('<input class="required isIP EC-form-input" type="text"  name="'+policy+'_policyValue_'+index+'" value=""/>');
				var $on = $('<input onchange="APIFunc.togglePolicyBox(this);" type="radio" name="'+policy+'_status_'+index+'" value="Y" id="'+policy+'_on_'+index+'" checked="checked"><label for="'+policy+'_on_'+index+'">ON</label>');
				var $off = $('<input onchange="APIFunc.togglePolicyBox(this);" type="radio" name="'+policy+'_status_'+index+'" value="N" id="'+policy+'_off_'+index+'"><label for="'+policy+'_off_'+index+'">OFF</label>');
				var $del = $('<a onclick="APIFunc.removePolicyBox(this);" href="javascript:void(0);" class="EC-btn-remove" style="margin-left:20px;">DELETE</a>');
				$p.append($policyBox).append($on).append($off).append($del);
				
				var $wrap = $td.children("div").eq(0);
				$wrap.append($p);
			}else{
				alert("Sorry,not support now!");
			}
		},
		togglePolicyBox:function(e,selector){
			var $e = $(e);
			var val = $e.val();
			var $box = $e.siblings("input[type='text']").eq(0);
			if("N" == val){
				$box.addClass("EC-form-disable").attr("readonly","readonly");
			}else{
				$box.removeClass("EC-form-disable").removeAttr("readonly");
			}
			
			if(typeof selector != "undefined") {
				var $selector = $(selector);
				$selector.toggle();
			}
		},
		removePolicyBox:function(e){
			var $e = $(e);
			var $parent = $e.parent("p");
			$parent.remove();
		}
};