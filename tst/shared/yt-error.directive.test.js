/// <reference path="../../typings/index.d.ts" />

describe("yt-error.directive displays and error message to the user if app is in error state, user can dismiss the message", function () {

    var $scope;
    var $compile;
    var errorHandlerFactory;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;

    beforeEach(module('templatecache'));
    beforeEach(module('shared'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _errorHandlerFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        errorHandlerFactory = _errorHandlerFactory_;

        spyOn(errorHandlerFactory, 'getAppHasError');
        spyOn(errorHandlerFactory, 'setAppHasError');

        directiveMarkup = '<yt-error></yt-error>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();
    }));

    it("Should render the correct template", function () {
        var $header = jQelement.find('h1');
        var $subHeader = jQelement.find('h2');
        var $okDismissButton = jQelement.find('button[ng-click="vm.ok()"]');

        expect(jQelement.hasClass('yt-display-none')).toBe(true, "Message should start hidden");
        expect($header.length).toBe(1);
        expect($subHeader.length).toBe(1);
        expect($okDismissButton.length).toBe(1);
    });

    it("Should check for errors upon creation", function () {
        expect(errorHandlerFactory.getAppHasError).toHaveBeenCalled();
    });

    it("Should have the ok() method on vm that sets appHasError to false, dismissing the message", function () { 
        var isolateScope = jQelement.isolateScope();
        isolateScope.vm.ok();

        expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(false);
    });

    // Having a hard time testing the removal of yt-display-none class, showing the message
    // It is done in a $watch function and then when an animation is complete

});