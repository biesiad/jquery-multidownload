Multi-Download - jQuery plugin
==============================

Plugin allows you to start multiple parallel downloads
------------------------------------------------------

Add links you want to download simultaneously:

```javascript
$('.my_links').multiDownloadAdd();
$('.my_other_links').multiDownloadAdd();
```

Remove selected links from download list:

```javascript
$('.my_links').multiDownloadRemove();
```

Set triggering element and event type on which you want to start:

``` javascript
$('.my_download_trigger').multiDownload('click');
```

Set custom delay between downloads that are triggered (might be useful on IE):

``` javascript
$('.my_download_trigger').multiDownload('click', { delay: 500 });
```

_Important_: All $('.my_links') elements must have defined "href" attribute.
"href" must point to documents that generate proper HTML headers ("Content-Disposition: attachment; filename=my_filename").


Grouping links
--------------

You can also define groups for the links.
To define a group, add the group name to the functions. All the links on the same group will be donwloaded together.

```javascript
$('.my-links').multiDownloadAdd('myGroup');
$('.my-other-links').multiDownloadAdd('myGroup');

$('.my-links').multiDownloadRemove('myGroup');
$('.my-links').multiDownloadRemove('myGroup');

$('.my-download-trigger').multiDownload('click', 'myGroup');
$('.my-download-trigger').multiDownload('click', 'myGroup', { delay: 500 });
```


Development
===========

Please run spec/runner.html to check if old API still works and add specs for new code.
