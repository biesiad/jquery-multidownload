describe("MultiDownload", function() {

    var links, trigger;

    beforeEach(function() {
        links = $('<div id="links"></div>');
        links.append($('<a href="fake_download1.tar.gz" class="link" id="link1"></a>'));
        links.append($('<a href="fake_download2.tar.gz" class="link" id="link2"></a>'));
        links.append($('<a href="fake_download3.tar.gz" class="link" id="link3"></a>'));
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

    describe("multiDownload", function () {
        it("adds class to download trigger", function() {
            trigger.multiDownload('click');
            expect(trigger.hasClass('multi-download-trigger')).toBeTruthy();
        });

        it('sets options on trigger', function () {
            trigger.multiDownload('click', { delay: 100 });
            expect(trigger.hasClass('multi-download-trigger')).toBeTruthy();
        });

        it("adds group class to trigger", function () {
            trigger.multiDownload('click', 'group1');
            expect(trigger.hasClass('multi-download-trigger-group1')).toBeTruthy();
        });

        it('adds group when options are provided', function () {
            trigger.multiDownload('click', 'group1', { delay: 100 });
            expect(trigger.hasClass('multi-download-trigger-group1')).toBeTruthy();
        });
    });

    describe("multiDownloadAdd", function() {
        it('adds class to download items', function () {
            $('#link1').multiDownloadAdd();
            $('#link3').multiDownloadAdd();
            expect($('#link1').hasClass('multi-download-item')).toBeTruthy();
            expect($('#link2').hasClass('multi-download-item')).toBeFalsy();
            expect($('#link3').hasClass('multi-download-item')).toBeTruthy();
        });

        it("adds group class to items", function () {
            $('#link1').multiDownloadAdd('group1');
            $('#link3').multiDownloadAdd('group1');
            expect($('#link1').hasClass('multi-download-item-group1')).toBeTruthy();
            expect($('#link2').hasClass('multi-download-item-group1')).toBeFalsy();
            expect($('#link3').hasClass('multi-download-item-group1')).toBeTruthy();
        });
    });

    describe("multiDownloadRemove", function () {
        it("removes selected links from download list", function () {
            $('.link').multiDownloadAdd();
            $('#link1, #link3').multiDownloadRemove();
            expect($('.multi-download-item').length).toEqual(1);
        });

        it("removes links by group", function () {
            $('#link1').multiDownloadAdd('group1');
            $('#link2').multiDownloadAdd('group1');
            $('#link3').multiDownloadAdd('group2');
            $('.link').multiDownloadRemove('group1');
            expect($('.multi-download-item-group1').length).toEqual(0);
            expect($('.multi-download-item-group2').length).toEqual(1);
        });
    });

    describe("iframes", function() {
        it('creates download iframes on trigger event', function () {
            runs(function () {
                $('#link1').multiDownloadAdd();
                $('#link3').multiDownloadAdd();
                trigger.multiDownload('click');
                trigger.click();
            });

            waits(100);

            runs(function () {
                var linksCount = $('.multi-download-item').length;
                var framesCount = $('iframe.multi-download-frame').length;
                expect(linksCount).toEqual(2);
                expect(framesCount).toEqual(2);
            });
        });

        it("creates iframe with link href as src", function() {
            runs(function () {
                $('#link1').multiDownloadAdd();
                trigger.multiDownload('click');
                trigger.click();
            });

            waits(100);

            runs(function () {
                expect($('iframe.multi-download-frame').attr('src')).toEqual($('#link1').attr('href'));
            });
        });

        it("removes download iframes", function () {
            runs(function () {
                $('#link1').multiDownloadAdd();
                $('#link3').multiDownloadAdd();
                trigger.multiDownload('click');
                trigger.click();
            });

            waits(1300);

            runs(function () {
                var linksCount = $('.multi-download-item').length;
                var framesCount = $('iframe.multi-download-frame').length;
                expect(framesCount).toEqual(0);
            });
        });
    });
});
