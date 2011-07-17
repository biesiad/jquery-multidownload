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
  
  
  it('creates download iframes on trigger event', function () {
    first.multiDownload();
    third.multiDownload();
    trigger.multiDownload('click');
    trigger.click();

    expect(links.find('.multi-download-item').length).toEqual(2);
    expect(links.find('iframe.multi-download-frame').length).toEqual(2);
  });

  it("removes download iframes after 1000 miliseconds by default", function() {
  });
  
  it("removes download iframes after specified delay", function() {
  });
  

});
