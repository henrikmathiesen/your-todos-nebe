/// <reference path="../../typings/index.d.ts" />

describe("collection.indexOf with angular and without Angular", function () {

    var ctrl;

    beforeEach(function () {
        angular.module('app', [])
            .controller('someController', function () {
                this.someObjectCollection = [{ name: "Adam" }, { name: "Bertil" }];
            });

        module('app');
    });

    beforeEach(inject(function (_$controller_) {
        ctrl = _$controller_('someController');
    }));

    describe("Vanilla js", function () {
        it("Should first get some understanding -- A", function () {
            var someStringCollection = ["Adam", "Bertil"];
            var expected = 1;
            var actual = someStringCollection.indexOf("Bertil");

            expect(actual).toEqual(expected);
        });

        it("Should first get some understanding -- B", function () {
            var someNumbersCollection = [1, 2];
            var expected = 1;
            var actual = someNumbersCollection.indexOf(2);

            expect(actual).toEqual(expected);
        });

        it("Should first get some understanding -- C", function () {
            someObjectCollection = [{ name: "Adam" }, { name: "Bertil" }];
            var expected = -1;
            var actual = someObjectCollection.indexOf({ name: "Bertil" });

            expect(actual).toEqual(expected);
        });

        it("Should first get some understanding -- D", function () {
            someObjectCollection = [{ name: "Adam" }, { name: "Bertil" }];
            var expected = 1;
            var actual = someObjectCollection.indexOf(someObjectCollection[1]);

            expect(actual).toEqual(expected);
        });
    });

    describe("Angular", function () {
        it("Works the same in Angular -- A", function () {
            var expected = -1;
            var actual = ctrl.someObjectCollection.indexOf({ name: "Bertil" });

            expect(actual).toEqual(expected);
        });

        it("Works the same in Angular -- B", function () {
            var expected = 1;
            var actual = ctrl.someObjectCollection.indexOf(ctrl.someObjectCollection[1]);

            expect(actual).toEqual(expected);
        });
    });
});
