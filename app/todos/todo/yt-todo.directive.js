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
                //vm.todo = { date: null, id: null, label: null, text: null };
            },
            controllerAs: 'vm',
            bindToController: {
                todo: '='
            },
            templateUrl: 'todos/todo/yt-todo.template.html'
        }
    });