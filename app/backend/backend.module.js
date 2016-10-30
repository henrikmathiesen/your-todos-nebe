/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend', ['ngMockE2E'])
    .run(function ($httpBackend, backEndFactory) {

        var headers = {
            headers: { 'Content-Type': 'application/json' }
        };

        $httpBackend.whenGET('/api/todos')
            .respond(function () {
                var todos = backEndFactory.getTodos();
                return [200, todos, headers];
            });

    });