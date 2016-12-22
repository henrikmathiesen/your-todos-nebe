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

        factory.addTodo = function (vm, todo) {
            todosCrudFactory.addTodo(todo)
                .then(function (addedTodo) {
                    vm.todos.push(addedTodo);
                    factory.setCheckedAndEditMode(vm, addedTodo.id);
                    factory.isAllTodosChecked(vm);
                    factory.setFocus(addedTodo.id);
                });
        };

        factory.updateCheckedTodos = function (vm) {
            var $todoElements = [];
            var updatePromises = [];

            var unSetCheckedTodos = function () {
                var checkedTodos = vm.todos.filter(function (todo) { return todo.checked === true });

                angular.forEach(checkedTodos, function (todo) {
                    factory.unSetCheckedAndEditMode(vm, todo.id);
                });

                factory.isAllTodosChecked(vm);
            };

            var fadeInCheckedTodos = function () {
                angular.forEach($todoElements, function (el) {
                    el.fadeTo(100, 0.1).fadeTo(200, 1.0);
                });

                unSetCheckedTodos();
            };

            angular.forEach(vm.todos, function (todo) {
                if (todo.checked) {
                    $todoElements.push(angular.element('div[data-todo-id=' + todo.id + ']'));
                    updatePromises.push(todosCrudFactory.updateTodo(todo));
                }
            });

            $q.all(updatePromises).then(fadeInCheckedTodos);
        };

        factory.deleteCheckedTodos = function (vm) {
            var $todoElements = [];
            var deletePromises = [];
            var fadePromises = [];

            var removeCheckedTodos = function () {
                vm.todos = vm.todos.filter(function (todo) { return todo.checked !== true; });
                factory.isAllTodosChecked(vm);
            };

            var fadeOutCheckedTodos = function () {
                angular.forEach($todoElements, function (el) {
                    fadePromises.push(el.fadeOut().promise());
                });

                $q.all(fadePromises).then(removeCheckedTodos);
            };

            angular.forEach(vm.todos, function (todo) {
                if (todo.checked) {
                    $todoElements.push(angular.element('div[data-todo-id=' + todo.id + ']'));
                    deletePromises.push(todosCrudFactory.deleteTodo(todo.id));
                }
            });

            $q.all(deletePromises).then(fadeOutCheckedTodos);
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