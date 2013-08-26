describe("MultiDownload", function() {

    var items;

    beforeEach(function() {
        items = $('<div id="links"></div>');
        items.append($('<a href="fake_download1.tar.gz" class="link" id="link1"></a>'));
        items.append($('<a href="fake_download2.tar.gz" class="link" id="link2"></a>'));
        items.append($('<a href="fake_download3.tar.gz" class="link" id="link3"></a>'));
        items.append($('<img src="fake_img.png" class="image">'));
        $(document.body).append(items);
    });

    afterEach(function () {
        items.remove();
        $('.multi-download-iframe').remove();
    });

    it('is chainable', function () {
        $('#link1').multiDownload().addClass('second-class');
        expect($('#link1').hasClass('second-class')).toBeTruthy();
    });

    describe("iframes", function() {
        it('creates download iframes on trigger event', function () {
            runs(function () {
                $('#link1').multiDownload();
                $('#link3').multiDownload();
            });

            waits(100);

            runs(function () {
                var framesCount = $('iframe.multi-download-frame').length;
                expect(framesCount).toEqual(2);
            });
        });

        it("creates iframe with link href as iframe src", function() {
            runs(function () {
                $('#link1').multiDownload();
            });

            waits(100);

            runs(function () {
                expect($('iframe.multi-download-frame').attr('src')).toEqual($('#link1').attr('href'));
            });
        });

        it("creates iframe with image src as iframe src", function() {
            runs(function () {
                $('.image').multiDownload();
            });

            waits(100);

            runs(function () {
                expect($('iframe.multi-download-frame').attr('src')).toEqual($('.image').attr('src'));
            });
        });

        it("removes download iframes", function () {
            runs(function () {
                $('#link1').multiDownload();
                $('#link3').multiDownload();
            });

            waits(1300);

            runs(function () {
                var framesCount = $('iframe.multi-download-frame').length;
                expect(framesCount).toEqual(0);
            });
        });
    });
});
