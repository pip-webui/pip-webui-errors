/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig',
        [ 'pipRest.State', 'pipRest', 'pipEntry', 'pipSideNav', 'pipAppBar' ]);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $urlRouterProvider, pipAuthStateProvider, pipRestProvider, pipSideNavProvider, 
                  pipAppBarProvider, pipEntryProvider, $mdIconProvider) {

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Set global constants
            pipAppBarProvider.appTitleText('Sample Application');
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            ]);

            // Configure REST API
            // pipRestProvider.version('1.0');
            pipRestProvider.serverUrl('http://alpha.pipservices.net');

            // Configure entry pages
            // pipEntryProvider.fixedServerUrl('http://alpha.pipservices.net');

            // Configure default states
            pipAuthStateProvider.unauthorizedState('signin');
            pipAuthStateProvider.authorizedState('error_page');

            pipAuthStateProvider
                .state('error_page', {
                    url: '/error_page',
                    controller: 'SampleErrorsController',
                    templateUrl: 'errors.html',
                    auth: false
                });

            $urlRouterProvider.otherwise(function ($injector, $location) {
                return $location.$$path === '' ? '/error_page' : '/error_page';
            });

            // Configure navigation menu
            pipSideNavProvider.sections([
                {
                    links: [
                        {title: 'ERRORS', url: '/error_page'}
                    ]
                }/*,
                {
                    links: [
                        {title: 'SIGNOUT', url: '/signout'}
                    ]
                }*/
            ]);
        }
    );

})(window.angular);

