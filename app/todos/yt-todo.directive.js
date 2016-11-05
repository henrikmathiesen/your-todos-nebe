/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function () {
        return {
            restrict: 'E',
            scope: {},
            controller: function () {
                var vm = this;
                //vm.todo = { date: null, id: null, label: null, text: null };
            },
            controllerAs: 'vm',
            bindToController: {
                todo: '='
            },
            templateUrl: 'todos/yt-todo.template.html'
        }
    });