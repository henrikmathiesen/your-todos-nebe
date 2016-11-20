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
    .controller('ytTodosController', function (todosCrudFactory, $q) {
        var vm = this;
        vm.todos = [];
        vm.allTodosChecked = false;

        vm.isAllTodosChecked = function () {
            if(!vm.todos.length) {
                vm.allTodosChecked = false;
                vm.noTodosChecked = true;
                return;
            }

            vm.allTodosChecked = vm.todos.every(function (todo) { return todo.checked; });
            vm.noTodosChecked = !vm.todos.some(function (todo) { return todo.checked; });
        };

        vm.checkAllTodos = function (isChecked) {
            vm.todos.map(function (todo) { todo.checked = isChecked; });
            vm.isAllTodosChecked();
        };

        var getTodos = function () {
            console.log("one time");

            todosCrudFactory.getTodos()
                .then(function (todos) {
                    vm.todos = todos;
                    vm.todos.map(function (todo) { todo.checked = false; });
                    vm.isAllTodosChecked();
                });
        };

        vm.deleteCheckedTodos = function () {
            var promises = [];

            for (var i = 0; i < vm.todos.length; i++) {
                if (vm.todos[i].checked === true) {
                    var promise = todosCrudFactory.deleteTodo(vm.todos[i].id);
                    promises.push(promise);
                }
            }

            $q.all(promises).then(getTodos);
        };

        getTodos();

    });