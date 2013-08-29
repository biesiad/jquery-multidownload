# multiDownload

## jQuery plugin for simultaneous downloads

## How to use


### Add links

Select links to resources you want to download simultaneously and call multiDownload function:

``` html
<a href="document1.zip" class="document">document 1</a>
<a href="document2.zip" class="document">document 2</a>
<a href="document3.zip" class="document">document 3</a>

<a href="#" id="download_all">download all</a>

$('#download_all').click(function (event) {
    event.preventDefault();
    $('.document').multiDownload();
});
```

_Important_: All $('.my_links') elements must have defined "href" attribute.
"href" must point to documents that generate proper HTML headers ("Content-Disposition: attachment; filename=my_filename").


### Options

Set custom delay between downloads that are triggered (might be useful on IE):

``` javascript
$('.my_download_trigger').multiDownload({ delay: 500 });
```


## Development

Please run spec/runner.html to check if old API still works and add specs for new code.
