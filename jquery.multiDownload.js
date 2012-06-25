(function( $ ){

    var links = [],
    methods = {
        add: function() { 
            return this.each(function() {
                $(this).addClass('multi-download-item');
                links.push(this);
            });
        },

        remove: function () {
            return this.each(function () {
                $(this).removeClass('multi-download-item');
                links.pop(this);
            });
        },

        clear: function () {
            $.each(links, function (index, link) {
                $(link).removeClass('multi-download-item');
            });
            links = [];
            return this;
        },

        bind: function( e, options ) {
            var delay = (options && options.delay) || 1000;
            return this.each(function () {
                $(this).addClass('multi-download-trigger');
                $(this).bind(e, function(event) {
                    event.preventDefault();
                    $.each(links, function (index, element) {
                        var frame = $('<iframe style="display: none;" class="multi-download-frame"></iframe>');
                        frame.attr('src', $(element).attr('href'));
                        $(element).after(frame);
                        setTimeout(function () { frame.remove(); }, delay);
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

    $.fn.multiDownloadClear = function () {
        return methods.clear.apply( this, arguments );
    };

})( jQuery );
