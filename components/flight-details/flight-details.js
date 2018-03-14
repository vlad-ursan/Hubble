/**
 * @ngdoc component
 * @module app
 * @name flightDetails
 *
 * @description A component which renders the flight information analytics view
 */
(function (angular) {

    function FlightDetailsController(d3Service, dataService, $state, $stateParams) {
        var ctrl = this;
        ctrl.flightCountsData = null;
        ctrl.dataReady = false;
        // An object where the controls for the charts are stored.
        ctrl.controls = {
            noOfFlights: $stateParams.noOfFlights,
            topAirlines: parseInt($stateParams.limitAirlines)
        };

        /**
         * @ngdoc function
         * @name limitAirlines
         * @param limit A number to limit the array of airlines
         * @description A function which slices the already sorted array of airlines, eliminating the ones with
         * too few flights
         */
        ctrl.limitAirlines = function (limit) {
            ctrl.flightCountsChartData = ctrl.flightCountsData.slice(0,limit)
        };

        /**
         * @ngdoc function
         * @name checkStateParams
         * @description Check the current URL query params for values which could be used to preset the controls for the
         * charts
         */
        function checkStateParams(){
            // More work needs to be done here, but leaving this for now in the interest of time
            if($stateParams.limitAirlines !== null){
                ctrl.limitAirlines(ctrl.controls.topAirlines)
            }

            if($stateParams.noOfFlights !== null){
                console.log('hello')
            }

            if($stateParams.limitAirlines === null && $stateParams.noOfFlights === null){
                ctrl.flightCountsChartData = angular.copy(ctrl.flightCountsData);
            }
        }


        /**
         * @ngdoc function
         * @name generateAirlineFlightCounts
         * @param data
         * @returns {Array}
         *
         * @description
         * Generate counts of flights by airline.
         */
        function generateAirlineFlightCounts(data) {
            var countsObj = {};
            angular.forEach(data, function (row) {
                if (countsObj.hasOwnProperty(row.Supplier_name)) {
                    countsObj[row.Supplier_name] += 1;
                } else {
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


        /**
         * @ngdoc function
         * @name sortData
         * @param data
         * @returns {*}
         * @description Sort an array of {value, count} data in descending order based on the count.
         */
        function sortData(data) {
            // sorting the array
            data.sort(function (a, b) {
                return d3.descending(a.count, b.count);
            });

            return data
        }

        d3Service.loaded().then(function () {
            // This d3.loaded wrapper exists here because we are using the d3 based data-service; It will be removed
            // when data will be fetched from an API.
            dataService.getFlightData().then(
                    function (s) {
                        ctrl.flightCountsData = sortData(generateAirlineFlightCounts(s.data));
                        checkStateParams();
                        ctrl.dataReady = true;
                    }
                )
            }
        );

    }

    'use strict';

    angular.module('app')
        .component('flightDetails', {
            templateUrl: '/components/flight-details/flight-details.html',
            controller: FlightDetailsController
        })
})(angular);