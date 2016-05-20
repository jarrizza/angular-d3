"use strict";

/* This is a simple loader for wrapping http get for testing.
 * This factory will be used by any service that needs to get data from files */

app.factory('simpleHttpLoader', ['$http',
    function($http) {
        return function(url) {
            return $http.get(url);
     }
}]);

/* This service provides support for chart data creation and manipulation.
 */

app.service('dataManagerService', 
    ['simpleHttpLoader',
    function (simpleHttpLoader) {
        // initialize the first date for random log entries(timezone GMT+01)
        var time = new Date('2014-01-01 00:00:00 +0100'),
            service = {
              getRandomPoint: getRandomPoint
            };
        return service;
        /////////////////////////
        
        // Passed a time update in seconds, increment the time parameter generate a random integer between
        // 1 and 100 and return an object with these values returned.
        function getRandomPoint( timeIncrement ) {
            time.setSeconds(time.getSeconds() + timeIncrement);
            var rand = Math.random,
                obj = { time: time.toString(), value: parseInt(rand() * 100) };
            return obj;
        }
        
    }
]);

