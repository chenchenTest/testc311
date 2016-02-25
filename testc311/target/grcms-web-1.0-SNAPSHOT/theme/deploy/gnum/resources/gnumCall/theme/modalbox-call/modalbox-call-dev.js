$(function() {
	GRCaller.init({
		handler : "#makecall",
		dataAttr : "data-gnumcall", //元素属性
		muteHandler:"#mute",
		//calltype:"flashCall",
		preMakecallEvent : function(e) {
		}, //事件执行前预处理
		afterMakecallEvent : function(e) {
			$(e).text("hang up").removeClass('btn-success').addClass('btn-danger');
		},
		preEndcallEvent : function(e) {
		}, //事件执行前预处理
		afterEndcallEvent : function(e) {
			//GRCaller.timer.stop();
			$(e).text("Make Call").removeClass('btn-danger').addClass('btn-success');
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

		},
		/**
		 * 连接成功回调函数
		 */
		onConnected : function() {
			$(".callback-msg").text('Webcall is ready');
			var callname = $("#makecall").attr("data-gnumcall");
			var e = $("#makecall")[0];
			GRCaller.makecall(callname,e);
			$(e).text("hang up").removeClass('btn-success').addClass('btn-danger');
		}
	});
	GRCaller.sessionCallbacks({
		onConnecting : function(e) {
			$(".callback-msg").text('连接中...');
		},
		onProgress : function(response,e) {
			$(".callback-msg").text('拨号中...');
		},
		onAccepted : function(data,e) {
			GRCaller.timer.start($(".callback-msg")[0]);		},
		onCancel : function(e) {
			$(".callback-msg").text("Webcall is ready");
		},
		onHangup : function(request,e) {
			GRCaller.timer.stop();
			setTimeout(function(){
				$(".callback-msg").text("通话结束");
			},1000)
			$(e).text("Make Call").removeClass('btn-danger').addClass('btn-success');
			setTimeout(function() {
				$(".callback-msg").text(" ");			}, 2000);

		},
		onRejected : function(response,cause, e) {
			$(".callback-msg").text(cause);
			$(e).text("Make Call").removeClass('btn-danger').addClass('btn-success');
		},
		onFailed : function(response,cause, e) {
			$(".callback-msg").text(cause);
			$(e).text("Make Call").removeClass('btn-danger').addClass('btn-success');
		},
		onRefer : function(request,e) {
		},
		onDtmf : function(request,dtmf, e) {
		},
		onMuted : function(data,e) {
		},
		onUnmuted : function(data,e) {
		}
	});
})
