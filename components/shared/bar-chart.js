/**
 * @ngdoc component
 * @module shared
 * @name barChart
 * @param data: a csv derived array data object in the format[{item: string, count: number}].
 * @description A component which is responsible for rendering a simple bar chart.
 */
(function (angular) {
    'use strict';

    function BarChartController($element) {
        var ctrl = this;
        ctrl.wrapper = $element[0];

        ctrl.$onChanges = function (changes) {
            if (changes.hasOwnProperty('data') && changes.data.currentValue !== null){
                drawChart(changes.data.currentValue);
            }
        };

        /**
         * @ngdoc function
         * @name drawChart
         * @description Set up and draw the chart
         */
        function drawChart(data) {

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

            var margin = {top: 20, right: 0, bottom: 50, left: 40};
            var width = defaultWidth - margin.left - margin.right;
            var height = defaultHeight - margin.top - margin.bottom;

            // group all chart components inside a <g> element
            ctrl.g = ctrl.chartWrapper.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // set up the scale of the x axis
            ctrl.x = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.1);

            // set up the scale of the y axis
            ctrl.y = d3.scaleLinear()
                .rangeRound([height, 0]);

            // set up the domain of the x axis
            ctrl.x.domain(data.map(function (d) {
                return d.airline;
            }));

            // set up the domain of the y axis
            ctrl.y.domain([0, d3.max(data, function (d) {
                return d.count;
            })]);

            // draw the xAxis
            ctrl.xAxis = ctrl.g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(ctrl.x))
                .selectAll('text')
                .attr("y", 0)
                .attr("x", 90)
                .attr("dy", ".35em")
                .attr("transform", "rotate(-90)");

            // draw the y axis
            ctrl.yAxis = ctrl.g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(ctrl.y).ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            // draw the bars of the chart
            ctrl.bar = ctrl.g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) {
                    return ctrl.x(d.airline);
                })
                .attr("y", function (d) {
                    return ctrl.y(d.count);
                })
                .attr("width", ctrl.x.bandwidth())
                .attr("height", function (d) {
                    return height - ctrl.y(d.count);
                })
                .style('fill', 'rgba(3, 169, 244, 0.5)')
        }

    }

    angular.module('shared')
        .component('barChart', {
            bindings: {
                data: '<'
            },
            controller: BarChartController
        })
})(angular);