/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosApiFactory', function ($http) {

        var factory = {};

        factory.getTodos = function () {
            return $http.get('/api/todos');
        };

        factory.addTodo = function (todo) { 
            return $http.post('/api/todo', todo);
        };

        factory.updateTodo = function (todo) {
            return $http.put('/api/todo/' + todo.id, todo);
        };

        factory.deleteTodo = function (id) {
            return $http.delete('/api/todo/' + id);
        };


        return factory;

    });
