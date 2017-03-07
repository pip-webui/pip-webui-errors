/* global angular */

import {IErrorsService, ErrorsConfig} from './errors_service';

class ErrorsPageRun {
    constructor(
        $rootScope: ng.IRootScopeService, 
        private $state: ng.ui.IStateService, 
        private $injector: angular.auto.IInjectorService, 
        pipErrorsService: IErrorsService) {

        let errorConfig: ErrorsConfig = pipErrorsService.config;

            if (errorConfig.Unsupported.Active) {
                this.checkSupported();
            }

            if (errorConfig.MissingRoute.Active) {
                $rootScope.$on('$stateNotFound',
                    (
                        event: angular.IAngularEvent, 
                        unfoundState: ng.ui.IState, 
                        fromState: ng.ui.IState, 
                        fromParams: any) => {
                        event.preventDefault();

                        $state.go('errors_missing_route', {
                            unfoundState: unfoundState,
                            fromState: {
                                to: fromState ? fromState.name : '',
                                fromParams: fromParams
                            }
                        }
                        );
                        $rootScope['$routing'] = false;
                    }
                );
            }

            if (errorConfig.NoConnection.Active) {
                $rootScope.$on('pipNoConnectionError', 
                (event: angular.IAngularEvent, params) => { 
                    this.noConnectionError(event, params)
                });
            }

            if (errorConfig.Unknown.Active) {
                $rootScope.$on('pipUnknownError',
                (event: angular.IAngularEvent, params) => { 
                    this.unknownError(event, params)
                });
            }

            if (errorConfig.Maintenance.Active) {
                $rootScope.$on('pipMaintenanceError',
                (event: angular.IAngularEvent, params) => { 
                    this.maintenanceError(event, params)
                });
            }
    }

    private goToErrors(toState: string, params) {
        if (toState == null)
            throw new Error('Error state was not defined');

        this.$state.go(toState, params);
    }

    private maintenanceError(event: angular.IAngularEvent, params) {
        this.goToErrors('errors_maintenance', params);
    }

    private noConnectionError(event: angular.IAngularEvent, params) {
        this.goToErrors('errors_no_connection', params);
    }

    private unknownError(event: angular.IAngularEvent, params) {
        this.goToErrors('errors_unknown', params);
    }
// todo: implement this into puplic service
    private checkSupported(supported?: any) {
        let pipSystemInfo: any = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
        if (!pipSystemInfo) { return; }

                // todo make configured
        if (!supported) {
            supported = {
                edge: 11,
                ie: 11,
                firefox: 43, //4, for testing
                opera: 35,
                chrome: 47
            };
        }

        let browser: string = pipSystemInfo.browserName;
        let version: string = pipSystemInfo.browserVersion;
            version = version.split(".")[0]

        if (browser && supported[browser] && version >= supported[browser]) {
            return;
        }
                // if not supported
        this.$state.go('errors_unsupported');
    }
}

interface IAuthHttpResponseInterceptor {
    responseError(rejection);
}

class AuthHttpResponseInterceptor implements IAuthHttpResponseInterceptor{
    constructor(
        private $q: ng.IQService, 
        private $location: ng.ILocationService, 
        private $rootScope: ng.IRootScopeService) {}
    public responseError(rejection) {
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
    'use strict';

    function ErrorsPageConfig(
        $stateProvider: ng.ui.IStateProvider, 
        $httpProvider: ng.IHttpProvider
    ) {
        // Attach interceptor to react on unauthorized errors
        $httpProvider.interceptors.push('pipAuthHttpResponseInterceptor');

            // Configure module routes
        $stateProvider
                .state('errors_no_connection', {
                    url: '/errors/no_connection',
                    params: {
                        error: null
                    },
                    controller: 'pipErrorNoConnectionController',
                    templateUrl: 'no_connection/no_connection.html'
                })
                .state('errors_maintenance', {
                    url: '/errors/maintenance',
                    params: {
                        error: null
                    },
                    controller: 'pipErrorMaintenanceController',
                    controllerAs: '$ctrl',
                    templateUrl: 'maintenance/maintenance.html'
                })
                .state('errors_missing_route', {
                    url: '/errors/missing_route',
                    params: {
                        unfoundState: null,
                        fromState: null
                    },
                    controller: 'pipErrorMissingRouteController',
                    templateUrl: 'missing_route/missing_route.html'
                })
                .state('errors_unsupported', {
                    url: '/errors/unsupported',
                    params: {
                        error: null
                    },
                    controller: 'pipErrorUnsupportedController',
                    templateUrl: 'unsupported/unsupported.html'
                })
                .state('errors_unknown', {
                    url: '/errors/unknown',
                    params: {
                        error: null
                    },
                    controller: 'pipErrorUnknownController',
                    templateUrl: 'unknown/unknown.html'
                });
    }

    angular.module('pipErrors.Pages', [
        'ngMaterial',
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Translate', 'pipErrors.Templates'
    ])
    .config(ErrorsPageConfig)
    .run((
        $rootScope: ng.IRootScopeService, 
        $state: ng.ui.IStateService, 
        $injector: angular.auto.IInjectorService, 
        pipErrorsService: IErrorsService) => {
        let run = new ErrorsPageRun($rootScope, $state, $injector, pipErrorsService);
    })
    .service('pipAuthHttpResponseInterceptor', AuthHttpResponseInterceptor);

})();

