/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('localstorageFactory', function ($window) {

        var factory = {};

        factory.set = function (key, collection) {
            var collectionJson = angular.toJson(collection);
            $window.localStorage.setItem(key, collectionJson);
        };

        factory.get = function (key) {
            var collectionJson = $window.localStorage.getItem(key);
            return angular.fromJson(collectionJson);
        };

        factory.isEmpty = function (key) {
            return $window.localStorage.getItem(key) === null;
        };

        return factory;
    });
