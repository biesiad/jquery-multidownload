(function ($) {

    var methods = {
        version: "1.4.0",

        add: function (group) {
            this.addClass(methods._itemClass(group));
            return $('.' + methods._itemClass(group));
        },

        remove: function (group) {
            this.removeClass(methods._itemClass(group));
            return $('.' + methods._itemClass(group));
        },

        bind: function(event, group, options) {
            if (typeof group === 'object') {
                options = group;
                group = null;
            }

            var triggerDelay = (options && options.delay) || 100;
            var cleaningDelay = (options && options.cleaningDelay) || 1000;
            var elements = $('.' + methods._itemClass(group));
            var triggers = this;

            triggers.addClass(methods._triggerClass(group));
            triggers.bind(event, function (e) {
                e.preventDefault();
                elements.each(function (index, link) {
                    methods._createIFrame(link, index * triggerDelay, cleaningDelay);
                });
            });

            return this;
        },

        _createIFrame: function (link, triggerDelay, cleaningDelay) {
            setTimeout(function () {
                var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                frame.attr('src', $(link).attr('href'));
                $(link).after(frame);
                setTimeout(function () { frame.remove(); }, cleaningDelay);
            }, triggerDelay);
        },

        _itemClass: function (group) {
            var group = group ? "-" + group : "";
            return 'multi-download-item' + group;
        },

        _triggerClass: function (group) {
            var group = group ? "-" + group : "";
            return 'multi-download-trigger' + group;
        }
    };

    $.fn.multiDownload = function(bindEvent, options) {
        if (bindEvent) {
            return methods.bind.apply(this, arguments);
        } else {
            console.log('multiDownload() is obsolete. Please use multiDownloadAdd for adding new link.');
            return methods.add.apply(this, arguments);
        }
    };

    $.fn.multiDownloadAdd = function (group) {
        return methods.add.apply(this, arguments);
    };

    $.fn.multiDownloadRemove = function (group) {
        return methods.remove.apply(this, arguments);
    };

})(jQuery);
