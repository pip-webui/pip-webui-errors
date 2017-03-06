/* global angular */

(() => {
    'use strict';

    var thisModule = angular.module('pipErrors.Pages', [
        'ngMaterial',
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Translate', 'pipErrors.Templates'
    ]);

    thisModule.config(
        function ($stateProvider, $httpProvider) {
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
        });


    thisModule.run(
        function ($rootScope, $state, $injector, pipErrorsService) {

            var errorConfig = pipErrorsService.config;

            if (errorConfig.Unsupported.Active) {
                checkSupported();
            }

            if (errorConfig.MissingRoute.Active) {
                $rootScope.$on('$stateNotFound',
                    function (event, unfoundState, fromState, fromParams) {
                        event.preventDefault();

                        $state.go('errors_missing_route', {
                            unfoundState: unfoundState,
                            fromState: {
                                to: fromState ? fromState.name : '',
                                fromParams: fromParams
                            }
                        }
                        );
                        $rootScope.$routing = false;
                    }
                );
            }

            if (errorConfig.NoConnection.Active) {
                $rootScope.$on('pipNoConnectionError', noConnectionError);
            }

            if (errorConfig.Unknown.Active) {
                $rootScope.$on('pipUnknownError', unknownError);
            }

            if (errorConfig.Maintenance.Active) {
                $rootScope.$on('pipMaintenanceError', maintenanceError);
            }

            function goToErrors(toState, params) {
                if (toState == null)
                    throw new Error('Error state was not defined');

                $state.go(toState, params);
            };

            function maintenanceError(event, params) {
                goToErrors('errors_maintenance', params);
            }

            function noConnectionError(event, params) {
                goToErrors('errors_no_connection', params);
            }

            function unknownError(event, params) {
                goToErrors('errors_unknown', params);
            }
// todo: implement this into puplic service
            function checkSupported(supported?: any) {
                let pipSystemInfo = $injector.has('pipSystemInfo') ? $injector.get('pipSystemInfo') : null;
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

                let browser = pipSystemInfo.browserName;
                let version = pipSystemInfo.browserVersion;
                version = version.split(".")[0]

                if (browser && supported[browser] && version >= supported[browser]) {

                    return;
                }
                // if not supported
                $state.go('errors_unsupported');
            }

        }
    );

    thisModule.factory('pipAuthHttpResponseInterceptor',
        function ($q, $location, $rootScope) {
            return {
                responseError: function (rejection) {
                    var toState = $rootScope.$state && $rootScope.$state.name ? $rootScope.$state.name : null,
                        toParams = $rootScope.$state && $rootScope.$state.params ? $rootScope.$state.params : null;

                    switch (rejection.status) {
                        case 503:
                            //available (maintenance)
                            $rootScope.$emit('pipMaintenanceError', {
                                error: rejection
                            });
                            break;
                        case -1:
                            $rootScope.$emit('pipNoConnectionError', {
                                error: rejection
                            });
                            break;
                        default:
                            console.error("errors_unknown", rejection);
                            break;
                    }

                    return $q.reject(rejection);
                }
            }
        }
    );

})();

