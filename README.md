Multi-Download - jQuery plugin
==============================

Plugin allows you to start multiple parallel downloads
------------------------------------------------------

* point links you want to download:
      $('.my_links').multiDownload();

* set triggering element and event type on which you want to start:
      $('.my_download_trigger').multiDownload('click');

### On $('.my_download_trigger') click all marked with multiDownload() links will be saved to disc


_Important_: All $('.my_links') elements must have defined "href" attribute. 
"href" must point to documents that generate proper HTML headers ("Content-Disposition: attachment; filename=my_filename").

("Use example")[http://biesiad.rushbean.com/multidownload]:
