/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function (apiFactory) {
        return {
            restrict: 'E',
            scope: {},
            controller: function () {
                //var vm = this;

                apiFactory.getTodos()
                    .then(function (response) {
                        console.log(response);
                    });
            },
            controllerAs: 'vm',
            bindToController: true
        }
    });