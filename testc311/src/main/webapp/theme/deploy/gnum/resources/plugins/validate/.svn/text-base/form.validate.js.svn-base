$(function () {
    //moblie注册表单验证
    $('.mobile-signup-form').validate({
        rules: {
            nickname: {
                required: true,
                rangelength: [3, 15],
                nicknameValid: true,
                remote: {
                    url: $path + '/register/check/nickname/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        nickname: function () {
                            return $('#nickname').val();
                        }
                    }
                }
            },
            name: {
                required: true,
                nameValid: true,
            },
            phonenumber: {
                required: true,
                mobileNumberValid: true,
                remote: {
                    url: $path + '/register/check/phonenumber/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phonenumber: function () {
                            return stringUtils.removePlus($(".mobile-signup-form .countryCode button:first").text()) + $("#newMobile").val();
                        }
                    }
                }
            },
            otp: {
                required: true,
                remote: {
                    url: $path + '/OTP/validOTP/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phoneNumber: function () {
                            return $("#newMobile").val();
                        },
                        countryCode: function () {
                            return stringUtils.removePlus($(".mobile-signup-form .countryCode button:first").text());
                        },
                        otpCode: function () {
                            return $("#otp").val();
                        }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: $path + '/register/check/email/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        email: function () {
                            return $('#email').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                gnumPwd: true
            }
        },
        messages: {
            nickname: {
                required: registerMsg.gnumUrl.required,
                rangelength: registerMsg.gnumUrl.rangelength,
                nicknameValid: registerMsg.gnumUrl.nicknameValid,
                remote: registerMsg.gnumUrl.remote
            },
            name: {
                required: registerMsg.name.required,
                nameValid: registerMsg.name.nameValid
            },
            phonenumber: {
                required: registerMsg.mobileNumber.required,
                mobileNumberValid: registerMsg.mobileNumber.mobileNumberValid,
                remote: registerMsg.mobileNumber.remote
            },
            otp: {
                required: otpMsg.required,
                remote: otpMsg.remote
            },
            email: {
                required: registerMsg.email.required,
                email: registerMsg.email.email,
                remote: registerMsg.email.remote
            },
            password: {
                required: registerMsg.password.required,
                gnumPwd: registerMsg.password.gnumPwd
            }
        }
    });
    //pc 注册表单验证
    $('.pc-signup-form').validate({
        errorLabelContainer: "#pc-errorBox",
        rules: {
            nickname: {
                required: true,
                rangelength: [3, 15],
                nicknameValid: true,
                remote: {
                    url: $path + '/register/check/nickname/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        nickname: function () {
                            return $('#pc-nickname').val();
                        }
                    }
                }
            },
            name: {
                required: true,
                nameValid: true,
            },
            phonenumber: {
                required: true,
                mobileNumberValid: true,
                remote: {
                    url: $path + '/register/check/phonenumber/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phonenumber: function () {
                            return stringUtils.removePlus($(".pc-signup-form .countryCode button:first").text()) + $("#pc-newMobile").val();
                        }
                    }
                }
            },
            otp: {
                required: true,
                remote: {
                    url: $path + '/OTP/validOTP/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phoneNumber: function () {
                            return $("#pc-newMobile").val();
                        },
                        countryCode: function () {
                            return stringUtils.removePlus($(".pc-signup-form .countryCode button:first").text());
                        },
                        otpCode: function () {
                            return $("#pc-otp").val();
                        }
                    }
                }
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: $path + '/register/check/email/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        email: function () {
                            return $('#pc-email').val();
                        }
                    }
                }
            },
            password: {
                required: true,
                gnumPwd: true
            }
        },
        messages: {
            nickname: {
                required: registerMsg.gnumUrl.required,
                rangelength: registerMsg.gnumUrl.rangelength,
                nicknameValid: registerMsg.gnumUrl.nicknameValid,
                remote: registerMsg.gnumUrl.remote
            },
            name: {
                required: registerMsg.name.required,
                nameValid: registerMsg.name.nameValid
            },
            phonenumber: {
                required: registerMsg.mobileNumber.required,
                mobileNumberValid: registerMsg.mobileNumber.mobileNumberValid,
                remote: registerMsg.mobileNumber.remote
            },
            otp: {
                required: otpMsg.required,
                remote: otpMsg.remote
            },
            email: {
                required: registerMsg.email.required,
                email: registerMsg.email.email,
                remote: registerMsg.email.remote
            },
            password: {
                required: registerMsg.password.required,
                gnumPwd: registerMsg.password.gnumPwd
            }
        }
    });
    //电话号码表单验证
    $(".mobile-form").validate({
        rules: {
            mobile: {
                required: true,
                mobileNumberValid: true,
                remote: {
                    url: $path + '/register/check/phonenumber/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phonenumber: function () {
                            var mobile = $('#mobile').val();
                            var countryCode = $(".mobile-form .content").attr("data-content");
                            return countryCode + mobile;
                        }
                    }
                }
            }
        },
        messages: {
            mobile: {
                remote: mobileMsg.remote
            }
        },
        submitHandler: function (form) {
            var mobile = $('#mobile').val();
            var countryCode = stringUtils.removePlus($(".mobile-form .content").attr("data-content"));
            var url = $path + "/OTP/register/";
            var param = {
                phoneNumber: mobile,
                countryCode: countryCode
            };
            $.post(url, param, function (data) {
                if (data === "true") {
                    location.href = $path + "/register/otp/?phoneNumber=" + mobile + "&countryCode=" + countryCode;
                }
            });
            return false;
        }
    });
    $(".otp-form").validate({
        rules: {
            otp: {
                required: true,
                remote: {
                    url: $path + '/OTP/validOTP/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        phoneNumber: function () {
                            return stringUtils.getParam("phoneNumber");
                        },
                        countryCode: function () {
                            return stringUtils.getParam("countryCode");
                        },
                        otpCode: function () {
                            return $("#otpinput").val();
                        }
                    }
                }
            }
        },
        messages: {
            otp: {
                remote: otpMsg.remote
            }
        },
        submitHandler: function (form) {
            var phone = stringUtils.getParam("phoneNumber");
            var countryCode = stringUtils.getParam("countryCode");
            if ($(form).valid()) {
                location.href = $path + "/register/" + location.search;
            }
            return false;
        }
    });
    //profile表单校验
    $('.profile-form').validate({
         errorPlacement: function(error, element) {
             element.closest(".form-group").after(error);
         },
        wrapper:"div",
        rules: {
            name: {
                required: true,
                maxlength: 100,
                nameValid: true
            },
            email: {
                required: true,
                email: true,
                remote: {
                    url: $path + '/profile/check/email/',
                    type: 'get',
                    dateType: "json",
                    data: {
                        email: function () {
                            return $('.profile-form').find("input[name='email']").val();
                        }
                    }
                }
            },
            newMobile: {
                required:true,
                mobileNumberValid: true,
                remote: {
                    url: $path + "/register/check/phonenumber/",
                    type: "get",
                    dataType: "json",
                    data: {
                        phonenumber: function () {
                            var countryCode = stringUtils.removePlus($(".content").attr("data-content"));
                            var number = $('input[name="newMobile"]').val();
                            return countryCode + number;
                        }
                    }
                }
            },
            otp:{
                required:true,
                rangelength:[4,4]
            }

        },
        messages: {
            name: {
                required: registerMsg.name.required,
                maxlength: registerMsg.name.maxlength
            },
            email: {
                required: registerMsg.email.required,
                email: registerMsg.email.email,
                remote: profileMsg.email.remote,
            },
            newMobile: {
                required: registerMsg.mobileNumber.required,
                mobileNumberValid: registerMsg.mobileNumber.mobileNumberValid,
                remote: registerMsg.mobileNumber.remote
            }
        },
        submitHandler: function (form) {
            var $form = $(form);
            var intervalTime = 0;
            $.ajax({
                type: "post",
                url: $path + "/profile/save/?_=" + Math.random(),
                data: $(form).serialize(),
                dataType: "json",
                success: function (map) {
                    resumeForm($(form), intervalTime);
                    if (map != null && map.status == "failed") {
                        Msg.alert("save profile failed", "alert-success");
                    } else {
                        Msg.alert("Your profile has been updated successfully", "alert-success");
                    }
                    //2秒后刷新profile
                    setTimeout(function () {
                        $(".profile a").click();
                    }, 2000);
                }
            });
            intervalTime = waitOnSubmit($(form));
        }
    });

    /*profile change password*/
    $("#changePWD-form").validate({
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        wrapper: "div",
        rules: {
            password: {
                required:true,
                remote: {
                    url: $path + "/signin/verificLogin/",
                    type: "POST",
                    data: {
                        account: function () {
                            return $(".callname").text().trim();
                        },
                        password: function () {
                            return $('#oldPWD').val();
                        }
                    }
                }
            },
            newPassword: {
                required: function (element) {
                    return $('#newPWD').val() !== "";
                },
                gnumPwd: true
            },
            confirmPassword: {
                required: function (element) {
                    return $('confirmPWD').val() !== "";
                },
                equalTo: '#newPWD'
            }
        },
        messages: {
            password: {
                required: registerMsg.password.required,
                remote: registerMsg.password.remote
            }
        },
        submitHandler: function (form) {
            if (!$("input[type='password']").valid()) {
                return;
            }
            var url = $path + "/profile/update/password/";
            var password = $("#oldPWD").val();
            var newPassword = $("#newPWD").val();
            var param = {
                password: password,
                newPassword: newPassword,
                _method: "PUT"
            };
            $.post(url, param, function (resp) {
                if (resp == true) {
                    Msg.alert("password update success", "alert-success");
                    form.reset();
                } else {
                    Msg.alert("password update failed", "alert-danger");
                }
            }, "json");
        }
    });

    /*email support form support page*/
    $("#support-email-form").validate({
        rules:{
            subject:{
                required:true
            },
            name:{
                required:true
            },
            email:{
                required:true
            },
            content:{
                required:true
            }
        },
        messages:{
            subject:{
                required:emailSupportMsg.subject.required
            },
            name:{
                required:emailSupportMsg.name.required
            },
            email:{
                required:emailSupportMsg.email.required
            },
            content:{
                required:emailSupportMsg.content.required
            }
        },
        submitHandler: function (form) {
            var $form = $(form);
            var url = $form.attr("action");
            var subject = $('input[name="subject"]').val();
            var name = $('input[name="name"]').val();
            var email = $('input[name="email"]').val();
            var content = $('textarea[name="content"]').val();
            var category = $('input[name="category"]').val();
            var param = {
                subject: subject,
                name: name,
                email: email,
                content: content,
                category: category
            };
            $.post(url, param, function (resp) {
                if (resp.success == true) {
                    Msg.alert("email sent success", "alert-success");
                    form.reset();
                } else {
                    Msg.alert("email sent failed", "alert-danger");
                }
            }, "json");
            return false;
        }
    });
    /*email support form about page*/
    $("#about-email-support").validate({
        rules:{
            subject:{
                required:true
            },
            name:{
                required:true
            },
            email:{
                required:true
            },
            content:{
                required:true
            }
        },
        messages:{
            subject:{
                required:emailSupportMsg.subject.required
            },
            name:{
                required:emailSupportMsg.name.required
            },
            email:{
                required:emailSupportMsg.email.required
            },
            content:{
                required:emailSupportMsg.content.required
            }
        },
        submitHandler: function (form) {
            var $form = $(form);
            var url = $form.attr("action");
            var subject = $('input[name="subject"]').val();
            var name = $('input[name="name"]').val();
            var email = $('input[name="email"]').val();
            var content = $('textarea[name="content"]').val();
            var category = $('input[name="category"]').val();
            var param = {
                subject: subject,
                name: name,
                email: email,
                content: content,
                category: category
            };
            $.post(url, param, function (resp) {
                if (resp.success == true) {
                    Msg.alert("email sent success", "alert-success");
                    form.reset();
                } else {
                    Msg.alert("email sent failed", "alert-danger");
                }
            }, "json");
            return false;
        }
    });
    /**index try it for free input&ajax validate**/
    $("#tryFreeCall").validate({
        rules: {
            nickname: {
                required: true,
                maxlength: 15,
                minlength: 3,
                //nicknameValid: true,
                remote: {
                    url: $path + "/signin/check/",
                    type: 'get',
                    dateType: "json",
                    data: {
                        nickname: function () {
                            return $("#try-nickname-input").val();
                        }
                    }
                }
            }
        },
        messages: {
            nickname: {
                required: "Unavailable",
                maxlength: "Unavailable",
                minlength: "Unavailable",
                remote: "Unavailable"
            }
        },
        submitHandler: function (form) {
            var currentHref = location.href;
            var callingHref = currentHref + $("#try-nickname-input").val();
            location.href = callingHref;
            return false;
        }
    });


});
