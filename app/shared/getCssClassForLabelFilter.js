/// <reference path="../../typings/index.d.ts" />

angular
    .module('shared')
    .filter('getCssClassForLabelFilter', function (LABELS_CONSTANTS) {

        return function (label) {

            label = label.toLowerCase();
            var cssClass = "";

            switch (label) {
                case LABELS_CONSTANTS.joy:
                    cssClass = 'yt-bg-color-joy';
                    break;
                case LABELS_CONSTANTS.no_label:
                    cssClass = 'yt-bg-color-no_label';
                    break;
                case LABELS_CONSTANTS.project:
                    cssClass = 'yt-bg-color-project';
                    break;
                case LABELS_CONSTANTS.work:
                    cssClass = 'yt-bg-color-work';
                    break;
                default:
                    console.error("ERROR getting color for label");
                    break;
            }

            return cssClass;

        };

    });