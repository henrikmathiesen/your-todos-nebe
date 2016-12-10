/// <reference path="../../../typings/index.d.ts" />

describe("yt-todo.directive renders a todo with a clickable checkbox next to it", function () {

    var $scope;
    var $compile;

    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    beforeEach(module('templatecache'));
    beforeEach(module('shared'));
    beforeEach(module('todos'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;

        $scope.todo = {
            id: 2,
            text: "Assemble a tshirt gun",
            checked: false
        };

        $scope.isAllTodosChecked = function () { return true; };

        spyOn($scope, 'isAllTodosChecked');

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

    it("Should set todo checked status and call passed in parameter function when user clicks on checkbox next to todo", function () {
        expect(jQelement.isolateScope().subVm.todo.checked).toBe(false);

        jQelement.isolateScope().subVm.checkTodo(true);
        $scope.$apply();

        expect(jQelement.isolateScope().subVm.todo.checked).toBe(true);
        expect($scope.isAllTodosChecked).toHaveBeenCalled();
    });

});