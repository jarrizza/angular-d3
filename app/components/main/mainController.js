/**
 * Created by judith.arrizza on 5/16/16.
 */

app.controller('MainCtrl',[
    '$scope',
    '$location',
    '$interval',
    function ($scope, $location, $interval) {
        console.log("main controller");

        // initialize the first date in the log records (timezone GMT+01)
        var time = new Date('2014-01-01 00:00:00 +0100');

        // Random data point generator with a time and integer in each point record
        var randPoint = function() {
            var rand = Math.random;
            return { time: time.toString(), visitors: rand() * 100 };
        };

        //Store a list of logs initialized with a random point
        $scope.logs = [ randPoint() ];

        //Every second push a new random point onto the logs
        $interval(function() {
            time.setSeconds(time.getSeconds() + 1);
            $scope.logs.push(randPoint());
        }, 1000);

        console.log("data initialized and timer set");
    }
]);