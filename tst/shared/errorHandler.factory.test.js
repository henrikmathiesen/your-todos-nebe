/// <reference path="../../typings/index.d.ts" />

describe("errorHandler.factory has method for setting app in error state and also getting the state", function(){

    var errorHandlerFactory;

    beforeEach(module('shared'));

    beforeEach(inject(function(_errorHandlerFactory_) {
        errorHandlerFactory = _errorHandlerFactory_;
    }));

    it("is created with appHasError set to false", function () {
        expect(errorHandlerFactory.getAppHasError()).toBe(false);
    });
    
    it("has a method for setting app in an error state, takes a boolean", function () {
        expect(errorHandlerFactory.setAppHasError).toBeDefined(); 
    });
    
    it("has a method for getting if app is in an error state, returns a boolean", function () {
        errorHandlerFactory.setAppHasError(true);
        expect(errorHandlerFactory.getAppHasError()).toBe(true);
    });

});