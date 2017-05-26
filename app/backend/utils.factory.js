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

        var _isValidTodo = function (todo, isUpdate) { 
            var nrOfKeys = isUpdate ? 2 : 1;

            if (!todo || !angular.isObject(todo)) {
                return false;
            }

            if (Object.keys(todo).length !== nrOfKeys) {
                return false;
            }

            if (todo.text == null) {
                return false;
            }

            if(isUpdate) {
                if(todo.id == null) {
                    return false;
                }
            }

            return true;
        };

        factory.isValidNewTodo = function (todo) {
            return _isValidTodo(todo, false);
        };

        factory.isValidUpdatedTodo = function (todo) {
            return _isValidTodo(todo, true);
        };

        return factory;
    });
