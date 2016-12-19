/// <reference path="../../../typings/index.d.ts" />

describe("yt-todo.directive renders a todo with a clickable checkbox next to it", function () {

    var $scope;
    var $compile;
    var todosEffectFactory;

    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    beforeEach(module('templatecache'));
    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _todosEffectFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        todosEffectFactory = _todosEffectFactory_;

        $scope.todo = {
            id: 2,
            text: "Assemble a tshirt gun",
            checked: false,
            isInEditMode: false
        };

        $scope.isAllTodosChecked = function () { return true; };

        spyOn($scope, 'isAllTodosChecked');
        spyOn(todosEffectFactory, 'setFocus');

        directiveMarkup = '<yt-todo todo="todo" ng-show="true" is-all-todos-checked="isAllTodosChecked()"></yt-todo>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("Should render a todo", function () {
        expect(jQelement.attr('data-todo-id')).toBe("2");
        expect(html.indexOf("Assemble a tshirt gun")).not.toBe(-1);
    });

    it("Should render and toggle 2 checkbox designs next to the todos, design depends on checked status, user can click on them", function () {
        var $notCheckedIcon = jQelement.find('.fa-square-o');
        var $checkedIcon = jQelement.find('.fa-check-square-o');

        expect($notCheckedIcon.length).toBe(1);
        expect($checkedIcon.length).toBe(1);

        expect($notCheckedIcon.attr('ng-click')).toContain("subVm.checkTodo(true)");
        expect($checkedIcon.attr('ng-click')).toContain("subVm.checkTodo(false)");

        expect($notCheckedIcon.hasClass('ng-hide')).toBe(false, "not checked icon should be visible");
        expect($checkedIcon.hasClass('ng-hide')).toBe(true, "checked icon should be hidden");

        jQelement.isolateScope().subVm.todo.checked = true;
        $scope.$apply();

        expect($notCheckedIcon.hasClass('ng-hide')).toBe(true, "not checked icon should be hidden");
        expect($checkedIcon.hasClass('ng-hide')).toBe(false, "checked icon should be visible");
    });

    it("Should render and toggle the text of the todo and a form element for editing the todo, design depends on isInEditMode status", function () {
        var $col02View = jQelement.find('.yt-todo-row__col02').eq(0);
        var $col02Edit = jQelement.find('.yt-todo-row__col02').eq(1);

        expect($col02View.hasClass('ng-hide')).toBe(false, "Todos text is visible");
        expect($col02Edit.hasClass('ng-hide')).toBe(true, "Todos edit is hidden");

        jQelement.isolateScope().subVm.todo.isInEditMode = true;
        $scope.$apply();

        expect($col02View.hasClass('ng-hide')).toBe(true, "Todos text is hidden");
        expect($col02Edit.hasClass('ng-hide')).toBe(false, "Todos edit is visible");
    });

    it("Should set todo checked status and call passed in parameter function when user clicks on checkbox next to todo", function () {
        expect(jQelement.isolateScope().subVm.todo.checked).toBe(false);

        jQelement.isolateScope().subVm.checkTodo(true);
        $scope.$apply();

        expect(jQelement.isolateScope().subVm.todo.checked).toBe(true);
        expect($scope.isAllTodosChecked).toHaveBeenCalled();
    });

    it("Should set todo in edit mode and call passed in parameter function when user clicks on checkbox next to todo", function () {
        expect(jQelement.isolateScope().subVm.todo.isInEditMode).toBe(false);

        jQelement.isolateScope().subVm.checkTodo(true);
        $scope.$apply();

        expect(jQelement.isolateScope().subVm.todo.isInEditMode).toBe(true);
        expect($scope.isAllTodosChecked).toHaveBeenCalled();
    });

    it("Should set focus to checked todo (when unchecking the todo we do not need to blur since view toggle away the input element and show the text instead)", function () { 
        jQelement.isolateScope().subVm.checkTodo(true);
        $scope.$apply();

        expect(todosEffectFactory.setFocus).toHaveBeenCalledWith($scope.todo.id);
    });

});