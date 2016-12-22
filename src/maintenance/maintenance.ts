/**
 * @file Maintenance error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Maintenance', []);

    thisModule.controller('pipErrorMaintenanceController', function ($scope, $state, $rootScope, $mdMedia, $injector) {

        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;

        $scope.media = pipMedia ? pipMedia : $mdMedia;

        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};
        $scope.timeoutInterval = $scope.error && $scope.error.config &&
                        $scope.error.config.params && $scope.error.config.params.interval ? $scope.error.config.params.interval : 0;

        $scope.onClose = onClose;

        return;

        function appHeader() {
            if (!pipNavService) return;

            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_AVAILABLE_TITLE';
            pipNavService.actions.hide();
        };

        function onClose() {

        };

    });

})();
