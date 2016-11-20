/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCrudFactory', function (todosApiFactory, errorHandlerFactory) {

        var factory = {};

        var onError = function () {
            errorHandlerFactory.setAppHasError(true);
        }

        var onSuccess = function (response) {
            return response.data;
        };

        factory.getTodos = function () {
            return todosApiFactory.getTodos()
                .then(onSuccess)
                .catch(onError);
        };

        factory.deleteTodo = function (id) {
            todosApiFactory.deleteTodo(id)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;

    });