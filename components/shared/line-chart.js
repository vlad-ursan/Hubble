/**
 * @ngdoc component
 * @name lineChart
 * @module  shared
 * @param data: A data object in the format
 * @description A component which is responsible for rendering a line chart based on input data
 */
(function (angular) {
    'use strict';

    function LineChartController($element) {
        var ctrl = this;
        ctrl.wrapper = $element[0];

        ctrl.$onChanges = function (changes) {
            if (changes.hasOwnProperty('data') && changes.data.currentValue !== null) {
                ctrl.drawChart(changes.data.currentValue);
            }
        };

        /**
         * @ngdoc function
         * @name drawChart
         * @param data: a data object
         * @description Set up and draw the chart
         */
        ctrl.drawChart = function (data) {
            // Making sure the element we want to draw in is empty.
            d3
                .select(ctrl.wrapper)
                .selectAll('*')
                .remove();

            var defaultHeight = window.innerHeight / 2;
            var defaultWidth = window.innerWidth / 2;

            // initialize the dimensions of the chart.
            ctrl.chartWrapper = d3.select(ctrl.wrapper)
                .append("svg")
                .attr('width', defaultWidth + 'px')
                .attr('height', defaultHeight + 'px');

            var margin = {top: 20, right: 20, bottom: 50, left: 40};
            var width = defaultWidth - margin.left - margin.right;
            var height = defaultHeight - margin.top - margin.bottom;

            // group all chart components inside a <g> element
            ctrl.g = ctrl.chartWrapper.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            // initialize the scale of the x axis
            ctrl.x = d3.scaleTime()
                .rangeRound([0, width]);
            // initialize the scale of the y axis
            ctrl.y = d3.scaleLinear()
                .rangeRound([height, 0]);

            ctrl.line = d3.line()
                .x(function(d) { return ctrl.x(d.Date); })
                .y(function(d) { return ctrl.y(d.Output); });

            ctrl.x.domain(d3.extent(data, function(d) { return d.Date; }));
            ctrl.y.domain(d3.extent(data, function(d) { return d.Output; }));

            ctrl.g.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(ctrl.x)
                    .tickFormat(function (d) {
                        var formatTime = d3.timeFormat("%B %d, %Y");
                        return formatTime(d)
                    }))
                .select(".domain")
                .remove();

            ctrl.g.append("g")
                .call(d3.axisLeft(ctrl.y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text(ctrl.yUnit);

            ctrl.g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "rgb(76, 175, 80)")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 1.5)
                .attr("d", ctrl.line);

        }
    }

    angular.module('shared')
        .component('lineChart', {
            bindings: {
                data: '<',
                yUnit: '@'
            },
            controller: LineChartController
        })
})(angular);