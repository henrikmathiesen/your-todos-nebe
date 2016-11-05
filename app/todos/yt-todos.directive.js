/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: function (apiFactory, errorHandlerFactory) {
                var vm = this;
                vm.todos = [];

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