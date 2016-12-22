/// <reference path="../../typings/index.d.ts" />

describe("yt-error.directive displays and error message to the user if app is in error state, user can dismiss the message", function () {

    var $scope;
    var $compile;
    var errorHandlerFactory;
    var directiveMarkup;
    var directiveElement;
    var jQelement;
    var html;
    var isolateScope;

    beforeEach(module('templatecache'));
    beforeEach(module('shared'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _errorHandlerFactory_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        errorHandlerFactory = _errorHandlerFactory_;

        spyOn(errorHandlerFactory, 'getAppHasError').and.callThrough();
        spyOn(errorHandlerFactory, 'setAppHasError').and.callThrough();

        directiveMarkup = '<yt-error></yt-error>';
        directiveElement = $compile(directiveMarkup)($scope);
        $scope.$digest();

        jQelement = angular.element(directiveElement);
        html = jQelement.html();

        isolateScope = jQelement.isolateScope();
        $scope.$apply();
    }));

    describe("Should render the correct template", function () {
        it("The correct elements should be rendered", function () {
            var $header = jQelement.find('h1');
            var $subHeader = jQelement.find('h2');
            var $okDismissButton = jQelement.find('button[ng-click="vm.ok()"]');

            expect($header.length).toBe(1);
            expect($subHeader.length).toBe(1);
            expect($okDismissButton.length).toBe(1);
        });

        it("Should start with the error message hidden", function () {
            expect(jQelement.hasClass('yt-display-none')).toBe(true, "Message should start hidden");
            expect(isolateScope.vm.showError).toBe(false);
        });
    });

    it("Should check for errors upon creation", function () {
        expect(errorHandlerFactory.getAppHasError).toHaveBeenCalled();
    });

    it("Should have the ok() method on vm that sets appHasError to false, dismissing the message", function () {
        isolateScope.vm.ok();

        expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(false);
    });

    it("Should show error message if an error", function () {
        errorHandlerFactory.setAppHasError(true);
        $scope.$apply();

        expect(jQelement.hasClass('yt-display-none')).toBe(false, "Message should be visible");
        expect(isolateScope.vm.showError).toBe(true);
    });

    it("Should hide error message if not an error", function () {
        errorHandlerFactory.setAppHasError(false);
        $scope.$apply();

        expect(jQelement.hasClass('yt-display-none')).toBe(true, "Message should be hidden");
        expect(isolateScope.vm.showError).toBe(false);
    });

});