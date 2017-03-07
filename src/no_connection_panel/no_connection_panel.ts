/**
 * @file No Connection Error panel
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global _, angular */
class NoConnectionPanelController {
    private _retry: Function;
    constructor($scope: ng.IScope){
        this._retry = $scope['retry'];
    }

    public onRetry() {
        if (this._retry && angular.isFunction(this._retry)) this._retry();
    }
}

(() => {
    'use strict';

    var thisModule = angular.module("pipNoConnectionPanel", ['pipErrors.Translate']);

    thisModule.directive('pipNoConnectionPanel',
        () => {
            return {
                restrict: 'E',
                scope: {
                    error: '=pipError',
                    retry: '=pipRetry'
                },
                templateUrl: 'no_connection_panel/no_connection_panel.html',
                controller: 'pipNoConnectionPanelController',
                controllerAs: '$ctrl'
            };
        }
    );

    thisModule.controller('pipNoConnectionPanelController', NoConnectionPanelController);

})();

