/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('crudFactory', function (apiFactory, errorHandlerFactory) {

        var factory = {};

        var onSuccess = function (response) {
            return response.data;
        };

        var onError = function () {
            errorHandlerFactory.setAppHasError(true);
        }

        factory.getTodos = function () {
            return apiFactory.getTodos()
                .then(onSuccess)
                .catch(onError);
        };

        factory.deleteTodo = function (id) {
            return apiFactory.deleteTodo(id)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;

    });