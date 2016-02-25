/**
 * auther:chenfei
 */
;var pfingo = {
	loadCountryCode : function(){
		console.info("loadCountryCode");
		var shortName = $("#shortName").val();
		if(shortName!="none"){
			$.ajax({
				type:"post",
				data:{"shortName":shortName},
				url:"${path}/management/country/getCountryByShortName",
				success:function(data){
					$("#code").val(data.code);
					$("#fullName").val(data.fullName);
				}
			})
		}
	}	
}


$(function(){
	$("#addRate").find("#shortName").on("change",pfingo.loadCountryCode);
	$("#editRate").find("#shortName").on("change",pfingo.loadCountryCode);
})

