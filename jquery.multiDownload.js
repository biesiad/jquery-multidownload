(function( $ ){

    var methods = {
        add: function () {
            return this.each(function() {
                $(this).addClass('multi-download-item');
            });
        },

        remove: function () {
            var links = this.length ? this : $('.multi-download-item');
            links.removeClass('multi-download-item');
            return $('.multi-download-item');
        },

        bind: function( e, options ) {
            var delay = (options && options.delay) || 100;
            var links = $('.multi-download-item');
            return this.each(function () {
                $(this).addClass('multi-download-trigger');
                $(this).bind(e, function (event) {
                    event.preventDefault();
                    var index = 0;
                    $(links).each(function () {
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

    $.fn.multiDownload = function( bindEvent, options ) {
        if( bindEvent ) {
            return methods.bind.apply( this, arguments, options );
        } else {
            console.log('multiDownload() is obsolete. Please use multiDownloadAdd for adding new link.');
            return methods.add.apply( this, arguments );
        }
    };

    $.fn.multiDownloadAdd = function () {
        return methods.add.apply( this, arguments );
    };

    $.fn.multiDownloadRemove = function () {
        return methods.remove.apply( this, arguments );
    };

})( jQuery );
