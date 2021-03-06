/**
 * @ngdoc component
 * @module app
 * @name toolbar
 *
 * @description A component which renders a toolbar together with navigation options
 */
(function (angular) {
    'use strict';

    function ToolbarController($state, $mdSidenav) {
        var ctrl = this;

        ctrl.state = $state;

        ctrl.openSideNav = function () {
            $mdSidenav('right').open();
        }

    }

    angular.module('app')
        .component('toolbar', {
            templateUrl: '/components/toolbar/toolbar.html',
            controller: ToolbarController
        })
})(angular);