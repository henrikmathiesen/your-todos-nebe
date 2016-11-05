/// <reference path="../../typings/index.d.ts" />

describe("get-css-class-for-label.filter.test", function () {

    var $filter;
    var LABELS_CONSTANTS;
    
    beforeEach(module('main'));

    beforeEach(inject(function(_$filter_, _LABELS_CONSTANTS_) {
        $filter = _$filter_;
        LABELS_CONSTANTS = _LABELS_CONSTANTS_;
    }));

    it("should return correct css class, 2", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.joy);
        expect(cssClass).toEqual("yt-color-joy");
    });

    it("should return correct css class, 3", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.project);
        expect(cssClass).toEqual("yt-color-project");
    });

    it("should return correct css class, 1", function () {
        var cssClass = $filter('getCssClassForLabelFilter')(LABELS_CONSTANTS.work);
        expect(cssClass).toEqual("yt-color-work");
    });

});