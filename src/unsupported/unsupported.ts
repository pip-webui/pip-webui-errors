/**
 * @file Unsupported error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Unsupported', []);

    thisModule.controller('pipErrorUnsupportedController', function ($scope, $state, $rootScope, $mdMedia, pipAppBar) {

        $scope.$mdMedia = $mdMedia;
        $rootScope.$routing = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};

        return;

        // Todo: Made dependencies optional
        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.addShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_UNSUPPORTED_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

    });

})();
