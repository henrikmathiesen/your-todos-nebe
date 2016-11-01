/// <reference path="../../typings/index.d.ts" />

describe("api.factory.test", function () {

    var $httpBackend;
    var apiFactory;

    beforeEach(module('todos'));

    beforeEach(inject(function (_$httpBackend_, _apiFactory_) {
        $httpBackend = _$httpBackend_;
        apiFactory = _apiFactory_;
    }));

    afterEach(function () {
        $httpBackend.flush();
    });

    it("should expose a getTodos method that makes an ajax call getting todos from 'backend-less' back end", function () {
        $httpBackend.when('GET', '/api/todos').respond(200, [{ id: 1 }]);

        apiFactory.getTodos().then(function (response) {
            expect(response.data.length).toBe(1);
        });
    });

});