/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCrudFactory', function ($q, todosApiFactory, errorHandlerFactory) {

        var factory = {};

        var onError = function (error) {
            errorHandlerFactory.setAppHasError(true);
            return $q.reject(); // stops the promise chain to todosCrudFactory().then() , .catch() will however run
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
            return todosApiFactory.deleteTodo(id)
                .then(onSuccess)
                .catch(onError);
        };

        return factory;

    });