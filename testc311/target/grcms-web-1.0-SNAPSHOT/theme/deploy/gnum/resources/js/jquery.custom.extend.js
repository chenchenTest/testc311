(function($) {
    // 下拉选菜单
    $.fn.dropdownMenu = function() {
        return this.filter("div").each(function() {
            var $currentSelectControl = $(this);
            var $hideControl = $currentSelectControl.find("input[type='hidden']");
            if($hideControl.length==0) {
                $hideControl = $("<input type='hidden' name='countryCode' value='65'>");
                $hideControl.appendTo($currentSelectControl);
            }
            $currentSelectControl.find("li").on("click", function(e) {
                var $selectedItem = $(e.target);
                var content = $selectedItem.attr("data-content");
                $currentSelectControl.find(".content").contents().first().replaceWith(content);//更新显示内容
                $currentSelectControl.find(".content").attr("data-content", $selectedItem.attr("data-content"));
                $hideControl.val( stringUtils.removePlus(content));
            });
        });
    };
    // 计时按钮
    $.fn.waitButton = function(options) {
        var defaultOptions = {
            that: this,
            timeout: 1000 * 60,
            interval: 1000,
            timer: {},
            orginText: {},
            cancel:false,
            preAction:function(target){},
            action: function($targetBtn, intervalID) {
                options.timer[intervalID]--;
                $targetBtn.text(defaultOptions.timer[intervalID] + " seconds..");
            }
        };

        options = $.extend({}, defaultOptions, options);
        return this.filter(".waitBtn").each(function(index, element) {
            var $targetBtn = $(element);
            $targetBtn.click(function() {

                //执行点击后需要触发的动作
                if(typeof options.preAction==="function"){
	                options.preAction.call(options,$targetBtn);
                }
                if(options.cancel) {
                    return;
                }
                $targetBtn.attr("disabled", true);

                var counter = options.timeout / options.interval;
                var intervalID = setInterval(function() {
                    options.action($targetBtn, intervalID);
                }, options.interval);
                options.timer[intervalID] = counter;
                options.orginText[intervalID] = $targetBtn.text();
                $targetBtn.data({
                    "timer":intervalID,
                    "originText":options.orginText[intervalID]
                });
                setTimeout(function() {
                    clearInterval(intervalID);
                    $targetBtn.text(options.orginText[intervalID]).removeAttr('disabled');
                }, options.timeout);
            });
        });
    };
})(jQuery);
