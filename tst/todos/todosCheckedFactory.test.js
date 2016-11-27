/// <reference path="../../typings/index.d.ts" />

describe("todosChecked.factory keeps track of checked todos and can delete them by forward calls to todosCrud.factory", function () { 

    var $q;
    var todosCheckedFactory;
    var todosCrudFactory;

    beforeEach(module('todos'));

    beforeEach(inject(function (_$q_, _todosCheckedFactory_, _todosCrudFactory_) {
        $q = _$q_;
        todosCheckedFactory = _todosCheckedFactory_;
        todosCrudFactory = _todosCrudFactory_;
    }));

    

});