/// <reference path="../../typings/index.d.ts" />

angular
    .module('shared')
    .directive('ytError', function (errorHandlerFactory) {
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

                scope.$watch(errorHandlerFactory.getAppHasError, function (newValue, oldValue) {

                    console.log("watching");

                    if (newValue === true) {
                        $element.fadeIn(function () {
                            console.log("fade in");
                            scope.vm.showError = true;
                        });
                    }
                    else {
                        if (newValue === oldValue) {
                            return;
                        }

                        $element.fadeOut(function () {
                            console.log("fade in");
                            scope.vm.showError = false;
                        });
                    }

                });

            }
        }
    });