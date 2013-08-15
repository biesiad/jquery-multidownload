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

            var type = (options && options.type) || "iframe";
            var triggerDelay = (options && options.delay) || 100;
            var cleaningDelay = (options && options.cleaningDelay) || 1000;
            var elements = $('.' + methods._itemClass(group));
            var triggers = this;

            triggers.addClass(methods._triggerClass(group));
            triggers.bind(event, function (e) {
                e.preventDefault();
                elements.each(function (index, link) {
                    if(type == "adownload")
                        methods._createADownload(link, index * triggerDelay, cleaningDelay);
                    else
                        methods._createIFrame(link, index * triggerDelay, cleaningDelay);
                });
            });

            return this;
        },
        
        _createADownload: function(link, triggerDelay, cleaningDelay) {
            var url = $(link).attr('href');
            //using the last section of the url for the name not always works so having the name set in the data attribute is mandatory
            var name = $(link).data("name");
            if(!name) {
                methods._createIFrame(link, triggerDelay, cleaningDelay);
                return;
            }   
            try {
                var aelement = document.createElement('a');
                aelement.download = name;
                aelement.href = url;
                aelement.click();
            }
            catch(e) {
                methods._createIFrame(link, triggerDelay, cleaningDelay);
            }
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
