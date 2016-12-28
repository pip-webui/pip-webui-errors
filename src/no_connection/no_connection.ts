/**
 * @file No connection error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.NoConnection', []);

    thisModule.controller('pipErrorNoConnectionController', function ($scope, $state, $rootScope, $window, $mdMedia, $injector, pipErrorsService) {

        var errorKey = 'NoConnection';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);

        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;

        $scope.media = pipMedia ? pipMedia : $mdMedia;

        $rootScope.$routing = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};

        $scope.onRetry = onRetry;

        return;

        function onRetry() {
            $window.history.back();
        };

        function appHeader() {
            if (!pipNavService) return;

            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        };

    });


})();
