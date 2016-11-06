/// <reference path="../../typings/index.d.ts" />

describe("crud.factory works as a layer between api factory and todos controllers", function () {

    var $q;
    var $scope;
    var crudFactory;
    var apiFactory;
    var errorHandlerFactory;

    beforeEach(module('todos'));
    beforeEach(module('shared'));

    beforeEach(inject(function (_$q_, _$rootScope_, _crudFactory_, _apiFactory_, _errorHandlerFactory_) {
        $q = _$q_;
        $scope = _$rootScope_;
        crudFactory = _crudFactory_;
        apiFactory = _apiFactory_;
        errorHandlerFactory = _errorHandlerFactory_;
    }));

    it("should have a getTodos method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'getTodos').and.returnValue($q.defer().promise);
        crudFactory.getTodos();
        expect(apiFactory.getTodos).toHaveBeenCalled();
    });

    it("should have a deleteTodo method that forwards the call to apiFactory", function () {
        spyOn(apiFactory, 'deleteTodo').and.returnValue($q.defer().promise);
        crudFactory.deleteTodo();
        expect(apiFactory.deleteTodo).toHaveBeenCalled();
    });

    it("should set the app in an error state if ajax error", function () {
        spyOn(errorHandlerFactory, 'setAppHasError');
        spyOn(apiFactory, 'getTodos').and.returnValue($q.reject());

        crudFactory.getTodos().then(function () {
            expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(true);
        });
        
        $scope.$digest(); // Need it for running then. could also use $scope.$apply() / $rootScope.$apply()  
    });

});