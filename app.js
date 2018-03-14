/**
 * @ngdoc module
 * @module app
 * @name app
 *
 * @description
 * Main Application Module
 */

(function (angular) {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ngMaterial',
        'ngMessages',
        'shared'
    ])

        .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])

        // Location configuration
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(true);    //enabling html5 mode
        }])

        .config(['$mdThemingProvider', function ($mdThemingProvider) {
            $mdThemingProvider.theme('default')
                .primaryPalette('light-blue')
                .accentPalette('orange');
        }])

        .config(['$stateProvider',
            '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                // Configuration of URL routes
                $urlRouterProvider.otherwise("/login");

                $stateProvider
                    .state('main', {
                        url: '/',
                        component: 'main'
                    })
                    .state('flight_data', {
                        url: '/flight-data?limitAirlines&noOfFlights',
                        params: {
                            limitAirlines: null,
                            noOfFlights: null
                        },
                        component: 'flightDetails'
                    })
                    .state('daily_energy', {
                        url: '/daily-energy',
                        component: 'dailyEnergy'
                    })
                    .state('council_spending', {
                        url: '/council-spending',
                        component: ''
                    })
            }
        ])
})(angular);