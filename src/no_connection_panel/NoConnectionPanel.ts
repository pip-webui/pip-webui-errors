
class NoConnectionPanelController {
    private _retry: Function;
    constructor($scope: ng.IScope) {
        this._retry = $scope['retry'];
    }

    public onRetry() {
        if (this._retry && angular.isFunction(this._retry)) this._retry();
    }
}

(() => {
    angular.module("pipNoConnectionPanel", ['pipErrors.Translate'])
        .directive('pipNoConnectionPanel',
        () => {
            return {
                restrict: 'E',
                scope: {
                    error: '=pipError',
                    retry: '=pipRetry'
                },
                templateUrl: 'no_connection_panel/NoConnectionPanel.html',
                controller: 'pipNoConnectionPanelController',
                controllerAs: '$ctrl'
            };
        }
        ).controller('pipNoConnectionPanelController', NoConnectionPanelController);

})();

