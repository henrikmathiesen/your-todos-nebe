/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function (crudFactory) {
                var vm = this;
                vm.todos = [];

                crudFactory.getTodos()
                    .then(function (todos) {
                        vm.todos = todos;
                    });
            },
            controllerAs: 'vm',
            bindToController: true,
            template: '<yt-todo todo="todo" ng-repeat="todo in vm.todos"></yt-todo>'
        }
    });