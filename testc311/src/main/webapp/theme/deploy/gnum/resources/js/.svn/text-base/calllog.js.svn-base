/**
 * 
 */

$(function() {
		//feature_select begin
	var li_arry=["receiving_li","call_li","miss_li"];
	//var li_hover_arry=["receiving_li_hover","call_li_hover","miss_li_hover"];
	$(".select").find(".all").show();
	$(".select").find(".receiving_li").show();
	$(".select").find(".call_li").show();
	$(".select").find(".miss_li").show();
	if($("#searchType").val()!=""){
		if($("#searchType").val()=="V01"){
			changeSelectSpan("RECEIVING FROM","receiving_li");
			$(".select").find(".receiving_li").hide();
		}else{
			changeSelectSpan("CALLING TO","call_li");
			$(".select").find(".call_li").hide();
		}
	}else{
		if($("#searchStatus").val()!=""){
			changeSelectSpan("MISSED CALL","miss_li");
			$(".select").find(".miss_li").hide();
		}else{
			changeSelectSpan("ALL","all");
			$(".select").find(".all").hide();
		}
	}
	$(".feature_select").mouseover(function(){
		/*if($("#searchType").val()!=""){
			if($("#searchType").val()=="V01"){
				changeSelectSpan("RECEIVING FROM","receiving_li");
				$(".select").find(".receiving_li").hide();
			}else{
				changeSelectSpan("CALLING TO","call_li");
				$(".select").find(".call_li").hide();
			}
		}else{
			if($("#searchStatus").val()!=""){
				changeSelectSpan("MISSED CALL","miss_li");
				$(".select").find(".miss_li").hide();
			}else{
				changeSelectSpan("ALL","all");
				$(".select").find(".all").hide();
			}
		}*/
		
		
		
		/*if($("#searchType").val()!=""){
			$(".select").find(".all").hide();
		}else if($(".feature_select").hasClass("receiving_li")){
			$(".select").find(".receiving_li").hide();
		}else if($(".feature_select").hasClass("call_li")){
			$(".select").find(".call_li").hide();
		}else if($(".feature_select").hasClass("miss_li")){
			$(".select").find(".miss_li").hide();
		}*/
		$(".feature_select .select").stop().slideDown();
	})
	$(".feature_select").mouseleave(function(){
		/*$(".select").find(".all").show();
		$(".select").find(".receiving_li").show();
		$(".select").find(".call_li").show();
		$(".select").find(".miss_li").show();*/
		$(".feature_select .select").stop().slideUp();
	})
	
	
	//点击函数
	$(".feature_select .select li").click(function(){
		var $this=$(this);  //获得当前元素
		var $this_text=$this.children(".text").text(); //当前元素的文字信息
		var $this_li_class=$(this).attr("class");
		select($this,$this_li_class,$this_text);
		$(".feature_select .select").stop().slideUp();
	})
	//四个功能的筛选
	function select($this,$this_li_class,$this_text){
		var $feature_select=$(".feature_select");
		var $feature_select_text=$(".feature_select .text").first();
		var $feature_select_ul_li=$(".feature_select .select li");
		$feature_select_text.text($this_text);
		$feature_select.removeClass();
		$feature_select.addClass("btn feature_select");
		$feature_select.addClass($this_li_class);
		for(var i=0;i<$feature_select_ul_li.length;i++){
			//$feature_select_ul_li[i].
		}
		//switch ($this_li_class){
		//	case li_arry[0]:
		//}
		if("all"==$this_li_class){
			$("#searchStatus").val("");
			$("#searchType").val("");
		}else if("receiving_li"==$this_li_class){
			$("#searchStatus").val("");
			$("#searchType").val("V01");
		}
		else if("call_li"==$this_li_class){
			$("#searchStatus").val("");
			$("#searchType").val("V05");
		}
		else if("miss_li"==$this_li_class){
			$("#searchType").val("");
			$("#searchStatus").val("MISSED");
		}
		searchCalllog();
	}
	
	function changeSelectSpan($this_text,$this_li_class){
		var $feature_select=$(".feature_select");
		var $feature_select_text=$(".feature_select .text").first();
		$feature_select_text.text($this_text);
		$feature_select.removeClass();
		$feature_select.addClass("btn feature_select");
		$feature_select.addClass($this_li_class);
	}



		var res = $("#searchType").val();
		if("V01"===res){
			$("#btn-calllog-incoming").css("color","#2dcbc7");
			$("#btn-calllog-all").css("color","#9c9c9c");
			$("#btn-calllog-outgoing").css("color","#9c9c9c");
		}
		else if("V05"===res){
			$("#btn-calllog-outgoing").css("color","#2dcbc7");
			$("#btn-calllog-incoming").css("color","#9c9c9c");
			$("#btn-calllog-all").css("color","#9c9c9c");
		}else{
			$("#btn-calllog-all").css("color","#2dcbc7");
			$("#btn-calllog-outgoing").css("color","#9c9c9c");
			$("#btn-calllog-incoming").css("color","#9c9c9c");
		}
		//在搜索框中的内容为空时,自动还原表格内容
		$(".search-box").change(function(){
		    var searchContent = this.value;
		    if(searchContent==''){
		        $("#calllog-list-table").DataTable().fnFilter('');
		    }
		});
		
		$(document).on('click','',function(){
			$('.calllogShareFB').click(function(event) {
				/* Act on the event */
				event.preventDefault();
				var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://dev.gnum.com/${(user.nickname)!'[CallHandle]'}/${referralCode!'[referralCode]'}");
				popupCenter(url, "Facebook", 626, 436);
			});
			$('.calllogShareTT').click(function(event) {
					/* Act on the event */
				event.preventDefault();
				var url = "http://twitter.com/share?url=" + encodeURIComponent("http://dev.gnum.com/${(user.nickname)!'[CallHandle]'}/${referralCode!'[referralCode]'})" +"&via=GNumSG" + "&text= Join Us!" );
				popupCenter(url, "Twitter", 626, 436);
			});
		});
		$(".data-title .time").find("span").eq(1).text($("#leftTime").val());
		
	});
	function getCallLog(condition){
		var method="post";
		var url=$path+"/calllog/data/";
		var params={groupNumber:condition,type:'buttonClick'};
		$.ajax({
			type:method,
			url:url,
			data:params,
			success:function(data){
				$("#data-container").html(data);
			}
		});
	}
	
	function makeCall(no){
		no=no.trim();
		if("me"==no){
			var info=$("#calloghidid").val();
			var reg=/\\\d{6,}/;
			var str=info.replace(reg,"");
				window.open("${res!}/"+str);
		}else if("unknown"==no){
			alert("unknown telnumber or gnumhandler");	
		}else {
			window.open("${res!}/"+no);
		}
	};
	
	function searchCalllog(){
		var searchValue = $("#searchCall").val();
		var overAllValue = $("#overAllValue").text();
		var incomingValue = $("#incomingValue").text();
		var method="post";
		var url=$path+"/calllog/data/";
		var condition=$("#searchType").val();
		var searchStatus=$("#searchStatus").val();
		if(condition!=""&&searchStatus==""){
			searchStatus="CONNECTED";
		}
		var params={groupNumber:condition,type:'buttonClick',searchValue:searchValue,overAllValue:overAllValue,
				incomingValue:incomingValue,searchStatus:searchStatus};
		$.ajax({
			type:method,
			url:url,
			data:params,
			success:function(data){
				$("#data-container").html(data);
				$(".feature_select").addClass();
				//$(".data-title .time").find("span").eq(1).text($("#leftTime").val());
			}
		});
	}
	
	function changeImgs(object){
		$(object).find("img").attr("src",$path+"/resources/images/contacts/eraise-s.png");
	}
	
	function changeImg(object){
		$(object).find("img").attr("src",$path+"/resources/images/contacts/eraise.png")
	}
	//根据id删除callLog
	function deleteCallLog(deleteURL,refreshURL){
		$.messager.model = { 
		        ok:{ text: "Ok", classed: 'btn-confirm' },
		        cancel: { text: "Close", classed: 'btn-default' }
		      };
		$.messager.confirm("Delete Calllog", "Are you sure you want to delete this calllog?", function() { 
				$.ajax({
					url : deleteURL,
					type : "get",
					dataType : "json",
					success : function(msg) {
						if (msg == true) {
							refreshData(refreshURL);
						} else {
							showPannelInfo("gnumInfoPannel",
									"Delete callLog failed,pls try it later!", "error");
						}
					}
				});
		});
	}