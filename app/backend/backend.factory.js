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
            },
        ];

        factory.getTodos = function () {
            return todos;
        };

        factory.deleteTodo = function (id) {
            var match = false;

            for(var i = 0; i < todos.length; i++) {
                if(todos[i].id == id) {
                    match = true;
                    todos.splice(i, 1);
                    break;
                }
            }

            return match;
        };

        return factory;

    });