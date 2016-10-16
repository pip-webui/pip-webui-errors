/**
 * @file Global configuration for sample application
 * @copyright Digital Living Software Corp. 2014-2016
 */

(function (angular) {
    'use strict';

    var thisModule = angular.module('pipSampleConfig', [ 'pipState', 'pipSideNav', 'pipAppBar' ]);

    // Configure application services before start
    thisModule.config(
        function ($mdThemingProvider, $urlRouterProvider, pipAuthStateProvider, pipDataConfigProvider, pipSideNavProvider, 
                  pipAppBarProvider, pipEntryProvider, $mdIconProvider) {

            var links = [
                    { title: 'Basic controls', href: '/pip-webui-controls/index.html'},
                    { title: 'Composite controls', href: '/pip-webui-composite/index.html'},
                    { title: 'Core', href: '/pip-webui-services/index.html'},
                    { title: 'CSS components', href: '/pip-webui-css/index.html'},
                    { title: 'Document controls', href: '/pip-webui-documents/index.html'},
                    { title: 'Entry pages', href: '/pip-webui-entry/index.html'},
                    { title: 'Guidance components', href: '/pip-webui-guidance/index.html'},
                    { title: 'Help components', href: '/pip-webui-help/index.html'},
                    { title: 'Layouts', href: '/pip-webui-layouts/index.html'},
                    { title: 'Location Controls', href: '/pip-webui-locations/index.html'},
                    { title: 'Navigation controls', href: '/pip-webui-nav/index.html'},
                    { title: 'Picture controls', href: '/pip-webui-pictures/index.html'},
                    { title: 'REST API', href: '/pip-webui-rest/index.html'},
                    { title: 'Settings components', href: '/pip-webui-settings/index.html'},
                    { title: 'Support components', href: '/pip-webui-support/index.html'},
                    { title: 'Test Framework', href: '/pip-webui-test/index.html'}
                ];

            $mdIconProvider.iconSet('icons', 'images/icons.svg', 512);

            // Set global constants
            pipAppBarProvider.appTitleText('Sample Application');
            pipAppBarProvider.globalSecondaryActions([
                {name: 'global.signout', title: 'SIGNOUT', state: 'signout'}
            ]);

            // Configure REST API
            pipDataConfigProvider.serverUrl('http://alpha.pipservices.net');

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
                },/* Links for publishing samples
                {
                    links: links
                },*/
                {
                    links: [
                        {title: 'SIGNOUT', url: '/signout'}
                    ]
                }
            ]);
        }
    );

})(window.angular);

