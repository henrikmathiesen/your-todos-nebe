/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($filter) {
                var vm = this;
            },
            controllerAs: 'vm',
            bindToController: {
                todo: '='
            },
            templateUrl: 'todos/todo/yt-todo.template.html'
        }
    });