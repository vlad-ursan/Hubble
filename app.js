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
        'ngMessages'
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

                $stateProvider.state('main', {
                    url: '/',
                    component: 'main'
                })
            }
        ])
})(angular);