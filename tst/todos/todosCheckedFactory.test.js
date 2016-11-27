/// <reference path="../../typings/index.d.ts" />

describe("todosChecked.factory keeps track of checked todos and can delete them by forward calls to todosCrud.factory", function () {

    var $q;
    var todosCheckedFactory;
    var todosCrudFactory;
    var todos;
    var vm;

    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$q_, _todosCheckedFactory_, _todosCrudFactory_) {
        $q = _$q_;
        todosCheckedFactory = _todosCheckedFactory_;
        todosCrudFactory = _todosCrudFactory_;

        todos = [
            {
                id: 1,
                text: "Have skills that are in demand"
            },
            {
                id: 2,
                text: "Assemble a tshirt gun"
            },
            {
                id: 3,
                text: "Make sure there are an equal ammount of blue berries in each muffin"
            }
        ]

        vm = {
            todos: [],
            allTodosChecked: null,
            noTodosChecked: null
        }
    }));

    describe("there should be a function for checking if all or none todos are checked", function () {

        it("should set allTodosChecked to false and noTodosChecked to true if todos collection is empty", function () {
            todosCheckedFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

        it("should set allTodosChecked to false and noTodosChecked to true if no todos are checked", function () {
            vm.todos = todos;
            vm.todos.map(function (todo) { todo.checked = false; });

            todosCheckedFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

        it("should set allTodosChecked to true and noTodosChecked to false if all todos are checked", function () {
            vm.todos = todos;
            vm.todos.map(function (todo) { todo.checked = true; });

            todosCheckedFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
        });

        it("should set allTodosChecked to false and noTodosChecked to false if some todos are checked", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = false;

            todosCheckedFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(false);
        });

    });

    describe("there should be a function for checking and unchecking all todos, that function then checks if all todos are checked", function () {

        it("should be able to set set all todos checked to true", function () {
            vm.todos = todos;

            todosCheckedFactory.checkAllTodos(vm, true);

            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
        });

        it("should be able to set set all todos checked to false", function () {
            vm.todos = todos;

            todosCheckedFactory.checkAllTodos(vm, false);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

    });

});