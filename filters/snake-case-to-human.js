/**
 * @ngdoc filter
 * @name snakeToHuman
 * @param input: A string in the format 'snake_case'
 * @module app
 * @description An angular filter which converts kebab-case strings into human readable strings.
 */

(function (angular) {
    'use strict';

    angular.module('app')
        .filter('snakeToHuman', function () {
            return function (input, options) {
                var resultArray = [];
                var wordsArray = input.split('_');
                angular.forEach(wordsArray, function (word) {
                    var newWord = word[0].toUpperCase() + word.slice(1,word.length);
                    resultArray.push(newWord)
                });
                return resultArray.join(' ')
            }
        })
})(angular);