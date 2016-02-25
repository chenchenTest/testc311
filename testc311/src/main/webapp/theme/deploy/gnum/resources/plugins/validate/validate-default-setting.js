/******************************************/
/***************Set Default Values For Validate****/
/****************************************/
$(function () {
    $.validator.setDefaults({
        onkeyup: function (element) {
            $(element).valid();
        },
        errorClass:"error-tips",
       /*  errorPlacement: function(error, element) {
             debugger;
             var field = element.attr("name");
             error.prepend(field+":");
             error.insertAfter(element);
         }*/
       errorLabelContainer: "#errorBox",
        wrapper: "li"
        /* highlight: function(element) {
         var $element = $(element);
         $element.data("placeholder", $element.data("placeholder") || $element.attr("placeholder"));
         $element.removeAttr('placeholder');
         },
         unhighlight: function(element) {
         var $element = $(element);
         $element.attr("placeholder", $element.data("placeholder"));
         },
        onfocusout: function (element) {
            //当输入的值不合法时清除掉输入值
            if (!$(element).valid()) {
                $(element).val("");
            }
        }*/
    });
});
