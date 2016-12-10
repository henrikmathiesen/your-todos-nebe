/// <reference path="../../typings/index.d.ts" />

angular
    .module('shared')
    .factory('errorHandlerFactory', function () {

        var factory = {};
        var appHasError = false;

        factory.getAppHasError = function () {
            return appHasError;
        };

        factory.setAppHasError = function (hasError) {
            appHasError = hasError;
        };

        return factory;

    });