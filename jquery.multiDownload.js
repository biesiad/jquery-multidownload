(function( $ ){

    var methods = {
        version: "1.3.0",
        add: function ( group ) {
            return this.each(function() {
                $(this).addClass('multi-download-item-' + group );
            });
        },

        remove: function ( group ) {
            var links = this.length ? this : $('.multi-download-item-' + group);
            links.removeClass('multi-download-item-' + group);
            return $('.multi-download-item-' + group);
        },

        bind: function( e, group, options ) {
            var delay = (options && options.delay) || 100;
            return this.each(function () {
                $(this).addClass('multi-download-trigger-' + group);
                $(this).bind(e, function (event) {
                    event.preventDefault();
                    var index = 0;
                    $('.multi-download-item-' + group).each(function () {
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
            return methods.bind.apply( this, arguments, options, group );
        } else {
            console.log('multiDownload() is obsolete. Please use multiDownloadAdd for adding new link.');
            return methods.add.apply( this, arguments, group );
        }
    };

    $.fn.multiDownloadAdd = function ( group ) {
        return methods.add.apply( this, arguments, group );
    };

    $.fn.multiDownloadRemove = function ( group ) {
        return methods.remove.apply( this, arguments, group );
    };

})( jQuery );
