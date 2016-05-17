"use strict;"

app.controller('MainCtrl',[
    '$scope',
    '$location',
    '$interval',
    function ($scope, $location, $interval) {
        $scope.logs = [];

        // initialize the first date in the log records (timezone GMT+01)
        var time = new Date('2014-01-01 00:00:00 +0100');

        // Random data point generator with a time and integer in each point record
        var randPoint = function() {
            var rand = Math.random,
                obj = { time: time.toString(), visitors: parseInt(rand() * 100) };
            return obj;
        };

        //Store a list of logs initialized with a random point
        $scope.logs = [ randPoint() ];

        //Every second push a new random point onto the logs
        $interval(function() {
            var point = randPoint();
            time.setSeconds(time.getSeconds() + 1);
            $scope.logs.push(point);
        }, 1000);

    }
]);