/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function() {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function(todosCrudFactory) {
                var vm = this;
                vm.todos = [];

                var getTodos = function() {
                    todosCrudFactory.getTodos()
                        .then(function(todos) {
                            vm.todos = todos;
                        });
                };

                todosCrudFactory.subscribeToCrudComplete(getTodos);

                getTodos();                

            },
            controllerAs: 'vm',
            bindToController: true,
            template: '<yt-todo todo="todo" ng-repeat="todo in vm.todos"></yt-todo>'
        }
    });