/**
 * @author Julian Deborré
 * @ngdoc ngService
 * @name d3Service
 * @description
 * D3 Service loading D3 core and allowing injection as dependency.
 * @see Write up on the approach here:
 * {@link http://www.ng-newsletter.com/posts/d3-on-angular.html}
 */

(function (angular) {
    'use strict';
    angular.module('app').factory('d3Service', d3Service);

    function d3Service($document, $q, $rootScope) {

        var d3Service = {};

        /**
         * @function d3Service.d3
         * @description
         * Handles promise resolution for loading d3 library.
         * We can then attach operations to that promise that rely on
         * d3 being available i.e.: d3Service.loaded().then(function(d3) { do some stuff... });
         */
        d3Service.loaded = function() {
            return d3Service.d3Promise.promise;
        };

        /**
         * @function d3Service.resolvePromise
         * @description
         * Callback for resolving the d3 promise once the script has loaded
         */
        d3Service.resolvePromise = function() {

            $rootScope.$apply(function() {
                d3Service.d3Promise.resolve(window.d3);
            });
        };

        /**
         * @function d3Service.appendD3
         * @description
         * Appends D3 script tag to the application when needed and listens for it to finish loading.
         * EDIT (vursan): Edited the function to append local src files instead of http ones.
         */
        d3Service.appendD3 = function() {

            d3Service.d3Promise = $q.defer();

            var scriptTag = $document[0].createElement('script');
            scriptTag.type = 'application/javascript';
            scriptTag.async = true;
            scriptTag.src = 'node_modules/d3/build/d3.js';
            scriptTag.onreadystatechange = function() {
                if (this.readyState === 'complete')
                    d3Service.resolvePromise();
            };
            scriptTag.onload = d3Service.resolvePromise;
            var body = $document[0].getElementsByTagName('body')[0];
            body.appendChild(scriptTag);

        };

        // Trigger the append.
        d3Service.appendD3();

        return d3Service;

    }
})(angular);