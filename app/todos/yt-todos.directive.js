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

        var getTodos = function (shouldSetFocusOnAddedId) {
            todosCrudFactory.getTodos()
                .then(function (todos) {
                    vm.todos = todos;
                    todosCheckedFactory.setCheckedAndEditMode(vm);
                    vm.isAllTodosChecked();

                    if (shouldSetFocusOnAddedId) {
                        todosCheckedFactory.setFocus(shouldSetFocusOnAddedId);
                    }
                })
        };

        vm.isAllTodosChecked = function () {
            todosCheckedFactory.isAllTodosChecked(vm);
        };

        vm.checkAllTodos = function (isChecked) {
            todosCheckedFactory.checkAllTodos(vm, isChecked);
        };

        vm.deleteCheckedTodos = function () {
            todosCheckedFactory.deleteCheckedTodos(vm, getTodos);
        };

        vm.addTodo = function () {
            var todo = { id: null, text: "" };

            todosCrudFactory.addTodo(todo)
                .then(function (addedTodo) {
                    getTodos(addedTodo.id);
                });
        };

        getTodos();

    });