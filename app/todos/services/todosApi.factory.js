/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosApiFactory', function ($http) {

        var factory = {};

        factory.getTodos = function () {
            return $http.get('/api/todos');
        };

        factory.postTodo = function (todo) {
            return $http.post('/api/todo', todo);
        };

        factory.putTodo = function (id, todo) {
            return $http.put('/api/todo/' + id, todo);
        };

        factory.deleteTodo = function (id) {
            return $http.delete('/api/todo/' + id);
        };

        factory.addTodo = function (todo) { 
            return $http.post('/api/todo', todo);
        };

        return factory;

    });