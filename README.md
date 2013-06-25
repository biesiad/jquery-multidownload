Multi-Download - jQuery plugin
==============================

How to use
----------

Add links
----------

Add links you want to download simultaneously:

```javascript
$('.my_links').multiDownloadAdd();
$('.my_other_links').multiDownloadAdd();
```

Add grouped links:

```javascript
$('.my-links').multiDownloadAdd('myGroup');
$('.my-other-links').multiDownloadAdd('myGroup');
```

Remove links
------------

Remove selected links from download list:

```javascript
$('.my_links').multiDownloadRemove();
```

Remove selected links from the group:

```javascript
$('.my-links').multiDownloadRemove('myGroup');
$('.my-links').multiDownloadRemove('myGroup');
```

Define download trigger:

``` javascript
$('.my_download_trigger').multiDownload('click');
```

Define download trigger for the group:

``` javascript
$('.my-download-trigger').multiDownload('click', 'myGroup');
```

_Important_: All $('.my_links') elements must have defined "href" attribute.
"href" must point to documents that generate proper HTML headers ("Content-Disposition: attachment; filename=my_filename").


More options
------------
Set custom delay between downloads that are triggered (might be useful on IE):

``` javascript
$('.my_download_trigger').multiDownload('click', { delay: 500 });
```

You can also define groups for the links.
To define a group, add the group name to the functions. All the links on the same group will be donwloaded together.

```javascript


```


Development
===========

Please run spec/runner.html to check if old API still works and add specs for new code.
