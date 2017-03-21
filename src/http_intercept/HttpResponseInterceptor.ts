
interface IHttpResponseInterceptor {
    responseError(rejection);
}

class HttpResponseInterceptor implements IHttpResponseInterceptor{
    constructor(
        private $q: ng.IQService, 
        private $location: ng.ILocationService, 
        private $rootScope: ng.IRootScopeService) {}
    public responseError(rejection) {
        // Todo: Check pip-webui-services - we have a different way to define prev and current states now
        let toState: string = this.$rootScope['$state'] && this.$rootScope['$state'].name ? this.$rootScope['$state'].name : null,
            toParams = this.$rootScope['$state'] && this.$rootScope['$state'].params ? this.$rootScope['$state'].params : null;

        switch (rejection.status) {
            case 503:
                //available (maintenance)
                this.$rootScope.$emit('pipMaintenanceError', { error: rejection });
                break;
            case -1:
                this.$rootScope.$emit('pipNoConnectionError', { error: rejection });
                break;
            default:
                console.error("errors_unknown", rejection);
                break;
        }

        return this.$q.reject(rejection);
    }

}

(() => {

    function configureHttpInterceptor(
        $stateProvider: ng.ui.IStateProvider, 
        $httpProvider: ng.IHttpProvider
    ) {
        // Attach interceptor to react on unauthorized errors
        $httpProvider.interceptors.push('pipHttpResponseInterceptor');
    }

    angular
        .module('pipErrors.Pages', [])
        .config(configureHttpInterceptor)
        .service('pipHttpResponseInterceptor', HttpResponseInterceptor);

})();
