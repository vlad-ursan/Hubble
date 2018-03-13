/**
 * @ngdoc component
 * @module app
 * @name main
 *
 * @description
 * A component which serves as the main View of the application.
 */

(function (angular) {
    'use strict';

    /**
     * @ngdoc controller
     * @module app
     * @param d3Service
     *
     * @description The controller of the the `main` angular component
     */

    function MainController(d3Service) {
        console.log('hello')
    }
    
    angular.module('app')
        .component('main', {
            templateUrl: '/components/main/main.html',
            controller: MainController
        });
})(angular);