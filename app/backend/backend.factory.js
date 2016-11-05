/// <reference path="../../typings/index.d.ts" />

angular
    .module('backend')
    .factory('backendFactory', function () {

        var factory = {};

        var todos = [
            {
                id: 1,
                date: "2010-08-01T15:00:00+02:00",
                label: "work",
                text: "Have skills that are in demand"
            },
            {
                id: 2,
                date: "2010-08-01T15:00:00+02:00",
                label: "project",
                text: "Assemble a tshirt gun"
            },
            {
                id: 3,
                date: "2010-08-01T15:00:00+02:00",
                label: "project",
                text: "Make sure there are an equal ammount of blue berries in each muffin"
            },
            {
                id: 4,
                date: "2010-08-01T15:00:00+02:00",
                label: "joy",
                text: "Juggle and fail"
            },
            {
                id: 5,
                date: "2010-08-01T15:00:00+02:00",
                label: "work",
                text: "Study Angular"
            },
            {
                id: 6,
                date: "2010-08-01T15:00:00+02:00",
                label: "work",
                text: "Study React"
            },
        ];

        factory.getTodos = function(){
            return todos;
        };

        return factory;

    });