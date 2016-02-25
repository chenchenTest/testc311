var signinMsg = eval({
	"account": {
		required: "Your username is required",
		mobileNumberValid: "Please enter a valid call name by using letter and number",
		accountValid: "Please enter a valid call name by using letter and number",
		//remote:'Call name is not registered<br><a href="javascript:void(0);" id="testtesttest" class="linkForgetHandle verifyfontsize" style="display: inline-block; float: left;" onclick="loadModal('+"'/forget/handle/'"+');">Forget Your Call Name?</a>'
		remote:"Call name is not registered"
	},
	"password": {
		required: "Your password is required",
		rangelength: "Password length must be between {0} and {1} characters",
		//remote:'The call name or password is invalid<br><a class="linkForgetPwd" onclick="loadModal(\'/forget/pwd/\');" href="javascript:void(0);">   Change Password</a>'
		remote:"The call name or password is invalid"
	}
});

var registerMsg = eval({
	"mobileNumber": {
		required: "Please enter your phone number",
		mobileNumberValid: "Please enter a valid phone number",
		remote: "This number has already been registered. Please enter a new number"
	},
	"gnumUrl": {
		required: "Please enter your preferred URL",
		rangelength: "Please enter your preferred URL of length between {0} to {1}",
		urlBasicCheck: "Please enter a valid URL that is alphanumeric and _",
		nicknameValid: "Please enter a valid call name by using letter and number ",
		remote: "This URL has been taken, please enter another URL"
	},
	"name": {
		required: "Please enter your name",
        nameValid:"The name is invalid",
		maxlength: "Maximum of 100 characters"
	},
	"email": {
		required: "Please enter your email address",
		email: "Please enter a valid email address",
		remote: "This email address has already been registered"
	},
	"password": {
		required: "Please enter your password",
        gnumPwd: "Please enter a password of length between 6 and 20 characters using letter and number",
        remote:"the old password is not correct"
	},
	"confirmPassword": {
		required: "Please confirm your password",
		rangelength: "Please enter a password of length between {0} to {1} characters",
		equalTo: "Not matched"
	},
	"rateId": {
		required: "Please select your free plan"
	},
	"nickname":{
		remote:"Invalid Callname"
	}
});

var profileMsg = eval({
	"gender": {
		required: "Please select your gender"
	},
	"email": {
		remote: "This email has been registered"
	}
});

var contactsMsg = eval({
	"contactsName": {
		maxlength: "Maximum of 100 characters"
	},
	"phonenumber": {
		required: "Please enter you friend's phone number",
		mobileNumberValid: "Please enter a valid phone number",
		remoteVerify: "The phone number does not exist"
	},
	"gnumURL": {
		required: "Please enter your friend's gnumURL",
		urlBasicCheck: "Please enter a valid URL that is alphanumeric and _"
	}
});

var callNumberMsg = eval({
	"phonenumber": {
		required: "Please send OTP to your phone first"
	},
	"OTP": {
		required: "Please enter the OTP that was sent to you via SMS ",
		digits: "OTP invalid",
		remoteVerify: "OTP verify failed"
	}
});

var TipsMsg = eval({
	"NumInvalidated":"The phone number is invalid",
	"enterCorrectNum":"Please enter a valid phone number"
});

var commonMsg = eval({
	"sysError" : "System error",
	"onLoad" :"Moment...",
	"timeout" : "Timed out",
	"wait" : "WAITING",
	"urlPrefix" : "http://"+"/"
});
var mobileMsg = eval({
	"remote":"Invalid mobile"
});
var otpMsg = eval({"required":"Please enter the OTP that was sent to you via SMS","remote":"please enter a valid OTP code"});
var emailSupportMsg = eval({
    "subject":{required:"subject is required"},
    "name":{required:"name is required"},
    "email":{required:"email is required"},
    "content":{required:"email content is required"}

});
