/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function ($filter, crudFactory) {
                var vm = this;

                vm.deleteTodo = function () {
                    crudFactory.deleteTodo(vm.todo.id);
                };
            },
            controllerAs: 'vm',
            bindToController: {
                todo: '='
            },
            templateUrl: 'todos/todo/yt-todo.template.html'
        }
    });