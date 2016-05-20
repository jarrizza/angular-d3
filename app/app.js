'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('ad3App', [
     'ngRoute',
    'ngResource',
    'd3Chart'
   ])
    
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
      }
   ]);
    
    
