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

        $httpBackend.whenPOST('/api/todo')
            .respond(function (method, url, data) {
                var params = angular.fromJson(data);
                var todo = backendFactory.addTodo(params);

                if(!todo) {
                    return [500, {}, {}];
                }

                return [201, todo, headers];
            });

        $httpBackend.whenPUT(/\/api\/todo\/\d+/)
            .respond(function (method, url, data) {
                var id = url.split('/')[3];
                var params = angular.fromJson(data);
                var todo = backendFactory.updateTodo(id, params);

                if(todo === null) {
                    return [500, {}, {}];
                }

                if(todo === undefined) {
                    return [404, {}, {}];
                }

                return [200, todo, headers];
            });

        $httpBackend.whenDELETE(/\/api\/todo\/\d+/)
            .respond(function (method, url) {
                var id = url.split('/')[3];
                var hasDeletedMatchedId = backendFactory.deleteTodo(id);
                var statusCode = hasDeletedMatchedId ? 204 : 404;

                return [statusCode, {}, {}];
            });


    });
