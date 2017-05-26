/// <reference path="../../typings/index.d.ts" />

describe("backend.factory supports backend-less module to support CRUD operations", function () {

    // We can not test backend module because it depends on ngMockE2E which is not allowed in unit tests
    // But we can test the factory supporting it. We must however mock a module that creates the factory

    var backendFactory;

    beforeEach(function () {

        angular.module('app', [])
            .factory('backendFactory', function () {
                var factory = {};

                var todosMock = [
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
                        text: "Make sure there are an equal amount of blue berries in each muffin"
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

                var utilsFactoryMock = {
                    getNewId: function (todos) {
                        if (!todosMock.length) {
                            return 1;
                        }

                        var idArray = todosMock.map(function (todo) { return todo.id });

                        var idArraySorted = idArray.sort(function (a, b) { return a - b });

                        return idArraySorted.pop() + 1;
                    },
                    isValidTodo: function (todo, isUpdate) {
                        var nrOfKeys = isUpdate ? 2 : 1;

                        if (!todo || !angular.isObject(todo)) {
                            return false;
                        }

                        if (Object.keys(todo).length !== nrOfKeys) {
                            return false;
                        }

                        if (todo.text == null) {
                            return false;
                        }

                        if (isUpdate) {
                            if (todo.id == null) {
                                return false;
                            }
                        }

                        return true;
                    },
                    isValidNewTodo: function (todo) {
                        return this.isValidTodo(todo, false);
                    },
                    isValidUpdatedTodo: function (todo) {
                        return this.isValidTodo(todo, true);
                    }
                };

                factory.getTodos = function () {
                    return todosMock;
                };

                factory.addTodo = function (todo) {
                    if (!utilsFactoryMock.isValidNewTodo(todo)) {
                        return null;
                    }

                    todo.id = utilsFactoryMock.getNewId();
                    todosMock.push(todo);

                    return todo;
                };

                factory.updateTodo = function (id, todo) {
                    if (!utilsFactoryMock.isValidUpdatedTodo(todo)) {
                        return null;
                    }

                    // id is set again with route parameter. See unit test: "Should ignore id in the PUT body since id should be inmutable"
                    todo.id = parseInt(id);

                    var pos = todosMock.map(function (tdo) { return tdo.id.toString(); }).indexOf(id.toString());

                    if (pos < 0) {
                        return undefined;
                    }

                    todosMock.splice(pos, 1, todo);
                    return todo;
                };

                factory.deleteTodo = function (id) {
                    var match = false;

                    for (var i = 0; i < todosMock.length; i++) {
                        if (todosMock[i].id == id) {
                            match = true;
                            todosMock.splice(i, 1);
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

    describe("Factory should have a method for updating an existing todo", function () {
        var updateTodo = { id: 4, text: "Juggle and succeed" };

        it("Should first verify the pre updated state of the todo", function () {
            var todos = backendFactory.getTodos();
            var pos = todos.map(function (todo) { return todo.id.toString(); }).indexOf(updateTodo.id.toString());

            expect(todos[pos].id).toBe(4, "The id of the test case - A");
            expect(todos[pos].text).toBe("Juggle and fail", "It should have the original text");
            expect(todos.length).toBe(7, "There are 7 todos");
        });

        it("Should find a todo by id, update it and return it", function () {
            var updatedTodo = backendFactory.updateTodo(updateTodo.id, updateTodo);

            expect(updatedTodo).toEqual(updateTodo, "should return the updated todo if match");

            var todos = backendFactory.getTodos();
            var pos = todos.map(function (todo) { return todo.id.toString(); }).indexOf(updateTodo.id.toString());

            expect(todos[pos].id).toBe(4, "The id of the test case - B");
            expect(todos[pos].text).toBe("Juggle and succeed", "It should have the updated text");
        });

        it("should update the existing todo, NOT adding it", function () {
            var todos = backendFactory.getTodos();
            backendFactory.updateTodo(updateTodo.id, updateTodo);
            expect(todos.length).toBe(7, "There are 7 todos");
        });

        describe("Validating an updated todo by returning null or undefined", function () {
            var updateTodoDummy = { id: 8, text: "Does not exist" };

            it("Should return undefined if no match", function () {
                var updatedTodo = backendFactory.updateTodo(updateTodoDummy.id, updateTodoDummy);
                expect(updatedTodo === undefined).toBe(true);
            });

            it("Should return null if not valid", function () {
                var params = { text: "Lorem" };
                var updatedTodo = backendFactory.updateTodo(1, params);

                expect(updatedTodo === null).toBe(true);
            });

            // A valid updated todo

            it("Should return updated todo if valid", function () {
                var updatedTodo = backendFactory.updateTodo(1, updateTodo);
                expect(updatedTodo).toEqual(updateTodo);
            });

            it("Should ignore id in the PUT body since id should be inmutable", function () {
                var updatedTodo = backendFactory.updateTodo(1, { id: 999, text: 'something' });
                expect(updatedTodo.id).toBe(1, "id in PUT body is ignored");
            });

            // Rest of the cases are identical to POST
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

        describe("validating a new todo by returning null if invalid", function () {
            it("should return null since params is null", function () {
                var params = null;
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is not an object, A", function () {
                var params = ['one ', 'two'];
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is not an object, B", function () {
                var params = 'something';
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is an empty object", function () {
                var params = {};
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is an object but have more than one property", function () {
                var params = { text: 'Lorem', id: 99 };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is an object but without a property named text", function () {
                var params = { body: 'Lorem' };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is an object but with a property named text that is undefined", function () {
                var params = { text: undefined };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            it("should return null since params is an object but with a property named text that is null", function () {
                var params = { text: null };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toBe(null);
            });

            // A valid todo

            it("should return the todo if valid, A", function () {
                var params = { text: 'Lorem' };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toEqual(params);
            });

            it("should return the todo if valid, B", function () {
                var params = { text: '' };
                var returnedTodo = backendFactory.addTodo(params);

                expect(returnedTodo).toEqual(params);
            });
        });

    });
});
