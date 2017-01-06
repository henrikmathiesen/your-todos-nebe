/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function (initialDataFactory, utilsFactory, localstorageFactory) {

        var factory = {};

        var localStorageKey = 'yourTodos';

        var todos = initialDataFactory.getTodos();

        if (localstorageFactory.isEmpty(localStorageKey)) {
            localstorageFactory.set(localStorageKey, todos);
        }
        else {
            todos = localstorageFactory.get(localStorageKey);
        }

        factory.getTodos = function () {
            return todos;
        };

        factory.addTodo = function (todo) {
            todo.id = utilsFactory.getNewId(todos);
            todos.push(todo);

            return todo;
        };

        factory.updateTodo = function (id, todo) {
            var pos = todos.map(function (tdo) { return tdo.id.toString(); }).indexOf(id.toString());

            if (pos < 0) {
                return null;
            }

            todos.splice(pos, 1, todo);
            localstorageFactory.set(localStorageKey, todos);

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

            localstorageFactory.set(localStorageKey, todos);

            return match;
        };

        return factory;

    });
