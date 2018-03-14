/**
 * @ngdoc component
 * @module app
 * @name flightDetails
 *
 * @description A component which renders the flight information analytics view
 */
(function (angular) {
    function FlightDetailsController($element, d3Service, dataService) {
        var ctrl = this;
        ctrl.flightData = null;
        ctrl.dataReady = false;

        d3Service.loaded().then(function () {
                dataService.getFlightData().then(
                    function (s) {
                        ctrl.flightData = s.data;
                        ctrl.dataReady = true;
                    }
                )
            }
        )

    }

    'use strict';

    angular.module('app')
        .component('flightDetails', {
            templateUrl: '/components/flight-details/flight-details.html',
            controller: FlightDetailsController
        })
})(angular);