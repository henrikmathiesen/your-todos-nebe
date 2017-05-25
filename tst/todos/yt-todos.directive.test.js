/// <reference path="../../typings/index.d.ts" />

describe("yt-todos.directive loads all todos, keeps track of their checked status and performs crud operations, with help of services", function () {

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

        it("Should have all todos start unchecked and not in edit mode, because those properties are not set", function () { 
            var todos = jQelement.isolateScope().vm.todos;
            var todo01 = todos[0];
            var todo02 = todos[1];

            expect(todo01.checked).toBeFalsy();
            expect(todo01.isInEditMode).toBeFalsy();

            expect(todo02.checked).toBeFalsy();
            expect(todo02.isInEditMode).toBeFalsy();
        });

        it("Should have populated todos on view model", function () {
            expect(jQelement.isolateScope().vm.todos.length).toBe(2);
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

    describe("Directives view model has methods for handling checked todos and add a new todo, forwards call to todosEffectFactory", function () {

        beforeEach(function () {
            vm = $controller('ytTodosController');
            $scope.$apply();

            spyOn(todosEffectFactory, 'isAllTodosChecked');
            spyOn(todosEffectFactory, 'checkAllTodos');
            spyOn(todosEffectFactory, 'updateCheckedTodos');
            spyOn(todosEffectFactory, 'deleteCheckedTodos');
            spyOn(todosEffectFactory, 'addTodo');
        });

        it("Should have a method for checking if all todos is checked", function () {
            vm.isAllTodosChecked();

            expect(todosEffectFactory.isAllTodosChecked).toHaveBeenCalledWith(vm);
        });

        it("Should have a method for checking all todos", function () {
            vm.checkAllTodos(true);

            expect(todosEffectFactory.checkAllTodos).toHaveBeenCalledWith(vm, true);
        });

        it("Should have a method for adding an empty new todo, forwarding the call to todosEffectFactory", function () {
            var todo = { text: "" };
            vm.addTodo();

            expect(todosEffectFactory.addTodo).toHaveBeenCalledWith(vm, todo);
        });
        
        it("Should have a method for updating all checked todos, forwarding the call", function () {
            vm.updateCheckedTodos();

            expect(todosEffectFactory.updateCheckedTodos).toHaveBeenCalledWith(vm);
        });

        it("Should have a method for deleting all checked todos, forwarding the call", function () {
            vm.deleteCheckedTodos();
            expect(todosEffectFactory.deleteCheckedTodos).toHaveBeenCalledWith(vm);
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
            $unCheckAllTodosIcon = jQelement.find('.fa-square[ng-click="vm.checkAllTodos(false)"]');

            $addTodoIcon = jQelement.find('.fa-plus[ng-click="vm.addTodo()"]');

            $saveIcon = jQelement.find('a.fa-floppy-o[ng-click="vm.updateCheckedTodos()"]');
            $saveIconDisabled = jQelement.find('span.fa-floppy-o');

            $deleteTodoIcon = jQelement.find('a.fa-trash-o[ng-click="vm.deleteCheckedTodos()"]');
            $deleteTodoIconDisabled = jQelement.find('span.fa-trash-o');
        });

        it("Should render the todos and order them by highest id first", function () {
            var $todoRow01 = jQelement.find('.yt-todo-row').eq(0);
            var $todoRow02 = jQelement.find('.yt-todo-row').eq(1);

            expect($todoRow01.attr('data-todo-id')).toContain("2");
            expect($todoRow02.attr('data-todo-id')).toContain("1");

            expect($todoRow01.text()).toContain("Assemble a tshirt gun");
            expect($todoRow02.text()).toContain("Keep up with front end stuff");
        });

        it("Should start with an empty square icon, since no todos are checked", function () {
            expect($checkAllTodosIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
            expect($unCheckAllTodosIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
        });

        it("Should have an always enabled add todo icon", function () {
            expect($addTodoIcon.length).toBe(1);
        });

        it("Should have a delete icon that starts disabled since no todos are checked", function () {
            expect($deleteTodoIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
            expect($deleteTodoIconDisabled.hasClass('ng-hide')).toBe(false, "it should be visible");
        });

        it("Should have a save icon that starts disabled since no todos are checked", function () {
            expect($saveIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
            expect($saveIconDisabled.hasClass('ng-hide')).toBe(false, "it should be visible");
        });

        it("Should obey view model -- if allTodosChecked then square icon in header gets checked", function () {
            jQelement.isolateScope().vm.allTodosChecked = true;
            $scope.$apply();

            expect($checkAllTodosIcon.hasClass('ng-hide')).toBe(true, "it should be hidden");
            expect($unCheckAllTodosIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
        });

        it("Should obey view model -- if at least one todo is checked then delete icon is enabled", function () {
            jQelement.isolateScope().vm.noTodosChecked = false;
            $scope.$apply();

            expect($deleteTodoIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
            expect($deleteTodoIconDisabled.hasClass('ng-hide')).toBe(true, "it should be hidden");
        });

        it("Should obey view model -- if at least one todo is checked then save icon is enabled", function () {
            jQelement.isolateScope().vm.noTodosChecked = false;
            $scope.$apply();

            expect($saveIcon.hasClass('ng-hide')).toBe(false, "it should be visible");
            expect($saveIconDisabled.hasClass('ng-hide')).toBe(true, "it should be hidden");
        });
    });

});
