/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .factory('todosEffectFactory', function (todosCrudFactory, $q, $timeout) {

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
            vm.todos.map(function (todo) { todo.checked = isChecked; todo.isInEditMode = isChecked; });
            factory.isAllTodosChecked(vm);
        };

        factory.updateCheckedTodos = function (vm) {
            var updatePromises = [];
            var $todoElements = [];

            for (var i = 0; i < vm.todos.length; i++) {

                var todo = vm.todos[i];

                if (todo.checked) {
                    $todoElements.push(angular.element('div[data-todo-id=' + todo.id + ']'));
                    updatePromises.push(todosCrudFactory.updateTodo(todo));
                    factory.unSetCheckedAndEditMode(vm, todo.id);
                }
            }

            $q.all(updatePromises).then(function () {
                angular.forEach($todoElements, function (el) {
                    el.fadeTo(100, 0.1).fadeTo(200, 1.0);
                });
            });
        };

        factory.deleteCheckedTodos = function (vm, getTodos) {
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

                $q.all(fadePromises).then(getTodos);
            });
        };

        var checkedAndEditMode = function (vm, id, shouldSet) {
            vm.todos.map(function (todo) {
                if (todo.id == id) {
                    todo.checked = shouldSet;
                    todo.isInEditMode = shouldSet;
                }
            });
        }

        factory.setCheckedAndEditMode = function (vm, id) {
            checkedAndEditMode(vm, id, true);
        };

        factory.unSetCheckedAndEditMode = function (vm, id) {
            checkedAndEditMode(vm, id, false);
        };

        factory.setFocus = function (id) {
            $timeout(function () {
                var $todoInput = angular.element('div[data-todo-id="' + id + '"]').find('input');
                $todoInput.focus();
            }, 0);
        };

        return factory;

    });