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
        ctrl.chartWrapper = $element[0];

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

            var margin = {top: 20, right: 0, bottom: 50, left: 40};
            var width = defaultWidth - margin.left - margin.right;
            var height = defaultHeight - margin.top - margin.bottom;

            // group all chart components inside a <g> element
            ctrl.g = ctrl.chartWrapper.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        }
    }

    angular.module('shared')
        .component('lineChart', {
            bindings: {
                data: '<'
            },
            controller: LineChartController
        })
})(angular);