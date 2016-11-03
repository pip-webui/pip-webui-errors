(function (angular) {
    'use strict';

    var thisModule = angular.module('pipErrorsSample', ['pipTranslate', 'ui.router', 'pipErrors.Pages']);

    thisModule.config(
        function ($stateProvider, pipTranslateProvider, pipAuthStateProvider) {

            // Set translation strings for the module
            pipTranslateProvider.translations('en', {
                'ERRORS': 'Errors',
                'SIGNOUT': 'Sing out',
                'CHOOSE_ERROR': 'Choose type of error',
                'NO_CONNECTION': 'No connection',
                'MAINTENANCE': 'Maintenance error',
                'ROUTE_FAILS': 'Route fails',
                'UNSUPPORTED': 'Unsupported error',
                'UNKNOWN': 'Unknown error'
            });

            pipTranslateProvider.translations('ru', {
                'ERRORS': 'Ошибки',
                'SIGNOUT': 'Выйти',
                'CHOOSE_ERROR': 'Выберите тип ошибки',
                'NO_CONNECTION': 'Нет соединения',
                'MAINTENANCE': 'Сервер на обслуживании',
                'ROUTE_FAILS': 'Ошибка перехода',
                'UNSUPPORTED': 'Несовместимый браузер',
                'UNKNOWN': 'Неизвестная ошибка'
            });

        }
    );

    thisModule.controller('SampleErrorsController',
        function ($scope, $rootScope, $state, pipAppBar, $timeout) {

            $timeout(function() {
                $('pre code').each(function(i, block) {
                    Prism.highlightElement(block);
                });
            });
            
            var date = new Date(),

                error = {
                    code: 500,
                    config: {},
                    data: {
                        name: 'error',
                        message: 'Server down. try again',
                        offlineUntil: date.toJSON()
                    },
                    status: 500,
                    statusText: 'Internal Server Error'
                },

                params = {
                    error: error,
                    unfoundState: {
                        to: 'unfound',
                        toParams: {}
                    },
                    fromState: {
                        to: 'about_me',
                        fromParams: {}
                    }
                },
                pages = [
                    {title: 'NO_CONNECTION', state: 'errors_no_connection', auth: false},
                    {title: 'MAINTENANCE', state: 'errors_maintenance', auth: false},
                    {title: 'ROUTE_FAILS', state: 'errors_missing_route', auth: false},
                    {title: 'UNSUPPORTED', state: 'errors_unsupported', auth: false},
                    {title: 'UNKNOWN', state: 'errors_unknown', auth: false}
                ];

            $scope.pages = pages;

            $scope.onLostConnection = onLostConnection;
            $scope.onMaintenance = onMaintenance;
            $scope.onRouteFails = onRouteFails;
            $scope.onUnsupported = onUnsupported;
            $scope.onUnknown = onUnknown;
            $scope.onNavigationSelect = onNavigationSelect;

            pipAppBar.showTitleText('ERRORS');
            pipAppBar.showMenuNavIcon();
            pipAppBar.showLanguage();
            pipAppBar.removeShadow();

            return;
            // ----------------------------------------------------------------------------------------------------

            function onNavigationSelect(state) {
                setUpAppbarForSample();
                $state.go(state, params);
            }

            function onUnknown() {
                setUpAppbarForSample();
                $state.go('errors_unknown', params);
            }

            function onMaintenance() {
                setUpAppbarForSample();
                $state.go('errors_maintenance', params);
            }

            function onRouteFails() {
                setUpAppbarForSample();
                $state.go('errors_missing_route', params);
            }

            function onUnsupported() {
                setUpAppbarForSample();
                $state.go('errors_unsupported', params);
            }

            function onLostConnection() {
                setUpAppbarForSample();
                $state.go('errors_no_connection', params);
            }

            function setUpAppbarForSample() {
                $timeout(function () {
                    pipAppBar.showBackNavIcon();
                });
            }

        }
    );

})(window.angular);
