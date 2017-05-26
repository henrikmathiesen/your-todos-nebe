/// <reference path="../../../typings/index.d.ts" />

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
        var todo = { text: "" };
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

    it("Should expose an addTodo method that makes an ajax call posting a todo and can respond with 500 if not valid", function () {
        var todoDummy = {};
        var returnedTodo = null;

        $httpBackend.when('POST', '/api/todo').respond(500, returnedTodo);

        var serverResponse;
        var serverResponseError;

        todosApiFactory.addTodo(todoDummy)
            .then(function (response) { 
                serverResponse = response;
            })
            .catch(function (response) { 
                serverResponseError = response;
            });

        $httpBackend.flush();

        expect(serverResponse).toBe(undefined);
        expect(serverResponseError.status).toBe(500);
        expect(serverResponseError.data).toBe(null);
    });

    it("Should expose an updateTodo method that makes an ajax call putting a todo to 'backend-less' back end", function () {
        var updateTodo = { id: 4, text: "Juggle and succeed" };
        var returnedTodo = { id: 4, text: "Juggle and succeed" };

        $httpBackend.when('PUT', '/api/todo/' + updateTodo.id).respond(200, returnedTodo);

        var serverResponse;

        todosApiFactory.updateTodo(updateTodo).then(function (response) {
            serverResponse = response;
        });

        $httpBackend.flush();

        expect(serverResponse.status).toBe(200);
        expect(serverResponse.data).toEqual(returnedTodo);
    });

    it("Should expose an updateTodo method that makes an ajax call putting a todo and can respond with 404 if no todo by id to update is found", function () {
        var updateTodoDummy = { id: 8, text: "Does not exist" };
        var returnedTodo = null;

        var serverResponse;
        var serverResponseError;
        
        $httpBackend.when('PUT', '/api/todo/' + updateTodoDummy.id).respond(404, returnedTodo);

        todosApiFactory.updateTodo(updateTodoDummy)
            .then(function (response) { 
                serverResponse = response;
            })
            .catch(function (response) { 
                serverResponseError = response;
            });

        $httpBackend.flush();

        expect(serverResponse).toBe(undefined);
        expect(serverResponseError.status).toBe(404);
        expect(serverResponseError.data).toBe(null);
    });

    it("Should expose an updateTodo method that makes an ajax call putting a todo and can respond with 500 if not valid", function () {
        var updateTodoDummy = { text: "not a valid object" };
        var returnedTodo = null;

        var serverResponse;
        var serverResponseError;
        
        $httpBackend.when('PUT', '/api/todo/' + updateTodoDummy.id).respond(500, returnedTodo);

        todosApiFactory.updateTodo(updateTodoDummy)
            .then(function (response) { 
                serverResponse = response;
            })
            .catch(function (response) { 
                serverResponseError = response;
            });

        $httpBackend.flush();

        expect(serverResponse).toBe(undefined);
        expect(serverResponseError.status).toBe(500);
        expect(serverResponseError.data).toBe(null);
    });

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

    it("Should expose a deleteTodo method that makes an ajax call deleting a todo and can respond with 404 if no todo by id is found", function () {
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
