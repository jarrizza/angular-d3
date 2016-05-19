"use strict";

app.factory('SimpleHttpLoader', ["$http",
    function($http) {
        return function(url) {
            return $http.get(url);
     }
}]);

app.service('scatterLoadService', ['$http',
    function ($http) {
        var url = "data/TestScatter.log";
        $http.get(url)
            .success(function(data) {
                console.log("JUST LOADED THIS: ", JSON.stringify(data));
            })
    }
]);

