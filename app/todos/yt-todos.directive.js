/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodos', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'todos/yt-todos.template.html',
            replace: true,
            controller: 'ytTodosController as vm',
            bindToController: true
        }
    })
    .controller('ytTodosController', function (todosCrudFactory) {
        var vm = this;
        vm.todos = [];
        vm.allTodosChecked = false;

        todosCrudFactory.getTodos()
            .then(function (todos) {
                vm.todos = todos;
                vm.todos.map(function (todo) { todo.checked = false; });
            });

        vm.checkAllTodos = function (isChecked) {
            vm.todos.map(function (todo) { todo.checked = isChecked; });
            vm.allTodosChecked = isChecked;
        };

        vm.isAllTodosChecked = function () {
            vm.allTodosChecked = vm.todos.every(function (todo) {
                return todo.checked;
            });
        };

        vm.deleteCheckedTodos = function () {
            
        };

    });