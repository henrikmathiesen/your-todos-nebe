/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCrudFactory', function(todosApiFactory, errorHandlerFactory) {

        var factory = {};
        var _subscribeToCrudCompleteCb;

        var onError = function() {
            errorHandlerFactory.setAppHasError(true);
        }

        var getSuccess = function(response) {
            return response.data;
        };

        var deleteSuccess = function(response) {
            _subscribeToCrudCompleteCb();
        };

        factory.getTodos = function() {
            return todosApiFactory.getTodos()
                .then(getSuccess)
                .catch(onError);
        };

        factory.deleteTodo = function(id) {
            todosApiFactory.deleteTodo(id)
                .then(deleteSuccess)
                .catch(onError);
        };

        // PUB/SUB

        factory.subscribeToCrudComplete = function(subscriber) {
            _subscribeToCrudCompleteCb = subscriber;
        };

        return factory;

    });