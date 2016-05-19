describe('Scatter Chart application', function() {

    beforeEach(function() {
       browser.get('index.html');
    });

    it('should have 2 charts',function(){
        var charts = element.all(by.css('svg'));
        expect(charts.count()).toEqual(2);
    });

});