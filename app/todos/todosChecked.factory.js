/// <reference path="../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosCheckedFactory', function (todosCrudFactory, $q) {

        var factory = {};

        factory.isAllTodosChecked = function (vm) {
            if (!vm.todos.length) {
                vm.allTodosChecked = false;
                vm.noTodosChecked = true;
                return;
            }

            vm.allTodosChecked = vm.todos.every(function (todo) { return todo.checked; });
            vm.noTodosChecked = !vm.todos.some(function (todo) { return todo.checked; });
        };

        factory.checkAllTodos = function (vm, isChecked) {
            vm.todos.map(function (todo) { todo.checked = isChecked; });
            factory.isAllTodosChecked(vm);
        };

        factory.deleteCheckedTodos = function (vm, cb) {
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

            $q.all(deletePromises).then(function () {
                angular.forEach($todoElements, function (el) {
                    fadePromises.push(el.fadeOut().promise());
                });

                $q.all(fadePromises).then(cb);
            });
        };

        return factory;

    });