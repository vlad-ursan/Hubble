/**
 * @ngdoc service
 * @name navigationService
 * @module app
 * @description A service which holds the navigation items present in the application.
 */
(function (angular) {
    angular.module('app')
        .factory('navigationService', function () {
            return {
                navItems: [
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
        })
})(angular);