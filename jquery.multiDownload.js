/*
 * Copyright (c) 2010 Grzegorz Biesiadecki <biesiad@rushbean.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * * The above copyright notice and this permission notice shall be included in * all copies or substantial portions of the Software.  * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function( $ ){

  var links = [],
      methods = {
        add: function() { 
          return this.each(function() {
            $(this).addClass('multi-download-item');
            links.push(this);
          });
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
                setTimeout(frame.remove, delay);
              });
            });
          });
        }
      };

  $.fn.multiDownload = function( bindEvent, options ) {
    if( bindEvent ) {
      return methods.bind.apply( this, arguments, options );
    } else {
      return methods.add.apply( this, arguments );
    }
  };

})( jQuery );
