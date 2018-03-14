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

    function MainController(navigationService) {
        var ctrl = this;

        ctrl.gridConfig = {
            cols: 2,
            rowHeight: '4:3'
        };

        ctrl.navOptions = navigationService.navItems;
    }
    
    angular.module('app')
        .component('main', {
            templateUrl: '/components/main/main.html',
            controller: MainController
        });
})(angular);