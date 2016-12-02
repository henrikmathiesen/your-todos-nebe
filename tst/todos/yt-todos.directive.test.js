/// <reference path="../../typings/index.d.ts" />

describe("yt-todos.directive loads all todos, keeps tracks of if all or none todo are checked and deletes them (with a service)", function () {

    var $scope;
    var $compile;
    var $q;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;
    var todosCrudFactory;
    var todosCheckedFactory;


    beforeEach(module('templatecache'));
    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _todosCrudFactory_, _todosCheckedFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $q = _$q_;
        todosCrudFactory = _todosCrudFactory_;
        todosCheckedFactory = _todosCheckedFactory_;

        spyOn(todosCrudFactory, 'getTodos').and.callFake(function () {
            var todos = [
                {
                    id: 1,
                    text: "Keep up with front end stuff"
                },
                {
                    id: 2,
                    text: "Assemble a tshirt gun"
                }
            ]

            var deferred = $q.defer();
            deferred.resolve(todos);
            return deferred.promise;
        });

        spyOn(todosCheckedFactory, 'isAllTodosChecked');

        directiveMarkup = '<yt-todos></yt-todos>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    describe("Directive goes out and gets all todos via service, it also tracks checked status", function () {

        it("Should call getTodos", function () {
            expect(todosCrudFactory.getTodos).toHaveBeenCalled();
        });

        it("Should check if all or none todo is checked", function () {
            expect(todosCheckedFactory.isAllTodosChecked).toHaveBeenCalled();
        });

        it("Should have populated todos on view model", function(){
            expect(jQelement.isolateScope().vm.todos.length).toBe(2);
        });

        it("Should set all todos checked property to false", function(){
            expect(jQelement.isolateScope().vm.todos[0].checked).toBe(false);
            expect(jQelement.isolateScope().vm.todos[1].checked).toBe(false);
        });

    });

    describe("Directives view model has methods for handling checked todos", function(){
        
    });

});