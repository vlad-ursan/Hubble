/**
 * @ngdoc service
 * module app
 * name dataService
 *
 * description A service which provides functions for calling the various api endpoints to retrieve the data required to
 * render the visualizations; At the moment we are using direct d3 csv loading methods and returning fabricated promises
 * which mimic $http promises, but in the future we would replace these with proper api calls.
 */
(function (angular) {
    'use strict';

    angular.module('app')
        .factory('dataService', function ($q) {
            const energyGenerationUrl = '/data/energy_generation_wc_140114.csv';
            const councilSpendURL = '/data/2015-04-23-March-spend-over-500-v1.csv';
            const flightDataUrl = '/data/Home_Office_Air_Travel_Data_2011.csv';

            return {
                /**
                 * @ngdoc function
                 * @description Make a call for and return the energy generation dataset.
                 * @returns {*|Deferred|a}
                 */
                getEnergyData: function () {
                    var dataRequest = $q.defer();
                    d3.csv(energyGenerationUrl, function (data) {
                        dataRequest.resolve({data: data})
                    });
                    return dataRequest.promise
                },

                /**
                 * @ngdoc function
                 * @description Make a call for and return the home office air travel dataset.
                 * @returns {Promise}
                 */
                getFlightData: function () {
                    var dataRequest = $q.defer();
                    d3.csv(flightDataUrl, function (data) {
                        dataRequest.resolve({data: data})
                    });

                    return dataRequest.promise
                },

                /**
                 * @ngdoc function
                 * @description Make a call for and return the council spending dataset.
                 * @returns {Promise}
                 */
                getCouncilSpendData: function () {
                    var dataRequest = $q.defer();
                    d3.csv(councilSpendURL, function (data) {
                        dataRequest.resolve({data: data})
                    });
                    return dataRequest.promise
                }
            }
        })
})(angular);