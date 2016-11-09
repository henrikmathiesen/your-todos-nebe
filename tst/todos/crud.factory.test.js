/// <reference path="../../typings/index.d.ts" />

describe("crud.factory works as a layer between api factory and todos controllers", function () {

    var $q;
    var $scope;
    var todosCrudFactory;
    var todosApiFactory;
    var errorHandlerFactory;

    beforeEach(module('todos'));
    beforeEach(module('shared'));

    beforeEach(inject(function (_$q_, _$rootScope_, _todosCrudFactory_, _todosApiFactory_, _errorHandlerFactory_) {
        $q = _$q_;
        $scope = _$rootScope_;
        todosCrudFactory = _todosCrudFactory_;
        todosApiFactory = _todosApiFactory_;
        errorHandlerFactory = _errorHandlerFactory_;
    }));

    it("should have a getTodos method that forwards the call to todosApiFactory", function () {
        spyOn(todosApiFactory, 'getTodos').and.returnValue($q.defer().promise);
        todosCrudFactory.getTodos();
        expect(todosApiFactory.getTodos).toHaveBeenCalled();
    });

    it("should have a deleteTodo method that forwards the call to todosApiFactory", function () {
        spyOn(todosApiFactory, 'deleteTodo').and.returnValue($q.defer().promise);
        todosCrudFactory.deleteTodo();
        expect(todosApiFactory.deleteTodo).toHaveBeenCalled();
    });

    it("should set the app in an error state if ajax error", function () {
        spyOn(errorHandlerFactory, 'setAppHasError');
        spyOn(todosApiFactory, 'getTodos').and.returnValue($q.reject());

        todosCrudFactory.getTodos().then(function () {
            expect(errorHandlerFactory.setAppHasError).toHaveBeenCalledWith(true);
        });
        
        $scope.$digest(); // Need it for running then. could also use $scope.$apply() / $rootScope.$apply()  
    });

});