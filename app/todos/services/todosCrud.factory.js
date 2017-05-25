/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCrudFactory', function ($q, todosApiFactory, errorHandlerFactory) {

        var factory = {};

        var onError = function () {
            errorHandlerFactory.setAppHasError(true);
            return $q.reject(); // stops the promise chain to todosCrudFactory().then() , .catch() will however run (this logic also applies to $q.all()...)
        }

        var onSuccess = function (response) {
            return response.data;
        };

        factory.getTodos = function () {
            return todosApiFactory.getTodos()
                .then(onSuccess)
                .catch(onError);
        };

        factory.addTodo = function (todo) {
            var storeTodo = { id: todo.id, text: todo.text };

            return todosApiFactory.addTodo(storeTodo)
                .then(onSuccess)
                .catch(onError);
        };

        factory.updateTodo = function (todo) {
            var storeTodo = { id: todo.id, text: todo.text };

            return todosApiFactory.updateTodo(storeTodo)
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
