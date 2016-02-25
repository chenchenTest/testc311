/**
 * 定义caller类
 */
var GRCaller = (function() {
	var calltypes = {
		webRTCCall : "webRTCCall",
		flashCall : "flashCall"
	}
	var flashId = "flashPannel";
	var grUserAgent;
	var grSession;
	var GRUserAgent;
	var GRSession;
	var CallerUtil;
	var userAgentCallbacks;
	var userAgentCallbacksWraper;
	var sessionCallbacks;
	var sessionCallbacksWraper;
	var flashCallbacks;
	var calltype;
	var handlerSettings;
	var handler;
	var libBase;
	var callTimer;
	var Caller;
	var clientUsername;
	var clientPassword;
	var callPrefix = "0047,0044";
	var updateID = "";
	var sessionID = "";

	/**
	 * GRUserAgent 函数
	 */
	GRUserAgent = function() {
		var userAgent, defaultConfig, userConfig, serverConfig, securityTimer;
		var generatorUserAgent = function(conf) {
			switch(calltype) {
				//webRTC Calltype
				case calltypes.webRTCCall :
					defaultConfig = {
						level : "debug",
						traceSip : true,
						register : false
					};
					if (conf) {
						if (conf.hasOwnProperty("username") && conf.username != "" && conf.hasOwnProperty("password") && conf.password != "") {
							userConfig = {
								authorizationUser : conf.username,
								password : conf.password
							}
						}
						if (conf.hasOwnProperty("serverIP") && conf.serverIP != "" && conf.hasOwnProperty("serverPort") && conf.serverPort != "" && conf.hasOwnProperty("serverRelm") && conf.serverRelm != "") {
							serverConfig = {
								serverIP : conf.serverIP,
								serverPort : conf.serverPort,
								serverRelm : conf.serverRelm,
								uri : conf.username + "@" + conf.serverRelm, //serverRelm
								ws_servers : "ws://" + conf.serverIP + ":" + conf.serverPort,
								rel100 : SIP.C.supported.SUPPORTED
							};
						}

					}

					defaultConfig = $.extend(defaultConfig, userConfig || {}, serverConfig || {});
					userAgent = new SIP.UA(defaultConfig);
					bindUserAgentCallback(userAgent);
					userAgentCallbacksWraper.onInit(userAgent);
					return userAgent;
					break;
				case calltypes.flashCall :
					var params = {
						wmode : 'transparent',
						ScriptAccess : 'always',
						bgcolor : "transparent"
					}
					if (conf) {
						if (conf.hasOwnProperty("rtmpURL") && conf.rtmpURL != "") {
							serverConfig = {
								vars : {
									enable_debug : conf.enableDebug,
									enable_js_api : conf.enableJsAPI,
									rtmp_url : conf.rtmpURL,
									debug_ping : conf.debugPing,
									onDebug : "GRCaller.onDebug",
									onInit : "GRCaller.getUserAgentCallbacks().onInit"
								}
							};
						}
						if (conf.hasOwnProperty("username") && conf.username != "" && conf.hasOwnProperty("password") && conf.password != "") {
							userConfig = {
								authorizationUser : conf.username,
								password : conf.password
							}
						}

					}
					defaultConfig = $.extend(defaultConfig, serverConfig || {}, userConfig || {});
					//载入Flash控件
					swfobject.embedSWF(libBase + "/webphone.swf", flashId, "260", "160", "9.0.0", libBase + "/expressInstall.swf", defaultConfig.vars, params, {}, function() {
						//生成FlashUserAgent对象
						userAgent = {
							registerCallbackFuntions : function() {
								$("#" + flashId)[0].registerCallbackFuntions({
									onTimeout : "",
									onConnected : "GRCaller.getUserAgentCallbacks().onConnected",
									onDisconnected : "GRCaller.getPreMCCallback().onDisconnected",
									onHangup : "GRCaller.getFlashCallbacks().onHangup",
									onLogin : "",
									onLogout : "",
									onAttach : "",
									onMakeCall : "",
									onCallState : "GRCaller.getFlashCallbacks().onCallState",
									onDisplayUpdate : "",
									onIncomingCall : "",
									onEvent : ""
								});

							},
							setConnectURL : function(url) {
								$("#" + flashId)[0].setConnectURL(url);
							},
							/**
							 * "200" : 连接成功
							 * "201" : 收到连接请求
							 * "202"：正在尝试连接
							 * "400" : 连接失败
							 * @returns
							 */
							isConnect : function() {
								return $("#" + flashId)[0].getRtmpConnectStatus();
							},
							connect : function(callmethodname) {
								if (window.console) {
									GRCaller.onDebug("==> Connect server [" + callmethodname + "]");
								}
								try {
									$("#" + flashId)[0].setTimeout(30, "connect");
									$("#" + flashId)[0].connect(callmethodname);
									$("#" + flashId)[0].showPrivacy();
								} catch(e) {

								}
							},
							disconnect : function() {
								if (window.console) {
									GRCaller.onDebug("==> Disonnect server");
								}

								$("#" + flashId)[0].disconnect();
							},
							isMuted : function() {
								return $("#" + flashId)[0].isMuted();
							},
							showPrivacy : function() {
								$("#flashPannelWraper").animate({
									top : 0
								}, 600);
								$("#" + flashId).css("visibility", "visible");
								$("#" + flashId)[0].showPrivacy();
							},
							hidePrivacy : function() {
								$("#flashPannelWraper").animate({
									top : -260
								}, 800);
							},
							makeCall : function(number, account, options) {
								securityTimer = setInterval(function() {
									if (window.console) {
										GRCaller.onDebug("show privacy")
									}
									if (userAgent.isMuted()) {
										userAgent.showPrivacy();
									} else {
										try {
											$("#" + flashId)[0].setTimeout(180, "call");
											if(account != undefined && account != ""){
												account = account + "@" + $("#" + flashId)[0].get_cur_uri();
											}
											$("#" + flashId)[0].makeCall(number, account || "", options);
											clearInterval(securityTimer);
											userAgent.hidePrivacy();
										} catch(e) {
											GRCaller.onDebug(e);
										}
									}
								}, 1000);

								//返回session
								var session = function() {
									var uuid;
									return {
										setUUID : function(uid) {
											this.uuid = uid;
										},
										dtmf : function(digit, duration) {
											$("#" + flashId)[0].sendDTMF(digit, duration);
										},
										hangup : function(uuid) {
											$("#" + flashId)[0].hangup(uuid);
										},
										answer : function(uuid) {
											$("#" + flashId)[0].answer(uuid);
										},
										attach : function(uuid) {
											$("#" + flashId)[0].attach(uuid);
										},
										sendDigit : function(digit) {
											$("#" + flashId)[0].sendDTMF(digit, 2000);
										},
										setVolume : function(volValue) {
											$("#" + flashId)[0].setVolume(volValue);
										},
										setMicVolume : function(micVol) {
											$("#" + flashId)[0].setMicVolume(micVol);
										}
									}
								}
								return session();
							},
							transfer : function(uuid, dest) {
								$("#" + flashId)[0].transfer(uuid, dest);
							},
							ui_transfer : function(uuid) {
								$("#transfer").data("uuid", uuid);
								// $("#transfer").dialog('open');
							},
							three_way : function(uuid1, uuid2) {
								$("#" + flashId)[0].three_way(uuid1, uuid2);
							},
							do_three_way : function(uuid) {
								var a = $(".active_call").data("uuid");
								if (a != "") {
									this.three_way(a, uuid);
								}
							},
							join : function(uuid1, uuid2) {
								$("#" + flashId)[0].join(uuid1, uuid2);
							},
							do_join : function(uuid) {
								var a = $(".active_call").data("uuid");
								if (a != "") {
									this.join(a, uuid);
								}
							},
							login : function(user, pass, sessionId) {
								var server_realm = $("#" + flashId)[0].get_cur_uri();
								user_to_login = user + '@' + server_realm;
								$("#" + flashId)[0].login(user_to_login, pass, sessionId);
							},
							logout : function(account) {
								$("#" + flashId)[0].logout(account);
							},
							getNetQuality : function() {
								return $("#" + flashId)[0].getNetQuality();
							},
							getNetQualityDetail : function() {
								return $("#" + flashId)[0].getNetQualityDetail();
							}
						}
						GRCaller.onDebug("==> Load Swf Finish.");
						userAgentCallbacksWraper.onInit = function() {
							if (window.console) {
								GRCaller.onDebug("==> OnInit");
							}
							var offset = $("#flashPannelWraper").offset();
							$("#flashPannelWraper").offset({
								left : 0,
								top : offset.top
							});
							userAgent.connect('');
							userAgent.registerCallbackFuntions();
							userAgentCallbacks.onInit();
						}
					});
					break;
			}
		}
		var bindUserAgentCallback = function(userAgent) {
			userAgent.on("invite", function(session) {
				if (window.console) {
					GRCaller.onDebug("==> receive incoming call");
				}
				session.accept(options);
				userAgentCallbacksWraper.onInvite()
			});
			userAgent.on("message", function(message) {
				if (window.console) {
					GRCaller.onDebug("==> onMessage Callback");
				}
				userAgentCallbacksWraper.onMessage()
			});
			userAgent.on("registrationFailed", function(cause) {
				if (window.console) {
					console.info("==> onRegistrationFailed, cause: " + cause);
				}
				userAgentCallbacksWraper.onRegistrationFailed(cause)
			});
			userAgent.on("unregistered", function(cause) {
				if (window.console) {
					console.info("==> onUnregistered, cause: " + cause);
				}
				userAgentCallbacksWraper.onUnregistered(cause)
			});
			userAgent.on("registered", function() {
				if (window.console) {
					console.info(" register success")
				}
				userAgentCallbacksWraper.onRegistered()
			});
			userAgent.on("disconnected", function(session) {
				if (window.console) {
					console.info("==> Webrtc Disconnected")
				}
				try {
					session.bye();
					session = "";
				} catch(e) {
					if (window.console) {
						console.error(e.message)
					}
				}
				userAgentCallbacksWraper.onDisconnected(session)
			});
			userAgent.on("connected", function() {
				if (window.console) {
					console.info("==> Server onConnected")
				}
				userAgentCallbacksWraper.onConnected();
			});
		}
		var encrypt = function(callhandle) {
			var encryptFunc = function(callhandle) {
				var text = "uid=" + callhandle + "&prefix=" + callPrefix + "&updateID=" + $(handlerSettings.handler).attr("data-updateID");
				var iv = CryptoJS.enc.Hex.parse('00');
				var encrypted = CryptoJS.DES.encrypt(text, CryptoJS.enc.Hex.parse('77656263616C6C00'), {
					mode : CryptoJS.mode.ECB
				});
				hex = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse("" + encrypted))
				return hex
			}
			var dest = "";
			switch(calltype) {
				case calltypes.webRTCCall:
					dest = "sip:" + encryptFunc(callhandle) + "@" + serverConfig.serverIP;
					break;
				case calltypes.flashCall:
					dest = encryptFunc(callhandle);
					break;
			}
			return dest;
		}
		return {
			init : function(conf) {
				switch(calltype) {
					case calltypes.webRTCCall:
						var $audios = $('<audio id="remoteAudio"></audio><audio id="localAudio"  muted="muted"></audio>');
						$("body").append($audios);
						break;
					case calltypes.flashCall:
						var $handler = $(handlerSettings.handler);
						if ( typeof $handler[0] == "undefined") {
							alert("Do not find handler [" + handlerSettings.handler + "],check again please.");
							return false;
						}
						var $flashbox = $(handlerSettings.handler).eq(0).parent();
						var $audioWraper = $('<div id="flashPannelWraper" style="position: fixed;top:0px;left:0px;padding:5px;z-index: 2000;"></div>')
						var $audios = $('<div id="' + flashId + '" > Flash is not available  </div>');
						$audioWraper.append($audios);
						$flashbox.after($audioWraper);
						break;
				}
				generatorUserAgent(conf);
			},
			encryptCallhandle : function(callhandle) {
				return encrypt(callhandle);
			},
			generatorUserAgent : function(conf) {
				generatorUserAgent(conf);
			},
			//切换服务地址
			toggleServer : function(srvIp, srvPort, relm) {
				userAgent = generatorUserAgent({
					serverIP : srvIp,
					serverPort : srvPort,
					serverRelm : relm
				});
			},
			/**
			 * 拨打电话
			 * @param {Object} callnumber
			 */
			makecall : function(callnumber, selector) {
				var dest = encrypt(callnumber);
				switch (calltype) {
					case calltypes.webRTCCall :
						if (window.console) {
							GRCaller.onDebug("==> webRTC call,callnumber = " + callnumber);
						}
						var opt = {
							media : {
								constraints : {
									audio : true,
									video : false
								},
								render : {
									remote : {
										audio : document.getElementById("remoteAudio")
										//video: document.getElementById('remoteVideo')
									}
								}
							}
						};
						if (window.console) {
							console.info("==> try call " + dest);
						}
						var session = userAgent.invite(dest, opt);
						if (window.console) {
							console.info("==> bind web RTC session event");
						}
						grSession.bindSessionEvent(session, selector);
						break;
					case calltypes.flashCall :
						if (window.console) {
							console.info("==> try call " + dest);
							console.info("==> bind flash session event");
						}
						userAgent.login(clientUsername,clientPassword,sessionID);
						var session = userAgent.makeCall(dest, defaultConfig.authorizationUser, []);
						grSession.bindFlashCallbacks(session, selector);
						break;
				}
			},
			//注册UserAgent并且绑定回调事件
			login : function(name, pwd) {
				var userAgent = generatorUserAgent({
					username : name,
					password : pwd
				});
				if (name != "" && pwd != "") {
					userAgent.register();
				}
			},
			/**
			 * 登出
			 * @param {Object} account
			 */
			logout : function(account) {
				userAgent.unregister();
			},
			/**
			 *userAgent连接
			 */
			connect : function() {
				switch(calltype) {
					case calltypes.webRTCCall:
						userAgent.start();
						break;
					case calltypes.flashCall:
						userAgent.connect("");
						break;
				}
			},
			/**
			 * 断开连接
			 */
			disconnect : function() {
				console.log(userAgent)
				userAgent.stop();
			},
			showPrivacy : function() {
				if (userAgent.showPrivacy) {
					userAgent.showPrivacy();
				}
			},
			hidePrivacy : function() {
				if (userAgent.hidePrivacy) {
					userAgent.hidePrivacy();
					clearInterval(securityTimer);
				}
			}
		}
	}
	/**
	 * GRSession函数
	 */
	GRSession = function() {
		var bindSession;

		return {
			bindFlashCallbacks : function(session, selector) {
				flashCallbacks = {};
				bindSession = session;
				/**
				 * 绑定flash call呼叫状态回调函数
				 */
				flashCallbacks.onCallState = function(uuid, state) {
					try {
						bindSession.setUUID(uuid);
						if (window.console) {
							GRCaller.onDebug("==>uuid: " + uuid + ", state: " + state);
						}
					} catch (e) {
						// TODO: handle exception
					}
					var text = "";
					switch (state) {
						case "DOWN":
							break;
						case "RINGING":
							sessionCallbacksWraper.onConnecting(selector);
							grSession.mute();
							break;
						case "EARLY":
							sessionCallbacksWraper.onProgress(state, selector);
							grSession.mute();
							break;
						case "ACTIVE":
							sessionCallbacksWraper.onAccepted(state, selector);
							grSession.unmute();
							break;
						case "HANGUP":
							sessionCallbacksWraper.onHangup(state, selector);
							grSession.unmute();
							bindSession = null;
							break;
						default:
							break;
					}
				}
				/**
				 * 绑定flashcall挂断回调函数
				 */
				flashCallbacks.onHangup = function(uuid, cause) {
					try {
						if (window.console) {
							GRCaller.onDebug("hangup cause:" + cause);
						}
					} catch (e) {
						// TODO: handle exception
					}
					//根据状态码作出提示
					switch (cause) {
						case 16:
							sessionCallbacksWraper.onHangup(cause, selector);
							break;
						case 200:
							sessionCallbacksWraper.onHangup(cause, selector);
							break;
						case 404:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 408:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 480:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 486:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 503:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 603:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 629:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 630:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						case 487:
							sessionCallbacksWraper.onFailed(cause, selector);
							break;
						default:
							if (cause >= 621 && cause <= 626) {
								sessionCallbacksWraper.onFailed(cause, selector);
							} else if (cause == 627 || cause == 628) {
								sessionCallbacksWraper.onFailed(cause, selector);
							}
							break;
					}

				}
			},
			/**
			 * 绑定WEB RTC session事件
			 */
			bindSessionEvent : function(session, selector) {
				bindSession = session;
				session.on("connecting", function() {
					if (window.console) {
						GRCaller.onDebug("==> session connecting")
					}
					sessionCallbacksWraper.onConnecting(selector)
				});
				session.on("progress", function(response) {
					if (window.console) {
						GRCaller.onDebug("==> session progress")
					}
					sessionCallbacksWraper.onProgress(response, selector)
				});
				session.on("accepted", function(data) {
					if (window.console) {
						GRCaller.onDebug("==> session accepted")
					}
					sessionCallbacksWraper.onAccepted(data, selector)
				});
				session.on("rejected", function(response, cause) {
					if (window.console) {
						GRCaller.onDebug("==> session rejected")
					}
					try {
						session.bye();
						session = "";
					} catch(e) {
						if (window.console) {
							console.error(e.message)
						}
					}
					sessionCallbacksWraper.onRejected(response, cause, selector)
				});
				session.on("failed", function(response, cause) {
					if (window.console) {
						GRCaller.onDebug("==> session failed");
					}
					sessionCallbacksWraper.onFailed(response, cause, selector)
				});
				session.on("cancel", function() {
					if (window.console) {
						GRCaller.onDebug("==> session cancel")
					}
					sessionCallbacksWraper.onCancel(selector)
				});
				session.on("refer", function(request) {
					if (window.console) {
						GRCaller.onDebug("==> session refer")
					}
					sessionCallbacksWraper.onRefer(request, selector)
				});
				session.on("dtmf", function(request, dtmf) {
					if (window.console) {
						GRCaller.onDebug("==> session dtmf")
					}
					sessionCallbacksWraper.onDtmf(request, dtmf, selector)
				});
				session.on("muted", function(data) {
					if (window.console) {
						GRCaller.onDebug("==> session muted")
					}
					sessionCallbacksWraper.onMuted(data, selector)
				});
				session.on("unmuted", function(data) {
					if (window.console) {
						GRCaller.onDebug("==> session unmuted")
					}
					sessionCallbacksWraper.onUnmuted(data, selector)
				});
				session.on("bye", function(request) {
					if (window.console) {
						GRCaller.onDebug("==> session bye")
					}
					sessionCallbacksWraper.onHangup(request, selector)
				});
			},
			/**
			 * 挂断电话
			 */
			hangup : function() {
				switch(calltype) {
					case calltypes.webRTCCall:

						try {
							bindSession.bye();
							//通话建立结束
						} catch (e) {
							if (window.console) {
								console.error(e.message);
							}
							try {
								//通话未建立结束
								bindSession.cancel();
							} catch(e) {
								if (window.console) {
									console.error(e.message);
								}
							}
						}

						break;
					case calltypes.flashCall:
						bindSession.hangup();
						break;
				}
			},
			mute : function() {
				switch(calltype) {
					case calltypes.webRTCCall:
						bindSession.mute();
						break;
					case calltypes.flashCall:
						bindSession.setMicVolume(0);
						sessionCallbacksWraper.onMuted(null,$(handlerSettings.handler)[0]);
						break;
				}
			},
			unmute : function() {
				switch(calltype) {
					case calltypes.webRTCCall:
						bindSession.unmute();
						break;
					case calltypes.flashCall:
						bindSession.setMicVolume(1);
						sessionCallbacksWraper.onUnmuted(null,$(handlerSettings.handler)[0]);
						break;
				}
			},
			/**
			 * 接电话
			 */
			answer : function() {
				bindSession.accept();
			},
			/**
			 * 发送dtmf指令
			 * @param {Object} digit
			 */
			sendDtmf : function(digit) {
				bindSession.dtmf(digit);
			}
		}
	}
	//user Agent包装类
	userAgentCallbacksWraper = {
		/**
		 * UserAgent初始化
		 */
		onInit : function() {
			if (window.console) {
				GRCaller.onDebug("==> OnInit");
			}
			userAgentCallbacks.onInit();
		},
		/**
		 * 接到电话回调函数
		 */
		onInvite : function(session) {
			if (window.console) {
				GRCaller.onDebug("==> receive incoming call");
			}
			session.accept(options);
			userAgentCallbacks.onInvite(session);
		},
		/**
		 * 发短信回调函数
		 */
		onMessage : function(message) {
			if (window.console) {
				GRCaller.onDebug("==> onMessage Callback");
			}
			userAgentCallbacks.onMessage(message);
		},
		/**
		 * 注册失败回调函数
		 */
		onRegistrationFailed : function(cause) {
			if (window.console) {
				console.info("==> onRegistrationFailed, cause: " + cause);
			}
			userAgentCallbacks.onRegistrationFailed(cause);
		},
		/**
		 * 注销回调函数
		 */
		onUnregistered : function(cause) {
			if (window.console) {
				console.info("==> onUnregistered, cause: " + cause);
			}
			userAgentCallbacks.onUnregistered(cause);
		},
		/**
		 * 注册回调函数
		 */
		onRegistered : function() {
			if (window.console) {
				console.info(" register success")
			}
			userAgentCallbacks.onRegistered();
		},
		/**
		 * 断开连接回调函数
		 */
		onDisconnected : function(session) {
			if (window.console) {
				console.info("==> User Agent onDisconnected")
			}
			try {
				session.bye();
				session = "";
			} catch(e) {
				if (window.console) {
					console.error(e.message)
				}
			}
			userAgentCallbacks.onDisconnected(session);
		},
		/**
		 * 连接成功回调函数
		 */
		onConnected : function() {
			if (window.console) {
				console.info("==> User Agent onConnected")
			}

			//拨号元素绑定事件
			handler = handlerSettings.handler;
			$(handler).each(function(i) {
				CallerUtil.bindMakeCallEvent(this);
			});

			//用户回调
			userAgentCallbacks.onConnected();

		}
	}
	/**
	 * userAgentCallbacks回调函数
	 */
	userAgentCallbacks = {
		/**
		 * 初始化完成回调
		 */
		onInit : function() {
		},
		/**
		 * 接到电话回调函数
		 */
		onInvite : function(session) {
		},
		/**
		 * 发短信回调函数
		 */
		onMessage : function(message) {
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
		onDisconnected : function(session) {
		},
		/**
		 * 连接成功回调函数
		 */
		onConnected : function() {
		}
	}

	/**
	 * SESSION包装回调函数
	 */
	sessionCallbacksWraper = {
		onConnecting : function(selector) {
			if (window.console) {
				GRCaller.onDebug("==> onConnecting Callback");
			}
			CallerUtil.bindMuteEvent();
			sessionCallbacks.onConnecting(selector);
		},
		onProgress : function(response, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onProgress Callback");
			}
			sessionCallbacks.onProgress(response, selector);
		},
		onAccepted : function(data, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onAccepted Callback");
			}
			CallerUtil.bindEndCallEvent(selector);
			sessionCallbacks.onAccepted(data, selector);
		},
		onCancel : function(selector) {
			if (window.console) {
				GRCaller.onDebug("==> onCancel Callback");
			}
			CallerUtil.bindMakeCallEvent(selector);
			CallerUtil.unbindMuteEvent();
			sessionCallbacks.onCancel(selector);
		},
		onHangup : function(request, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onHangup Callback");
			}
			CallerUtil.bindMakeCallEvent(selector);
			CallerUtil.unbindMuteEvent();
			sessionCallbacks.onHangup(request, selector);
		},
		onRejected : function(response, cause, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onRejected Callback");
			}
			CallerUtil.bindMakeCallEvent(selector);
			CallerUtil.unbindMuteEvent();
			sessionCallbacks.onRejected(response, cause, selector);
		},
		onFailed : function(response, cause, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onFailed Callback");
			}
			CallerUtil.bindMakeCallEvent(selector);
			CallerUtil.unbindMuteEvent();
			sessionCallbacks.onFailed(response, cause, selector);
		},
		onRefer : function(request, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onRefer Callback");
			}
			sessionCallbacks.onRefer(request, selector);
		},
		onDtmf : function(request, dtmf, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onDtmf Callback");
			}
			sessionCallbacks.onDtmf(request, dtmf, selector);
		},
		onMuted : function(data, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onMuted Callback");
			}
			sessionCallbacks.onMuted(data, selector);
		},
		onUnmuted : function(data, selector) {
			if (window.console) {
				GRCaller.onDebug("==> onUnmuted Callback");
			}
			sessionCallbacks.onUnmuted(data, selector);
		}
	}

	//SESSION回调函数
	sessionCallbacks = {
		onConnecting : function(selector) {
		},
		onProgress : function(response, selector) {
		},
		onAccepted : function(data, selector) {
		},
		onCancel : function(selector) {
		},
		onHangup : function(request, selector) {
		},
		onRejected : function(response, cause, selector) {
		},
		onFailed : function(response, cause, selector) {
		},
		onRefer : function(request, selector) {
		},
		onDtmf : function(request, dtmf, selector) {
		},
		onMuted : function(data, selector) {
		},
		onUnmuted : function(data, selector) {
		}
	}

	//Caller工具
	CallerUtil = {
		//初始化动作
		init : function(calltype,serverConf) {
			grUserAgent = GRUserAgent();
			grSession = GRSession();
			var config;
			switch(calltype) {
				case calltypes.webRTCCall :
					if (window.console) {
						GRCaller.onDebug("==> Load webRTC resource");
					}
					//配置信息
					config = {
						scripts : [libBase + "/tripledes.js", libBase + "/core-min.js", libBase + "/enc-utf16-min.js", libBase + "/enc-base64-min.js", libBase + "/mode-ecb-min.js", libBase + "/sip-0.6.3.js"],
						serverIP : serverConf.webRTC.serverIP,
						serverPort : serverConf.webRTC.serverPort,
						serverRelm : "sip.gnum.com",
						level : "debug",
						traceSip : true,
						register : false,
						username : clientUsername,
						password : clientPassword
					}

					break;
				case calltypes.flashCall:
					if (window.console) {
						GRCaller.onDebug("==> Load flash resource");
					}
					//Flash Call配置
					config = {
						scripts : [libBase + "/gnum_log.js", libBase + "/tripledes.js", libBase + "/core-min.js", libBase + "/enc-utf16-min.js", libBase + "/enc-base64-min.js", libBase + "/mode-ecb-min.js", libBase + "/swfobject.js"],
						enableDebug : "yes",
						enableJsAPI : "yes",
						rtmpURL : serverConf.flash.rtmpURL,
						debugPing : "no",
						ScriptAccess : 'always',
						bgcolor : "#ffffff",
						username : clientUsername,
						password : clientPassword
					}
					break;
			}

			//加载资源并执行成功回调函数
			if (config.scripts) {
				CallerUtil.loadScripts(config.scripts, function() {
					grUserAgent.init(config);
				});
			}

		},
		//是否支持webRTC
		supportWebRTC : function() {
			navigator.getUserMedia = navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
			// return false;
			if (navigator.getUserMedia) {
				return true;
			} else {
				return false;
			}
		},
		//执行加载资源文件
		loadScripts : function(scripts, callback) {
			if ( typeof (scripts) != "object") {
				var scripts = [scripts];
			}
			var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
			var s = new Array(), last = scripts.length - 1, recursiveLoad = function(i) {//递归
				s[i] = document.createElement("script");
				s[i].setAttribute("type", "text/javascript");
				s[i].onload = s[i].onreadystatechange = function() {//Attach handlers for all browsers
					if (!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
						this.onload = this.onreadystatechange = null;
						this.parentNode.removeChild(this);
						if (i != last)
							recursiveLoad(i + 1);
						else if ( typeof (callback) == "function")
							callback();
					}
				}
				s[i].setAttribute("src", scripts[i]);
				HEAD.appendChild(s[i]);
			};
			recursiveLoad(0);
		},
		//浏览器版本
		browserVer : function() {
			var browserName = navigator.userAgent.toLowerCase();
			//var browserVer = br.substr(br.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+).+\)+.\b[a-zA-Z]+[\/]/)[0].length).match(/([0-9]\d*\.)*[0-9]+/)[0];
			var browserVer = "";
			var bn = this.browserName();
			try {
				if (bn == "Firefox") {
					browserVer = browserName.substr(browserName.match(/.+(firefox)+[\/]/)[0].length).match(/([0-9]\d*\.)*[0-9]+/)[0];
				} else if (bn == "Chrome") {
					browserVer = browserName.substr(browserName.match(/.+(chrome)+[\/]/)[0].length).match(/([0-9]\d*\.)*[0-9]+/)[0];
				} else if (bn == "IE") {
					browserVer = browserName.substr(browserName.match(/.+(msie)/)[0].length).match(/([0-9]\d*\.)*[0-9]+/)[0];
				} else {
					browserVer = browserName.substr(browserName.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+).+\)+.\b[a-zA-Z]+[\/]/)[0].length).match(/([0-9]\d*\.)*[0-9]+/)[0];
				}
			} catch (e) {
				logger.log(e);
				browserVer = $.browser.version;
			}
			return browserVer;
		},
		//浏览器名字
		browserName : function() {
			var browserName = navigator.userAgent.toLowerCase();
			var bn = "unKnow";
			try {
				if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
					bn = "IE";
				} else if (/firefox/i.test(browserName)) {
					bn = "Firefox";
				} else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
					bn = "Chrome";
				} else if (/opera/i.test(browserName)) {
					bn = "Opera";
				} else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
					bn = "Safari";
				} else {
					if ($.browser.msie == true) {
						bn = "IE";
					} else if ($.browser.safari == true) {
						bn = "Safari";
					} else if ($.browser.opera == true) {
						bn = "Opera ";
					} else if ($.browser.mozilla == true) {
						bn = "IE";
					}
				}
			} catch (e) {
				logger.log(e);
			}
			return bn;

		},
		flashVersion : function() {
			var f = "-", n = navigator;
			if (n.plugins && n.plugins.length) {
				for (var ii = 0; ii < n.plugins.length; ii++) {
					if (n.plugins[ii].name.indexOf('Shockwave Flash') != -1) {
						f = n.plugins[ii].description.split('Shockwave Flash ')[1];
						break;
					}
				}
			} else if (window.ActiveXObject) {
				for (var ii = 10; ii >= 2; ii--) {
					try {
						var fl = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + ii + "');");
						if (fl) {
							f = ii + '.0';
							break;
						}
					} catch (e) {
					}
				}
			}
			return f;
		},
		bindMakeCallEvent : function(e) {
			Caller.onDebug("==> bind make call event");
			$(e).off("click").on("click", function() {
				handlerSettings.preMakecallEvent(this);
				handlerSettings.onMakecallEvent(this);
				handlerSettings.afterMakecallEvent(this);
			});
		},
		bindEndCallEvent : function(e) {
			Caller.onDebug("==> bind end call event");
			$(e).off("click").on("click", function() {
				handlerSettings.preEndcallEvent(this);
				handlerSettings.onEndCallEvent(this);
				handlerSettings.afterEndcallEvent(this);
			});
		},
		bindMuteEvent : function() {
			Caller.onDebug("==> bind mute event");
			var mute = 0;
			//静音按钮绑定事件
			var muteHandler = handlerSettings.muteHandler;
			if (muteHandler != null && typeof $(muteHandler)[0] == "undefined") {
				alert("Mute handler[" + muteHandler + "] is not defined,check again please");
				return false;
			}
			$(muteHandler).on("click", function() {
				if (mute == 0) {
					grSession.mute();
					mute = 1;
				} else if (mute == 1) {
					grSession.unmute();
					mute = 0;
				}
			})
		},
		unbindMuteEvent : function() {
			Caller.onDebug("==> bind unmute event");
			//静音按钮绑定事件
			var muteHandler = handlerSettings.muteHandler;
			if (muteHandler != null && typeof $(muteHandler)[0] == "undefined") {
				alert("Mute handler[" + muteHandler + "] is not defined,check again please");
				return false;
			}
			$(muteHandler).off("click");
		}
	}

	/**
	 * 计时器方法，开始计时及停止计时
	 */
	var timerPannel = function() {
		var seacond = 0;
		var minute = 0;
		var timePannel = "";
		var minutePannel = "";
		var seacondPannel = "";
		var timer = null;

		return {
			startTimer : function(e) {
				clearInterval(timer);
				timer = setInterval(function() {
					seacond++;
					if (seacond == 60) {
						minute++;
						seacond = 0;
					}
					seacondPannel = seacond > 9 ? seacond : "0" + seacond;
					minutePannel = minute > 9 ? minute : "0" + minute;
					timePannel = minutePannel + ":" + seacondPannel;
					$(e).text(timePannel);
				}, 1000);
			},
			stopTimer : function() {
				clearInterval(timer);
				timer = null;
				seacond = 0;
				minute = 0;
				timePannel = "";
				minutePannel = "";
				seacondPannel = "";
			}
		}
	}
	callTimer = timerPannel();
	//对外暴露方法
	var sc = null;
	Caller = {
		serverConf:function(serverConf){
			var defaultServerConf = {
					webRTC:{
						serverIP : "61.8.223.35",
						serverPort : "5066"
					},
					flash:{
						rtmpURL : "rtmp://61.8.223.35:1935/phone;rtmpt://61.8.223.35:80/phone;rtmps://61.8.223.35:443/phone"
					}
			}
			sc = $.extend(defaultServerConf,serverConf||{});
		},
		init : function(data) {
			var defaultSetting = {
				handler : null, //处理选择器
				muteHandler : null, //静音选择器
				dataAttr : "data-gnumcall", //元素属性
				usernameAttr : "data-gnumUsername", //用户名属性
				passwordAttr : "data-gnumPassword", //密码属性
				libBase : "lib",
				calltype : "auto", //默认"AUTO",可选"webRTCCall"和"flashCall"
				preMakecallEvent : function(e) {
				}, //事件执行前预处理
				afterMakecallEvent : function(e) {
				}, //事件执行后处理
				preEndcallEvent : function(e) {
				}, //事件执行前预处理
				afterEndcallEvent : function(e) {
				}//事件执行后处理
			}

			var wraperEvent = $.extend({}, defaultSetting, data);

			handlerSettings = {
				handler : wraperEvent.handler, //处理选择器
				muteHandler : wraperEvent.muteHandler, //静音选择器
				dataAttr : wraperEvent.dataAttr, //元素属性
				usernameAttr : wraperEvent.usernameAttr,
				passwordAttr : wraperEvent.passwordAttr,
				libBase : wraperEvent.libBase,
				calltype : wraperEvent.calltype, //默认"AUTO",可选"webRTCCall"和"flashCall"
				preMakecallEvent : function(e) {
					wraperEvent.preMakecallEvent(e);
				}, //事件执行前预处理
				afterMakecallEvent : function(e) {
					wraperEvent.afterMakecallEvent(e);
				}, //事件执行后处理
				preEndcallEvent : function(e) {
					wraperEvent.preEndcallEvent(e);
				}, //事件执行前预处理
				afterEndcallEvent : function(e) {
					grUserAgent.hidePrivacy();
					wraperEvent.afterEndcallEvent(e);
				}, //事件执行后处理
				onMakecallEvent : function(e) {
					var callnumber = $(e).attr(handlerSettings.dataAttr);
					Caller.makecall(callnumber, e);
				},
				onEndCallEvent : function(e) {
					Caller.endcall();
				}
			}

			libBase = handlerSettings.libBase;

			//执行初始化事件
			calltype = CallerUtil.supportWebRTC() ? calltypes.webRTCCall : calltypes.flashCall;
			calltype = handlerSettings.calltype == "auto" ? calltype : handlerSettings.calltype;
			if (calltype != calltypes.webRTCCall && calltype != calltypes.flashCall) {
				alert("Do not support calltype " + calltype + ",only support " + calltypes.flashCall + " or " + calltypes.webRTCCall);
				return false;
			}

			//获取客户端用户名和密码
			clientUsername = $(handlerSettings.handler).attr(handlerSettings.usernameAttr);
			clientPassword = $(handlerSettings.handler).attr(handlerSettings.passwordAttr);
			clientUsername = (clientUsername == null || clientUsername == "" || clientUsername == "ANONYMOUS") ? "unknown" : clientUsername;//ANONYMOUS 
			clientPassword = (clientPassword == null || clientPassword == "") ? "" : clientPassword;
			
			if(clientPassword != "") {
				callPrefix = "0043,0044"
			}
			
			updateID = $(handlerSettings.handler).attr("data-updateID");
			updateID = (typeof updateID == "undefined" || updateID == null || updateID == "")?"":updateID;
			
			sessionID = $(handlerSettings.handler).attr("data-sessionID");
			sessionID = (typeof sessionID == "undefined" || sessionID == null || sessionID == "")?"":sessionID;
			
			sc = sc == null?Caller.serverConf():sc;
			CallerUtil.init(calltype,sc);

		},
		//通话前回调函数
		userAgentCallbacks : function(callbacks) {
			userAgentCallbacks = $.extend(userAgentCallbacks, callbacks || {});
		},
		getUserAgentCallbacks : function() {
			return userAgentCallbacksWraper;
		},
		//通话回调函数
		sessionCallbacks : function(callbacks) {
			sessionCallbacks = $.extend(sessionCallbacks, callbacks || {});
		},
		getSessionCallbacks : function() {
			return sessionCallbacksWraper;
		},
		getFlashCallbacks : function() {
			return flashCallbacks;
		},
		makecall : function(callnumber, e) {
			grUserAgent.makecall(callnumber, e);
			CallerUtil.bindEndCallEvent(e);
		},
		endcall : function(e) {
			grSession.hangup();
			CallerUtil.bindMakeCallEvent(e);
		},
		muted : function() {

		},
		unmuted : function() {

		},
		dtmf:function(info){
			if(grSession) {
				grSession.sendDtmf(info)
			}else{
				console.log("Session is not available");
			}
		},
		onDebug : function(msg, e) {
			var $logger = $("#log");
			if (e) {
				$logger = $(e);
			}
			$logger.append(msg + "<br/>");
			if (window.console) {
				console.log(msg);
			}
		},
		//检测方法
		detect : {
			//浏览器版本
			browserVersion : function() {
				return CallerUtil.browserVer();
			},
			//浏览器名字
			browserName : function() {
				return CallerUtil.browserName();
			},
			//是否支持webRTC
			isSupportWebRTC : function() {
				return CallerUtil.supportWebRTC();
			},
			flashVersion : function() {
				return CallerUtil.flashVersion();
			}
		},
		//定时器
		timer : {
			start : function(e) {
				callTimer.startTimer(e);
			},
			stop : function() {
				callTimer.stopTimer();
			}
		}
	}

	$(window).unload(function() {
		flashId = null;
		grUserAgent = null;
		grSession = null;
		GRUserAgent = null;
		GRSession = null;
		CallerUtil = null;
		userAgentCallbacks = null;
		userAgentCallbacksWraper = null;
		sessionCallbacks = null;
		sessionCallbacksWraper = null;
		flashCallbacks = null;
		calltype = null;
		handlerSettings = null;
		handler = null;
		libBase = null;
		callTimer = null;
		Caller = null;
	});

	return Caller;

})();

