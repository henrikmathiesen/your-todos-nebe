/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function (apiFactory, errorHandlerFactory) {
        return {
            restrict: 'E',
            scope: {},
            controller: function () {
                var vm = this;
                vm.todos = [];
                // todo: { date, id, label, text }

                apiFactory.getTodos()
                    .then(function (response) {
                        vm.todos = response.data;
                    })
                    .catch(function () {
                        errorHandlerFactory.setAppHasError(true);
                    });
            },
            controllerAs: 'vm',
            bindToController: true,
            template: '<yt-todo todo="todo" ng-repeat="todo in vm.todos"></yt-todo>'
        }
    });