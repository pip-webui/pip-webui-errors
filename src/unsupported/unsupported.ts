/**
 * @file Unsupported error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Unsupported', []);

    thisModule.controller('pipErrorUnsupportedController', function ($scope, $state, $rootScope, $mdMedia, $injector) {

        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;

        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope.$routing = false;
        
        if (pipNavService) {
            appHeader();
        }

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};

        return;

        // Todo: Made dependencies optional
        function appHeader() {
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_UNSUPPORTED_TITLE';
            pipNavService.actions.hide();
        };

    });

})();
