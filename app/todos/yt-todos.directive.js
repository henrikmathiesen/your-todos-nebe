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
    .controller('ytTodosController', function (todosCrudFactory, todosCheckedFactory) {
        var vm = this;
        vm.todos = [];
        vm.allTodosChecked = false;
        vm.noTodosChecked = true;

        var getTodos = function () {
            todosCrudFactory.getTodos()
                .then(function (todos) {
                    vm.todos = todos;
                    vm.todos.map(function (todo) { todo.checked = false; });
                    vm.isAllTodosChecked();
                });
        };

        vm.isAllTodosChecked = function () { todosCheckedFactory.isAllTodosChecked(vm); };
        vm.checkAllTodos = function (isChecked) { todosCheckedFactory.checkAllTodos(vm, isChecked); };
        vm.deleteCheckedTodos = function () { todosCheckedFactory.deleteCheckedTodos(vm, getTodos); };

        getTodos();

    });