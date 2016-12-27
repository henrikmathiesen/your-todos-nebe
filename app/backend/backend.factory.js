/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function () {

        var factory = {};

        var todos = [
            {
                id: 1,
                text: "Keep up with front end stuff"
            },
            {
                id: 2,
                text: "Assemble a tshirt gun"
            },
            {
                id: 3,
                text: "Make sure there are an equal amount of blue berries in each muffin"
            },
            {
                id: 4,
                text: "Juggle and fail"
            },
            {
                id: 5,
                text: "Study Angular"
            },
            {
                id: 6,
                text: "Study React"
            },
            {
                id: 7,
                text: "Lorem ipsum dolores"
            }
        ];

        var getNewId = function () {
            if (!todos.length) {
                return 1;
            }

            var idArray = todos.map(function (todo) { return todo.id });

            var idArraySorted = idArray.sort(function (a, b) { return a - b });

            return idArraySorted.pop() + 1;
        };

        factory.getTodos = function () {
            return todos;
        };

        factory.addTodo = function (todo) {
            todo.id = getNewId();
            todos.push(todo);

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