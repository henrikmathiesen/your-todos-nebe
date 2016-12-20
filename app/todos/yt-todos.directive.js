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
    .controller('ytTodosController', function (todosCrudFactory, todosEffectFactory) {
        var vm = this;
        vm.todos = [];
        vm.allTodosChecked = false;
        vm.noTodosChecked = true;

        var getTodos = function () {
            todosCrudFactory.getTodos()
                .then(function (todos) {
                    vm.todos = todos;
                    todosEffectFactory.isAllTodosChecked(vm);
                });
        };

        vm.isAllTodosChecked = function () {
            todosEffectFactory.isAllTodosChecked(vm);
        };

        vm.checkAllTodos = function (isChecked) {
            todosEffectFactory.checkAllTodos(vm, isChecked);
        };

        vm.deleteCheckedTodos = function () {
            todosEffectFactory.deleteCheckedTodos(vm, getTodos);
        };

        vm.addTodo = function () {
            var todo = { id: null, text: "" };

            todosCrudFactory.addTodo(todo)
                .then(function (addedTodo) {
                    vm.todos.push(addedTodo);
                    todosEffectFactory.setCheckedAndEditMode(vm, addedTodo.id);
                    todosEffectFactory.isAllTodosChecked(vm);
                    todosEffectFactory.setFocus(addedTodo.id);
                });
        };

        getTodos();

    });