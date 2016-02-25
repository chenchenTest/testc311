var g_log_init_flag = false;
var g_log_content = new Array();
/* log init */
function log_init()
{
	g_log_content['username'] = $("#username").val();
	g_log_content['userId'] = $("#userId").val();
	g_log_content['remoteIp'] = $("#remoteIp").val();
	g_log_content['sessionId'] =$("#session").val();
	g_log_content['osName'] = "";
	g_log_content['browser'] = GRCaller.detect.browserName();
	g_log_content['browserVersion'] = GRCaller.detect.browserVersion();
	g_log_content['flashVersion'] = GRCaller.detect.flashVersion();
	g_log_content['callee'] =$("#callee").val();
	g_log_content['callId'] = "";
	g_log_content['startTime'] = "";
	g_log_content['status'] = "INITIALIZATION";
	g_log_content['content'] = "";
	/******************************************************
	*	-1000 :flash init failed 
	*	1000  :flash init finished
	*	1001  :NetConnection success
	*	-1001 :NetConnection failed
	*	-1002 :NetConnection rejected
	*	16/486/... : hangup cause
	**********************************************************/
	g_log_content['statusCode'] = "";
	
	try {
		if(window.console){
			console.log("==> Init log finished.");
		}
	} catch (e) {
		// TODO: handle exception
	}
}

/* set user info */
function set_user_info()
{
	g_log_content['username'] = $("#username").val();
	g_log_content['userId'] = $("#userId").val();
	g_log_content['remoteIp'] = $("#remoteIp").val();
	g_log_content['callee'] = $("#callee").val();
	g_log_content['sessionId'] =$("#session").val();
}
/* empty log */
function log_empty()
{
	g_log_content['status'] = "";
	g_log_content['statusCode'] = "";
	g_log_content['startTime'] = "";
	g_log_content['content'] = "";
	g_log_content['callId'] = "";
}
function send_log(txt)
{
	try {
		var PARAMS ="";
		for (key in g_log_content) {
			if("content" == key && typeof txt != "undefined") {
				g_log_content['content'] = g_log_content['content'] + txt;
			}
			PARAMS += key + "=" + (typeof g_log_content[key]== "undefined"? "":g_log_content[key]) + "&";
		}
		PARAMS = PARAMS.substring(0,PARAMS.length -1);
		if(window.console){
			console.log("PARAMS = " + PARAMS);
		}
		
		var url = "";
		if (g_log_init_flag) {
//			url = "http://www.gnum.com:8030/gnum/log/append";
//			url = "http://test.java.me/gnum/log/append";
			// shihai  at  09 19 18:09
			url = "http://devloggnum.gnum.com/gnum/log/append";
		} else {
//		    url = "http://www.gnum.com:8030/gnum/log/register";
//			url = "http://test.java.me/gnum/log/register";
			// shihai  at  09 19 18:09
			url = "http://devloggnum.gnum.com/gnum/log/register";
			g_log_init_flag = true;
		}
		if(window.console){
			console.log("sendlog to:" + url);
		}
		$.ajax({
		crossDomain:true,
		 	cache:false,
			url:url,
			type:"get",
			dataType:"jsonp",
			jsonp:"callback",
			data:PARAMS,
			success:function(data){
				if(window.console){
					console.log("send log :"+ data);
				}
			}	
		})
		//$.post(url, "username=11111");
		if(window.console){
			console.log("end send log.");
		}
		log_empty(); //empty array
	} catch (e) {
		if(window.console){
			console.log("sendlog err:"+e);
		}
	}



}


/* get host ip */
function get_host_ip()
{
	var ip = $("remoteIp").val();
	return ip;
}

/* get_log_from_flash */
function get_log_from_flash(key, value)
{
	if (g_log_content[key] != "") {
		g_log_content[key] += value;
	} else {
		g_log_content[key] = value;
	}
	g_log_content[key] += "<br/>";
}


$(function () {
	log_init();
	set_user_info();
})