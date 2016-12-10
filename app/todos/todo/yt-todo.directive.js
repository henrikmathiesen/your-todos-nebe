/// <reference path="../../../typings/index.d.ts" />

angular
    .module('todos')
    .directive('ytTodo', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'todos/todo/yt-todo.template.html',
            replace: true,
            controller: 'ytTodoController as subVm',
            bindToController: {
                todo: '=',
                isAllTodosChecked: '&'
            }
        }
    })
    .controller('ytTodoController', function () {
        var subVm = this;

        subVm.checkTodo = function (isChecked) {
            subVm.todo.checked = isChecked;
            subVm.todo.isInEditMode = isChecked;
            subVm.isAllTodosChecked();
        }

    });