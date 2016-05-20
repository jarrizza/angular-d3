"use strict";

/* This controller obtains data for a time X integer scatter chart by generating
 * random points every second and updating the chart as the points come in.
 */

app.controller('RandomScatterChartCtrl',[
    '$interval',
    'dataManagerService',
    function ($interval, dataManagerService) {

        var vmScatter = this;
        vmScatter.title = "Random Scatter";

        // Control of sizing used by click function
        vmScatter.isThumbnail = true;

        // Initialize logs with the first random data point
        vmScatter.logs = [ dataManagerService.getRandomPoint(1) ] ; //[ randPoint() ];

        //Every second push a new random point onto the logs
        $interval(function() {
            //var point = randPoint();
            //time.setSeconds(time.getSeconds() + 1);
            vmScatter.logs.push( dataManagerService.getRandomPoint(1) );
        }, 1000);

    }
]);

/* This controller obtains data for a time X integer scatter chart from a file
 * on an interval set in the "reloadInterval" parameter (every 10 seconds).
 */

app.controller('LoadedScatterChartCtrl',[
    '$interval',
    'simpleHttpLoader',
    function ($interval, simpleHttpLoader) {

        var reloadInterval = 60000, // reload every minute
            vmLoaded = this;        

        // Control parameters for plot data and size of display
        vmLoaded.isThumbnail = true;
        vmLoaded.title = "Loaded File Scatter";
        vmLoaded.src = 'data/TestScatter.log';
        vmLoaded.logs = [];

        simpleHttpLoader(vmLoaded.src)
            .then(function(response) {
                vmLoaded.logs = response.data;
            });
        
        $interval(function() {
            simpleHttpLoader(vmLoaded.src)
                .then(function(response) {
                    vmLoaded.logs = response.data;
                });
        }, reloadInterval);
    }

]);

