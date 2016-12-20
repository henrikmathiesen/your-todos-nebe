/// <reference path="../../typings/index.d.ts" />

describe("TodosEffect.factory keeps track of checked todos and can delete them by forward calls to todosCrud.factory.", function () {

    var $q;
    var $scope;
    var todosEffectFactory;
    var todosCrudFactory;
    var todos;
    var vm;

    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$q_, _$rootScope_, _todosEffectFactory_, _todosCrudFactory_) {
        $q = _$q_;
        $scope = _$rootScope_;
        todosEffectFactory = _todosEffectFactory_;
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

    describe("There should be a function for checking if all or none todos are checked.", function () {

        it("Should set allTodosChecked to false and noTodosChecked to true if todos collection is empty", function () {
            todosEffectFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

        it("Should set allTodosChecked to false and noTodosChecked to true if no todos are checked", function () {
            vm.todos = todos;
            vm.todos.map(function (todo) { todo.checked = false; });

            todosEffectFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

        it("Should set allTodosChecked to true and noTodosChecked to false if all todos are checked", function () {
            vm.todos = todos;
            vm.todos.map(function (todo) { todo.checked = true; });

            todosEffectFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
        });

        it("Should set allTodosChecked to false and noTodosChecked to false if some todos are checked", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = false;

            todosEffectFactory.isAllTodosChecked(vm);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(false);
        });

    });

    describe("There should be a function for checking and unchecking all todos, also sets them in edit mode, that function then checks if all todos are checked.", function () {

        it("Should be able to set all todos checked to true", function () {
            vm.todos = todos;

            todosEffectFactory.checkAllTodos(vm, true);

            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
        });

        it("Should be able to set set all todos checked to false", function () {
            vm.todos = todos;

            todosEffectFactory.checkAllTodos(vm, false);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
        });

        it("Should also set isInEditMode true for all", function () {
            vm.todos = todos;

            todosEffectFactory.checkAllTodos(vm, true);

            expect(vm.todos[0].isInEditMode).toBe(true);
            expect(vm.todos[1].isInEditMode).toBe(true);
            expect(vm.todos[2].isInEditMode).toBe(true);
        });

        it("Should also set isInEditMode false for all", function () {
            vm.todos = todos;

            todosEffectFactory.checkAllTodos(vm, false);

            expect(vm.todos[0].isInEditMode).toBe(false);
            expect(vm.todos[1].isInEditMode).toBe(false);
            expect(vm.todos[2].isInEditMode).toBe(false);
        });

    });

    describe("There should be a function for updating checked todos, by calling todosCrudFactory, then fades them in", function () {
        it("Should update checked todos, unset checked and edit mode and then fade them in", function () { 
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = true;

            spyOn(todosEffectFactory, 'unSetCheckedAndEditMode');
            spyOn(angular, 'forEach');
            spyOn(todosEffectFactory, 'isAllTodosChecked');

            spyOn(todosCrudFactory, 'updateTodo').and.callFake(function () {
                // return $q.defer().promise; - since $q.all(promises).then() runs when all promises are resolved, we can not return $q.defer().promise
                // We need to return a resolved promise and then $scope.$digest() to test the next action

                var deferred = $q.defer();
                deferred.resolve("200");
                return deferred.promise;
            });

            todosEffectFactory.updateCheckedTodos(vm);

            expect(todosCrudFactory.updateTodo).toHaveBeenCalledTimes(2, "id 2 and id 3 is sent for update with 2 calls to crudFactory");
            expect(todosEffectFactory.unSetCheckedAndEditMode).toHaveBeenCalledTimes(2, "id 2 and id 3 is unchecked and unset from edit mode");

            $scope.$digest();
            expect(angular.forEach).toHaveBeenCalled(); // fades out element
            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalled();
        });
    });

    describe("There should be a function for deleting checked todos, by calling todosCrudFactory, then fades them out and call getTodos callback.", function () {

        it("Should delete checked todos, fade out them and then call reload callback", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = true;
            var obj = { reload: function () { return true; } };

            spyOn(obj, 'reload');
            spyOn(angular, 'forEach');
            spyOn(todosCrudFactory, 'deleteTodo').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve("204");
                return deferred.promise;
            });

            todosEffectFactory.deleteCheckedTodos(vm, obj.reload);

            expect(todosCrudFactory.deleteTodo).toHaveBeenCalledTimes(2, "id 2 and id 3 is sent for deletion with 2 calls to crudFactory");

            $scope.$digest();
            expect(angular.forEach).toHaveBeenCalled(); // fades out element
            expect(obj.reload).toHaveBeenCalled();
        });

        it("Should not enter q.all():s then() callback that fades out todos and reloads todos, if deletion gives ajax error", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = false;
            var obj = { reload: function () { return true; } };

            spyOn(obj, 'reload');
            spyOn(angular, 'forEach');
            spyOn(todosCrudFactory, 'deleteTodo').and.returnValue($q.reject());         // $q.reject() Returns a promise that was already resolved as rejected with the reason

            todosEffectFactory.deleteCheckedTodos(vm, obj.reload);

            expect(todosCrudFactory.deleteTodo).toHaveBeenCalled();                     // "id 2 is sent for deletion with call to crudFactory but there is an ajax error"
            // problem testing toHaveBeenCalledWith , with call in a loop
            $scope.$digest();
            expect(angular.forEach).not.toHaveBeenCalled();
            expect(obj.reload).not.toHaveBeenCalled();
        });

    });

    describe("There should be a function for setting a todo as checked and in edit mode, and a function for unset it", function () {
        it("Should find a todo by id and set the properties", function () {
            vm.todos = todos;
            vm.todos[1].checked = false;
            vm.todos[1].isInEditMode = false;

            todosEffectFactory.setCheckedAndEditMode(vm, 2);

            expect(vm.todos[1].checked).toBe(true);
            expect(vm.todos[1].isInEditMode).toBe(true);
        });

        it("Should find a todo by id and unset the properties", function () {
            vm.todos = todos;
            vm.todos[1].checked = true;
            vm.todos[1].isInEditMode = true;

            todosEffectFactory.unSetCheckedAndEditMode(vm, 2);

            expect(vm.todos[1].checked).toBe(false);
            expect(vm.todos[1].isInEditMode).toBe(false);
        });
    });

    describe("Other effects", function () {
        it("Should have a function for setting focus on a todo", function () {
            expect(todosEffectFactory.setFocus).toBeDefined();
        });
    });

});