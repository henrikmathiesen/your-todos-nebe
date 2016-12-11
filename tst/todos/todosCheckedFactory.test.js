/// <reference path="../../typings/index.d.ts" />

describe("TodosChecked.factory keeps track of checked todos and can delete them by forward calls to todosCrud.factory.", function () {

    var $q;
    var $scope;
    var todosCheckedFactory;
    var todosCrudFactory;
    var todos;
    var vm;

    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$q_, _$rootScope_, _todosCheckedFactory_, _todosCrudFactory_) {
        $q = _$q_;
        $scope = _$rootScope_;
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

    describe("There should be a function for checking if all or none todos are checked.", function () {

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

    describe("There should be a function for checking and unchecking all todos, also sets them in edit mode, that function then checks if all todos are checked.", function () {

        it("should be able to set all todos checked to true, also sets all in edit mode", function () {
            vm.todos = todos;

            todosCheckedFactory.checkAllTodos(vm, true);

            expect(vm.allTodosChecked).toBe(true);
            expect(vm.noTodosChecked).toBe(false);
            expect(vm.todos[0].isInEditMode).toBe(true);
            expect(vm.todos[1].isInEditMode).toBe(true);
            expect(vm.todos[2].isInEditMode).toBe(true);
        });

        it("should be able to set set all todos checked to false, also sets all not in edit mode", function () {
            vm.todos = todos;

            todosCheckedFactory.checkAllTodos(vm, false);

            expect(vm.allTodosChecked).toBe(false);
            expect(vm.noTodosChecked).toBe(true);
            expect(vm.todos[0].isInEditMode).toBe(false);
            expect(vm.todos[1].isInEditMode).toBe(false);
            expect(vm.todos[2].isInEditMode).toBe(false);
        });

    });

    describe("There should be a function for deleting checked todos, by calling todosCrudFactory, then fades them out and call getTodos callback.", function () {

        it("should delete checked todos, fade out them and then call reload callback", function () { 
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = true;
            var obj = { reload: function () { return true; } };
            
            spyOn(obj, 'reload');
            spyOn(angular, 'forEach');
            spyOn(todosCrudFactory, 'deleteTodo').and.callFake(function(){
                // return $q.defer().promise; - since $q.all(promises).then() runs when all promises are resolved, we can not return $q.defer().promise
                // We need to return a resolved promise and then $scope.$digest() to test the next action

                var deferred = $q.defer();
                deferred.resolve("204");
                return deferred.promise;
            });

            todosCheckedFactory.deleteCheckedTodos(vm, obj.reload);

            expect(todosCrudFactory.deleteTodo).toHaveBeenCalledTimes(2, "id 2 and id 3 is sent for deletion with 2 calls to crudFactory");
            
            $scope.$digest();
            expect(angular.forEach).toHaveBeenCalled(); // fades out element
            expect(obj.reload).toHaveBeenCalled();
        });

        it("should not enter q.all():s then() callback that fades out todos and reloads todos, if deletion gives ajax error", function () {
            vm.todos = todos;
            vm.todos[0].checked = false;
            vm.todos[1].checked = true;
            vm.todos[2].checked = false;
            var obj = { reload: function () { return true; } };
            
            spyOn(obj, 'reload');
            spyOn(angular, 'forEach');
            spyOn(todosCrudFactory, 'deleteTodo').and.returnValue($q.reject());         // $q.reject() Returns a promise that was already resolved as rejected with the reason

            todosCheckedFactory.deleteCheckedTodos(vm, obj.reload);

            expect(todosCrudFactory.deleteTodo).toHaveBeenCalled();                     // "id 2 is sent for deletion with call to crudFactory but there is an ajax error"
                                                                                        // problem testing toHaveBeenCalledWith , with call in a loop
            $scope.$digest();
            expect(angular.forEach).not.toHaveBeenCalled();
            expect(obj.reload).not.toHaveBeenCalled();
        });

    });

});