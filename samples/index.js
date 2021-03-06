/* global angular */

(function () {
    'use strict';
    var content = [
        { title: 'Error pages examples with code', state: 'error_example', url: '/', controller: 'SampleErrorsController', templateUrl: 'errors.html' },
        { title: 'No connection', state: 'errors_no_connection'}, 
        { title: 'Maintenance', state: 'errors_maintenance'}, 
        { title: 'Missing Route', state: 'errors_missing_route'}, 
        { title: 'Unknown', state: 'errors_unknown'}, 
        { title: 'Unsuppported', state: 'errors_unsupported'}, 
        { title: 'Form errors example', state: 'form_error_example', url: '/form_error_example', controller: 'SampleFormErrorsController', templateUrl: 'form_errors.html' }
    ];

    var thisModule = angular.module('appErrorSample', 
        [
            'ngMaterial', 'ngMessages',
            'ui.router', 'ui.utils', 
            'LocalStorageModule', 

            'pipServices',
            'pipTheme.Default', 'pipTheme.BootBarn', 'pipTheme', 


            'pipErrors',
            'pipErrorsSample',
            'pipFormErrorsSample'
        ]
    );

    thisModule.config(
        function ($stateProvider, $urlRouterProvider, $mdIconProvider,
                  $compileProvider, $httpProvider, $mdDateLocaleProvider) {  // pipErrorsServiceProvider

            $compileProvider.debugInfoEnabled(false);
            $httpProvider.useApplyAsync(true);

            var contentItem, i;

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            for (i = 0; i < content.length; i++) {
                contentItem = content[i];
                if (contentItem.controller) {
                    $stateProvider.state(contentItem.state, contentItem);
                }
            }

            $urlRouterProvider.otherwise('/');

            // pipErrorsServiceProvider.configureErrorByKey('MissingRoute', {
            //         Active: true,
            //         Name: 'errors_missing_route',
            //         Event: '$stateNotFound',
            //         Title: '111111111111',
            //         SubTitle: '22222222222222',
            //         Breadcrumb: '333333333333333333',
            //         Image: 'images/invalid_route.svg'                
            // });
        }        
    );

    thisModule.controller('pipSampleController',
        function ($scope, $rootScope, $injector, $state, $mdSidenav, $timeout, $mdTheming, $mdMedia, localStorageService, $mdDateLocale) {

            var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null,
                appThemesDefault = $injector.has('appThemesDefault') ? $injector.get('appThemesDefault') : null,
                pipTheme = $injector.has('pipTheme') ? $injector.get('pipTheme') : null;

            if (pipTranslate) {
                pipTranslate.setTranslations('en', {
                    TITLE: 'Error pages and controls',
                });
                pipTranslate.setTranslations('ru', {
                    TITLE: 'Элементы и страницы для обработки ошибок',
                });
                $scope.title = pipTranslate.translate('TITLE');
            } else {
                $scope.title = 'Error pages and controls';
            }

            $scope.isTranslated = !!pipTranslate;
            $scope.isTheme = !!pipTheme;
            $scope.$mdMedia = $mdMedia;

            $rootScope.$theme = localStorageService.get('theme') || 'blue';
            if ($scope.isTheme) {
                $scope.themes = _.keys(_.omit($mdTheming.THEMES, 'default'));
            } else {
                $scope.themes = [];
            }
            

            $scope.languages = ['en', 'ru', 'fr'];
            if (!$rootScope.$language) {
                $rootScope.$language = 'en';
            }

            $scope.content = content;

            // Update page after language changed
            $rootScope.$on('languageChanged', function(event) {
                $state.reload();
            });

            // Update page after theme changed
            $rootScope.$on('themeChanged', function(event) {
                $state.reload();
            });

            $scope.onSwitchPage = function (state) {
                $mdSidenav('left').close();
                $state.go(state);
            };

            $scope.onThemeClick = function(theme) {
                if ($scope.isTheme) {
                    setTimeout(function () {
                        pipTheme.use(theme, false, false);
                        $rootScope.$theme = theme;
                        $rootScope.$apply();
                    }, 0);                      
                }
            };

            $scope.onLanguageClick = function(language) {
                if ($scope.isTranslated) {
                    setTimeout(function () {
                        pipTranslate.use(language);
                        $rootScope.$apply();
                    }, 0);   
                } 
             
            };

            $scope.isActiveState = function (state) {
                return $state.current.name == state;
            };
        }
    );

})();