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
    var todosEffectFactory;


    beforeEach(module('templatecache'));
    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$q_, _$controller_, _todosCrudFactory_, _todosEffectFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $q = _$q_;
        $controller = _$controller_;
        todosCrudFactory = _todosCrudFactory_;
        todosEffectFactory = _todosEffectFactory_;

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

        spyOn(todosEffectFactory, 'isAllTodosChecked');

        directiveMarkup = '<yt-todos></yt-todos>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    describe("Directive goes out and gets all todos via service, it also tracks checked status and isInEditMode status", function () {

        it("Should call getTodos", function () {
            expect(todosCrudFactory.getTodos).toHaveBeenCalled();
        });

        it("Should check if all or none todo is checked", function () {
            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalledWith(jQelement.isolateScope().vm);
        });

        it("Should have populated todos on view model", function () {
            expect(jQelement.isolateScope().vm.todos.length).toBe(2);
        });

        it("Should set all todos checked property to false", function () {
            expect(jQelement.isolateScope().vm.todos[0].checked).toBe(false);
            expect(jQelement.isolateScope().vm.todos[1].checked).toBe(false);
        });

        it("Should set all todos isInEditMode property to false", function () {
            expect(jQelement.isolateScope().vm.todos[0].isInEditMode).toBe(false);
            expect(jQelement.isolateScope().vm.todos[1].isInEditMode).toBe(false);
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

    describe("Directives view model has methods for handling checked todos, forwards call to todosEffectFactory", function () {

        beforeEach(function () {
            vm = $controller('ytTodosController');
            $scope.$apply();

            spyOn(todosEffectFactory, 'checkAllTodos');
            spyOn(todosEffectFactory, 'deleteCheckedTodos');

            spyOn(todosCrudFactory, 'addTodo').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({ id: 3, text: "" });
                return deferred.promise;
            });
        });

        it("Should have a method for checking if all todos is checked", function () {
            vm.isAllTodosChecked();

            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalledWith(vm);
        });

        it("Should have a method for checking all todos", function () {
            vm.checkAllTodos(true);

            expect(todosEffectFactory.checkAllTodos).toHaveBeenCalledWith(vm, true);
        });

        it("Should have a method for deleting all checked todos, forwarding the call and then reload todos", function () {
            // We have already tested that todosEffectFactory.deleteCheckedTodos runs the sent callback, so dont need to test it here

            var getTodos = function () { return true; };
            vm.deleteCheckedTodos();

            expect(todosEffectFactory.deleteCheckedTodos).toHaveBeenCalled(); // with vm, getTodos (having problem mocking private var)
            expect(todosCrudFactory.getTodos).toHaveBeenCalled();
        });

        it("Should have a method for adding a empty new todo, forwarding the call and then reload todos", function () {
            var todo = { id: null, text: "" };
            vm.addTodo();

            expect(todosCrudFactory.addTodo).toHaveBeenCalledWith(todo);
            expect(todosCrudFactory.getTodos).toHaveBeenCalled();
        });
    });

    describe("Directives template should render correctly", function () {

        var $checkAllTodosIcon;
        var $unCheckAllTodosIcon;

        var $addTodoIcon;
        var $saveIcon;

        var $deleteTodoIcon;
        var $deleteTodoIconDisabled;

        beforeEach(function () {
            $checkAllTodosIcon = jQelement.find('.fa-square-o[ng-click="vm.checkAllTodos(true)"]');
            $unCheckAllTodosIcon = jQelement.find('.fa-check-square-o[ng-click="vm.checkAllTodos(false)"]');

            $addTodoIcon = jQelement.find('.fa-plus[ng-click="vm.addTodo()"]');

            // 1b) $saveIcon = ......... to do when implementing it

            $deleteTodoIcon = jQelement.find('a.fa-trash-o[ng-click="vm.deleteCheckedTodos()"]');
            $deleteTodoIconDisabled = jQelement.find('span.fa-trash-o');
        });

        it("Should start with an empty square icon, since no todos are checked", function () {
            expect($checkAllTodosIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
            expect($unCheckAllTodosIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
        });

        it("Should have a delete icon that start disabled since no todos are checked", function () {
            expect($deleteTodoIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
            expect($deleteTodoIconDisabled.hasClass('ng-hide')).toBe(false, "it should be visible");
        });

        it("Should obey view model -- if allTodosChecked then square icon in header gets checked, if !noTodosChecked then delete icon is enabled", function () {
            jQelement.isolateScope().vm.allTodosChecked = true;
            jQelement.isolateScope().vm.noTodosChecked = false;
            $scope.$apply();

            expect($checkAllTodosIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
            expect($unCheckAllTodosIcon.hasClass('ng-hide')).toBe(false, "it should be visible");

            expect($deleteTodoIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
            expect($deleteTodoIconDisabled.hasClass('ng-hide')).toBe(true, "it should be hidden");
        });

        it("Should obey view model - there should be an addTodo icon", function () {
            expect($addTodoIcon.length).toBe(1);
        });
    });

});