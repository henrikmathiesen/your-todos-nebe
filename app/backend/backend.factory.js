/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function (initialDataFactory, utilsFactory, localstorageFactory) {

        var factory = {};

        var localStorageKey = 'yourTodos';

        if (localstorageFactory.isEmpty(localStorageKey)) {
            localstorageFactory.set(localStorageKey, initialDataFactory.getTodos());
        }
        else {

        }












        localstorageFactory.set(localStorageKey, todos);

        factory.getTodos = function () {
            return localstorageFactory.get(localStorageKey);
        };

        factory.addTodo = function (todo) {
            todo.id = utilsFactory.getNewId(todos);
            todos.push(todo);
            localstorageFactory.set();

            return todo;
        };

        factory.updateTodo = function (id, todo) {
            var pos = todos.map(function (tdo) { return tdo.id.toString(); }).indexOf(id.toString());

            if (pos < 0) {
                return null;
            }

            todos.splice(pos, 1, todo);
            return todo;
        };

        factory.deleteTodo = function (id) {
            var match = false;

            for (var i = 0; i < todos.length; i++) {
                if (todos[i].id == id) {
                    match = true;
                    todos.splice(i, 1);
                    break;
                }
            }

            return match;
        };

        return factory;

    });
