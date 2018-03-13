/**
 * @ngdoc component
 * @module app
 * @name toolbar
 *
 * @description A component which renders a toolbar together with navigation options
 */
(function (angular) {
    'use strict';

    function ToolbarController($state, $stateParams) {

    }

    angular.module('app')
        .component('toolbar', {
            templateUrl: '/components/toolbar/toolbar.html',
            controller: ToolbarController
        })
})(angular);