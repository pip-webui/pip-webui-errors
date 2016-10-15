(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/maintenance.html',
    '<div class="pip-error pip-empty layout-column flex layout-align-center-center">\n' +
    '    <div style="background-image: url(\'images/maintenance.svg\');" class="pip-pic"></div>\n' +
    '    <div class="pip-error-text">{{::\'ERROR_AVAILABLE_TITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext">{{::\'ERROR_AVAILABLE_SUBTITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext" ng-if="timeoutInterval">\n' +
    '        {{::\'ERROR_AVAILABLE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.\n' +
    '    </div>\n' +
    '    <div class="pip-error-actions h48 layout-column layout-align-center-center"\n' +
    '         ng-if="isCordova">\n' +
    '        <md-button class="md-accent" ng-click="onClose($event)" aria-label="CLOSE" >\n' +
    '            {{::\'ERROR_AVAILABLE_CLOSE\' | translate}}\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('missing_route/missing_route.html',
    '<div class="pip-error pip-empty layout-column flex layout-align-center-center">\n' +
    '    <div style="background-image: url(\'images/invalid_route.svg\');" class="pip-pic"></div>\n' +
    '    <div class="pip-error-text">{{::\'ERROR_ROUTE_TITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext">{{::\'ERROR_ROUTE_SUBTITLE\' | translate}}</div>\n' +
    '\n' +
    '    <div class="pip-error-actions h48 layout-column layout-align-center-center">\n' +
    '        <md-button aria-label="CONTINUE" class="md-accent" ng-click="onContinue($event)">\n' +
    '            {{::\'ERROR_ROUTE_CONTINUE\' | translate}}\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '    <div class="h48" ng-if="url"><a ng-href="{{url}}">\n' +
    '        {{::\'ERROR_ROUTE_TRY_AGAIN\' | translate }}: {{url}}\n' +
    '    </a></div>\n' +
    '    <div class="h48" ng-if="urlBack"><a ng-href="{{urlBack}}">\n' +
    '        {{::\'ERROR_ROUTE_GO_BACK\' | translate }}: {{urlBack}}\n' +
    '    </a></div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection/no_connection.html',
    '<div class="pip-error pip-empty layout-column flex layout-align-center-center">\n' +
    '    <div style="background-image: url(\'images/no_response.svg\');" class="pip-pic"></div>\n' +
    '    <div class="pip-error-text">{{::\'ERROR_RESPONDING_TITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext">{{::\'ERROR_RESPONDING_SUBTITLE\' | translate}}</div>\n' +
    '\n' +
    '    <div class="pip-error-actions h48 layout-column layout-align-center-center">\n' +
    '        <md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">\n' +
    '            {{::\'ERROR_RESPONDING_RETRY\' | translate}}\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection/pip_no_connection_panel.html',
    '    <div class="pip-empty pip-error layout-column layout-align-center-center flex">\n' +
    '        <img src="images/no_response.svg" class="pip-pic block" >\n' +
    '        \n' +
    '            <div class="pip-error-text">{{::\'ERROR_RESPONDING_TITLE\' | translate}}</div>\n' +
    '            <div class="pip-error-subtext">{{::\'ERROR_RESPONDING_SUBTITLE\' | translate}}</div>\n' +
    '\n' +
    '            <div class="pip-error-actions h48 layout-column layout-align-center-center">\n' +
    '                <md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">\n' +
    '                    {{::\'ERROR_RESPONDING_RETRY\' | translate}}\n' +
    '                </md-button>\n' +
    '            </div>\n' +
    '    </div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('unknown/unknown.html',
    '<div class="pip-error pip-empty layout-column flex layout-align-center-center">\n' +
    '    <div style="background-image: url(\'images/unknown_error.svg\');" class="pip-pic"></div>\n' +
    '    <div class="pip-error-text">{{::\'ERROR_UNKNOWN_TITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext">{{::\'ERROR_UNKNOWN_SUBTITLE\' | translate}}</div>\n' +
    '\n' +
    '    <div class="pip-error-subtext" ng-if="showError && error_details && error_details.status">\n' +
    '        <div ng-if="error_details.code">Code: {{error_details.code}}</div>\n' +
    '        <div ng-if="error_details.description">Description: {{error_details.description}}</div>\n' +
    '        <div ng-if="error_details.status">HTTP status: {{error_details.status}}</div>\n' +
    '        <div ng-if="error_details.server_stacktrace">Server stacktrace: {{error_details.server_stacktrace}}</div>\n' +
    '        <div ng-if="error_details.client_stacktrace">Client stacktrace stacktrace: {{error_details.client_stacktrace}}</div>\n' +
    '    </div>\n' +
    '    <div class="pip-error-actions layout-column layout-align-center-center">\n' +
    '        <div class="h48" ng-if="isCordova">\n' +
    '            <md-button aria-label="CLOSE" class="md-accent" ng-click="onClose($event)">\n' +
    '                {{::\'ERROR_UNKNOWN_CLOSE\' | translate}}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '        <div class="h48">\n' +
    '            <md-button aria-label="DETAILS" class="md-accent" ng-click="onDetails($event)">\n' +
    '                {{::\'ERROR_UNKNOWN_DETAILS\' | translate}}\n' +
    '            </md-button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('unsupported/unsupported.html',
    '<div class="pip-error pip-empty layout-column flex layout-align-center-center">\n' +
    '\n' +
    '    <div class="pip-error-text">{{::\'ERROR_UNSUPPORTED_TITLE\' | translate}}</div>\n' +
    '    <div class="pip-error-subtext">\n' +
    '        {{::\'ERROR_UNSUPPORTED_SUBTITLE\' | translate}}\n' +
    '    </div>\n' +
    '    <div class="pip-error-details layout-row layout-align-center-center" ng-if="$mdMedia(\'gt-xs\')">\n' +
    '        <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '            <div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div>\n' +
    '            <div class="h64 tp16 bp16">\n' +
    '                <a class="text-body2 m0" target="_blank"\n' +
    '                   href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">\n' +
    '                    {{::\'ERROR_UNSUPPORTED_IE\' | translate}}\n' +
    '                </a>\n' +
    '                <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '            <div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div>\n' +
    '            <div class="h64 tp16 bp16">\n' +
    '                <a class="text-body2 m0" target="_blank"\n' +
    '                   href="https://www.mozilla.org/ru/firefox/new/">\n' +
    '                    {{::\'ERROR_UNSUPPORTED_FM\' | translate}}\n' +
    '                </a>\n' +
    '                <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '            <div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div>\n' +
    '            <div class="h64 tp16 bp16">\n' +
    '                <a class="text-body2 m0" target="_blank"\n' +
    '                   href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">\n' +
    '                    {{::\'ERROR_UNSUPPORTED_GC\' | translate}}\n' +
    '                </a>\n' +
    '                <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '            <div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div>\n' +
    '            <div class="h64 tp16 bp16">\n' +
    '                <a class="text-body2 m0" target="_blank"\n' +
    '                   href="http://www.opera.com/ru/download">\n' +
    '                    {{::\'ERROR_UNSUPPORTED_O\' | translate}}\n' +
    '                </a>\n' +
    '                <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="pip-error-details" ng-if="$mdMedia(\'xs\')">\n' +
    '        <div class="layout-row layout-align-center-center">\n' +
    '            <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '                <div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div>\n' +
    '                <div class="h64 tp16 bp16">\n' +
    '                    <a class="text-body2 m0" target="_blank"\n' +
    '                       href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">\n' +
    '                        {{::\'ERROR_UNSUPPORTED_IE\' | translate}}\n' +
    '                    </a>\n' +
    '                    <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '                <div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div>\n' +
    '                <div class="h64 tp16 bp16">\n' +
    '                    <a class="text-body2 m0" target="_blank"\n' +
    '                       href="https://www.mozilla.org/ru/firefox/new/">\n' +
    '                        {{::\'ERROR_UNSUPPORTED_FM\' | translate}}\n' +
    '                    </a>\n' +
    '                    <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <div class="tm16 layout-row layout-align-center-center">\n' +
    '            <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '                <div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div>\n' +
    '                <div class="h64 tp16 bp16">\n' +
    '                    <a class="text-body2 m0" target="_blank"\n' +
    '                       href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">\n' +
    '                        {{::\'ERROR_UNSUPPORTED_GC\' | translate}}\n' +
    '                    </a>\n' +
    '                    <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="pip-error-details-item layout-column layout-align-center-center">\n' +
    '                <div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div>\n' +
    '                <div class="h64 tp16 bp16">\n' +
    '                    <a class="text-body2 m0" target="_blank"\n' +
    '                       href="http://www.opera.com/ru/download">\n' +
    '                        {{::\'ERROR_UNSUPPORTED_O\' | translate}}\n' +
    '                    </a>\n' +
    '                    <p class="text-body1 m0"> {{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

/**
 * @file Registration of all error handling components
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipErrors', [
        'pipErrors.Pages',
        'pipNoConnectionPanel',
        'pipClearErrors',
	    'pipFormErrors'
    ]);
    
})();
/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Pages', [
        'pipAppBar', 'pipState', 'pipTransactions', 'ngMaterial', 
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Templates'
    ]);

    thisModule.config(
        ['pipAuthStateProvider', function (pipAuthStateProvider) {
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
        }]);

})();
/**
 * @file Errors string resources
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Strings', ['pipTranslate']);

    thisModule.config(['pipTranslateProvider', function(pipTranslateProvider) {

        // Set translation strings for the module
        pipTranslateProvider.translations('en', {
            'ERROR_ROUTE_TITLE': 'Sorry, the page isn\'t available',
            'ERROR_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
            'ERROR_ROUTE_CONTINUE': 'Continue',
            'ERROR_ROUTE_TRY_AGAIN': 'Try again',
            'ERROR_ROUTE_GO_BACK': 'Go Back',
            'ERROR_ROUTE_PAGE_TITLE': 'Wrong page',

            'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
            'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
            'ERROR_UNKNOWN_CLOSE': 'Close',
            'ERROR_UNKNOWN_DETAILS': 'Details',

            'ERROR_AVAILABLE_TITLE': 'The server is on maintenance',
            'ERROR_AVAILABLE_SUBTITLE': 'Sorry for the inconvenience. This application is undergoing maintenance for ' +
                                            'a short period. We\'ll be back soon. Thank for your patience.',
            'ERROR_AVAILABLE_CLOSE': 'Close',
            'ERROR_AVAILABLE_TRY_AGAIN': 'Try after',

            'ERROR_RESPONDING_TITLE': 'No connection to the server',
            'ERROR_RESPONDING_SUBTITLE': 'Unable to connect to the server. Check your Internet connection and try again.',
            'ERROR_RESPONDING_RETRY': 'Retry',

            'ERROR_UNSUPPORTED_TITLE': 'This browser is not supported',
            'ERROR_UNSUPPORTED_SUBTITLE': 'Our application using the latest technology. This makes the application faster ' +
                                          'and easier to use. Unfortunately, your browser doesn\'t support those ' +
                                          'technologies. Download on of these great browsers and you\'ll be on your way:',
            'ERROR_UNSUPPORTED_O': 'Opera',
            'ERROR_UNSUPPORTED_O_VER': 'Version 36+',
            'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
            'ERROR_UNSUPPORTED_IE_VER': 'Version 11+',
            'ERROR_UNSUPPORTED_GC': 'Google Chrome',
            'ERROR_UNSUPPORTED_GC_VER': 'Version 48+',
            'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
            'ERROR_UNSUPPORTED_FM_VER': 'Version 45+'

        });

        pipTranslateProvider.translations('ru', {
            'ERROR_ROUTE_TITLE': 'Sorry, the page isn\'t available',
            'ERROR_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
            'ERROR_ROUTE_CONTINUE': 'Continue',
            'ERROR_ROUTE_TRY_AGAIN': 'Try again',
            'ERROR_ROUTE_GO_BACK': 'Go Back',
            'ERROR_ROUTE_PAGE_TITLE': 'Wrong page',

            'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
            'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
            'ERROR_UNKNOWN_CLOSE': 'Close',
            'ERROR_UNKNOWN_DETAILS': 'Details',

            'ERROR_AVAILABLE_TITLE': 'The server is on maintenance',
            'ERROR_AVAILABLE_SUBTITLE': 'Sorry for the inconvenience. This application is undergoing maintenance for ' +
            'a short period. We\'ll be back soon. Thank for your patience.',
            'ERROR_AVAILABLE_CLOSE': 'Close',
            'ERROR_AVAILABLE_TRY_AGAIN': 'Try after',

            'ERROR_RESPONDING_TITLE': 'No connection to the server',
            'ERROR_RESPONDING_SUBTITLE': 'Unable to connect to server. Check your Internet connection and try again.',
            'ERROR_RESPONDING_RETRY': 'Retry',

            'ERROR_UNSUPPORTED_TITLE': 'This browser is not supported',
            'ERROR_UNSUPPORTED_SUBTITLE': 'Our application using the latest technology. This makes the application faster ' +
            'and easier to use. Unfortunately, your browser doesn\'t support those ' +
            'technologies. Download on of these great browsers and you\'ll be on your way:',
            'ERROR_UNSUPPORTED_O': 'Opera',
            'ERROR_UNSUPPORTED_O_VER': 'Version 35+',
            'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
            'ERROR_UNSUPPORTED_IE_VER': 'Version 11+',
            'ERROR_UNSUPPORTED_GC': 'Google Chrome',
            'ERROR_UNSUPPORTED_GC_VER': 'Version 47+',
            'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
            'ERROR_UNSUPPORTED_FM_VER': 'Version 43+'

        });
    }]);

})();
/**
 * @file Special error handling for forms
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipClearErrors', []);

    thisModule.directive('pipClearErrors', function () {
        return {
            restrict: 'A',
            require: ['ngModel', '^?form'],
            link: function ($scope, $element, $attrs, $ctrls) {
                var 
                    fieldController = $ctrls[0],
                    formController = $ctrls[1];

                $scope.$watch($attrs.ngModel, function (newValue) {
                    clearFieldErrors();
                    clearFormErrors();
                });

                //-------------------

                function clearFieldErrors() {
                    var errors = fieldController.$error;

                    for (var prop in errors) {
                        if (errors.hasOwnProperty(prop) && prop.substring(0, 6) == 'ERROR_') {
                            fieldController.$setValidity(prop, true);
                        }
                    };
                }

                function clearFormErrors() {
                    formController.$serverError = {};
                };
            }
        };
    });

})();
/**
 * @file Form error utilities
 * @copyright Digital Living Software Corp. 2014-2016
 *
 */
 
 /* global _, angular */
 
(function () {
    'use strict';

    var thisModule = angular.module('pipFormErrors', []);

    thisModule.factory('pipFormErrors', ['$rootScope', function ($rootScope) {
		return {
			errorsWithHint: errorsWithHint,
            //submittedErrors: submittedErrors,
            //submittedErrorsWithHint: submittedErrorsWithHint,
            //dirtyErrors: dirtyErrors,
            //dirtyErrorsWithHint: dirtyErrorsWithHint,
            //touchedErrors: touchedErrors,            
            touchedErrorsWithHint: touchedErrorsWithHint,
            resetFormErrors: resetFormErrors,
            setFormError: setFormError,
            resetFieldsErrors: resetFieldsErrors
		};
		//-------------------

        function errorsWithHint(field) {
            if (field == null) return;
			
            return _.isEmpty(field.$error) ? { hint: true } : field.$error;
        };
		
//         function submittedErrors(form, field) {
//             if (form == null) throw new Error('Form is not set');
//             if (field == null) throw new Error('Field is not set');
// 
//             if (form.$submitted)
//                 return field.$error;
//             return {};
//         };
// 
//         function submittedErrorsWithHint(form, field) {
//             if (form == null) throw new Error('Form is not set');
//             if (field == null) throw new Error('Field is not set');
// 
//             if (form.$submitted) {
//                 return _.isEmpty(field.$error) ? { hint: true} : field.$error;
//             }
//             return { hint: true };
//         };
// 
//         function dirtyErrors(form, field) {
//             if (form == null) throw new Error('Form is not set');
//             if (field == null) throw new Error('Field is not set');
// 
//             if (field.$dirty || form.$dirty)
//                 return field.$error;
//             return {};
//         };
// 
//         function dirtyErrorsWithHint(form, field) {
//             if (form == null) throw new Error('Form is not set');
//             if (field == null) throw new Error('Field is not set');
// 
//             if (field.$dirty || form.$dirty) {
//                 return _.isEmpty(field.$error) ? { hint: true} : field.$error;
//             }
//             return { hint: true };
//         };
// 
//         function touchedErrors(form, field) {
//             if (form == null) throw new Error('Form is not set');
//             if (field == null) throw new Error('Field is not set');
//             
//             if (field.$touched || form.$dirty)
//                 return field.$error;
//             return {};
//         };

        function touchedErrorsWithHint(form, field) {
            if (form == null) return;
            if (field == null) return;

            if (form.$submitted && (field.$touched || form.$dirty) || !form.$submitted && (field.$touched || field.$dirty)) {
                var result = _.isEmpty(field.$error) ? { hint: true} : field.$error;
                return result;
            }
            return { hint: true };
        };

        function resetFormErrors(form, errors) {
            form.$setPristine();
            form.$setUntouched();

            if (errors) {
                form.$setDirty();
                form.$setSubmitted();
            }

            form.$serverError = {};
        };
        
        function resetFieldsErrors(form, field) {
            if (!form) return;
            if (field && form[field] && form[field].$error) {
                 form[field].$error = {};
            } else {
                for (var prop in form) {
                    if (form[prop] && form[prop].$error) {
                        form[prop].$error = {};
                    };
                }
                if (form && form.$error) form.$error = {};
            }
        };
        
        function setFormError(form, error, errorFieldMap) {
            if (error == null) return;
            // Prepare form server errors
            form.$serverError = form.$serverError || {};
            // Prepare error code
            var code = error.code || (error.data || {}).code || null;
            if (!code && error.status) code = error.status;

            if (code) {
                var 
                    errorName = 'ERROR_' + code,
                    field = errorFieldMap ? errorFieldMap[code] : null;
                // Set server error to fields
                if (field && form[field] && form[field].$setValidity) {
                    form[field].$setValidity(errorName, false);
                    return;
                }

                // Set server error to form
                if (field == 'form') {
                    form.$serverError[errorName] = true;
                    return;
                }
            }

            // if undefined error for this form or code === undefined/null, go to unhandled error page
            if (error.data && error.data.message) {
                form.$serverError['ERROR_UNKNOWN'] = error.data.message;
                goToUnhandledErrorPage(error);
                return;
            }

            // Set as undefined error
            if (error.message) {
                form.$serverError['ERROR_UNKNOWN'] = error.message;
                goToUnhandledErrorPage(error);
                return;
            }

            if (error.name) {
                form.$serverError['ERROR_UNKNOWN'] = error.name;
                goToUnhandledErrorPage(error);
                return;
            }

            form.$serverError['ERROR_UNKNOWN'] = error;
            goToUnhandledErrorPage(error);
        };

        function goToUnhandledErrorPage(error) {
            $rootScope.$emit('pipUnhandledInternalError', {
                error: error
            });
        };
        
	}]);

})();
/**
 * @file Maintenance error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Maintenance', []);

    thisModule.controller('pipErrorMaintenanceController', ['$scope', '$state', '$rootScope', 'pipAppBar', function ($scope, $state, $rootScope, pipAppBar) {

        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};
        $scope.timeoutInterval = $scope.error && $scope.error.config &&
                        $scope.error.config.params && $scope.error.config.params.interval ? $scope.error.config.params.interval : 0;

        $scope.onClose = onClose;

        return;

        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.showShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_AVAILABLE_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

        function onClose() {

        };

    }]);

})();

/**
 * @file Missing route error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.MissingRoute', []);

    thisModule.controller('pipErrorMissingRouteController', ['$scope', '$state', '$rootScope', 'pipAppBar', 'pipAuthState', function ($scope, $state, $rootScope, pipAppBar, pipAuthState) {

        appHeader();
        $rootScope.$routing = false;

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.fromState : {};
        $scope.unfoundState = $state && $state.params ?  $state.params.unfoundState : {};
        $scope.url = $scope.unfoundState && $scope.unfoundState.to ? $state.href($scope.unfoundState.to, $scope.unfoundState.toParams, {absolute: true}) : '';
        $scope.urlBack = $scope.fromState && $scope.fromState.to ? $state.href($scope.fromState.to, $scope.fromState.fromParams, {absolute: true}) : '';

        $scope.onContinue = onContinue;

        return;

        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.showShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_ROUTE_PAGE_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

        function onContinue() {
            pipAuthState.goToAuthorized();
        };

    }]);

})();

/**
 * @file No connection error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.NoConnection', []);

    thisModule.controller('pipErrorNoConnectionController', ['$scope', '$state', '$rootScope', '$window', 'pipAppBar', function ($scope, $state, $rootScope, $window, pipAppBar) {

        $rootScope.$routing = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};

        $scope.onRetry = onRetry;

        return;

        function onRetry() {
            $window.history.back();
        };

        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.showShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_RESPONDING_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

    }]);


})();

/**
 * @file No Connection Error panel
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global _, angular */

(function () {
    'use strict';

    var thisModule = angular.module("pipNoConnectionPanel", []);

    thisModule.directive('pipNoConnectionPanel',
        function () {
            return {
                restrict: 'E',
                scope: {
                    error: '=pipError',
                    retry: '=pipRetry'
                },
                templateUrl: 'no_connection/pip_no_connection_panel.html',
                controller: 'pipNoConnectionPanelController'
            };
        }
    );

    thisModule.controller('pipNoConnectionPanelController',
        ['$scope', '$element', '$attrs', 'pipTranslate', function ($scope, $element, $attrs, pipTranslate) {

            $scope.onRetry = onRetry;

            return;

            function onRetry() {
                if ($scope.retry && angular.isFunction($scope.retry)) $scope.retry();
            };

        }]
    );

})();


/**
 * @file Unknown error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Unknown', []);

    thisModule.controller('pipErrorUnknownController', ['$scope', '$state', '$rootScope', 'pipAppBar', function ($scope, $state, $rootScope, pipAppBar) {

        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};
        $scope.error_details = null;

        $scope.onDetails = onDetails;
        $scope.onClose = onClose;

        parseError();

        return;

        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.showShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_UNKNOWN_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

        function parseError() {
            $scope.error_details = {};
            $scope.error_details.code = $scope.error.code;
            $scope.error_details.description = $scope.error.message;
            $scope.error_details.status = $scope.error.status;

            $scope.error_details.server_stacktrace = function () {

            };

            $scope.error_details.client_stacktrace = function () {

            };
        };

        function onDetails() {
            $scope.showError = true;
        };

        function onClose() {

        };

    }]);

})();

/**
 * @file Unsupported error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    var thisModule = angular.module('pipErrors.Unsupported', []);

    thisModule.controller('pipErrorUnsupportedController', ['$scope', '$state', '$rootScope', '$mdMedia', 'pipAppBar', function ($scope, $state, $rootScope, $mdMedia, pipAppBar) {

        $scope.$mdMedia = $mdMedia;
        $rootScope.$routing = false;
        appHeader();

        $scope.error = $state && $state.params && $state.params.error ?  $state.params.error : {};

        return;

        function appHeader() {
            pipAppBar.showMenuNavIcon();
            pipAppBar.showShadow();
            pipAppBar.showTitleBreadcrumb('ERROR_UNSUPPORTED_TITLE', []);
            pipAppBar.showLocalActions(null, []);
        };

    }]);

})();

//# sourceMappingURL=pip-webui-errors.js.map
