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

    function MainController() {
        var ctrl = this;

        ctrl.gridConfig = {
            cols: 2,
            rowHeight: '4:3'
        };

        ctrl.navOptions = [
            {
                title: 'Daily Energy generation from Solar Panel PV arrays',
                icon: 'battery_charging_full',
                color: '#4CAF50',
                sref: 'daily_energy'
            },
            {
                title: 'Home Office Flight Data',
                icon: 'flight_takeoff',
                color: '#00BCD4',
                sref: 'flight_data'
            },
            {
                title: 'Council Spending Over £500',
                icon: 'account_balance',
                color: '#FF9800',
                sref: 'council_spending'
            }
        ]
    }
    
    angular.module('app')
        .component('main', {
            templateUrl: '/components/main/main.html',
            controller: MainController
        });
})(angular);