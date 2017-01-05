/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('utilsFactory', function () {

        var factory = {};

        factory.getNewId = function (todos) {
            if (!todos.length) {
                return 1;
            }

            var idArray = todos.map(function (todo) { return todo.id });

            var idArraySorted = idArray.sort(function (a, b) { return a - b });

            return idArraySorted.pop() + 1;
        };

        return factory;
    });
