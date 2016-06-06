/**
 * @file No Connection Error panel
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipNoConnectionPanel", []);

    thisModule.directive('pipNoConnectionPanel',
        function () {
            return {
                restrict: 'E',
                scope: {
                    error: '=pipError',
                    retry: '=pipRetry'
                },
                templateUrl: 'no_connection/pip_no_connection_panel.html',
                controller: 'pipNoConnectionPanelController'
            };
        }
    );

    thisModule.controller('pipNoConnectionPanelController',
        function ($scope, $element, $attrs, pipTranslate) {


            $scope.onRetry = onRetry;

            return;

            function onRetry() {
                if ($scope.retry && angular.isFunction($scope.retry)) $scope.retry();
            };

        }
    );

})();

