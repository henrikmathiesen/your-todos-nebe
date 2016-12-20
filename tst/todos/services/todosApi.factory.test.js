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
        $httpBackend.when('GET', '/api/todos').respond(200, [{ id: 1 }]);

        todosApiFactory.getTodos().then(function (response) {
            expect(response.data.length).toBe(1);
        });
    });

    it("", function () { 

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