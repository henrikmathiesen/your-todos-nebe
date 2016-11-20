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
        vm.noTodosChecked = true;

        vm.isAllTodosChecked = function () {
            if (!vm.todos.length) {
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
            todosCrudFactory.getTodos()
                .then(function (todos) {
                    vm.todos = todos;
                    vm.todos.map(function (todo) { todo.checked = false; });
                    vm.isAllTodosChecked();
                });
        };

        vm.deleteCheckedTodos = function () {
            var deletePromises = [];
            var $todoElements = [];
            var fadePromises = [];

            for (var i = 0; i < vm.todos.length; i++) {

                var todo = vm.todos[i];

                if (todo.checked) {
                    $todoElements.push(angular.element('div[data-todo-id=' + todo.id + ']'));
                    deletePromises.push(todosCrudFactory.deleteTodo(todo.id));
                }
            }

            angular.forEach($todoElements, function (el) {
                fadePromises.push(el.fadeOut().promise());
            });

            $q.all(fadePromises).then(function(){
                $q.all(deletePromises).then(getTodos);
            });

        };

        getTodos();

    });