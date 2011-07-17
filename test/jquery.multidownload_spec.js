describe("MultiDownload", function() {

  var first, second, third, links, trigger;

  beforeEach(function() {
    first = $('<a href="download1.txt" id="first"></a>');
    second = $('<a href="download1.txt" id="first"></a>');
    third = $('<a href="download1.txt" id="first"></a>');
    trigger = $('<a href="#" id="trigger"></a>');

    links = $('<div></div>');
    links.append(first).append(second).append(third);
  });

  it('is chainable', function () {
    first.multiDownload().addClass('second-class');
    expect(first.hasClass('second-class')).toBeTruthy();
    
    trigger.multiDownload('click').addClass('second-class');
    expect(trigger.hasClass('second-class')).toBeTruthy();
  });

  describe("elements css classes", function() {
    it('adds multi-download-item class to download item', function () {
      first.multiDownload();
      third.multiDownload();
      expect(first.hasClass('multi-download-item')).toBeTruthy();
      expect(second.hasClass('multi-download-item')).toBeFalsy();
      expect(third.hasClass('multi-download-item')).toBeTruthy();
    });

    it("adds multi-download-trigger class to download trigger", function() {
      trigger.multiDownload('click');
      expect(trigger.hasClass('multi-download-trigger')).toBeTruthy();
    });
  });  
  
  
  describe("iframes", function() {
    it('creates download iframes on trigger event', function () {
      first.multiDownload();
      third.multiDownload();
      trigger.multiDownload('click');
      trigger.click();

      expect(links.find('.multi-download-item').length).toEqual(2);
      expect(links.find('iframe.multi-download-frame').length).toEqual(2);
    });

    it("creates iframe with link href as src", function() {
      first.multiDownload();
      trigger.multiDownload('click');
      trigger.click();

      expect(links.find('iframe.multi-download-frame').attr('src')).toEqual(first.attr('href'));
    });
    

    it("removes download iframes after 1000 miliseconds by default", function() {
      first.multiDownload();
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
      first.multiDownload();
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
