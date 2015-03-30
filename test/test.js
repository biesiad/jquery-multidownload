var $ = jQuery = require('jquery')
require('../jquery-multidownload')

$('#download').click(function (e) {
  e.preventDefault();
  $('.link').multiDownload();
});

$('#download_delayed').click(function (e) {
  e.preventDefault();
  $('.link').multiDownload({ delay: 3000 });
});

$('#download_callback').click(function (e) {
  e.preventDefault();
  $('.link').multiDownload({
    onDownload: function () {
      console.log("downloading: ", arguments)
    }
  });
});
