/// <reference path="../../typings/index.d.ts" />

angular
    .module('shared')
    .directive('ytError', function ($timeout, errorHandlerFactory) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'shared/yt-error.template.html',
            replace: true,
            link: function (scope, $element) {

                scope.vm = {
                    showError: false,
                    ok: function () {
                        errorHandlerFactory.setAppHasError(false);
                    }
                };

                var showError = function (shouldShow) {
                    $timeout(function () {
                        scope.vm.showError = shouldShow;
                    });
                };

                scope.$watch(errorHandlerFactory.getAppHasError, function (newValue, oldValue) {

                    if (newValue === true) {
                        $element.fadeIn(function () {
                            showError(true);
                        });
                    }
                    else {
                        if (newValue === oldValue) {
                            return;
                        }

                        $element.fadeOut(function () {
                            showError(false);
                        });
                    }

                });

            }
        }
    });