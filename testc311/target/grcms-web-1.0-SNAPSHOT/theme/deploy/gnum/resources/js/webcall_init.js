var CallEnvironment = {stagingVOIPServer:0,StagingGRCloudVOIPServer:2,productVOIPServer:1}

$(function() {
	var environmentServer = CallEnvironment.stagingVOIPServer;

	if(environmentServer == CallEnvironment.productVOIPServer){
		//product
		GRCaller.serverConf({
			webRTC : {
				serverIP : "flash1.gnum.com",
				serverPort : "5066"
			},
			flash : {
				rtmpURL : "rtmp://203.117.19.4:1935/phone;rtmps://rtmps1.gnum.com:443/phone"
			}
		});
	}else if(environmentServer == CallEnvironment.stagingVOIPServer){
		//staging
		GRCaller.serverConf({
			webRTC:{
				serverIP : "61.8.223.35",
				serverPort : "5066"
				//,
				//turnServers: [{
				//        urls:"turn:54.255.4.88:3478?transport=tcp",
				//        username:"grturn",
				//        password:"123456"
				//    }]
			},
			flash:{
				rtmpURL : "rtmp://61.8.223.35:1935/phone;rtmps://61.8.223.35:443/phone"
			}
		});
	}else if(environmentServer == StagingGRCloudVOIPServer){
		//gr-cloud
		GRCaller.serverConf({
			webRTC: {
				serverIP: "61.8.232.61",
				serverPort: "443",
				turnServers: [{
					urls: "turn:203.116.114.141:3478?transport=udp",
					username: "globalroam",
					password: "globalroam"
				},
					{
						urls: "turn:203.116.114.141:3478?transport=tcp",
						username: "globalroam",
						password: "globalroam"
					}
				]
			},
			flash: {
				rtmpURL: "rtmp://61.8.232.59:80/phone;rtmps://61.8.232.50:443/phone"
			}
		});
	}

	var agent = navigator.userAgent;
	var callType = "auto";
	//firefox单通，如果为firfox则flashcall，否走还是优先webRTC
	if(agent.indexOf("Firefox") > 0 ){
		callType = "flashCall";
	}
	GRCaller.init({
		handler : "#makecall",
		dataAttr : "data-gnumcall", //元素属性
		muteHandler:"#mute",
		libBase:$path + "/resources/gnumCall/lib",
		//calltype:"flashCall",
        usernameAttr : "data-gnumUsername", //用户名属性
        passwordAttr : "data-gnumPassword", //密码属性
		calltype : callType,
		preMakecallEvent : function(e) {
			var uuid = getUUID();
			$("#makecall").attr("data-updateID",uuid);
		}, //事件执行前预处理
		afterMakecallEvent : function(e) {
		},
		preEndcallEvent : function(e) {
		}, //事件执行前预处理
		afterEndcallEvent : function(e) {
			GRCaller.timer.stop();
			var userId = $("#userId").val();
			webCall.closed();
			if(userId == undefined || userId ==""){
				webCall.leaveNumber();
			}
		}
	});
	GRCaller.userAgentCallbacks({
		onInit: function() {

		},
		/**
		 * 接到电话回调函数
		 */
		onInvite : function() {
		},
		/**
		 * 发短信回调函数
		 */
		onMessage : function() {
		},
		/**
		 * 注册失败回调函数
		 */
		onRegistrationFailed : function(cause) {

		},
		/**
		 * 注销回调函数
		 */
		onUnregistered : function(cause) {

		},
		/**
		 * 注册回调函数
		 */
		onRegistered : function() {

		},
		/**
		 * 断开连接回调函数
		 */
		onDisconnected : function() {
                GRCaller.timer.stop();
				webCall.pcSettingWrong();
		},
		/**
		 * 连接成功回调函数
		 */
		onConnected : function() {
			$(".callback-msg").text('Webcall is ready');
			var callname = $("#makecall").attr("data-gnumcall");
			var e = $("#makecall")[0];
			GRCaller.makecall(callname,e);
			//webCall.connected();
			$(".serviceConnect").text("connected");
		}
	});
	GRCaller.sessionCallbacks({
		onConnecting : function(e) {
			webCall.connecting();
			$("#call-msg").text('Connecting...');
			$(e).attr("disabled",true);
		},
		onProgress : function(response,e) {
			webCall.dailing();
			$("#call-msg").text('Dialing');
			$(e).attr("disabled",false);
		},
		onAccepted : function(data,e) {
			webCall.connected();
			GRCaller.timer.start($("#call-msg"));
		},
		onCancel : function(e) {
			$("#call-msg").text("Ready");
		},
		onHangup : function(request,e) {
			GRCaller.timer.stop();
			//$("#call-msg").text('Ready');
			var userId = $("#userId").val();
			webCall.closed();
			if(userId == undefined || userId ==""){
				webCall.leaveNumber();
			}
			webCall.hangup();

		},
		onRejected : function(response,cause, e) {
			$("#call-msg").text("Rejected");
			webCall.hangup();
			webCall.leaveNumber();
		},
		onFailed : function(response,cause, e) {
			$("#call-msg").text("System Busy.");
			webCall.closed();
			webCall.hangup();
		},
		onRefer : function(request,e) {
		},
		onDtmf : function(request,dtmf, e) {
		},
		onMuted : function(data,e) {
			$("#mute").removeClass("unmute").addClass("mute");
		},
		onUnmuted : function(data,e) {
		  $("#mute").removeClass("mute").addClass("unmute");
		}
	});
})
