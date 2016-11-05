/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend', ['ngMockE2E'])
    .run(function ($httpBackend, backendFactory) {

        var headers = {
            headers: { 'Content-Type': 'application/json' }
        };

        $httpBackend.whenGET('/api/todos')
            .respond(function () {
                var todos = backendFactory.getTodos();
                return [200, todos, headers];
            });

        $httpBackend.whenDELETE(/\/api\/todo\/\d+/)
            .respond(function (method, url, data) {
                var id = url.split('/')[3];
                var hasDeletedMatchedId = backendFactory.deleteTodo(id);
                var statusCode = hasDeletedMatchedId ? 204 : 404;

                return [statusCode, {}, {}];
            });

    });