/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function () {

        var factory = {};

        var _todos = [
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
                text: "Make sure there are an equal ammount of blue berries in each muffin"
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

        var _getNewId = function () {
            if (!_todos.length) {
                return 1;
            }

            var idArray = _todos.map(function (todo) { return todo.id });

            var idArraySorted = idArray.sort(function (a, b) { return a - b });

            return idArraySorted.pop() + 1;
        };

        factory.getTodos = function () {
            return _todos;
        };

        factory.deleteTodo = function (id) {
            var match = false;

            for (var i = 0; i < _todos.length; i++) {
                if (_todos[i].id == id) {
                    match = true;
                    _todos.splice(i, 1);
                    break;
                }
            }

            return match;
        };

        factory.addTodo = function (todo) {
            todo.id = _getNewId();
            _todos.push(todo);

            return todo;
        };

        return factory;

    });