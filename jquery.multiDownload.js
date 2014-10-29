(function ($) {

    var methods = {
        _download: function (options) {
            var triggerDelay = (options && options.delay) || 100;
            var cleaningDelay = (options && options.cleaningDelay) || 1000;
            var onloadEvent = (options && options.onloadEvent) || "";

            this.each(function (index, item) {
                methods._createIFrame(item, index * triggerDelay, cleaningDelay, onloadEvent);
            });
            return this;
        },

        _createIFrame: function (item, triggerDelay, cleaningDelay, onloadEvent) {
            setTimeout(function () {
                var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                if(onloadEvent != "") {
                    frame = $('<iframe style="display: none;" onload="' + onloadEvent + '(this);"  class="multi-download-frame"></iframe>');
                }
                frame.attr('src', $(item).attr('href') || $(item).attr('src'));
                $(item).after(frame);
                setTimeout(function () { frame.remove(); }, cleaningDelay);
            }, triggerDelay);
        }
    };

    $.fn.multiDownload = function(options) {
        return methods._download.apply(this, arguments);
    };

})(jQuery);
