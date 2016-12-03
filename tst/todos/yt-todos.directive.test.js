/// <reference path="../../typings/index.d.ts" />

describe("yt-todos.directive loads all todos, keeps tracks of if all or none todo are checked and deletes them (with a service)", function () {

    var $scope;
    var $compile;
    var $q;
    var $controller;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;
    var vm;
    var todosCrudFactory;
    var todosCheckedFactory;


    beforeEach(module('templatecache'));
    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _$controller_, _todosCrudFactory_, _todosCheckedFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $q = _$q_;
        $controller = _$controller_;
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
            expect(todosCheckedFactory.isAllTodosChecked).toHaveBeenCalledWith(jQelement.isolateScope().vm);
        });

        it("Should have populated todos on view model", function () {
            expect(jQelement.isolateScope().vm.todos.length).toBe(2);
        });

        it("Should set all todos checked property to false", function () {
            expect(jQelement.isolateScope().vm.todos[0].checked).toBe(false);
            expect(jQelement.isolateScope().vm.todos[1].checked).toBe(false);
        });

        it("Should have properties allTodosChecked and noTodosChecked on vm", function () {
            expect(jQelement.isolateScope().vm.allTodosChecked).toBe(false);
            expect(jQelement.isolateScope().vm.noTodosChecked).toBe(true);
        });

        it("Should have the view model bound to its controller", function () {
            vm = $controller('ytTodosController');
            $scope.$apply();

            expect(vm.todos.length).toBe(2);

            // We can get to the vm either with isolateScope (above) or by its controller like this
        });

    });

    describe("Directives view model has methods for handling checked todos, forwards call to todosCheckedFactory", function () {

        beforeEach(function () {
            vm = $controller('ytTodosController');
            $scope.$apply();

            spyOn(todosCheckedFactory, 'checkAllTodos');
            spyOn(todosCheckedFactory, 'deleteCheckedTodos');
        });

        it("Should have a method for checking if all todos is checked", function () {
            vm.isAllTodosChecked();

            expect(todosCheckedFactory.isAllTodosChecked).toHaveBeenCalledWith(vm);
        });

        it("Should have a method for checking all todos", function () {
            vm.checkAllTodos(true);

            expect(todosCheckedFactory.checkAllTodos).toHaveBeenCalledWith(vm, true);
        });

        it("Should have a method for deleting all checked todos, forwarding the call and then reload todos", function () {
            // We have already tested that todosCheckedFactory.deleteCheckedTodos runs the sent callback, so dont need to test it here

            var getTodos = function () { return true; };
            vm.deleteCheckedTodos();

            expect(todosCheckedFactory.deleteCheckedTodos).toHaveBeenCalled(); // with vm, getTodos (having problem mocking private var)
        });
    });

    describe("Directives template should render correctly", function () {

        var $checkAllTodosIcon;
        var $unCheckAllTodosIcon;

        var $addTodoIcon;
        
        var $deleteTodoIcon;
        var $deleteTodoIconDisabled;

        beforeEach(function () {
            $checkAllTodosIcon = jQelement.find('.fa-square-o[ng-click="vm.checkAllTodos(true)"]');
            $unCheckAllTodosIcon = jQelement.find('.fa-check-square-o[ng-click="vm.checkAllTodos(false)"]');

            // 1) $addTodoIcon = jQelement.find('.fa-plus'); to do when implementing it
        });

        it("should start with an empty square icon, since no todos are checked", function () {
            expect($checkAllTodosIcon.hasClass('ng-hide')).toBe(false);
            expect($unCheckAllTodosIcon.hasClass('ng-hide')).toBe(true);
        });

        // it("should have an icon for adding a todo", function () {
        //     // 2
        // });

        it("", function () {

        });
    });

});