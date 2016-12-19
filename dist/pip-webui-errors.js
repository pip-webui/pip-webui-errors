(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).errors = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Strings', ['pipTranslate']);
    thisModule.run(['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
        if (pipTranslate == null)
            return;
        pipTranslate.translations('en', {
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
        pipTranslate.translations('ru', {
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
},{}],2:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Translate', []);
    thisModule.filter('translate', ['$injector', function ($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }]);
})();
},{}],3:[function(require,module,exports){
(function () {
    'use strict';
    angular.module('pipErrors', [
        'pipErrors.Pages',
        'pipNoConnectionPanel',
        'pipClearErrors',
        'pipFormErrors'
    ]);
})();
},{}],4:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Pages', [
        'ngMaterial',
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Translate', 'pipErrors.Templates'
    ]);
    thisModule.config(['$stateProvider', '$httpProvider', function ($stateProvider, $httpProvider) {
        $httpProvider.interceptors.push('pipAuthHttpResponseInterceptor');
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
    }]);
    thisModule.run(['$rootScope', '$state', '$injector', function ($rootScope, $state, $injector) {
        checkSupported();
        $rootScope.$on('pipMaintenanceError', maintenanceError);
        $rootScope.$on('pipNoConnectionError', noConnectionError);
        $rootScope.$on('pipUnknownError', unknownError);
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            event.preventDefault();
            $state.go('errors_missing_route', {
                unfoundState: unfoundState,
                fromState: {
                    to: fromState ? fromState.name : '',
                    fromParams: fromParams
                }
            });
            $rootScope.$routing = false;
        });
        function goToErrors(toState, params) {
            if (toState == null)
                throw new Error('Error state was not defined');
            $state.go(toState, params);
        }
        ;
        function maintenanceError(event, params) {
            goToErrors('errors_maintenance', params);
        }
        function noConnectionError(event, params) {
            goToErrors('errors_no_connection', params);
        }
        function unknownError(event, params) {
            goToErrors('errors_unknown', params);
        }
        function checkSupported(supported) {
            var pipSystemInfo = $injector.has('pipSystemInfo') ? $injector.get('pipSystemInfo') : null;
            if (!pipSystemInfo) {
                return;
            }
            if (!supported) {
                supported = {
                    edge: 11,
                    ie: 11,
                    firefox: 43,
                    opera: 35,
                    chrome: 47
                };
            }
            var browser = pipSystemInfo.browserName;
            var version = pipSystemInfo.browserVersion;
            version = version.split(".")[0];
            if (browser && supported[browser] && version >= supported[browser]) {
                return;
            }
            $state.go('errors_unsupported');
        }
    }]);
    thisModule.factory('pipAuthHttpResponseInterceptor', ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
        return {
            responseError: function (rejection) {
                var toState = $rootScope.$state && $rootScope.$state.name ? $rootScope.$state.name : null, toParams = $rootScope.$state && $rootScope.$state.params ? $rootScope.$state.params : null;
                switch (rejection.status) {
                    case 503:
                        $rootScope.$emit('pipMaintenanceError', {
                            error: rejection
                        });
                        console.error("errors_maintenance", rejection);
                        break;
                    case -1:
                        if (!$rootScope.$identity)
                            $rootScope.$emit('pipNoConnectionError', {
                                error: rejection
                            });
                        console.error("errors_no_connection", rejection);
                        break;
                    default:
                        console.error("errors_unknown", rejection);
                        break;
                }
                return $q.reject(rejection);
            }
        };
    }]);
})();
},{}],5:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipClearErrors', []);
    thisModule.directive('pipClearErrors', function () {
        return {
            restrict: 'A',
            require: ['ngModel', '^?form'],
            link: function ($scope, $element, $attrs, $ctrls) {
                var fieldController = $ctrls[0], formController = $ctrls[1];
                $scope.$watch($attrs.ngModel, function (newValue) {
                    clearFieldErrors();
                    clearFormErrors();
                });
                function clearFieldErrors() {
                    var errors = fieldController.$error;
                    for (var prop in errors) {
                        if (errors.hasOwnProperty(prop) && prop.substring(0, 6) == 'ERROR_') {
                            fieldController.$setValidity(prop, true);
                        }
                    }
                    ;
                }
                function clearFormErrors() {
                    formController.$serverError = {};
                }
                ;
            }
        };
    });
})();
},{}],6:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipFormErrors', []);
    thisModule.factory('pipFormErrors', ['$rootScope', function ($rootScope) {
        return {
            errorsWithHint: errorsWithHint,
            touchedErrorsWithHint: touchedErrorsWithHint,
            resetFormErrors: resetFormErrors,
            setFormError: setFormError,
            resetFieldsErrors: resetFieldsErrors
        };
        function errorsWithHint(field) {
            if (field == null)
                return;
            return _.isEmpty(field.$error) ? { hint: true } : field.$error;
        }
        ;
        function touchedErrorsWithHint(form, field) {
            if (form == null)
                return;
            if (field == null)
                return;
            if (form.$submitted && (field.$touched || form.$dirty) || !form.$submitted && (field.$touched || field.$dirty)) {
                var result = _.isEmpty(field.$error) ? { hint: true } : field.$error;
                return result;
            }
            return { hint: true };
        }
        ;
        function resetFormErrors(form, errors) {
            form.$setPristine();
            form.$setUntouched();
            if (errors) {
                form.$setDirty();
                form.$setSubmitted();
            }
            form.$serverError = {};
        }
        ;
        function resetFieldsErrors(form, field) {
            if (!form)
                return;
            if (field && form[field] && form[field].$error) {
                form[field].$error = {};
            }
            else {
                for (var prop in form) {
                    if (form[prop] && form[prop].$error) {
                        form[prop].$error = {};
                    }
                    ;
                }
                if (form && form.$error)
                    form.$error = {};
            }
        }
        ;
        function setFormError(form, error, errorFieldMap) {
            if (error == null)
                return;
            form.$serverError = form.$serverError || {};
            var code = error.code || (error.data || {}).code || null;
            if (!code && error.status)
                code = error.status;
            if (code) {
                var errorName = 'ERROR_' + code, field = errorFieldMap ? errorFieldMap[code] : null;
                if (field && form[field] && form[field].$setValidity) {
                    form[field].$setValidity(errorName, false);
                    return;
                }
                if (field == 'form') {
                    form.$serverError[errorName] = true;
                    return;
                }
            }
            if (error.data && error.data.message) {
                form.$serverError['ERROR_UNKNOWN'] = error.data.message;
                goToUnhandledErrorPage(error);
                return;
            }
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
        }
        ;
        function goToUnhandledErrorPage(error) {
            $rootScope.$emit('pipUnhandledInternalError', {
                error: error
            });
        }
        ;
    }]);
})();
},{}],7:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Maintenance', []);
    thisModule.controller('pipErrorMaintenanceController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', function ($scope, $state, $rootScope, $mdMedia, $injector) {
        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();
        $scope.error = $state && $state.params && $state.params.error ? $state.params.error : {};
        $scope.timeoutInterval = $scope.error && $scope.error.config &&
            $scope.error.config.params && $scope.error.config.params.interval ? $scope.error.config.params.interval : 0;
        $scope.onClose = onClose;
        return;
        function appHeader() {
            if (!pipNavService)
                return;
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_AVAILABLE_TITLE';
            pipNavService.actions.hide();
        }
        ;
        function onClose() {
        }
        ;
    }]);
})();
},{}],8:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.MissingRoute', []);
    thisModule.controller('pipErrorMissingRouteController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', function ($scope, $state, $rootScope, $mdMedia, $injector) {
        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        appHeader();
        $rootScope.$routing = false;
        $scope.error = $state && $state.params && $state.params.error ? $state.params.fromState : {};
        $scope.unfoundState = $state && $state.params ? $state.params.unfoundState : {};
        $scope.url = $scope.unfoundState && $scope.unfoundState.to ? $state.href($scope.unfoundState.to, $scope.unfoundState.toParams, { absolute: true }) : '';
        $scope.urlBack = $scope.fromState && $scope.fromState.to ? $state.href($scope.fromState.to, $scope.fromState.fromParams, { absolute: true }) : '';
        $scope.onContinue = onContinue;
        return;
        function appHeader() {
            if (!pipNavService)
                return;
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_ROUTE_PAGE_TITLE';
            pipNavService.actions.hide();
        }
        ;
        function onContinue() {
        }
        ;
    }]);
})();
},{}],9:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.NoConnection', []);
    thisModule.controller('pipErrorNoConnectionController', ['$scope', '$state', '$rootScope', '$window', '$mdMedia', '$injector', function ($scope, $state, $rootScope, $window, $mdMedia, $injector) {
        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope.$routing = false;
        appHeader();
        $scope.error = $state && $state.params && $state.params.error ? $state.params.error : {};
        $scope.onRetry = onRetry;
        return;
        function onRetry() {
            $window.history.back();
        }
        ;
        function appHeader() {
            if (!pipNavService)
                return;
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_RESPONDING_TITLE';
            pipNavService.actions.hide();
        }
        ;
    }]);
})();
},{}],10:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module("pipNoConnectionPanel", ['pipErrors.Translate']);
    thisModule.directive('pipNoConnectionPanel', function () {
        return {
            restrict: 'E',
            scope: {
                error: '=pipError',
                retry: '=pipRetry'
            },
            templateUrl: 'no_connection_panel/no_connection_panel.html',
            controller: 'pipNoConnectionPanelController'
        };
    });
    thisModule.controller('pipNoConnectionPanelController', ['$scope', '$element', '$attrs', 'pipTranslate', function ($scope, $element, $attrs, pipTranslate) {
        $scope.onRetry = onRetry;
        return;
        function onRetry() {
            if ($scope.retry && angular.isFunction($scope.retry))
                $scope.retry();
        }
        ;
    }]);
})();
},{}],11:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unknown', []);
    thisModule.controller('pipErrorUnknownController', ['$scope', '$state', '$rootScope', '$injector', '$mdMedia', function ($scope, $state, $rootScope, $injector, $mdMedia) {
        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope.$routing = false;
        $scope.isCordova = false;
        appHeader();
        $scope.error = $state && $state.params && $state.params.error ? $state.params.error : {};
        $scope.error_details = null;
        $scope.onDetails = onDetails;
        $scope.onClose = onClose;
        parseError();
        return;
        function appHeader() {
            if (!pipNavService)
                return;
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_UNKNOWN_TITLE';
            pipNavService.actions.hide();
        }
        ;
        function parseError() {
            $scope.error_details = {};
            $scope.error_details.code = $scope.error.code;
            $scope.error_details.description = $scope.error.message;
            $scope.error_details.status = $scope.error.status;
            $scope.error_details.server_stacktrace = function () {
            };
            $scope.error_details.client_stacktrace = function () {
            };
        }
        ;
        function onDetails() {
            $scope.showError = true;
        }
        ;
        function onClose() {
        }
        ;
    }]);
})();
},{}],12:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unsupported', []);
    thisModule.controller('pipErrorUnsupportedController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', function ($scope, $state, $rootScope, $mdMedia, $injector) {
        var pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        $scope.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope.$routing = false;
        if (pipNavService) {
            appHeader();
        }
        $scope.error = $state && $state.params && $state.params.error ? $state.params.error : {};
        return;
        function appHeader() {
            pipNavService.appbar.addShadow();
            pipNavService.icon.showMenu();
            pipNavService.breadcrumb.text = 'ERROR_UNSUPPORTED_TITLE';
            pipNavService.actions.hide();
        }
        ;
    }]);
})();
},{}],13:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/maintenance.html',
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div style="background-image: url(\'images/maintenance.svg\');" class="pip-pic"></div><div class="pip-error-text">{{::\'ERROR_AVAILABLE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_AVAILABLE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="timeoutInterval">{{::\'ERROR_AVAILABLE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="isCordova"><md-button class="md-accent" ng-click="onClose($event)" aria-label="CLOSE">{{::\'ERROR_AVAILABLE_CLOSE\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div style="background-image: url(\'images/invalid_route.svg\');" class="pip-pic"></div><div class="pip-error-text">{{::\'ERROR_ROUTE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_ROUTE_SUBTITLE\' | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="CONTINUE" class="md-accent" ng-click="onContinue($event)">{{::\'ERROR_ROUTE_CONTINUE\' | translate}}</md-button></div><div class="h48" ng-if="url"><a ng-href="{{url}}">{{::\'ERROR_ROUTE_TRY_AGAIN\' | translate }}: {{url}}</a></div><div class="h48" ng-if="urlBack"><a ng-href="{{urlBack}}">{{::\'ERROR_ROUTE_GO_BACK\' | translate }}: {{urlBack}}</a></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection_panel/no_connection_panel.html',
    '<div class="pip-error-page pip-error layout-column layout-align-center-center flex"><img src="images/no_response.svg" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_RESPONDING_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_RESPONDING_SUBTITLE\' | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div style="background-image: url(\'images/no_response.svg\');" class="pip-pic"></div><div class="pip-error-text">{{::\'ERROR_RESPONDING_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_RESPONDING_SUBTITLE\' | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div style="background-image: url(\'images/unknown_error.svg\');" class="pip-pic"></div><div class="pip-error-text">{{::\'ERROR_UNKNOWN_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_UNKNOWN_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="showError && error_details && error_details.status"><div ng-if="error_details.code">Code: {{error_details.code}}</div><div ng-if="error_details.description">Description: {{error_details.description}}</div><div ng-if="error_details.status">HTTP status: {{error_details.status}}</div><div ng-if="error_details.server_stacktrace">Server stacktrace: {{error_details.server_stacktrace}}</div><div ng-if="error_details.client_stacktrace">Client stacktrace stacktrace: {{error_details.client_stacktrace}}</div></div><div class="pip-error-actions layout-column layout-align-center-center"><div class="h48" ng-if="isCordova"><md-button aria-label="CLOSE" class="md-accent" ng-click="onClose($event)">{{::\'ERROR_UNKNOWN_CLOSE\' | translate}}</md-button></div><div class="h48"><md-button aria-label="DETAILS" class="md-accent" ng-click="onDetails($event)">{{::\'ERROR_UNKNOWN_DETAILS\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::\'ERROR_UNSUPPORTED_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_UNSUPPORTED_SUBTITLE\' | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="media(\'gt-xs\')"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div><div class="pip-error-details" ng-if="media(\'xs\')"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div></div></div>');
}]);
})();



},{}]},{},[13,1,2,4,3,5,6,7,8,10,9,11,12])(13)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2Vycm9yc19zdHJpbmdzLnRzIiwic3JjL2RlcGVuZGVuY2llcy90cmFuc2xhdGUudHMiLCJzcmMvZXJyb3JzLnRzIiwic3JjL2Vycm9yc19wYWdlcy9lcnJvcnNfcGFnZXMudHMiLCJzcmMvZm9ybXMvY2xlYXJfZXJyb3JzLnRzIiwic3JjL2Zvcm1zL2Zvcm1fZXJyb3JzLnRzIiwic3JjL21haW50ZW5hbmNlL21haW50ZW5hbmNlLnRzIiwic3JjL21pc3Npbmdfcm91dGUvbWlzc2luZ19yb3V0ZS50cyIsInNyYy9ub19jb25uZWN0aW9uL25vX2Nvbm5lY3Rpb24udHMiLCJzcmMvbm9fY29ubmVjdGlvbl9wYW5lbC9ub19jb25uZWN0aW9uX3BhbmVsLnRzIiwic3JjL3Vua25vd24vdW5rbm93bi50cyIsInNyYy91bnN1cHBvcnRlZC91bnN1cHBvcnRlZC50cyIsInRlbXAvcGlwLXdlYnVpLWVycm9ycy1odG1sLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ09BLENBQUM7SUFDRyxZQUFZLENBQUM7SUFFYixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUV2RSxVQUFVLENBQUMsR0FBRyxDQUFDLFVBQVMsU0FBUztRQUM3QixJQUFJLFlBQVksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hGLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUM7UUFHakMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7WUFDNUIsbUJBQW1CLEVBQUUsa0NBQWtDO1lBQ3ZELHNCQUFzQixFQUFFLHlFQUF5RTtZQUNq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UyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzRixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTVFLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFOUMsU0FBUyxFQUFFLENBQUM7UUFDWixVQUFVLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUU1QixNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUM5RixNQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUNqRixNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN0SixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxH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LENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUN0Q0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcclxuICogQGZpbGUgRXJyb3JzIHN0cmluZyByZXNvdXJjZXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuU3RyaW5ncycsIFsncGlwVHJhbnNsYXRlJ10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUucnVuKGZ1bmN0aW9uKCRpbmplY3Rvcikge1xyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgICAgICBpZiAocGlwVHJhbnNsYXRlID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gU2V0IHRyYW5zbGF0aW9uIHN0cmluZ3MgZm9yIHRoZSBtb2R1bGVcclxuICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAgICAgJ0VSUk9SX1JPVVRFX1RJVExFJzogJ1NvcnJ5LCB0aGUgcGFnZSBpc25cXCd0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9TVUJUSVRMRSc6ICdUaGUgbGluayB5b3UgZm9sbG93ZWQgbWF5IGJlIGJyb2tlbiwgb3IgdGhlIHBhZ2UgbWF5IGhhdmUgYmVlbiByZW1vdmVkLicsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9DT05USU5VRSc6ICdDb250aW51ZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9UUllfQUdBSU4nOiAnVHJ5IGFnYWluJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1JPVVRFX0dPX0JBQ0snOiAnR28gQmFjaycsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9QQUdFX1RJVExFJzogJ1dyb25nIHBhZ2UnLFxyXG5cclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fVElUTEUnOiAnT29wcy4gU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9TVUJUSVRMRSc6ICdVbmtub3duIGVycm9yIG9jY3VycmVkLCBidXQgZG9uXFwndCB3b3JyeSB3ZSBhbHJlYWR5IGhhdmUgYmVlbiBub3RpZmllZC4nLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTktOT1dOX0RFVEFJTFMnOiAnRGV0YWlscycsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX1RJVExFJzogJ1RoZSBzZXJ2ZXIgaXMgb24gbWFpbnRlbmFuY2UnLFxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX1NVQlRJVExFJzogJ1NvcnJ5IGZvciB0aGUgaW5jb252ZW5pZW5jZS4gVGhpcyBhcHBsaWNhdGlvbiBpcyB1bmRlcmdvaW5nIG1haW50ZW5hbmNlIGZvciAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYSBzaG9ydCBwZXJpb2QuIFdlXFwnbGwgYmUgYmFjayBzb29uLiBUaGFuayBmb3IgeW91ciBwYXRpZW5jZS4nLFxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX0NMT1NFJzogJ0Nsb3NlJyxcclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9UUllfQUdBSU4nOiAnVHJ5IGFmdGVyJyxcclxuXHJcbiAgICAgICAgICAgICdFUlJPUl9SRVNQT05ESU5HX1RJVExFJzogJ05vIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlcicsXHJcbiAgICAgICAgICAgICdFUlJPUl9SRVNQT05ESU5HX1NVQlRJVExFJzogJ1VuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIuIENoZWNrIHlvdXIgSW50ZXJuZXQgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdFUlJPUl9SRVNQT05ESU5HX1JFVFJZJzogJ1JldHJ5JyxcclxuXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRSc6ICdUaGlzIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZCcsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9TVUJUSVRMRSc6ICdPdXIgYXBwbGljYXRpb24gdXNpbmcgdGhlIGxhdGVzdCB0ZWNobm9sb2d5LiBUaGlzIG1ha2VzIHRoZSBhcHBsaWNhdGlvbiBmYXN0ZXIgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdhbmQgZWFzaWVyIHRvIHVzZS4gVW5mb3J0dW5hdGVseSwgeW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IHRob3NlICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGVjaG5vbG9naWVzLiBEb3dubG9hZCBvbiBvZiB0aGVzZSBncmVhdCBicm93c2VycyBhbmQgeW91XFwnbGwgYmUgb24geW91ciB3YXk6JyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX08nOiAnT3BlcmEnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfT19WRVInOiAnVmVyc2lvbiAzNisnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUUnOiAnSW50ZXJuZXQgRXhwbG9yZXInLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUVfVkVSJzogJ1ZlcnNpb24gMTErJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0dDJzogJ0dvb2dsZSBDaHJvbWUnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfR0NfVkVSJzogJ1ZlcnNpb24gNDgrJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNJzogJ01vemlsbGEgRmlyZWZveCcsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9GTV9WRVInOiAnVmVyc2lvbiA0NSsnXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdydScsIHtcclxuICAgICAgICAgICAgJ0VSUk9SX1JPVVRFX1RJVExFJzogJ1NvcnJ5LCB0aGUgcGFnZSBpc25cXCd0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9TVUJUSVRMRSc6ICdUaGUgbGluayB5b3UgZm9sbG93ZWQgbWF5IGJlIGJyb2tlbiwgb3IgdGhlIHBhZ2UgbWF5IGhhdmUgYmVlbiByZW1vdmVkLicsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9DT05USU5VRSc6ICdDb250aW51ZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9UUllfQUdBSU4nOiAnVHJ5IGFnYWluJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1JPVVRFX0dPX0JBQ0snOiAnR28gQmFjaycsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9QQUdFX1RJVExFJzogJ1dyb25nIHBhZ2UnLFxyXG5cclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fVElUTEUnOiAnT29wcy4gU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9TVUJUSVRMRSc6ICdVbmtub3duIGVycm9yIG9jY3VycmVkLCBidXQgZG9uXFwndCB3b3JyeSB3ZSBhbHJlYWR5IGhhdmUgYmVlbiBub3RpZmllZC4nLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTktOT1dOX0RFVEFJTFMnOiAnRGV0YWlscycsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX1RJVExFJzogJ1RoZSBzZXJ2ZXIgaXMgb24gbWFpbnRlbmFuY2UnLFxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX1NVQlRJVExFJzogJ1NvcnJ5IGZvciB0aGUgaW5jb252ZW5pZW5jZS4gVGhpcyBhcHBsaWNhdGlvbiBpcyB1bmRlcmdvaW5nIG1haW50ZW5hbmNlIGZvciAnICtcclxuICAgICAgICAgICAgJ2Egc2hvcnQgcGVyaW9kLiBXZVxcJ2xsIGJlIGJhY2sgc29vbi4gVGhhbmsgZm9yIHlvdXIgcGF0aWVuY2UuJyxcclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9BVkFJTEFCTEVfVFJZX0FHQUlOJzogJ1RyeSBhZnRlcicsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19USVRMRSc6ICdObyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXInLFxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19TVUJUSVRMRSc6ICdVbmFibGUgdG8gY29ubmVjdCB0byBzZXJ2ZXIuIENoZWNrIHlvdXIgSW50ZXJuZXQgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdFUlJPUl9SRVNQT05ESU5HX1JFVFJZJzogJ1JldHJ5JyxcclxuXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRSc6ICdUaGlzIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZCcsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9TVUJUSVRMRSc6ICdPdXIgYXBwbGljYXRpb24gdXNpbmcgdGhlIGxhdGVzdCB0ZWNobm9sb2d5LiBUaGlzIG1ha2VzIHRoZSBhcHBsaWNhdGlvbiBmYXN0ZXIgJyArXHJcbiAgICAgICAgICAgICdhbmQgZWFzaWVyIHRvIHVzZS4gVW5mb3J0dW5hdGVseSwgeW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IHRob3NlICcgK1xyXG4gICAgICAgICAgICAndGVjaG5vbG9naWVzLiBEb3dubG9hZCBvbiBvZiB0aGVzZSBncmVhdCBicm93c2VycyBhbmQgeW91XFwnbGwgYmUgb24geW91ciB3YXk6JywgICAgICAgICAgICBcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX08nOiAnT3BlcmEnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfT19WRVInOiAnVmVyc2lvbiAzNSsnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUUnOiAnSW50ZXJuZXQgRXhwbG9yZXInLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUVfVkVSJzogJ1ZlcnNpb24gMTErJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0dDJzogJ0dvb2dsZSBDaHJvbWUnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfR0NfVkVSJzogJ1ZlcnNpb24gNDcrJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNJzogJ01vemlsbGEgRmlyZWZveCcsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9GTV9WRVInOiAnVmVyc2lvbiA0MysnXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKiBAZmlsZSBPcHRpb25hbCBmaWx0ZXIgdG8gdHJhbnNsYXRlIHN0cmluZyByZXNvdXJjZXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcbiBcclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIHRoaXNNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRyYW5zbGF0ZScsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmZpbHRlcigndHJhbnNsYXRlJywgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xyXG4gICAgICAgIHZhciBwaXBUcmFuc2xhdGUgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSBcclxuICAgICAgICAgICAgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwaXBUcmFuc2xhdGUgID8gcGlwVHJhbnNsYXRlLnRyYW5zbGF0ZShrZXkpIHx8IGtleSA6IGtleTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIu+7vy8qKlxyXG4gKiBAZmlsZSBSZWdpc3RyYXRpb24gb2YgYWxsIGVycm9yIGhhbmRsaW5nIGNvbXBvbmVudHNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzJywgW1xyXG4gICAgICAgICdwaXBFcnJvcnMuUGFnZXMnLFxyXG4gICAgICAgICdwaXBOb0Nvbm5lY3Rpb25QYW5lbCcsXHJcbiAgICAgICAgJ3BpcENsZWFyRXJyb3JzJyxcclxuXHQgICAgJ3BpcEZvcm1FcnJvcnMnXHJcbiAgICBdKTtcclxuICAgIFxyXG59KSgpOyIsIi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5QYWdlcycsIFtcclxuICAgICAgICAnbmdNYXRlcmlhbCcsIFxyXG4gICAgICAgICdwaXBFcnJvcnMuU3RyaW5ncycsICdwaXBFcnJvcnMuTm9Db25uZWN0aW9uJywgJ3BpcEVycm9ycy5NaXNzaW5nUm91dGUnLCAncGlwRXJyb3JzLlVuc3VwcG9ydGVkJyxcclxuICAgICAgICAncGlwRXJyb3JzLlVua25vd24nLCAncGlwRXJyb3JzLk1haW50ZW5hbmNlJywgJ3BpcEVycm9ycy5UcmFuc2xhdGUnLCAncGlwRXJyb3JzLlRlbXBsYXRlcydcclxuICAgIF0pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuY29uZmlnKFxyXG4gICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgICAgICAgICAvLyBBdHRhY2ggaW50ZXJjZXB0b3IgdG8gcmVhY3Qgb24gdW5hdXRob3JpemVkIGVycm9yc1xyXG4gICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdwaXBBdXRoSHR0cFJlc3BvbnNlSW50ZXJjZXB0b3InKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSBtb2R1bGUgcm91dGVzXHJcbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2Vycm9yc19ub19jb25uZWN0aW9uJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbm9fY29ubmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncGlwRXJyb3JOb0Nvbm5lY3Rpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ25vX2Nvbm5lY3Rpb24vbm9fY29ubmVjdGlvbi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnZXJyb3JzX21haW50ZW5hbmNlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbWFpbnRlbmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yTWFpbnRlbmFuY2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21haW50ZW5hbmNlL21haW50ZW5hbmNlLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdlcnJvcnNfbWlzc2luZ19yb3V0ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZXJyb3JzL21pc3Npbmdfcm91dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmZvdW5kU3RhdGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21TdGF0ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yTWlzc2luZ1JvdXRlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtaXNzaW5nX3JvdXRlL21pc3Npbmdfcm91dGUuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2Vycm9yc191bnN1cHBvcnRlZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZXJyb3JzL3Vuc3VwcG9ydGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBFcnJvclVuc3VwcG9ydGVkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd1bnN1cHBvcnRlZC91bnN1cHBvcnRlZC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnZXJyb3JzX3Vua25vd24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2Vycm9ycy91bmtub3duJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBFcnJvclVua25vd25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Vua25vd24vdW5rbm93bi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIHRoaXNNb2R1bGUucnVuKFxyXG4gICAgICAgIGZ1bmN0aW9uKCRyb290U2NvcGUsICRzdGF0ZSwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgICAgIGNoZWNrU3VwcG9ydGVkKCk7XHJcblxyXG4gICAgICAgICAgICAvLyBIYW5kbGUgb3RoZXIgZXJyb3JzXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBNYWludGVuYW5jZUVycm9yJywgbWFpbnRlbmFuY2VFcnJvcik7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBOb0Nvbm5lY3Rpb25FcnJvcicsIG5vQ29ubmVjdGlvbkVycm9yKTsgXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBVbmtub3duRXJyb3InLCB1bmtub3duRXJyb3IpOyBcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGV2ZW50LCB1bmZvdW5kU3RhdGUsIGZyb21TdGF0ZSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3JzX21pc3Npbmdfcm91dGUnLCAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlOiB1bmZvdW5kU3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tU3RhdGUgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG86IGZyb21TdGF0ZSA/IGZyb21TdGF0ZS5uYW1lIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbVBhcmFtczogZnJvbVBhcmFtc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRyb3V0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBnb1RvRXJyb3JzICh0b1N0YXRlLCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0b1N0YXRlID09IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBzdGF0ZSB3YXMgbm90IGRlZmluZWQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28odG9TdGF0ZSwgcGFyYW1zKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG1haW50ZW5hbmNlRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub0Vycm9ycygnZXJyb3JzX21haW50ZW5hbmNlJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gbm9Db25uZWN0aW9uRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub0Vycm9ycygnZXJyb3JzX25vX2Nvbm5lY3Rpb24nLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiB1bmtub3duRXJyb3IoZXZlbnQsIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgZ29Ub0Vycm9ycygnZXJyb3JzX3Vua25vd24nLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBjaGVja1N1cHBvcnRlZChzdXBwb3J0ZWQ/OiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICBsZXQgcGlwU3lzdGVtSW5mbyA9ICRpbmplY3Rvci5oYXMoJ3BpcFN5c3RlbUluZm8nKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFN5c3RlbUluZm8nKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgaWYgKCFwaXBTeXN0ZW1JbmZvKSB7IHJldHVybiA7IH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyB0b2RvIG1ha2UgY29uZmlndXJlZFxyXG4gICAgICAgICAgICAgICAgaWYgKCFzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdXBwb3J0ZWQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkZ2U6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZTogMTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmVmb3g6IDQzLCAvLzQsIGZvciB0ZXN0aW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhOiAzNSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hyb21lOiA0N1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJyb3dzZXIgPSBwaXBTeXN0ZW1JbmZvLmJyb3dzZXJOYW1lO1xyXG4gICAgICAgICAgICAgICAgbGV0IHZlcnNpb24gPSBwaXBTeXN0ZW1JbmZvLmJyb3dzZXJWZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24uc3BsaXQoXCIuXCIpWzBdXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGJyb3dzZXIgJiYgc3VwcG9ydGVkW2Jyb3dzZXJdICYmIHZlcnNpb24gPj0gc3VwcG9ydGVkW2Jyb3dzZXJdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZXJyb3JzX3Vuc3VwcG9ydGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmZhY3RvcnkoJ3BpcEF1dGhIdHRwUmVzcG9uc2VJbnRlcmNlcHRvcicsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRxLCAkbG9jYXRpb24sICRyb290U2NvcGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZWplY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdG9TdGF0ZSA9ICRyb290U2NvcGUuJHN0YXRlICYmICRyb290U2NvcGUuJHN0YXRlLm5hbWUgPyAkcm9vdFNjb3BlLiRzdGF0ZS5uYW1lIDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9QYXJhbXMgPSAkcm9vdFNjb3BlLiRzdGF0ZSAmJiAkcm9vdFNjb3BlLiRzdGF0ZS5wYXJhbXMgPyAkcm9vdFNjb3BlLiRzdGF0ZS5wYXJhbXMgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHJlamVjdGlvbi5zdGF0dXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1MDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdmFpbGFibGUgKG1haW50ZW5hbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwTWFpbnRlbmFuY2VFcnJvcicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiZXJyb3JzX21haW50ZW5hbmNlXCIsIHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJHJvb3RTY29wZS4kaWRlbnRpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwTm9Db25uZWN0aW9uRXJyb3InLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHJlamVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcImVycm9yc19ub19jb25uZWN0aW9uXCIsIHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcnNfdW5rbm93blwiLCByZWplY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxufSkoKTtcclxuIFxyXG4iLCIvKipcclxuICogQGZpbGUgU3BlY2lhbCBlcnJvciBoYW5kbGluZyBmb3IgZm9ybXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBDbGVhckVycm9ycycsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmRpcmVjdGl2ZSgncGlwQ2xlYXJFcnJvcnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgcmVxdWlyZTogWyduZ01vZGVsJywgJ14/Zm9ybSddLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzOiBhbnksICRjdHJscykge1xyXG4gICAgICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ29udHJvbGxlciA9ICRjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCRhdHRycy5uZ01vZGVsLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpZWxkRXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGb3JtRXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckZpZWxkRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBmaWVsZENvbnRyb2xsZXIuJGVycm9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3Auc3Vic3RyaW5nKDAsIDYpID09ICdFUlJPUl8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZENvbnRyb2xsZXIuJHNldFZhbGlkaXR5KHByb3AsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckZvcm1FcnJvcnMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xsZXIuJHNlcnZlckVycm9yID0ge307XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICogQGZpbGUgRm9ybSBlcnJvciB1dGlsaXRpZXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICpcclxuICovXHJcbiBcclxuIC8qIGdsb2JhbCBfLCBhbmd1bGFyICovXHJcbiBcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBGb3JtRXJyb3JzJywgW10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuZmFjdG9yeSgncGlwRm9ybUVycm9ycycsIGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlcnJvcnNXaXRoSGludDogZXJyb3JzV2l0aEhpbnQsXHJcbiAgICAgICAgICAgIC8vc3VibWl0dGVkRXJyb3JzOiBzdWJtaXR0ZWRFcnJvcnMsXHJcbiAgICAgICAgICAgIC8vc3VibWl0dGVkRXJyb3JzV2l0aEhpbnQ6IHN1Ym1pdHRlZEVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICAvL2RpcnR5RXJyb3JzOiBkaXJ0eUVycm9ycyxcclxuICAgICAgICAgICAgLy9kaXJ0eUVycm9yc1dpdGhIaW50OiBkaXJ0eUVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICAvL3RvdWNoZWRFcnJvcnM6IHRvdWNoZWRFcnJvcnMsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvdWNoZWRFcnJvcnNXaXRoSGludDogdG91Y2hlZEVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICByZXNldEZvcm1FcnJvcnM6IHJlc2V0Rm9ybUVycm9ycyxcclxuICAgICAgICAgICAgc2V0Rm9ybUVycm9yOiBzZXRGb3JtRXJyb3IsXHJcbiAgICAgICAgICAgIHJlc2V0RmllbGRzRXJyb3JzOiByZXNldEZpZWxkc0Vycm9yc1xyXG5cdFx0fTtcclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcnNXaXRoSGludChmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cdFx0XHRcclxuICAgICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eShmaWVsZC4kZXJyb3IpID8geyBoaW50OiB0cnVlIH0gOiBmaWVsZC4kZXJyb3I7XHJcbiAgICAgICAgfTtcclxuXHRcdFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIHN1Ym1pdHRlZEVycm9ycyhmb3JtLCBmaWVsZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gaXMgbm90IHNldCcpO1xyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBpcyBub3Qgc2V0Jyk7XHJcbi8vIFxyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybS4kc3VibWl0dGVkKVxyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLiRlcnJvcjtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4vLyAgICAgICAgIH07XHJcbi8vIFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIHN1Ym1pdHRlZEVycm9yc1dpdGhIaW50KGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gXHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtLiRzdWJtaXR0ZWQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoZmllbGQuJGVycm9yKSA/IHsgaGludDogdHJ1ZX0gOiBmaWVsZC4kZXJyb3I7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHsgaGludDogdHJ1ZSB9O1xyXG4vLyAgICAgICAgIH07XHJcbi8vIFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIGRpcnR5RXJyb3JzKGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gXHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZC4kZGlydHkgfHwgZm9ybS4kZGlydHkpXHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuJGVycm9yO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4ge307XHJcbi8vICAgICAgICAgfTtcclxuLy8gXHJcbi8vICAgICAgICAgZnVuY3Rpb24gZGlydHlFcnJvcnNXaXRoSGludChmb3JtLCBmaWVsZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gaXMgbm90IHNldCcpO1xyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBpcyBub3Qgc2V0Jyk7XHJcbi8vIFxyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQuJGRpcnR5IHx8IGZvcm0uJGRpcnR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KGZpZWxkLiRlcnJvcikgPyB7IGhpbnQ6IHRydWV9IDogZmllbGQuJGVycm9yO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB7IGhpbnQ6IHRydWUgfTtcclxuLy8gICAgICAgICB9O1xyXG4vLyBcclxuLy8gICAgICAgICBmdW5jdGlvbiB0b3VjaGVkRXJyb3JzKGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZC4kdG91Y2hlZCB8fCBmb3JtLiRkaXJ0eSlcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC4kZXJyb3I7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB7fTtcclxuLy8gICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b3VjaGVkRXJyb3JzV2l0aEhpbnQoZm9ybSwgZmllbGQpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZvcm0uJHN1Ym1pdHRlZCAmJiAoZmllbGQuJHRvdWNoZWQgfHwgZm9ybS4kZGlydHkpIHx8ICFmb3JtLiRzdWJtaXR0ZWQgJiYgKGZpZWxkLiR0b3VjaGVkIHx8IGZpZWxkLiRkaXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfLmlzRW1wdHkoZmllbGQuJGVycm9yKSA/IHsgaGludDogdHJ1ZX0gOiBmaWVsZC4kZXJyb3I7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7IGhpbnQ6IHRydWUgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNldEZvcm1FcnJvcnMoZm9ybSwgZXJyb3JzKSB7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldFVudG91Y2hlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS4kc2V0RGlydHkoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uJHNldFN1Ym1pdHRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvciA9IHt9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRGaWVsZHNFcnJvcnMoZm9ybSwgZmllbGQpIHtcclxuICAgICAgICAgICAgaWYgKCFmb3JtKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChmaWVsZCAmJiBmb3JtW2ZpZWxkXSAmJiBmb3JtW2ZpZWxkXS4kZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICBmb3JtW2ZpZWxkXS4kZXJyb3IgPSB7fTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtW3Byb3BdICYmIGZvcm1bcHJvcF0uJGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1bcHJvcF0uJGVycm9yID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmb3JtICYmIGZvcm0uJGVycm9yKSBmb3JtLiRlcnJvciA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzZXRGb3JtRXJyb3IoZm9ybSwgZXJyb3IsIGVycm9yRmllbGRNYXApIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gUHJlcGFyZSBmb3JtIHNlcnZlciBlcnJvcnNcclxuICAgICAgICAgICAgZm9ybS4kc2VydmVyRXJyb3IgPSBmb3JtLiRzZXJ2ZXJFcnJvciB8fCB7fTtcclxuICAgICAgICAgICAgLy8gUHJlcGFyZSBlcnJvciBjb2RlXHJcbiAgICAgICAgICAgIHZhciBjb2RlID0gZXJyb3IuY29kZSB8fCAoZXJyb3IuZGF0YSB8fCB7fSkuY29kZSB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWNvZGUgJiYgZXJyb3Iuc3RhdHVzKSBjb2RlID0gZXJyb3Iuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBcclxuICAgICAgICAgICAgICAgICAgICBlcnJvck5hbWUgPSAnRVJST1JfJyArIGNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBlcnJvckZpZWxkTWFwID8gZXJyb3JGaWVsZE1hcFtjb2RlXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgc2VydmVyIGVycm9yIHRvIGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkICYmIGZvcm1bZmllbGRdICYmIGZvcm1bZmllbGRdLiRzZXRWYWxpZGl0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1bZmllbGRdLiRzZXRWYWxpZGl0eShlcnJvck5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHNlcnZlciBlcnJvciB0byBmb3JtXHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQgPT0gJ2Zvcm0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS4kc2VydmVyRXJyb3JbZXJyb3JOYW1lXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB1bmRlZmluZWQgZXJyb3IgZm9yIHRoaXMgZm9ybSBvciBjb2RlID09PSB1bmRlZmluZWQvbnVsbCwgZ28gdG8gdW5oYW5kbGVkIGVycm9yIHBhZ2VcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgZXJyb3IuZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3IuZGF0YS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBhcyB1bmRlZmluZWQgZXJyb3JcclxuICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uJHNlcnZlckVycm9yWydFUlJPUl9VTktOT1dOJ10gPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3IubmFtZTtcclxuICAgICAgICAgICAgICAgIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3I7XHJcbiAgICAgICAgICAgIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwVW5oYW5kbGVkSW50ZXJuYWxFcnJvcicsIHtcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICogQGZpbGUgTWFpbnRlbmFuY2UgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5NYWludGVuYW5jZScsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yTWFpbnRlbmFuY2VDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJGluamVjdG9yKSB7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kcm91dGluZyA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5pc0NvcmRvdmEgPSBmYWxzZTtcclxuICAgICAgICBhcHBIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmVycm9yID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgJiYgJHN0YXRlLnBhcmFtcy5lcnJvciA/ICAkc3RhdGUucGFyYW1zLmVycm9yIDoge307XHJcbiAgICAgICAgJHNjb3BlLnRpbWVvdXRJbnRlcnZhbCA9ICRzY29wZS5lcnJvciAmJiAkc2NvcGUuZXJyb3IuY29uZmlnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvci5jb25maWcucGFyYW1zICYmICRzY29wZS5lcnJvci5jb25maWcucGFyYW1zLmludGVydmFsID8gJHNjb3BlLmVycm9yLmNvbmZpZy5wYXJhbXMuaW50ZXJ2YWwgOiAwO1xyXG5cclxuICAgICAgICAkc2NvcGUub25DbG9zZSA9IG9uQ2xvc2U7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXBwSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE5hdlNlcnZpY2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5icmVhZGNydW1iLnRleHQgPSAnRVJST1JfQVZBSUxBQkxFX1RJVExFJztcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hY3Rpb25zLmhpZGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkNsb3NlKCkge1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pO1xyXG5cclxufSkoKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlIE1pc3Npbmcgcm91dGUgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5NaXNzaW5nUm91dGUnLCBbXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5jb250cm9sbGVyKCdwaXBFcnJvck1pc3NpbmdSb3V0ZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsICRyb290U2NvcGUsICRtZE1lZGlhLCAkaW5qZWN0b3IpIHtcclxuXHJcbiAgICAgICAgdmFyIHBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG4gICAgICAgIHZhciBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICBhcHBIZWFkZXIoKTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRyb3V0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgICAgICRzY29wZS5lcnJvciA9ICRzdGF0ZSAmJiAkc3RhdGUucGFyYW1zICYmICRzdGF0ZS5wYXJhbXMuZXJyb3IgPyAgJHN0YXRlLnBhcmFtcy5mcm9tU3RhdGUgOiB7fTtcclxuICAgICAgICAkc2NvcGUudW5mb3VuZFN0YXRlID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgPyAgJHN0YXRlLnBhcmFtcy51bmZvdW5kU3RhdGUgOiB7fTtcclxuICAgICAgICAkc2NvcGUudXJsID0gJHNjb3BlLnVuZm91bmRTdGF0ZSAmJiAkc2NvcGUudW5mb3VuZFN0YXRlLnRvID8gJHN0YXRlLmhyZWYoJHNjb3BlLnVuZm91bmRTdGF0ZS50bywgJHNjb3BlLnVuZm91bmRTdGF0ZS50b1BhcmFtcywge2Fic29sdXRlOiB0cnVlfSkgOiAnJztcclxuICAgICAgICAkc2NvcGUudXJsQmFjayA9ICRzY29wZS5mcm9tU3RhdGUgJiYgJHNjb3BlLmZyb21TdGF0ZS50byA/ICRzdGF0ZS5ocmVmKCRzY29wZS5mcm9tU3RhdGUudG8sICRzY29wZS5mcm9tU3RhdGUuZnJvbVBhcmFtcywge2Fic29sdXRlOiB0cnVlfSkgOiAnJztcclxuXHJcbiAgICAgICAgJHNjb3BlLm9uQ29udGludWUgPSBvbkNvbnRpbnVlO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFwcEhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBOYXZTZXJ2aWNlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFwcGJhci5hZGRTaGFkb3coKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYnJlYWRjcnVtYi50ZXh0ID0gJ0VSUk9SX1JPVVRFX1BBR0VfVElUTEUnO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFjdGlvbnMuaGlkZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ29udGludWUoKSB7XHJcbiAgICAgICAgICAgIC8vIFRvZG86IEdvIHRvIGRlZmF1bHQgc3RhdGUgJy8nXHJcbiAgICAgICAgICAgIC8vcGlwQXV0aFN0YXRlLmdvVG9BdXRob3JpemVkKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZSBObyBjb25uZWN0aW9uIGVycm9yIGNvbnRyb2xsZXJcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuTm9Db25uZWN0aW9uJywgW10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuY29udHJvbGxlcigncGlwRXJyb3JOb0Nvbm5lY3Rpb25Db250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbWRNZWRpYSwgJGluamVjdG9yKSB7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kcm91dGluZyA9IGZhbHNlO1xyXG4gICAgICAgIGFwcEhlYWRlcigpO1xyXG5cclxuICAgICAgICAkc2NvcGUuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zLmVycm9yID8gICRzdGF0ZS5wYXJhbXMuZXJyb3IgOiB7fTtcclxuXHJcbiAgICAgICAgJHNjb3BlLm9uUmV0cnkgPSBvblJldHJ5O1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uUmV0cnkoKSB7XHJcbiAgICAgICAgICAgICR3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXBwSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE5hdlNlcnZpY2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5icmVhZGNydW1iLnRleHQgPSAnRVJST1JfUkVTUE9ORElOR19USVRMRSc7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59KSgpO1xyXG4iLCIvKipcclxuICogQGZpbGUgTm8gQ29ubmVjdGlvbiBFcnJvciBwYW5lbFxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBfLCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJwaXBOb0Nvbm5lY3Rpb25QYW5lbFwiLCBbJ3BpcEVycm9ycy5UcmFuc2xhdGUnXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5kaXJlY3RpdmUoJ3BpcE5vQ29ubmVjdGlvblBhbmVsJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJz1waXBFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0cnk6ICc9cGlwUmV0cnknXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdub19jb25uZWN0aW9uX3BhbmVsL25vX2Nvbm5lY3Rpb25fcGFuZWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncGlwTm9Db25uZWN0aW9uUGFuZWxDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5jb250cm9sbGVyKCdwaXBOb0Nvbm5lY3Rpb25QYW5lbENvbnRyb2xsZXInLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBpcFRyYW5zbGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9uUmV0cnkgPSBvblJldHJ5O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25SZXRyeSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUucmV0cnkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5yZXRyeSkpICRzY29wZS5yZXRyeSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIi8qKlxyXG4gKiBAZmlsZSBVbmtub3duIGVycm9yIGNvbnRyb2xsZXJcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVW5rbm93bicsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yVW5rbm93bkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsICRyb290U2NvcGUsICRpbmplY3RvciwgJG1kTWVkaWEpIHtcclxuXHJcbiAgICAgICAgdmFyIHBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG4gICAgICAgIHZhciBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgJHNjb3BlLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlLiRyb3V0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgJHNjb3BlLmlzQ29yZG92YSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBhcHBIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmVycm9yID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgJiYgJHN0YXRlLnBhcmFtcy5lcnJvciA/ICAkc3RhdGUucGFyYW1zLmVycm9yIDoge307XHJcbiAgICAgICAgJHNjb3BlLmVycm9yX2RldGFpbHMgPSBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUub25EZXRhaWxzID0gb25EZXRhaWxzO1xyXG4gICAgICAgICRzY29wZS5vbkNsb3NlID0gb25DbG9zZTtcclxuXHJcbiAgICAgICAgcGFyc2VFcnJvcigpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFwcEhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBOYXZTZXJ2aWNlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFwcGJhci5hZGRTaGFkb3coKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYnJlYWRjcnVtYi50ZXh0ID0gJ0VSUk9SX1VOS05PV05fVElUTEUnO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFjdGlvbnMuaGlkZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlRXJyb3IoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzID0ge307XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLmNvZGUgPSAkc2NvcGUuZXJyb3IuY29kZTtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yX2RldGFpbHMuZGVzY3JpcHRpb24gPSAkc2NvcGUuZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yX2RldGFpbHMuc3RhdHVzID0gJHNjb3BlLmVycm9yLnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLnNlcnZlcl9zdGFja3RyYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLmNsaWVudF9zdGFja3RyYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkRldGFpbHMoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ2xvc2UoKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCIvKipcclxuICogQGZpbGUgVW5zdXBwb3J0ZWQgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5VbnN1cHBvcnRlZCcsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yVW5zdXBwb3J0ZWRDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJGluamVjdG9yKSB7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRyb3V0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHBpcE5hdlNlcnZpY2UpIHtcclxuICAgICAgICAgICAgYXBwSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zLmVycm9yID8gICRzdGF0ZS5wYXJhbXMuZXJyb3IgOiB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUb2RvOiBNYWRlIGRlcGVuZGVuY2llcyBvcHRpb25hbFxyXG4gICAgICAgIGZ1bmN0aW9uIGFwcEhlYWRlcigpIHtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hcHBiYXIuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuaWNvbi5zaG93TWVudSgpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9ICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRSc7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtYWludGVuYW5jZS9tYWludGVuYW5jZS5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9tYWludGVuYW5jZS5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfU1VCVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiIG5nLWlmPVwidGltZW91dEludGVydmFsXCI+e3s6OlxcJ0VSUk9SX0FWQUlMQUJMRV9UUllfQUdBSU5cXCcgfCB0cmFuc2xhdGV9fSB7e3RpbWVvdXRJbnRlcnZhbH19IHNlYy48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIiBuZy1pZj1cImlzQ29yZG92YVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIm9uQ2xvc2UoJGV2ZW50KVwiIGFyaWEtbGFiZWw9XCJDTE9TRVwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfQ0xPU0VcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21pc3Npbmdfcm91dGUvbWlzc2luZ19yb3V0ZS5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9pbnZhbGlkX3JvdXRlLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci10ZXh0XCI+e3s6OlxcJ0VSUk9SX1JPVVRFX1RJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIj57ezo6XFwnRVJST1JfUk9VVEVfU1VCVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItYWN0aW9ucyBoNDggbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxtZC1idXR0b24gYXJpYS1sYWJlbD1cIkNPTlRJTlVFXCIgY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIm9uQ29udGludWUoJGV2ZW50KVwiPnt7OjpcXCdFUlJPUl9ST1VURV9DT05USU5VRVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cImg0OFwiIG5nLWlmPVwidXJsXCI+PGEgbmctaHJlZj1cInt7dXJsfX1cIj57ezo6XFwnRVJST1JfUk9VVEVfVFJZX0FHQUlOXFwnIHwgdHJhbnNsYXRlIH19OiB7e3VybH19PC9hPjwvZGl2PjxkaXYgY2xhc3M9XCJoNDhcIiBuZy1pZj1cInVybEJhY2tcIj48YSBuZy1ocmVmPVwie3t1cmxCYWNrfX1cIj57ezo6XFwnRVJST1JfUk9VVEVfR09fQkFDS1xcJyB8IHRyYW5zbGF0ZSB9fToge3t1cmxCYWNrfX08L2E+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbm9fY29ubmVjdGlvbl9wYW5lbC9ub19jb25uZWN0aW9uX3BhbmVsLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yLXBhZ2UgcGlwLWVycm9yIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXIgZmxleFwiPjxpbWcgc3JjPVwiaW1hZ2VzL25vX3Jlc3BvbnNlLnN2Z1wiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9SRVNQT05ESU5HX1RJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIj57ezo6XFwnRVJST1JfUkVTUE9ORElOR19TVUJUSVRMRVxcJyB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGg0OCBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PG1kLWJ1dHRvbiBhcmlhLWxhYmVsPVwiUkVUUllcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwib25SZXRyeSgkZXZlbnQpXCI+e3s6OlxcJ0VSUk9SX1JFU1BPTkRJTkdfUkVUUllcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25vX2Nvbm5lY3Rpb24vbm9fY29ubmVjdGlvbi5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9ub19yZXNwb25zZS5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9SRVNQT05ESU5HX1RJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIj57ezo6XFwnRVJST1JfUkVTUE9ORElOR19TVUJUSVRMRVxcJyB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGg0OCBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PG1kLWJ1dHRvbiBhcmlhLWxhYmVsPVwiUkVUUllcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwib25SZXRyeSgkZXZlbnQpXCI+e3s6OlxcJ0VSUk9SX1JFU1BPTkRJTkdfUkVUUllcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3Vua25vd24vdW5rbm93bi5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy91bmtub3duX2Vycm9yLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci10ZXh0XCI+e3s6OlxcJ0VSUk9SX1VOS05PV05fVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjpcXCdFUlJPUl9VTktOT1dOX1NVQlRJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIiBuZy1pZj1cInNob3dFcnJvciAmJiBlcnJvcl9kZXRhaWxzICYmIGVycm9yX2RldGFpbHMuc3RhdHVzXCI+PGRpdiBuZy1pZj1cImVycm9yX2RldGFpbHMuY29kZVwiPkNvZGU6IHt7ZXJyb3JfZGV0YWlscy5jb2RlfX08L2Rpdj48ZGl2IG5nLWlmPVwiZXJyb3JfZGV0YWlscy5kZXNjcmlwdGlvblwiPkRlc2NyaXB0aW9uOiB7e2Vycm9yX2RldGFpbHMuZGVzY3JpcHRpb259fTwvZGl2PjxkaXYgbmctaWY9XCJlcnJvcl9kZXRhaWxzLnN0YXR1c1wiPkhUVFAgc3RhdHVzOiB7e2Vycm9yX2RldGFpbHMuc3RhdHVzfX08L2Rpdj48ZGl2IG5nLWlmPVwiZXJyb3JfZGV0YWlscy5zZXJ2ZXJfc3RhY2t0cmFjZVwiPlNlcnZlciBzdGFja3RyYWNlOiB7e2Vycm9yX2RldGFpbHMuc2VydmVyX3N0YWNrdHJhY2V9fTwvZGl2PjxkaXYgbmctaWY9XCJlcnJvcl9kZXRhaWxzLmNsaWVudF9zdGFja3RyYWNlXCI+Q2xpZW50IHN0YWNrdHJhY2Ugc3RhY2t0cmFjZToge3tlcnJvcl9kZXRhaWxzLmNsaWVudF9zdGFja3RyYWNlfX08L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgY2xhc3M9XCJoNDhcIiBuZy1pZj1cImlzQ29yZG92YVwiPjxtZC1idXR0b24gYXJpYS1sYWJlbD1cIkNMT1NFXCIgY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIm9uQ2xvc2UoJGV2ZW50KVwiPnt7OjpcXCdFUlJPUl9VTktOT1dOX0NMT1NFXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVwiaDQ4XCI+PG1kLWJ1dHRvbiBhcmlhLWxhYmVsPVwiREVUQUlMU1wiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCJvbkRldGFpbHMoJGV2ZW50KVwiPnt7OjpcXCdFUlJPUl9VTktOT1dOX0RFVEFJTFNcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ3Vuc3VwcG9ydGVkL3Vuc3VwcG9ydGVkLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yIHBpcC1lcnJvci1wYWdlIGxheW91dC1jb2x1bW4gZmxleCBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRVxcJyB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX1NVQlRJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiIG5nLWlmPVwibWVkaWEoXFwnZ3QteHNcXCcpXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2llLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9kb3dubG9hZC9pbnRlcm5ldC1leHBsb3Jlci0xMS1mb3Itd2luZG93cy03LWRldGFpbHMuYXNweFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRVxcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRV9WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvZm0uc3ZnXFwnKTtcIiBjbGFzcz1cInBpcC1waWNcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaDY0IHRwMTYgYnAxNlwiPjxhIGNsYXNzPVwidGV4dC1ib2R5MiBtMFwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tb3ppbGxhLm9yZy9ydS9maXJlZm94L25ldy9cIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSXFwnIHwgdHJhbnNsYXRlfX08L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2djLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9jaHJvbWUvYnJvd3Nlci9kZXNrdG9wL2luZGV4Lmh0bWw/cGxhdGZvcm09d2luNjQjXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0dDXFwnIHwgdHJhbnNsYXRlfX08L2E+PHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIG0wXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0dDX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9vLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL3d3dy5vcGVyYS5jb20vcnUvZG93bmxvYWRcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9PX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlsc1wiIG5nLWlmPVwibWVkaWEoXFwneHNcXCcpXCI+PGRpdiBjbGFzcz1cImxheW91dC1yb3cgbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvaWUuc3ZnXFwnKTtcIiBjbGFzcz1cInBpcC1waWNcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaDY0IHRwMTYgYnAxNlwiPjxhIGNsYXNzPVwidGV4dC1ib2R5MiBtMFwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5taWNyb3NvZnQuY29tL2VuLXVzL2Rvd25sb2FkL2ludGVybmV0LWV4cGxvcmVyLTExLWZvci13aW5kb3dzLTctZGV0YWlscy5hc3B4XCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0lFXFwnIHwgdHJhbnNsYXRlfX08L2E+PHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIG0wXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0lFX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9mbS5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1vemlsbGEub3JnL3J1L2ZpcmVmb3gvbmV3L1wiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9GTVxcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9GTV9WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwidG0xNiBsYXlvdXQtcm93IGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2djLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9jaHJvbWUvYnJvd3Nlci9kZXNrdG9wL2luZGV4Lmh0bWw/cGxhdGZvcm09d2luNjQjXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0dDXFwnIHwgdHJhbnNsYXRlfX08L2E+PHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIG0wXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0dDX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9vLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL3d3dy5vcGVyYS5jb20vcnUvZG93bmxvYWRcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9PX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGlwLXdlYnVpLWVycm9ycy1odG1sLm1pbi5qcy5tYXBcbiJdfQ==