/**
 * @ngdoc component
 * @name sideNav
 * @module app
 * @description A component which renders a side nav on the page and holds navigation elements for the application
 */
(function (angular) {
    'use strict';

    function AppSideNavController($mdSidenav, navigationService) {
        var ctrl = this;

        ctrl.navItems = navigationService.navItems;

        ctrl.close = function () {
            $mdSidenav('right').close()
        }
    }

    angular.module('app')
        .component('sideNav', {
            templateUrl: '/components/side-nav/side-nav.html',
            controller: AppSideNavController
        })
})(angular);