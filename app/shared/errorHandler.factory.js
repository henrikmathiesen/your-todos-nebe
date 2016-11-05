/// <reference path="../../typings/index.d.ts" />

angular
    .module('shared')
    .factory('errorHandlerFactory', function () {

        var factory = {};
        var _appHasError = false;

        factory.getAppHasError = function () {
            return _appHasError;
        };

        factory.setAppHasError = function (hasError) {
            _appHasError = hasError;
        };

        return factory;

    });