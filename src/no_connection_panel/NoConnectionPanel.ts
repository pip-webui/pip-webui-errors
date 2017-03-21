
class NoConnectionPanelController {
    private _retry: Function;
    public error: any;
    constructor($scope: ng.IScope) {
        this._retry = $scope['retry'];
        this.error = $scope['error'];
    }

    public onRetry() {
        if (this._retry && angular.isFunction(this._retry)) this._retry();
    }
}

(() => {
    angular
        .module("pipNoConnectionPanel", [])
        .directive('pipNoConnectionPanel',
        () => {
            return {
                restrict: 'E',
                scope: {
                    error: '=pipError',
                    retry: '=pipRetry'
                },
                templateUrl: 'no_connection_panel/NoConnectionPanel.html',
                controller: NoConnectionPanelController,
                controllerAs: '$ctrl'
            };
        }
        )

})();

