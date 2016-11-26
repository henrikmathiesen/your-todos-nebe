/// <reference path="../../typings/index.d.ts" />

describe("backend.factory supports backend-less module to support CRUD operations", function () {

    // We can not test backend module because it depends on ngMockE2E which is not allowed in unit tests
    // But we can test the factory supporting it. We must however mock a module that creates it

    var backendFactory;

    beforeEach(function () {

        angular.module('app', [])
            .factory('backendFactory', function () {
                var factory = {};

                var todos = [
                    {
                        id: 1,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "work",
                        text: "Have skills that are in demand"
                    },
                    {
                        id: 2,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "project",
                        text: "Assemble a tshirt gun"
                    },
                    {
                        id: 3,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "no label",
                        text: "Make sure there are an equal ammount of blue berries in each muffin"
                    },
                    {
                        id: 4,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "joy",
                        text: "Juggle and fail"
                    },
                    {
                        id: 5,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "work",
                        text: "Study Angular"
                    },
                    {
                        id: 6,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "work",
                        text: "Study React"
                    },
                    {
                        id: 7,
                        date: "2010-08-01T15:00:00+02:00",
                        label: "no label",
                        text: "Lorem ipsum dolores"
                    },
                ];

                factory.getTodos = function () {
                    return todos;
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

    it("should have a method for getting todos", function () {
        var todos = backendFactory.getTodos();
        var pos = todos.map(function(todo) { return todo.id.toString(); }).indexOf('5');

        expect(todos.length).toBe(7, "There are 7 todos");
        expect(pos).toBe(4, "todo item Study Angular should be there");
    });

    it("should should have a method for deleting a todo by id and return true so backend module can deliver status code 204", function () {
        var match = backendFactory.deleteTodo(5);
        var todosAfterDelete = backendFactory.getTodos();
        var pos = todosAfterDelete.map(function(todo) { return todo.id.toString(); }).indexOf('5');

        expect(match).toBe(true);
        expect(todosAfterDelete.length).toBe(6, "There are now 6 todos left");
        expect(pos).toBe(-1, "todo item Study Angular should NOT be there");
    });

    it("should should have a method for deleting a todo by id and return false if no match to delete so backend module can deliver status code 404", function () {
        var match = backendFactory.deleteTodo(8);
        var todosAfterDelete = backendFactory.getTodos();

        expect(match).toBe(false);
        expect(todosAfterDelete.length).toBe(7, "There are still 7 todos because no todo deleted");
    });

});
