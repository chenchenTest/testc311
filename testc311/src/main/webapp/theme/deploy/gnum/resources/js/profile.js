$(function () {
    var profile = {
        email: {
            send: {
                suceess: "verification email send success",
                failed: "verification email send failed"
            }
        },
        numberToggle: {
            success: " update primary number success",
            failed: "update primary number failed"
        },
        removeNumber: {
            success: " delete number success",
            failed: "delete number failed"
        }
    };
    //初始化下拉选
    $("#data-container .dropdown").dropdownMenu();
    //初始化otp计时按钮
    $("#otpBtn").waitButton({
        timeout: 1000 * 60,
        preAction: function (target) {
               if (!$('#newMobile').valid()) {
             this.cancel = true;
             return;
             }
            this.cancel = false;
            var mobile = $("#newMobile").val();
            var countryCode = stringUtils.removePlus($(".dropdown .content").attr("data-content"));
            try {
                sendOTP(mobile, countryCode, "add", function () {
                    //if send otp failed then cancel the timer
                    var timer = $("#otpBtn").data("timer");
                    var text = $("#otpBtn").data("originText");
                    clearInterval(timer);
                    $("#otpBtn").text(text).removeAttr('disabled');;
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
    //绑定otp验证按钮
    $("#verifyBtn").click(function (e) {
        if (!$("#otp").valid()) {
            return;
        }
        e.preventDefault();
        var mobile = $("#newMobile").val();
        var countryCode = stringUtils.removePlus($(".dropdown .content").attr("data-content"));
        var otp = $("#otp").val();
        addCallNumber(mobile, countryCode, otp, function (response) {
            if (response != "false") {
                $(".number-list").empty().append(response);
                Msg.alert("add call number success", "alert-success");
                $("#otp,#newMobile").val("");
            } else {
                Msg.alert("add call number failed", "alert-warning");
            }
        });
    });
    //初始化上传头像按钮
    //avatar upload
    var uploader = new plupload.Uploader({
        browse_button: 'browse',
        url: $path + '/fileupload/uploadavatar',
        file_data_name: "avatar",
        flash_swf_url: $path + '/resources/plugins/plupload/Moxie.swf',
        silverlight_xap_url: $path + '/resources/plugins/plupload/Moxie.xap',
        //define file constraint
        filters: {
            max_file_size: '1mb',
            mime_types: [{
                title: "Image files",
                extensions: "jpg,gif,png,bmp"
            },]
        },
        //crop the uploaded image
        resize: {
            width: 120,
            height: 120,
            quality: 90,
            crop: true
        },
        //bind event
        init: {
            PostInit: function () {
            },
            FilesAdded: function (up, files) {
                //guarantee only the newest file in the uploader's file queue
                if (up.files.length == 2) {
                    up.removeFile(up.files[0]);
                }
                //automatic upload the image
                uploader.start();
            },
            UploadProgress: function (up, file) {
            },
            FileUploaded: function (up, file, info) {
                var result = eval("(" + info.response + ")");
                if (result.ok == true) {
                    //preview the image
                    $(".avatar img")[0].src = result.photo;
                    $(".signed img")[0].src = result.photo;
                   /* previewImage(file, function (imgsrc) {
                        $("#browse + img")[0].src = imgsrc;
                        $(".right-head-image > img")[0].src = imgsrc;
                    });*/
                    Msg.alert("Profile picture successfully updated", "alert-success");
                } else {
                    Msg.alert("Profile picture failed to update", "alert-success");
                }
            },
            Error: function (up, err) {
                switch (err.code) {
                    case -200:
                        Msg.alert("your network is not working,please check and try again", "alert-danger");
                        break;
                    default:
                        Msg.alert("Profile picture failed to update", "alert-danger");
                }
            }
        }
    });
    uploader.init();
    //define image preview function
    function previewImage(file, callback) {
        if (!file || !/^image/.test(file.type)) return; //guarantee the file is image
        if (file.type == mOxie.Mime.mimes.gif) { //if the image file type is gif use FileReader to preview,because mOxie.Image only support jpg and png

            var fr = new mOxie.FileReader();
            fr.onload = function () {
                callback(fr.result);
                fr.destroy();
                fr = null;
            };
            fr.readAsDataURL(file.getSource());
        } else {
            var preloader = new mOxie.Image();
            preloader.onload = function () {
                preloader.downsize(128, 128); //crop the image file to width:128,height:128
                var imgsrc = preloader.type == mOxie.Mime.mimes.jpg ? preloader.getAsDataURL(mOxie.Mime.mimes.jpg, 80) : preloader.getAsDataURL(); //fetch image src,actually is base64 encoded data
                callback && callback(imgsrc); //pass the imgsrc to the callback function
                preloader.destroy(); //destory the preloader in order to release system resource
                preloader = null;
            };
            preloader.load(file.getSource());
        }
    }

    //保存displayname
    $(".save-name").click(function () {
        if (!$('input[name="name"]').valid()) {
            return;
        }
        $.ajax({
            type: "post",
            url: $path + "/profile/save/?_=" + Math.random(),
            data: $("input[type='hidden'],input[name='name']").serialize(),
            dataType: "json",
            success: function (map) {
                if (map != null && map.status == "failed") {
                    Msg.alert("display name failed", "alert-danger");
                } else {
                    Msg.alert("display name update success", "alert-success");
                }
            }
        });
    });

    //保存密码
    /*$(".save-pwd-btn").click(function(){
     if(!$("input[type='password']").valid()){
     return;
     }
     var url = $path+"/profile/update/password/";
     var password = $("#password").val();
     var newPassword = $("#newPassword").val();
     var param = {
     password:password,
     newPassword:newPassword,
     _method:"PUT"
     };
     $.post(url,param,function(resp){
     if(resp==true){
     Msg.alert("password update success","alert-success");
     }else{
     Msg.alert("password update failed","alert-danger");
     }
     },"json");
     });*/
    $(".save-pwd-btn").click(function () {
        $(".changePWD").modal();
    });
    //保存邮箱地址
    $(".save-email-btn").click(function () {
        if (!$("input[name='email']").valid()) {
            return;
        }
        $.ajax({
            type: "post",
            url: $path + "/profile/save/?_=" + Math.random(),
            data: $("input[type='hidden'],input[name='email']").serialize(),
            dataType: "json",
            success: function (map) {
                if (map != null && map.status == "failed") {
                    Msg.alert("email update failed", "alert-danger");
                } else {
                    Msg.alert("email update success", "alert-success");
                }
            }
        });
    });

    //为邮箱验证绑定事件
    $(".email-verify").click(function () {
        var email = $("input[name='email']").val();
        param = {
            email: email
        };
        $.get($path + "/email/sendemail/", param, function (resp) {
            if (resp.isSendSuccess) {
                $('.emailVerification .content').text("A Verification E-mail has been sent to " + email + ".Please check!");
                $(".emailVerification").modal();
            } else {
                $('.emailVerification .content').text("Send A Verification E-mail " + email + " has failed");
                $(".emailVerification").modal();
            }
        }, "json");
    });
    //为切换primary phone number绑定事件
    $(".number-list").on("click", "a:first-of-type", function (e) {
        e.preventDefault();
        var wholeNumber = $(this).prevAll("span").text();
        var countryCode = wholeNumber.split(" ")[0];
        var phonenumber = wholeNumber.replace(countryCode, "").trim();
        console.log("whole number:" + wholeNumber);
        console.log("countrycode:" + countryCode);
        console.log("phonenumber:" + phonenumber);
        toggleNumber(countryCode, phonenumber);
    });
    //为secondary phone number绑定删除事件
    $(".number-list").on("click", "a:last-of-type", function (e) {
        e.preventDefault();
        var wholeNumber = $(this).prevAll("span").text();
        var countryCode = wholeNumber.split(" ")[0];
        var phonenumber = wholeNumber.replace(countryCode, "");
        console.log("countrycode:" + countryCode);
        console.log("phonenumber:" + phonenumber);
        removeNumber(countryCode, phonenumber);
    });
    /**
     * 切换primary phonenumber
     */

    function toggleNumber(countryCode, phonenumber) {
        var url = $path + "/callnumber/toggle/";
        $.ajax({
            type: "get",
            url: url,
            data: "countryCode=" + countryCode + "&phoneNumber=" + phonenumber,
            success: function (data) {
                if (data != "false") {
                    Msg.alert(profile.numberToggle.success, "alert-success");
                    $(".number-list").empty().append(data);
                } else {
                    Msg.alert(profile.numberToggle.failed, "alert-warning");
                }
            }
        });
    }

    /**
     *删除电话号码
     */
    function removeNumber(countryCode, mobile) {
        if ((mobile == null) || (countryCode == null)) {
            throw new Error("param cannot be null");
        }
        var param = {
            phoneNumber: mobile.trim(),
            countryCode: stringUtils.removePlus(countryCode)
        };
        var url = $path + "/callnumber/delete/";
        $.post(url, param, function (data) {
            if (data != "false") {
                Msg.alert(profile.removeNumber.success, "alert-success");
                $(".number-list").empty().append(data);
            } else {
                Msg.alert(profile.removeNumber.success, "alert-warning");
            }
        });

    }
});

