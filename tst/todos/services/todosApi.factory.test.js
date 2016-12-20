/// <reference path="../../typings/index.d.ts" />

describe("todosApi.factory makes ajax call to mocked http backend", function () {

    var $httpBackend;
    var todosApiFactory;

    beforeEach(module('todos'));

    beforeEach(inject(function (_$httpBackend_, _todosApiFactory_) {
        $httpBackend = _$httpBackend_;
        todosApiFactory = _todosApiFactory_;
    }));

    it("Should expose a getTodos method that makes an ajax call getting todos from 'backend-less' back end", function () {
        var returnedTodos = [{ id: 1, text: "Lorem ipsum" }];

        $httpBackend.when('GET', '/api/todos').respond(200, returnedTodos);

        var serverResponse;

        todosApiFactory.getTodos().then(function (response) {
            serverResponse = response;
        });

        $httpBackend.flush();

        expect(serverResponse.status).toBe(200);
        expect(serverResponse.data.length).toBe(1);
    });

    it("Should expose an addTodo method that makes an ajax call posting a todo to 'backend-less' back end", function () {
        var todo = { id: null, text: "" };
        var returnedTodo = { id: 2, text: "" };

        $httpBackend.when('POST', '/api/todo').respond(201, returnedTodo);

        var serverResponse;

        todosApiFactory.addTodo(todo).then(function (response) {
            serverResponse = response;
        });

        $httpBackend.flush();

        expect(serverResponse.status).toBe(201);
        expect(serverResponse.data).toEqual(returnedTodo);
    });

    // // update todo test

    it("Should expose a deleteTodo method that makes an ajax call deleting a todo to 'backend-less' back end", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '1').respond(204);

        var serverResponse;
        var serverResponseError;

        todosApiFactory.deleteTodo(1)
            .then(function (response) {
                serverResponse = response;
            })
            .catch(function (response) {
                serverResponseError = response;
            });

        $httpBackend.flush();

        expect(serverResponse.status).toBe(204);
        expect(serverResponseError).toBe(undefined);
    });

    it("Should expose a deleteTodo method that makes an ajax call deleting a todo and can respond with 404 if no todo is found", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '8').respond(404);

        var serverResponse;
        var serverResponseError;

        todosApiFactory.deleteTodo(8)
            .then(function (response) {
                serverResponse = response;
            })
            .catch(function (response) {
                serverResponseError = response;
            });

        $httpBackend.flush();

        expect(serverResponse).toBe(undefined);
        expect(serverResponseError.status).toBe(404);
    });
});