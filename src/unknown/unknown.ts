/**
 * @file Unknown error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Unknown', []);

    thisModule.controller('pipErrorUnknownController', function ($scope, $state, $rootScope, pipAppBar) {

        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};
        $scope.error_details = null;

        $scope.onDetails = onDetails;
        $scope.onClose = onClose;

        parseError();

        return;

        // Todo: Made dependencies optional
        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.addShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_UNKNOWN_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

        function parseError() {
            $scope.error_details = {};
            $scope.error_details.code = $scope.error.code;
            $scope.error_details.description = $scope.error.message;
            $scope.error_details.status = $scope.error.status;

            $scope.error_details.server_stacktrace = function () {

            };

            $scope.error_details.client_stacktrace = function () {

            };
        };

        function onDetails() {
            $scope.showError = true;
        };

        function onClose() {

        };

    });

})();
