/// <reference path="../../typings/index.d.ts" />

describe("backend.factory supports backend-less module to support CRUD operations", function () {

    // We can not test backend module because it depends on ngMockE2E which is not allowed in unit tests
    // But we can test the factory supporting it. We must however mock a module that creates the factory

    var backendFactory;

    beforeEach(function () {

        angular.module('app', [])
            .factory('backendFactory', function () {
                var factory = {};

                var todos = [
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
                    },
                    {
                        id: 4,
                        text: "Juggle and fail"
                    },
                    {
                        id: 5,
                        text: "Study Angular"
                    },
                    {
                        id: 6,
                        text: "Study React"
                    },
                    {
                        id: 7,
                        text: "Lorem ipsum dolores"
                    }
                ];

                var getNewId = function () {
                    if (!todos.length) {
                        return 1;
                    }

                    var idArray = todos.map(function (todo) { return todo.id });

                    var idArraySorted = idArray.sort(function (a, b) { return a - b });

                    return idArraySorted.pop() + 1;
                };

                factory.getTodos = function () {
                    return todos;
                };

                factory.addTodo = function (todo) {
                    todo.id = getNewId();
                    todos.push(todo);

                    return todo;
                };

                factory.updateTodo = function (todo) {
                    var pos = todos.map(function (tdo) { return tdo.id.toString(); }).indexOf(todo.id.toString());

                    todos.splice(pos, 0, todo);

                    if (pos > -1) {
                        return todo;
                    }
                    else {
                        return null;
                    }
                };

                factory.deleteTodo = function (id) {
                    var match = false;

                    for (var i = 0; i < todos.length; i++) {
                        if (todos[i].id == id) {
                            match = true;
                            todos.splice(i, 1);
                            break;
                        }
                    }

                    return match;
                };


                return factory;
            });

        module('app');
    });

    beforeEach(inject(function (_backendFactory_) {
        backendFactory = _backendFactory_;
    }));

    it("Should have a method for getting todos", function () {
        var todos = backendFactory.getTodos();
        var pos = todos.map(function (todo) { return todo.id.toString(); }).indexOf('5');

        expect(todos.length).toBe(7, "There are 7 todos");
        expect(pos).toBe(4, "todo item Study Angular should be there");
    });

    it("Should have a method for deleting a todo by id and return true so backend module can deliver status code 204", function () {
        var match = backendFactory.deleteTodo(5);
        var todosAfterDelete = backendFactory.getTodos();
        var pos = todosAfterDelete.map(function (todo) { return todo.id.toString(); }).indexOf('5');

        expect(match).toBe(true);
        expect(todosAfterDelete.length).toBe(6, "There are now 6 todos left");
        expect(pos).toBe(-1, "todo item Study Angular should NOT be there");
    });

    it("Should have a method for deleting a todo by id and return false if no match to delete, so backend module can deliver status code 404", function () {
        var match = backendFactory.deleteTodo(8);
        var todosAfterDelete = backendFactory.getTodos();

        expect(match).toBe(false);
        expect(todosAfterDelete.length).toBe(7, "There are still 7 todos because no todo deleted");
    });

    it("Should be able to delete several todos", function () {
        backendFactory.deleteTodo(1);
        backendFactory.deleteTodo(2);
        backendFactory.deleteTodo(3);
        backendFactory.deleteTodo(4);

        var todosAfterDelete = backendFactory.getTodos();
        expect(todosAfterDelete.length).toBe(3);
    });

    describe("Factory should have a method for updating an existing todo and return null if no match to update, so backend module can deliver status code 404", function () {
        var updateTodo = { id: 4, text: "Juggle and succeed" };
        var updateTodoDummy = { id: 8, text: "Does not exist" };


        it("Should first verify the pre updated state of the todo", function () {
            var todos = backendFactory.getTodos();
            var pos = todos.map(function (todo) { return todo.id.toString(); }).indexOf(updateTodo.id.toString());

            expect(todos[pos].id).toBe(4, "The id of the test case - A");
            expect(todos[pos].text).toBe("Juggle and fail", "It should have the original text");
        });

        it("Should find a todo by id, update it and return it", function () {
            var updatedTodo = backendFactory.updateTodo(updateTodo);

            expect(updatedTodo).toEqual(updateTodo, "should return the updated todo if match");

            var todos = backendFactory.getTodos();
            var pos = todos.map(function (todo) { return todo.id.toString(); }).indexOf(updateTodo.id.toString());

            expect(todos[pos].id).toBe(4, "The id of the test case - B");
            expect(todos[pos].text).toBe("Juggle and succeed", "It should have the updated text");
        });

        it("Should return null if no match", function () {
            var updatedTodo = backendFactory.updateTodo(updateTodoDummy);

            expect(updatedTodo).toBe(null, "should return null if no match");
        });

    });

    describe("Factory should have a method for adding a new todo that also gives the todo an id (that is bigger than any existing todo id), and returns the todo", function () {

        it("Should start out with 7 todos", function () {
            var todos = backendFactory.getTodos();
            expect(todos.length).toBe(7);
        });

        it("Should add the todo and return the added todo with an id higher than any existing todos", function () {
            var params = { text: "My new todo" };
            var returnedTodo = backendFactory.addTodo(params);
            var todos = backendFactory.getTodos();

            expect(todos.length).toBe(8);
            expect(returnedTodo.text).toBe("My new todo");
            expect(returnedTodo.id).toBe(8);
        });

        it("Should return an id of 1 if no existing todos", function () {
            var todos = backendFactory.getTodos();
            var todosId = todos.map(function (todo) { return todo.id });

            todosId.forEach(function (id) {
                backendFactory.deleteTodo(id);
            });

            var params = { text: "My new todo" };
            var returnedTodo = backendFactory.addTodo(params);

            expect(todos.length).toBe(1);
            expect(returnedTodo.id).toBe(1);
        });

        it("Should return an id higher than highest id, sample 1", function () {
            backendFactory.deleteTodo(7);
            backendFactory.deleteTodo(6);
            backendFactory.deleteTodo(4);

            var params = { text: "My new todo" };
            var returnedTodo = backendFactory.addTodo(params);

            expect(returnedTodo.id).toBe(6);
        });

        it("Should return an id higher than highest id, sample 2", function () {
            backendFactory.deleteTodo(1);
            backendFactory.deleteTodo(2);
            backendFactory.deleteTodo(7);

            var params = { text: "My new todo" };
            var returnedTodo = backendFactory.addTodo(params);

            expect(returnedTodo.id).toBe(7);
        });

    });
});
