"use strict;"

/* This controller obtains data for a time X integer scatter chart by generating
* random points every second and updating the chart as the points come in.
*/

app.controller('RandomScatterChartCtrl',[
    '$interval',
    function ($interval) {

        var vmScatter = this;
        vmScatter.title = "Random Scatter";

        // Control parameters for plot data and size of display
        vmScatter.logs = [];
        vmScatter.isThumbnail = true;

        // initialize the first date in the log records (timezone GMT+01)
        var time = new Date('2014-01-01 00:00:00 +0100');

        // Random data point generator with a time and integer in each point record
        var randPoint = function() {
            var rand = Math.random,
                obj = { time: time.toString(), value: parseInt(rand() * 100) };
            return obj;
        };
        //Store a list of logs initialized with a random point
        vmScatter.logs = [ randPoint() ];

        //Every second push a new random point onto the logs
        $interval(function() {
            var point = randPoint();
            time.setSeconds(time.getSeconds() + 1);
            vmScatter.logs.push(point);
        }, 1000);

    }
]);

/* This controller obtains data for a time X integer scatter chart from a file
 * on an interval set in the "reloadInterval" parameter (every 10 seconds).
 */

app.controller('LoadedScatterChartCtrl',[
    '$interval',
    'SimpleHttpLoader',
    function ($interval,SimpleHttpLoader) {

        var reloadInterval = 60000; // reload every minute
        var vmLoaded = this;

        // Control parameters for plot data and size of display
        vmLoaded.isThumbnail = true;
        vmLoaded.title = "Loaded File Scatter";
        vmLoaded.src = 'data/TestScatter.log';
        vmLoaded.logs = [];

        SimpleHttpLoader(vmLoaded.src)
            .then(function(response) {
                vmLoaded.logs = response.data;
            });
        
        $interval(function() {
            console.log("calling the load service on the interval");
            SimpleHttpLoader(vmLoaded.src)
                .then(function(response) {
                    vmLoaded.logs = response.data;
                });
        }, reloadInterval);
    }

]);

