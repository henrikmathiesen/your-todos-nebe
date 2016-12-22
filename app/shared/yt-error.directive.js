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

                    console.log("!!!");

                    if (newValue === true) {
                        console.log("true hasError, fadeIn");
                        $element.fadeIn(function () {
                            //$element.removeClass('yt-display-none');
                            console.log("fade in");
                            scope.vm.showError = true;
                        });
                    }
                    else {
                        if (newValue === oldValue) {
                            return;
                        }

                        console.log("false hasError, fadeOut");
                        $element.fadeOut(function () {
                            //$element.addClass('yt-display-none');
                            scope.vm.showError = false;
                        });
                    }

                });

            }
        }
    });