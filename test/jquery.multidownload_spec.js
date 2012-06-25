describe("MultiDownload", function() {

    var links, trigger;

    beforeEach(function() {
        links = $('<div id="links"></div>');
        links.append($('<a href="download1.txt" class="my_link" id="link1"></a>'));
        links.append($('<a href="download2.txt" class="my_link" id="link2"></a>'));
        links.append($('<a href="download3.txt" class="my_link" id="link3"></a>'));
        trigger = $('<a href="#" id="trigger"></a>');
        $(document.body).append(links);
        $(document.body).append(trigger);
    });

    afterEach(function () {
        links.remove();
        trigger.remove();
    });

    it('is chainable', function () {
        $('#link1').multiDownloadAdd().addClass('second-class');
        expect($('#link1').hasClass('second-class')).toBeTruthy();

        trigger.multiDownload('click').addClass('second-class');
        expect(trigger.hasClass('second-class')).toBeTruthy();
    });

    describe("elements css classes", function() {
        it('adds multi-download-item class to download item', function () {
            $('#link1').multiDownloadAdd();
            $('#link3').multiDownloadAdd();
            expect($('#link1').hasClass('multi-download-item')).toBeTruthy();
            expect($('#link2').hasClass('multi-download-item')).toBeFalsy();
            expect($('#link3').hasClass('multi-download-item')).toBeTruthy();
        });

        it("adds multi-download-trigger class to download trigger", function() {
            trigger.multiDownload('click');
            expect(trigger.hasClass('multi-download-trigger')).toBeTruthy();
        });
    });

    describe("multiDownloadAdd", function () {
        it("adds link to download list", function () {
            $('#link1').multiDownloadAdd();
            $('#link3').multiDownloadAdd();
            expect(links.find('.multi-download-item').length).toEqual(2);
        });
    });

    describe("multiDownloadRemove", function () {
        it("removes selected links from download list", function () {
            $('.my_link').multiDownloadAdd();
            $('#link1, #link3').multiDownloadRemove();
            expect(links.find('.multi-download-item').length).toEqual(1);
        });

        it("removes all links from download list", function () {
            $('#link1').multiDownloadAdd();
            $('#link3').multiDownloadAdd();
            $.fn.multiDownloadRemove();
            expect(links.find('.multi-download-item').length).toEqual(0);
        });
    });

    describe("iframes", function() {
        it('creates download iframes on trigger event', function () {
            $('#link1').multiDownloadAdd();
            $('#link3').multiDownloadAdd();
            trigger.multiDownload('click');
            trigger.click();

            expect(links.find('.multi-download-item').length).toEqual(2);
            expect(links.find('iframe.multi-download-frame').length).toEqual(2);
        });

        it("creates iframe with link href as src", function() {
            $('#link1').multiDownloadAdd();
            trigger.multiDownload('click');
            trigger.click();

            expect(links.find('iframe.multi-download-frame').attr('src')).toEqual($('#link1').attr('href'));
        });

        it("removes download iframes after 1000 miliseconds by default", function() {
            $('#link1').multiDownloadAdd();
            trigger.multiDownload('click');
            runs(function () {
                trigger.click();
                expect(links.find('iframe.multi-download-frame').length).toEqual(1);
            });

            waits(1000);
            runs(function () {
                expect(links.find('iframe.multi-download-frame').length).toEqual(0);
            });
        });

        it("removes download iframes after specified delay", function() {
            $('#link1').multiDownloadAdd();
            trigger.multiDownload('click', { delay: 2000 });
            runs(function () {
                trigger.click();
                expect(links.find('iframe.multi-download-frame').length).toEqual(1);
            });

            waits(1000);
            runs(function () {
                expect(links.find('iframe.multi-download-frame').length).toEqual(1);
            });

            waits(1000);
            runs(function () {
                expect(links.find('iframe.multi-download-frame').length).toEqual(0);
            });
        });
    });
});
