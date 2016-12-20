/// <reference path="../../typings/index.d.ts" />

describe("todosApi.factory makes ajax call to mocked http backend", function () {

    var $httpBackend;
    var todosApiFactory;

    beforeEach(module('todos'));

    beforeEach(inject(function (_$httpBackend_, _todosApiFactory_) {
        $httpBackend = _$httpBackend_;
        todosApiFactory = _todosApiFactory_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    it("Should expose a getTodos method that makes an ajax call getting todos from 'backend-less' back end", function () {
        var returnedTodos = [{ id: 1, text: "Lorem ipsum" }];

        $httpBackend.when('GET', '/api/todos').respond(200, returnedTodos);

        todosApiFactory.getTodos().then(function (response) {
            expect(response.status).toBe(200);
            expect(response.data.length).toBe(1);
        });
    });

    it("Should expose an addTodo method that makes an ajax call posting a todo to 'backend-less' back end", function () {
        var todo = { id: null, text: "" };
        var returnedTodo = { id: 2, text: "" };

        $httpBackend.when('POST', '/api/todo').respond(201, returnedTodo);

        todosApiFactory.addTodo(todo).then(function (response) {
            expect(response.status).toBe(201);
            expect(response.data).toEqual(returnedTodo);
        });
    });

    it("Should expose a deleteTodo method that makes an ajax call deleting a todo to 'backend-less' back end", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '1').respond(204);

        todosApiFactory.deleteTodo(1).then(function (response) {
            expect(response.status).toBe(204);
        });
    });

    it("Should expose a deleteTodo method that makes an ajax call deleting a todo and can respond with 404 if no todo is found", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '8').respond(404);

        todosApiFactory.deleteTodo(8).then(function (response) {
            expect(response.status).toBe(404);
        });
    });

});