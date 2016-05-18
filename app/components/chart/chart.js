"use strict";


angular.module('d3Chart',[])

/* The d3 factory wraps d3 so it can be injected into angular components and mocked */
.factory('d3', function() {
   return d3; 
})

/* This directive displays a scatter chart of the data */
.directive ('scatterChart', ["d3",
    function (d3) {

       // This function is called every time the data is updated
       var draw = function(svg, width, height, data) {
            svg
                .attr('width', width)
                .attr('height', height);

           // Define a margin
           var margin = 30;

           // Define x-scale (based on values in data)
           var xScale = d3.time.scale()
               .domain( d3.extent(data, function(d) { return d.x; }))
               .range([margin, width-margin ]);

           // Define x-axis using a time scale for number of seconds that have passed
           var xAxis = d3.svg.axis()
               .scale(xScale)
               .orient('top')
               .tickFormat(d3.time.format('%S'));

           // Define y-scale (based on values in data)
           var yScale = d3.scale.linear()
               .domain([0, d3.max(data, function(d) { return d.y; })])
               .range([margin, height-margin ]);

           // Define y-axis with a linear scale for integer value of number of visitors
           var yAxis = d3.svg.axis()
               .scale(yScale)
               .orient('left')
               .tickFormat(d3.format('f'));

           //Draw x-axis
           svg.select('.x-axis')
               .attr("transform", "translate(0, " + margin + ")")
               .call(xAxis);

           //Draw y-axis
           svg.select('.y-axis')
               .attr("transform", "translate(" + margin + ")")
               .call(yAxis);

           // Add new data points
           svg.select('.data')
               .selectAll('circle').data(data)
               .enter()
               .append('circle');

           // Update all data points
           svg.select('.data')
               .selectAll('circle').data(data)
               .attr('r', 2.5)
               .attr('cx', function(d) { return xScale(d.x); })
               .attr('cy', function(d) { return yScale(d.y); });

       };

       return {
          restrict: 'E', // directive as a new "html" tag
          scope: {
             data: "=" // allow access to the dataset that is passed in the html template
          },

          // The svg and groups for the chart are added to the DOM in the compile stage
          compile: function( element, attrs, transclude ){

             // Create a SVG root element to hold the chart
             var svg = d3.select(element[0]).append('svg');

             // group containers for data points and axis
             svg.append('g').attr('class', 'data');
             svg.append('g').attr('class','x-axis axis');
             svg.append('g').attr('class','y-axis axis');

             // Define the dimensions of the chart
             var width = 600, height = 300;

             // Return the link function which draws data in the chart
             return function(scope, element, attrs) {

                // Watch for data changes in the scope
                scope.$watch('data', function(newVal, oldVal, scope) {

                    // If data has been defined in the scope ...
                    if (scope.hasOwnProperty("data")) {

                        // Map the data to x and y
                        var data = scope.data.map(function(d) {
                            return {
                                x: new Date(d.time),
                                y: d.visitors
                            }
                        });

                        // Update the chart by calling "draw" when data changes
                        draw(svg, width, height, data);
                        }
                }, true);
             };

          }
       }
    }
]);
