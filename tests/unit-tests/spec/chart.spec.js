/* This suite of tests checks the scatter-chart directive function */
describe('scatter-chart-tests',
function () {
 
    var elm, scope;

    beforeEach(module('d3Chart'));

    beforeEach(inject(function($rootScope, $compile) {
        elm = angular.element( '<scatter-chart class="chart" data="data"></scatter-chart>');
        scope = $rootScope.$new();
        scope.data = [];

        $compile(elm)(scope);
        scope.$digest();
    }));

    it('should create svg parent', function(){
        var svg = elm.find('svg');
        expect(svg.length).toBe(1);
    });

    it('should create containers for data and axis', function(){
        var groups = elm.find('svg').find('g');
        expect(groups.length).toBe(3);
    });

    it('should create a data point', function() {
        var circles = elm.find('svg').find('circle');
        expect(circles.length).toBe(0);
        scope.data.push({
            time: (new Date('2014-01-01 00:00:00')).toString(),
            visitors: 3
        });
        scope.$digest();
        circles = elm.find('svg').find('circle');
        expect(circles.length).toBe(1);
    });

});

