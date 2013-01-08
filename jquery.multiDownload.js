(function( $ ){

    var methods = {
        version: "1.3.0",
        add: function ( group ) {
            return this.each(function() {
                var groupTag = group ? "-" + group : "";
                $(this).addClass('multi-download-item' + groupTag);
            });
        },

        remove: function ( group ) {
            var groupTag = group ? "-" + group : "";
            var links = this.length ? this : $('.multi-download-item' + groupTag);
            links.removeClass('multi-download-item' + groupTag);
            return $('.multi-download-item' + groupTag);
        },

        bind: function( e, group, options ) {
            var delay = (options && options.delay) || 100;
            return this.each(function () {
                var groupTag = group ? "-" + group : "";
                $(this).addClass('multi-download-trigger' + groupTag);
                $(this).bind(e, function (event) {
                    event.preventDefault();
                    var index = 0;
                    $('.multi-download-item' + groupTag).each(function () {
                        var that = this;
                        setTimeout(function () {
                            var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                            frame.attr('src', $(that).attr('href'));
                            $(that).after(frame);
                        }, index * delay);
                        index++;
                    });
                });
            });
        }
    };

    $.fn.multiDownload = function( bindEvent, options, group ) {
        if( bindEvent ) {
            return methods.bind.apply( this, arguments );
        } else {
            console.log('multiDownload() is obsolete. Please use multiDownloadAdd for adding new link.');
            return methods.add.apply( this, arguments );
        }
    };

    $.fn.multiDownloadAdd = function ( group ) {
        return methods.add.apply( this, arguments );
    };

    $.fn.multiDownloadRemove = function ( group ) {
        return methods.remove.apply( this, arguments );
    };

})( jQuery );
