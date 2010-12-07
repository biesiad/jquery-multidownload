/*
 * Copyright (c) 2010 Grzegorz Biesiadecki <biesiad@rushbean.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function( $ ){

  var methods = {
    add : function() { 
      return this.each(function() {
        $(this).addClass('multi-download');
      })
    },

    bind : function( e ) {
      return this.each(function() {
        $(this).unbind(e);
        $(this).bind(e, function() {
          links = $('.multi-download');
          var i = 0;
          var interval = setInterval(function () {
            if (i < links.length) {
              window.open($(links[i]).attr('href'), "Download");
                    i++;
                } else {
                    clearInterval(interval);
                }
          }, 2000);
          return false;  
        })
      })
    }
  }

  $.fn.multiDownload = function( bindEvent ) {
    if( bindEvent ) {
      return methods.bind.apply( this, arguments );
    } else {
      return methods.add.apply( this, arguments );
    }
  }

})( jQuery );
