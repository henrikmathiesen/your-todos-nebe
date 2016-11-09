/// <reference path="../../typings/index.d.ts" />

describe("api.factory makes ajax call to mocked http backend", function () {

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

    it("should expose a getTodos method that makes an ajax call getting todos from 'backend-less' back end", function () {
        $httpBackend.when('GET', '/api/todos').respond(200, [{ id: 1 }]);

        todosApiFactory.getTodos().then(function (response) {
            expect(response.data.length).toBe(1);
        });
    });

    it("should expose a deleteTodo method that makes an ajax call deleting a todo to 'backend-less' back end", function () {
        $httpBackend.when('DELETE', '/api/todo/' + '1').respond(204);

        todosApiFactory.deleteTodo(1).then(function (response) {
            expect(response.status).toBe(204);
        });
    });

});