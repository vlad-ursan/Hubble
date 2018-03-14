/**
 * @ngdoc component
 * @module app
 * @name flightDetailsChart
 * @param data: a csv derived array data object.
 * @param config: a d3 configuration object.
 * @description A component which is responsible for rendering the fight information chart.
 */
(function (angular) {
    'use strict';

    function FlightDetailsController($element) {
        var ctrl = this;
        ctrl.wrapper = $element[0];

        ctrl.$onInit = function () {
            console.log(ctrl.data);
            setUpChart()
        };

        function parseData(data){
            var countsObj = {};
            angular.forEach(data, function (row) {
                if(countsObj.hasOwnProperty(row.Supplier_name)){
                    countsObj[row.Supplier_name] += 1;
                }else{
                    countsObj[row.Supplier_name] = 1
                }
            });

            var counts = [];
            angular.forEach(countsObj, function (value, key) {
                counts.push({
                    airline: key,
                    count: value
                })
            });

            return counts
        }

        function setUpChart() {
            var defaultHeight = window.innerHeight / 2;
            var defaultWidth = 0.9 * window.innerWidth / 2;

            ctrl.chartWrapper = d3.select(ctrl.wrapper)
                .append("svg")

                .attr('width', defaultWidth + 'px')
                .attr('height', defaultHeight + 'px');

            var margin = {top: 20, right: 0, bottom: 50, left: 40};
            var width = defaultWidth - margin.left - margin.right;
            var height = defaultHeight - margin.top - margin.bottom;

            var g = ctrl.chartWrapper.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            ctrl.x = d3.scaleBand()
                .rangeRound([0, width])
                .padding(0.1);

            ctrl.y = d3.scaleLinear()
                .rangeRound([height, 0]);

            // ctrl.z = d3.scaleOrdinal()
            //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
            var data = parseData(ctrl.data);
            ctrl.x.domain(data.map(function(d) { return d.airline; }));
            ctrl.y.domain([0, d3.max(data, function(d) { return d.count; })]);

            g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(ctrl.x))
                .selectAll('text')
                .attr("y", 0)
                .attr("x", -90)
                .attr("dy", ".35em")
                .attr("transform", "rotate(-90)");

            g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(ctrl.y).ticks(10))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Frequency");

            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return ctrl.x(d.airline); })
                .attr("y", function(d) { return ctrl.y(d.count); })
                .attr("width", ctrl.x.bandwidth())
                .attr("height", function(d) { return height - ctrl.y(d.count); });
        }
    }

    angular.module('app')
        .component('flightDetailsChart', {
            templateUrl: '/components/flight-details/flight-details-chart.html',
            bindings: {
                data: '<',
                config: '<'
            },
            controller: FlightDetailsController
        })
})(angular);