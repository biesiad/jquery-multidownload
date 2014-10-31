(function ($) {

    var methods = {
        _download: function (options) {
            var triggerDelay = (options && options.delay) || 100;
            var cleaningDelay = (options && options.cleaningDelay) || 1000;
            var onLoadHandler = (options && options.onLoadHandler);

            this.each(function (index, item) {
                methods._createIFrame(item, index * triggerDelay, cleaningDelay, onLoadHandler);
            });
            return this;
        },

        _createIFrame: function (item, triggerDelay, cleaningDelay, onLoadHandler) {
            setTimeout(function () {
                var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                if(onLoadHandler) {
                    frame.on('load', onLoadHandler)
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
