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
    .controller('ytTodoController', function ($timeout) {
        var subVm = this;

        var setFocus = function () {
            $timeout(function () {
                var $todoInput = angular.element('div[data-todo-id="' + subVm.todo.id + '"]').find('input');
                $todoInput.focus();
            }, 0);
        };

        subVm.checkTodo = function (isChecked) {
            subVm.todo.checked = isChecked;
            subVm.todo.isInEditMode = isChecked;
            subVm.isAllTodosChecked();
            setFocus();
        }

    });