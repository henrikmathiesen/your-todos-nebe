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
            text: "Assemble a tshirt gun"
        }

        directiveMarkup = '<yt-todo todo="todo" ng-show="true" is-all-todos-checked="vm.isAllTodosChecked()"></yt-todo>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("Should work", function(){
        console.log("---------------------------------------------");
        console.log(html);
        console.log("---------------------------------------------");
    });

});