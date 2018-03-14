/**
 * @ngdoc component
 * @name dailyEnergy
 * @module app
 * @description A component which renders visualizations and controls for daily energy generation data
 */
(function (angular) {
    'use strict';

    function DailyEnergyController(d3Service, dataService) {
        var ctrl = this;
        ctrl.dataReady = false;

        function parseData(csvData) {
            var parseTime = d3.timeParse("%d/%m/%Y");

            csvData.forEach(function (d) {
                d.Date = parseTime(d.Date);
                d.Output = +d.Output;
            });

            return csvData
        }


        d3Service.loaded().then(function () {
                // This d3.loaded wrapper exists here because we are using the d3 based data-service; It will be removed
                // when data will be fetched from an API.
                dataService.getEnergyData().then(
                    function (s) {
                        ctrl.dailyEnergyData = s.data;
                        ctrl.dailyEnergyChartData = parseData(s.data);
                        ctrl.dataReady = true;
                    }
                )
            }
        );
    }

    angular.module('app')
        .component('dailyEnergy', {
            templateUrl: '/components/daily-energy/daily-energy.html',
            controller: DailyEnergyController
        })
})(angular);