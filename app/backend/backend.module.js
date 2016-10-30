/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend', ['ngMockE2E'])
    .run(function ($httpBackend, backEndFactory) {

        $httpBackend.whenGet('/api/todos')
            .respond(function (method, url, data) {
                var todos = backEndFactory.getTodos();
                return [200, todos, {}];
            });

    });