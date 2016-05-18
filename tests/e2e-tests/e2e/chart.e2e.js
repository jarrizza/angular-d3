describe('Scatter Chart application', function() {

    beforeEach(function() {
       browser.get('index.html');
    });

    it('should have 1 chart',function(){
        var charts = element.all(by.css('svg'));
        expect(charts.count()).toEqual(1);
    });

});