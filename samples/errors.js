/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrorsSample', ['pipTranslate', 'pipRest', 'pipRest.State', 'pipErrors.Pages']);


    thisModule.config(
        function($stateProvider, pipTranslateProvider, pipAuthStateProvider) {

            // Configure module routes
            pipAuthStateProvider
                .state('error_page', {
                    url: '/error_page',
                    controller: 'SampleErrorsController',
                    templateUrl: 'errors.html',
                    auth: true
                }
            );
            // Set translation strings for the module
            pipTranslateProvider.translations('en', {
                'NO_CONNECTION': 'No connection',
                'MAINTENANCE': 'Maintenance error',
                'ROUTE_FAILS': 'Route fails',
                'UNSUPPORTED': 'Unsupported error',
                'UNKNOWN': 'Unknown error'
            });

            pipTranslateProvider.translations('ru', {
                'NO_CONNECTION': 'Нет соединения',
                'MAINTENANCE': 'Сервер на обслуживании',
                'ROUTE_FAILS': 'Ошибкак перехода',
                'UNSUPPORTED': 'Несовместимый браузер',
                'UNKNOWN': 'Неизвестная ошибка'
            });

        }
    );

    thisModule.controller('SampleErrorsController',
        function ($scope, $rootScope, $state) {
            var date = new Date();

            var error = {
                code: 500,
                config: {},
                data: {
                    name: 'error',
                    message: 'Server down. try again',
                    offlineUntil:  date.toJSON()
                },
                status: 500,
                statusText: 'Internal Server Error'
            };

            var params = {
                error: error,
                unfoundState: {
                    to: 'unfaund',
                    toParams: {}
                },
                fromState: {
                    to: 'about_me',
                    fromParams: {}
                }
            };

            $scope.onLostConnection = onLostConnection;
            $scope.onMaintenance = onMaintenance;
            $scope.onRouteFails = onRouteFails;
            $scope.onUnsupported = onUnsupported;
            $scope.onUnknown = onUnknown;

            return;

            function onUnknown() {
                $state.go('errors_unknown', params);
            }

            function onMaintenance() {
                $state.go('errors_maintenance', params);
            }

            function onRouteFails() {
                $state.go('errors_missing_route', params);
            }

            function onUnsupported() {
                $state.go('errors_unsupported', params);
            }

            function onLostConnection() {
                $state.go('errors_no_connection', params);
            }

        }
    );

})();
