/// <reference path="../../typings/index.d.ts" />

describe("TodosEffect.factory keeps track of checked todos, applies effect and calls todosCrud.factory for crud operations.", function () {

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

            expect(vm.todos[0].checked).toBe(true);
            expect(vm.todos[1].checked).toBe(true);
            expect(vm.todos[2].checked).toBe(true);

            // has called factory.isAllTodosChecked(vm);
            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
        });

        it("Should be able to set set all todos checked to false", function () {
            vm.todos = todos;

            todosEffectFactory.checkAllTodos(vm, false);

            expect(vm.todos[0].checked).toBe(false);
            expect(vm.todos[1].checked).toBe(false);
            expect(vm.todos[2].checked).toBe(false);

            // has called factory.isAllTodosChecked(vm);
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

    describe("There should be a function for adding a new todo", function () {
        var newTodo = { id: null, text: "" };
        var addedTodo = { id: 4, text: "" };

        beforeEach(function () {
            spyOn(todosCrudFactory, 'addTodo').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(addedTodo);
                return deferred.promise;
            });
            spyOn(todosEffectFactory, 'setCheckedAndEditMode');
            spyOn(todosEffectFactory, 'isAllTodosChecked');
            spyOn(todosEffectFactory, 'setFocus');
        });

        it("Should forward the call to todosCrudFactory", function () {
            todosEffectFactory.addTodo(vm, newTodo);
            expect(todosCrudFactory.addTodo).toHaveBeenCalledWith(newTodo);
        });

        it("Should add the new todo to the vm", function () { 
            vm.todos = todos;
            todosEffectFactory.addTodo(vm, newTodo);
            $scope.$digest();
            expect(vm.todos.length).toBe(4);
        });

        it("Should set the new todo as checked and in edit mode", function () {
            todosEffectFactory.addTodo(vm, newTodo);
            $scope.$digest();
            expect(todosEffectFactory.setCheckedAndEditMode).toHaveBeenCalledWith(vm, addedTodo.id);
        });

        it("Should keep track of if all todos is checked", function () {
            todosEffectFactory.addTodo(vm, addedTodo);
            $scope.$digest();
            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalledWith(vm);
        });

        it("Should set focus on new todo", function () {
            todosEffectFactory.addTodo(vm, addedTodo);
            $scope.$digest();
            expect(todosEffectFactory.setFocus).toHaveBeenCalledWith(addedTodo.id);
        });
    });

    describe("There should be a function for updating checked todos, by calling todosCrudFactory, then fades them in", function () {
        it("Should update checked todos, unset checked and edit mode and then fade them in", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = true;

            spyOn(todosEffectFactory, 'unSetCheckedAndEditMode');
            spyOn(angular, 'forEach').and.callThrough();
            spyOn(todosEffectFactory, 'isAllTodosChecked');

            spyOn(todosCrudFactory, 'updateTodo').and.callFake(function () {
                // return $q.defer().promise; - since $q.all(promises).then() runs when all promises are resolved, we can not return $q.defer().promise
                // We need to return a resolved promise and then $scope.$digest() to test the next action
                // I think $q.when({}) will return a resolved promise as well, so it like short hand version of the bellow

                var deferred = $q.defer();
                deferred.resolve("200");
                return deferred.promise;
            });

            todosEffectFactory.updateCheckedTodos(vm);
            $scope.$digest();

            // - loop through todos and act on the ones that are checked
            // - loop through checked todos elements and fade them in
            // - loop through checked todos and unset checked and edit mode, also call isAllTodosChecked
            expect(angular.forEach).toHaveBeenCalledTimes(3);

            expect(todosCrudFactory.updateTodo).toHaveBeenCalledTimes(2, "id 2 and id 3 is sent for update with 2 calls to crudFactory");

            expect(todosEffectFactory.unSetCheckedAndEditMode).toHaveBeenCalledTimes(2);
            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalledTimes(1);
        });
    });

    describe("There should be a function for deleting checked todos, by calling todosCrudFactory, then fades them out.", function () {

        it("Should delete checked todos and fade out them", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = true;

            spyOn(angular, 'forEach').and.callThrough();
            spyOn(todosEffectFactory, 'isAllTodosChecked');
            spyOn(todosCrudFactory, 'deleteTodo').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve("204");
                return deferred.promise;
            });

            // I tried this, but cant mock the actual elements
            // spyOn($.fn, 'fadeOut').and.callFake(function () {
            //     return $q.defer().promise;
            // });

            todosEffectFactory.deleteCheckedTodos(vm);
            $scope.$apply();

            // - loop through todos and act on the ones that are checked
            // - loop through checked todos elements and fade them out
            expect(angular.forEach).toHaveBeenCalledTimes(2);

            expect(todosCrudFactory.deleteTodo).toHaveBeenCalledTimes(2, "id 2 and id 3 is sent for deletion with 2 calls to crudFactory");

            // Can not test all the way through, sorry, can not get past running fadeOut promises because can not get the elements
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