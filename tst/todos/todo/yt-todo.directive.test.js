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

        jasmine.createSpyObj('vm', ['isAllTodosChecked']);

        $scope.todo = {
            id: 2,
            text: "Assemble a tshirt gun",
            checked: false
        }

        directiveMarkup = '<yt-todo todo="todo" ng-show="true" is-all-todos-checked="vm.isAllTodosChecked()"></yt-todo>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("Should render a todo", function () {
        expect(jQelement.attr('data-todo-id')).toBe("2");
        expect(html.indexOf("Assemble a tshirt gun")).not.toBe(-1);
    });

    it("Should render and toggle 2 checkbox designs next to the todos, design depends on checked status", function () {
        expect(jQelement.find('.fa-square-o').length).toBe(1);
        expect(jQelement.find('.fa-check-square-o').length).toBe(1);



        //jQelement.isolateScope().subVm.todo.checked = true;

    });

});