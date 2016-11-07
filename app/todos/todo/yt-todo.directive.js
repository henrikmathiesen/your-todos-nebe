/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function (crudFactory, $filter) {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            link: function (scope, $element) {
                var vm = scope.vm;

                vm.deleteTodo = function () {
                    $element.fadeOut(crudFactory.deleteTodo.bind(null, vm.todo.id));
                };
            },
            controller: function () {},
            controllerAs: 'vm',
            bindToController: {
                todo: '='
            },
            templateUrl: 'todos/todo/yt-todo.template.html'
        }
    });