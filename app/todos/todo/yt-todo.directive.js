/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'todos/todo/yt-todo.template.html',
            controller: 'ytTodoController as subVm',
            bindToController: {
                todo: '<'
            }
        }
    })
    .controller('ytTodoController', function () {
        var subVm = this;
        
    });