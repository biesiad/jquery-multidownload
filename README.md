Multi-Download - jQuery plugin
==============================

Plugin allows you to start multiple parallel downloads
------------------------------------------------------

Add links you want to download simultaneously:

```javascript
    $('.my_links').multiDownloadAdd();
    $('.my_other_links').multiDownloadAdd();
```

Remove some if you like to:

```javascript
    $('.my_links').multiDownloadRemove();
```

Clear selected links:

```javascript
    $('.my_links').multiDownloadClear();
```

...or clear all links:

``` javascript
    $('.my_links').multiDownloadClear();
```

Set triggering element and event type on which you want to start:

``` javascript
    $('.my_download_trigger').multiDownload('click');
```


_Important_: All $('.my_links') elements must have defined "href" attribute.
"href" must point to documents that generate proper HTML headers ("Content-Disposition: attachment; filename=my_filename").

