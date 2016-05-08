/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Pages', [
        'pipAppBar', 'pipRest.State', 'pipTransactions', 'pipRest', 'ngMaterial', 
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Templates'
    ]);

    thisModule.config(
        function (pipAuthStateProvider) {
            // Configure module routes
            pipAuthStateProvider
                .state('errors_no_connection', {
                    url: '/errors/no_connection',
                    params: {
                        error: null
                    },
                    auth: false,
                    controller: 'pipErrorNoConnectionController',
                    templateUrl: 'no_connection/no_connection.html'
                })
                .state('errors_maintenance', {
                    url: '/errors/maintenance',
                    params: {
                        error: null
                    },
                    auth: false,
                    controller: 'pipErrorMaintenanceController',
                    templateUrl: 'maintenance/maintenance.html'
                })
                .state('errors_missing_route', {
                    url: '/errors/missing_route',
                    params: {
                        unfoundState: null,
                        fromState: null
                    },
                    auth: true,
                    controller: 'pipErrorMissingRouteController',
                    templateUrl: 'missing_route/missing_route.html'
                })
                .state('errors_unsupported', {
                    url: '/errors/unsupported',
                    params: {
                        error: null
                    },
                    auth: false,
                    controller: 'pipErrorUnsupportedController',
                    templateUrl: 'unsupported/unsupported.html'
                })
                .state('errors_unknown', {
                    url: '/errors/unknown',
                    params: {
                        error: null
                    },
                    auth: false,
                    controller: 'pipErrorUnknownController',
                    templateUrl: 'unknown/unknown.html'
                });
        });

})();