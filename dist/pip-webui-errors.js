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
        'pipErrorsService',
        'pipNoConnectionPanel',
        'pipClearErrors',
        'pipFormErrors'
    ]);
})();
},{}],4:[function(require,module,exports){
'use strict';
angular.module('pipErrorsService', []);
require("./errors_service");
},{"./errors_service":6}],5:[function(require,module,exports){
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
    thisModule.run(['$rootScope', '$state', '$injector', 'pipErrorsService', function ($rootScope, $state, $injector, pipErrorsService) {
        var errorConfig = pipErrorsService.config;
        if (errorConfig.Unsupported.Active) {
            checkSupported();
        }
        if (errorConfig.MissingRoute.Active) {
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
        };
    }]);
})();
},{}],6:[function(require,module,exports){
'use strict';
var ErrorStateItem = (function () {
    function ErrorStateItem() {
    }
    return ErrorStateItem;
}());
exports.ErrorStateItem = ErrorStateItem;
var pipErrorsConfig = (function () {
    function pipErrorsConfig() {
        this.Maintenance = {
            Active: true,
            Name: 'errors_maintenance',
            Event: 'pipMaintenanceError',
            Title: 'ERROR_AVAILABLE_TITLE',
            SubTitle: 'ERROR_AVAILABLE_SUBTITLE',
            Breadcrumb: 'ERROR_AVAILABLE_TITLE',
            Image: 'images/maintenance.svg'
        };
        this.MissingRoute = {
            Active: true,
            Name: 'errors_missing_route',
            Event: '$stateNotFound',
            Title: 'ERROR_ROUTE_TITLE',
            SubTitle: 'ERROR_ROUTE_SUBTITLE',
            Breadcrumb: 'ERROR_ROUTE_PAGE_TITLE',
            Image: 'images/invalid_route.svg'
        };
        this.NoConnection = {
            Active: true,
            Name: 'errors_no_connection',
            Event: 'pipNoConnectionError',
            Title: 'ERROR_RESPONDING_TITLE',
            SubTitle: 'ERROR_RESPONDING_SUBTITLE',
            Breadcrumb: 'ERROR_RESPONDING_TITLE',
            Image: 'images/no_response.svg'
        };
        this.Unknown = {
            Active: true,
            Name: 'errors_unknown',
            Event: 'pipUnknownError',
            Title: 'ERROR_UNKNOWN_TITLE',
            SubTitle: 'ERROR_UNKNOWN_SUBTITLE',
            Breadcrumb: 'ERROR_UNKNOWN_TITLE',
            Image: 'images/unknown_error.svg'
        };
        this.Unsupported = {
            Active: true,
            Name: 'errors_unsupported',
            Event: '',
            Title: 'ERROR_UNSUPPORTED_TITLE',
            SubTitle: 'ERROR_UNSUPPORTED_SUBTITLE',
            Breadcrumb: 'ERROR_UNSUPPORTED_TITLE',
            Image: '',
            Params: {
                supported: {
                    edge: 11,
                    ie: 11,
                    firefox: 43,
                    opera: 35,
                    chrome: 47
                }
            }
        };
    }
    return pipErrorsConfig;
}());
exports.pipErrorsConfig = pipErrorsConfig;
var pipErrorsService = (function () {
    pipErrorsService.$inject = ['config'];
    function pipErrorsService(config) {
        "ngInject";
        this._config = config || new pipErrorsConfig();
    }
    Object.defineProperty(pipErrorsService.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    pipErrorsService.prototype.getErrorItemByKey = function (errorName) {
        if (!errorName || !this._config[errorName]) {
            return null;
        }
        return this._config[errorName];
    };
    return pipErrorsService;
}());
var pipErrorsProvider = (function () {
    function pipErrorsProvider() {
        this._config = new pipErrorsConfig();
    }
    pipErrorsProvider.prototype.configureErrorByKey = function (errorName, errorParams) {
        if (!errorName || !errorParams)
            return;
        if (!this._config[errorName])
            return;
        this._config[errorName] = _.defaultsDeep(errorParams, this._config[errorName]);
    };
    pipErrorsProvider.prototype.configureErrors = function (value) {
        if (!value)
            return;
        this._config = _.defaultsDeep(value, this._config);
    };
    pipErrorsProvider.prototype.$get = function () {
        "ngInject";
        if (this._service == null)
            this._service = new pipErrorsService(this._config);
        return this._service;
    };
    return pipErrorsProvider;
}());
angular
    .module('pipErrorsService')
    .provider('pipErrorsService', pipErrorsProvider);
},{}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Maintenance', []);
    thisModule.controller('pipErrorMaintenanceController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService', function ($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        var errorKey = 'Maintenance';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);
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
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        }
        ;
        function onClose() {
        }
        ;
    }]);
})();
},{}],10:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.MissingRoute', []);
    thisModule.controller('pipErrorMissingRouteController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService', function ($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        var errorKey = 'MissingRoute';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);
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
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        }
        ;
        function onContinue() {
        }
        ;
    }]);
})();
},{}],11:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.NoConnection', []);
    thisModule.controller('pipErrorNoConnectionController', ['$scope', '$state', '$rootScope', '$window', '$mdMedia', '$injector', 'pipErrorsService', function ($scope, $state, $rootScope, $window, $mdMedia, $injector, pipErrorsService) {
        var errorKey = 'NoConnection';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);
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
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        }
        ;
    }]);
})();
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unknown', []);
    thisModule.controller('pipErrorUnknownController', ['$scope', '$state', '$rootScope', '$injector', '$mdMedia', 'pipErrorsService', function ($scope, $state, $rootScope, $injector, $mdMedia, pipErrorsService) {
        var errorKey = 'Unknown';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);
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
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        }
        ;
        function parseError() {
            $scope.error_details = {};
            $scope.error_details.code = $scope.error.code;
            $scope.error_details.message = $scope.error.message;
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
},{}],14:[function(require,module,exports){
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unsupported', []);
    thisModule.controller('pipErrorUnsupportedController', ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService', function ($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        var errorKey = 'Unsupported';
        $scope.errorConfig = pipErrorsService.getErrorItemByKey(errorKey);
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
            pipNavService.breadcrumb.text = $scope.errorConfig.Breadcrumb;
            pipNavService.actions.hide();
        }
        ;
    }]);
})();
},{}],15:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection/no_connection.html',
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="CONTINUE" class="md-accent" ng-click="onContinue($event)">{{::\'ERROR_ROUTE_CONTINUE\' | translate}}</md-button></div><div class="h48" ng-if="url"><a ng-href="{{url}}">{{::\'ERROR_ROUTE_TRY_AGAIN\' | translate }}: {{url}}</a></div><div class="h48" ng-if="urlBack"><a ng-href="{{urlBack}}">{{::\'ERROR_ROUTE_GO_BACK\' | translate }}: {{urlBack}}</a></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/maintenance.html',
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_AVAILABLE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_AVAILABLE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="timeoutInterval">{{::\'ERROR_AVAILABLE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="isCordova"><md-button class="md-accent" ng-click="onClose($event)" aria-label="CLOSE">{{::\'ERROR_AVAILABLE_CLOSE\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error-page pip-error layout-column layout-align-center-center flex"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-subtext" ng-if="showError && error_details && error_details.message"><div ng-if="error_details.code">Code: {{error_details.code}}</div><div ng-if="error_details.message">Description: {{error_details.message}}</div><div ng-if="error_details.status">HTTP status: {{error_details.status}}</div><div ng-if="error_details.server_stacktrace">Server stacktrace: {{error_details.server_stacktrace}}</div><div ng-if="error_details.client_stacktrace">Client stacktrace stacktrace: {{error_details.client_stacktrace}}</div></div><div class="pip-error-actions layout-column layout-align-center-center"><div class="h48" ng-if="isCordova"><md-button aria-label="CLOSE" class="md-accent" ng-click="onClose($event)">{{::\'ERROR_UNKNOWN_CLOSE\' | translate}}</md-button></div><div class="h48" ng-if="error_details && error_details.status"><md-button aria-label="DETAILS" class="md-accent" ng-click="onDetails($event)">{{::\'ERROR_UNKNOWN_DETAILS\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="media(\'gt-xs\')"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div><div class="pip-error-details" ng-if="media(\'xs\')"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div></div></div>');
}]);
})();



},{}]},{},[15,1,2,4,5,6,3,7,8,9,10,12,11,13,14])(15)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29tbW9uL2Vycm9yc19zdHJpbmdzLnRzIiwic3JjL2RlcGVuZGVuY2llcy90cmFuc2xhdGUudHMiLCJzcmMvZXJyb3JzLnRzIiwic3JjL2Vycm9yc19wYWdlcy9lcnJvcnNfbW9kdWxlLnRzIiwic3JjL2Vycm9yc19wYWdlcy9lcnJvcnNfcGFnZXMudHMiLCJzcmMvZXJyb3JzX3BhZ2VzL2Vycm9yc19zZXJ2aWNlLnRzIiwic3JjL2Zvcm1zL2NsZWFyX2Vycm9ycy50cyIsInNyYy9mb3Jtcy9mb3JtX2Vycm9ycy50cyIsInNyYy9tYWludGVuYW5jZS9tYWludGVuYW5jZS50cyIsInNyYy9taXNzaW5nX3JvdXRlL21pc3Npbmdfcm91dGUudHMiLCJzcmMvbm9fY29ubmVjdGlvbi9ub19jb25uZWN0aW9uLnRzIiwic3JjL25vX2Nvbm5lY3Rpb25fcGFuZWwvbm9fY29ubmVjdGlvbl9wYW5lbC50cyIsInNyYy91bmtub3duL3Vua25vd24udHMiLCJzcmMvdW5zdXBwb3J0ZWQvdW5zdXBwb3J0ZWQudHMiLCJ0ZW1wL3BpcC13ZWJ1aS1lcnJvcnMtaHRtbC5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNPQSxDQUFDO0lBQ0csWUFBWSxDQUFDO0lBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFFdkUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFTLFNBQVM7UUFDN0IsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4RixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBR2pDLFlBQVksQ0FBQyxZ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O0FDekNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXHJcbiAqIEBmaWxlIEVycm9ycyBzdHJpbmcgcmVzb3VyY2VzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG5cclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgdmFyIHRoaXNNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlN0cmluZ3MnLCBbJ3BpcFRyYW5zbGF0ZSddKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLnJ1bihmdW5jdGlvbigkaW5qZWN0b3IpIHtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHBpcFRyYW5zbGF0ZSA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFNldCB0cmFuc2xhdGlvbiBzdHJpbmdzIGZvciB0aGUgbW9kdWxlXHJcbiAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7XHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9USVRMRSc6ICdTb3JyeSwgdGhlIHBhZ2UgaXNuXFwndCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfU1VCVElUTEUnOiAnVGhlIGxpbmsgeW91IGZvbGxvd2VkIG1heSBiZSBicm9rZW4sIG9yIHRoZSBwYWdlIG1heSBoYXZlIGJlZW4gcmVtb3ZlZC4nLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfQ09OVElOVUUnOiAnQ29udGludWUnLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfVFJZX0FHQUlOJzogJ1RyeSBhZ2FpbicsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9HT19CQUNLJzogJ0dvIEJhY2snLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfUEFHRV9USVRMRSc6ICdXcm9uZyBwYWdlJyxcclxuXHJcbiAgICAgICAgICAgICdFUlJPUl9VTktOT1dOX1RJVExFJzogJ09vcHMuIFNvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fU1VCVElUTEUnOiAnVW5rbm93biBlcnJvciBvY2N1cnJlZCwgYnV0IGRvblxcJ3Qgd29ycnkgd2UgYWxyZWFkeSBoYXZlIGJlZW4gbm90aWZpZWQuJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fQ0xPU0UnOiAnQ2xvc2UnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9ERVRBSUxTJzogJ0RldGFpbHMnLFxyXG5cclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9USVRMRSc6ICdUaGUgc2VydmVyIGlzIG9uIG1haW50ZW5hbmNlJyxcclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9TVUJUSVRMRSc6ICdTb3JyeSBmb3IgdGhlIGluY29udmVuaWVuY2UuIFRoaXMgYXBwbGljYXRpb24gaXMgdW5kZXJnb2luZyBtYWludGVuYW5jZSBmb3IgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2Egc2hvcnQgcGVyaW9kLiBXZVxcJ2xsIGJlIGJhY2sgc29vbi4gVGhhbmsgZm9yIHlvdXIgcGF0aWVuY2UuJyxcclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgICAgICdFUlJPUl9BVkFJTEFCTEVfVFJZX0FHQUlOJzogJ1RyeSBhZnRlcicsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19USVRMRSc6ICdObyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXInLFxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19TVUJUSVRMRSc6ICdVbmFibGUgdG8gY29ubmVjdCB0byB0aGUgc2VydmVyLiBDaGVjayB5b3VyIEludGVybmV0IGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19SRVRSWSc6ICdSZXRyeScsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfVElUTEUnOiAnVGhpcyBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfU1VCVElUTEUnOiAnT3VyIGFwcGxpY2F0aW9uIHVzaW5nIHRoZSBsYXRlc3QgdGVjaG5vbG9neS4gVGhpcyBtYWtlcyB0aGUgYXBwbGljYXRpb24gZmFzdGVyICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5kIGVhc2llciB0byB1c2UuIFVuZm9ydHVuYXRlbHksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCB0aG9zZSAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RlY2hub2xvZ2llcy4gRG93bmxvYWQgb24gb2YgdGhlc2UgZ3JlYXQgYnJvd3NlcnMgYW5kIHlvdVxcJ2xsIGJlIG9uIHlvdXIgd2F5OicsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9PJzogJ09wZXJhJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX09fVkVSJzogJ1ZlcnNpb24gMzYrJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0lFJzogJ0ludGVybmV0IEV4cGxvcmVyJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0lFX1ZFUic6ICdWZXJzaW9uIDExKycsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9HQyc6ICdHb29nbGUgQ2hyb21lJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0dDX1ZFUic6ICdWZXJzaW9uIDQ4KycsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9GTSc6ICdNb3ppbGxhIEZpcmVmb3gnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSJzogJ1ZlcnNpb24gNDUrJ1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7XHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9USVRMRSc6ICdTb3JyeSwgdGhlIHBhZ2UgaXNuXFwndCBhdmFpbGFibGUnLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfU1VCVElUTEUnOiAnVGhlIGxpbmsgeW91IGZvbGxvd2VkIG1heSBiZSBicm9rZW4sIG9yIHRoZSBwYWdlIG1heSBoYXZlIGJlZW4gcmVtb3ZlZC4nLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfQ09OVElOVUUnOiAnQ29udGludWUnLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfVFJZX0FHQUlOJzogJ1RyeSBhZ2FpbicsXHJcbiAgICAgICAgICAgICdFUlJPUl9ST1VURV9HT19CQUNLJzogJ0dvIEJhY2snLFxyXG4gICAgICAgICAgICAnRVJST1JfUk9VVEVfUEFHRV9USVRMRSc6ICdXcm9uZyBwYWdlJyxcclxuXHJcbiAgICAgICAgICAgICdFUlJPUl9VTktOT1dOX1RJVExFJzogJ09vcHMuIFNvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fU1VCVElUTEUnOiAnVW5rbm93biBlcnJvciBvY2N1cnJlZCwgYnV0IGRvblxcJ3Qgd29ycnkgd2UgYWxyZWFkeSBoYXZlIGJlZW4gbm90aWZpZWQuJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOS05PV05fQ0xPU0UnOiAnQ2xvc2UnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5LTk9XTl9ERVRBSUxTJzogJ0RldGFpbHMnLFxyXG5cclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9USVRMRSc6ICdUaGUgc2VydmVyIGlzIG9uIG1haW50ZW5hbmNlJyxcclxuICAgICAgICAgICAgJ0VSUk9SX0FWQUlMQUJMRV9TVUJUSVRMRSc6ICdTb3JyeSBmb3IgdGhlIGluY29udmVuaWVuY2UuIFRoaXMgYXBwbGljYXRpb24gaXMgdW5kZXJnb2luZyBtYWludGVuYW5jZSBmb3IgJyArXHJcbiAgICAgICAgICAgICdhIHNob3J0IHBlcmlvZC4gV2VcXCdsbCBiZSBiYWNrIHNvb24uIFRoYW5rIGZvciB5b3VyIHBhdGllbmNlLicsXHJcbiAgICAgICAgICAgICdFUlJPUl9BVkFJTEFCTEVfQ0xPU0UnOiAnQ2xvc2UnLFxyXG4gICAgICAgICAgICAnRVJST1JfQVZBSUxBQkxFX1RSWV9BR0FJTic6ICdUcnkgYWZ0ZXInLFxyXG5cclxuICAgICAgICAgICAgJ0VSUk9SX1JFU1BPTkRJTkdfVElUTEUnOiAnTm8gY29ubmVjdGlvbiB0byB0aGUgc2VydmVyJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1JFU1BPTkRJTkdfU1VCVElUTEUnOiAnVW5hYmxlIHRvIGNvbm5lY3QgdG8gc2VydmVyLiBDaGVjayB5b3VyIEludGVybmV0IGNvbm5lY3Rpb24gYW5kIHRyeSBhZ2Fpbi4nLFxyXG4gICAgICAgICAgICAnRVJST1JfUkVTUE9ORElOR19SRVRSWSc6ICdSZXRyeScsXHJcblxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfVElUTEUnOiAnVGhpcyBicm93c2VyIGlzIG5vdCBzdXBwb3J0ZWQnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfU1VCVElUTEUnOiAnT3VyIGFwcGxpY2F0aW9uIHVzaW5nIHRoZSBsYXRlc3QgdGVjaG5vbG9neS4gVGhpcyBtYWtlcyB0aGUgYXBwbGljYXRpb24gZmFzdGVyICcgK1xyXG4gICAgICAgICAgICAnYW5kIGVhc2llciB0byB1c2UuIFVuZm9ydHVuYXRlbHksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCB0aG9zZSAnICtcclxuICAgICAgICAgICAgJ3RlY2hub2xvZ2llcy4gRG93bmxvYWQgb24gb2YgdGhlc2UgZ3JlYXQgYnJvd3NlcnMgYW5kIHlvdVxcJ2xsIGJlIG9uIHlvdXIgd2F5OicsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9PJzogJ09wZXJhJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX09fVkVSJzogJ1ZlcnNpb24gMzUrJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0lFJzogJ0ludGVybmV0IEV4cGxvcmVyJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0lFX1ZFUic6ICdWZXJzaW9uIDExKycsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9HQyc6ICdHb29nbGUgQ2hyb21lJyxcclxuICAgICAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0dDX1ZFUic6ICdWZXJzaW9uIDQ3KycsXHJcbiAgICAgICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9GTSc6ICdNb3ppbGxhIEZpcmVmb3gnLFxyXG4gICAgICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSJzogJ1ZlcnNpb24gNDMrJ1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICogQGZpbGUgT3B0aW9uYWwgZmlsdGVyIHRvIHRyYW5zbGF0ZSBzdHJpbmcgcmVzb3VyY2VzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG4gXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UcmFuc2xhdGUnLCBbXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5maWx0ZXIoJ3RyYW5zbGF0ZScsIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcclxuICAgICAgICB2YXIgcGlwVHJhbnNsYXRlID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgXHJcbiAgICAgICAgICAgID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gcGlwVHJhbnNsYXRlICA/IHBpcFRyYW5zbGF0ZS50cmFuc2xhdGUoa2V5KSB8fCBrZXkgOiBrZXk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCLvu78vKipcclxuICogQGZpbGUgUmVnaXN0cmF0aW9uIG9mIGFsbCBlcnJvciBoYW5kbGluZyBjb21wb25lbnRzXHJcbiAqIEBjb3B5cmlnaHQgRGlnaXRhbCBMaXZpbmcgU29mdHdhcmUgQ29ycC4gMjAxNC0yMDE2XHJcbiAqL1xyXG5cclxuLyogZ2xvYmFsIGFuZ3VsYXIgKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycycsIFtcclxuICAgICAgICAncGlwRXJyb3JzLlBhZ2VzJyxcclxuICAgICAgICAncGlwRXJyb3JzU2VydmljZScsXHJcbiAgICAgICAgJ3BpcE5vQ29ubmVjdGlvblBhbmVsJyxcclxuICAgICAgICAncGlwQ2xlYXJFcnJvcnMnLFxyXG5cdCAgICAncGlwRm9ybUVycm9ycydcclxuXHJcbiAgICBdKTtcclxuICAgIFxyXG59KSgpOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnNTZXJ2aWNlJywgW10pO1xyXG5cclxuaW1wb3J0ICcuL2Vycm9yc19zZXJ2aWNlJzsiLCIvKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuUGFnZXMnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnLFxyXG4gICAgICAgICdwaXBFcnJvcnMuU3RyaW5ncycsICdwaXBFcnJvcnMuTm9Db25uZWN0aW9uJywgJ3BpcEVycm9ycy5NaXNzaW5nUm91dGUnLCAncGlwRXJyb3JzLlVuc3VwcG9ydGVkJyxcclxuICAgICAgICAncGlwRXJyb3JzLlVua25vd24nLCAncGlwRXJyb3JzLk1haW50ZW5hbmNlJywgJ3BpcEVycm9ycy5UcmFuc2xhdGUnLCAncGlwRXJyb3JzLlRlbXBsYXRlcydcclxuICAgIF0pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuY29uZmlnKFxyXG4gICAgICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJGh0dHBQcm92aWRlcikge1xyXG4gICAgICAgICAgICAvLyBBdHRhY2ggaW50ZXJjZXB0b3IgdG8gcmVhY3Qgb24gdW5hdXRob3JpemVkIGVycm9yc1xyXG4gICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdwaXBBdXRoSHR0cFJlc3BvbnNlSW50ZXJjZXB0b3InKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENvbmZpZ3VyZSBtb2R1bGUgcm91dGVzXHJcbiAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2Vycm9yc19ub19jb25uZWN0aW9uJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbm9fY29ubmVjdGlvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncGlwRXJyb3JOb0Nvbm5lY3Rpb25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ25vX2Nvbm5lY3Rpb24vbm9fY29ubmVjdGlvbi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnZXJyb3JzX21haW50ZW5hbmNlJywge1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbWFpbnRlbmFuY2UnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yTWFpbnRlbmFuY2VDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ21haW50ZW5hbmNlL21haW50ZW5hbmNlLmh0bWwnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN0YXRlKCdlcnJvcnNfbWlzc2luZ19yb3V0ZScsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZXJyb3JzL21pc3Npbmdfcm91dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmZvdW5kU3RhdGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21TdGF0ZTogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ3BpcEVycm9yTWlzc2luZ1JvdXRlQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtaXNzaW5nX3JvdXRlL21pc3Npbmdfcm91dGUuaHRtbCdcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuc3RhdGUoJ2Vycm9yc191bnN1cHBvcnRlZCcsIHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvZXJyb3JzL3Vuc3VwcG9ydGVkJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBFcnJvclVuc3VwcG9ydGVkQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd1bnN1cHBvcnRlZC91bnN1cHBvcnRlZC5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5zdGF0ZSgnZXJyb3JzX3Vua25vd24nLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2Vycm9ycy91bmtub3duJyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdwaXBFcnJvclVua25vd25Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Vua25vd24vdW5rbm93bi5odG1sJ1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgIHRoaXNNb2R1bGUucnVuKFxyXG4gICAgICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUsICRpbmplY3RvciwgcGlwRXJyb3JzU2VydmljZSkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGVycm9yQ29uZmlnID0gcGlwRXJyb3JzU2VydmljZS5jb25maWc7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3JDb25maWcuVW5zdXBwb3J0ZWQuQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBjaGVja1N1cHBvcnRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3JDb25maWcuTWlzc2luZ1JvdXRlLkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZU5vdEZvdW5kJyxcclxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXZlbnQsIHVuZm91bmRTdGF0ZSwgZnJvbVN0YXRlLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Vycm9yc19taXNzaW5nX3JvdXRlJywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlOiB1bmZvdW5kU3RhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tU3RhdGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bzogZnJvbVN0YXRlID8gZnJvbVN0YXRlLm5hbWUgOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tUGFyYW1zOiBmcm9tUGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kcm91dGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckNvbmZpZy5Ob0Nvbm5lY3Rpb24uQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRvbigncGlwTm9Db25uZWN0aW9uRXJyb3InLCBub0Nvbm5lY3Rpb25FcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckNvbmZpZy5Vbmtub3duLkFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJ3BpcFVua25vd25FcnJvcicsIHVua25vd25FcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvckNvbmZpZy5NYWludGVuYW5jZS5BY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCdwaXBNYWludGVuYW5jZUVycm9yJywgbWFpbnRlbmFuY2VFcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdvVG9FcnJvcnModG9TdGF0ZSwgcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9TdGF0ZSA9PSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3Igc3RhdGUgd2FzIG5vdCBkZWZpbmVkJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKHRvU3RhdGUsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBtYWludGVuYW5jZUVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9FcnJvcnMoJ2Vycm9yc19tYWludGVuYW5jZScsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG5vQ29ubmVjdGlvbkVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9FcnJvcnMoJ2Vycm9yc19ub19jb25uZWN0aW9uJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdW5rbm93bkVycm9yKGV2ZW50LCBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGdvVG9FcnJvcnMoJ2Vycm9yc191bmtub3duJywgcGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTdXBwb3J0ZWQoc3VwcG9ydGVkPzogYW55KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGlwU3lzdGVtSW5mbyA9ICRpbmplY3Rvci5oYXMoJ3BpcFN5c3RlbUluZm8nKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFN5c3RlbUluZm8nKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXBpcFN5c3RlbUluZm8pIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gdG9kbyBtYWtlIGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgICAgIGlmICghc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcG9ydGVkID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGdlOiAxMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWU6IDExLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJlZm94OiA0MywgLy80LCBmb3IgdGVzdGluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVyYTogMzUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNocm9tZTogNDdcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBicm93c2VyID0gcGlwU3lzdGVtSW5mby5icm93c2VyTmFtZTtcclxuICAgICAgICAgICAgICAgIGxldCB2ZXJzaW9uID0gcGlwU3lzdGVtSW5mby5icm93c2VyVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChicm93c2VyICYmIHN1cHBvcnRlZFticm93c2VyXSAmJiB2ZXJzaW9uID49IHN1cHBvcnRlZFticm93c2VyXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBpZiBub3Qgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2Vycm9yc191bnN1cHBvcnRlZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5mYWN0b3J5KCdwaXBBdXRoSHR0cFJlc3BvbnNlSW50ZXJjZXB0b3InLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkcSwgJGxvY2F0aW9uLCAkcm9vdFNjb3BlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVqZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvU3RhdGUgPSAkcm9vdFNjb3BlLiRzdGF0ZSAmJiAkcm9vdFNjb3BlLiRzdGF0ZS5uYW1lID8gJHJvb3RTY29wZS4kc3RhdGUubmFtZSA6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvUGFyYW1zID0gJHJvb3RTY29wZS4kc3RhdGUgJiYgJHJvb3RTY29wZS4kc3RhdGUucGFyYW1zID8gJHJvb3RTY29wZS4kc3RhdGUucGFyYW1zIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChyZWplY3Rpb24uc3RhdHVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNTAzOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hdmFpbGFibGUgKG1haW50ZW5hbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwTWFpbnRlbmFuY2VFcnJvcicsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogcmVqZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIC0xOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwTm9Db25uZWN0aW9uRXJyb3InLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IHJlamVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvcnNfdW5rbm93blwiLCByZWplY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIEVycm9yU3RhdGVJdGVtIHtcclxuICAgIEFjdGl2ZTogYm9vbGVhbjtcclxuICAgIE5hbWU6IHN0cmluZztcclxuICAgIEV2ZW50OiBzdHJpbmc7XHJcbiAgICBUaXRsZTogc3RyaW5nO1xyXG4gICAgU3ViVGl0bGU6IFN0cmluZztcclxuICAgIEJyZWFkY3J1bWI6IHN0cmluZztcclxuICAgIEltYWdlOiBzdHJpbmc7XHJcbiAgICBQYXJhbXM/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBwaXBFcnJvcnNDb25maWcge1xyXG4gICAgTWFpbnRlbmFuY2U6IEVycm9yU3RhdGVJdGVtID0ge1xyXG4gICAgICAgIEFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBOYW1lOiAnZXJyb3JzX21haW50ZW5hbmNlJyxcclxuICAgICAgICBFdmVudDogJ3BpcE1haW50ZW5hbmNlRXJyb3InLFxyXG4gICAgICAgIFRpdGxlOiAnRVJST1JfQVZBSUxBQkxFX1RJVExFJyxcclxuICAgICAgICBTdWJUaXRsZTogJ0VSUk9SX0FWQUlMQUJMRV9TVUJUSVRMRScsXHJcbiAgICAgICAgQnJlYWRjcnVtYjogJ0VSUk9SX0FWQUlMQUJMRV9USVRMRScsXHJcbiAgICAgICAgSW1hZ2U6ICdpbWFnZXMvbWFpbnRlbmFuY2Uuc3ZnJ1xyXG4gICAgICAgIFxyXG4gICAgfTtcclxuICAgIE1pc3NpbmdSb3V0ZTogRXJyb3JTdGF0ZUl0ZW0gPSB7XHJcbiAgICAgICAgQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIE5hbWU6ICdlcnJvcnNfbWlzc2luZ19yb3V0ZScsXHJcbiAgICAgICAgRXZlbnQ6ICckc3RhdGVOb3RGb3VuZCcsXHJcbiAgICAgICAgVGl0bGU6ICdFUlJPUl9ST1VURV9USVRMRScsXHJcbiAgICAgICAgU3ViVGl0bGU6ICdFUlJPUl9ST1VURV9TVUJUSVRMRScsXHJcbiAgICAgICAgQnJlYWRjcnVtYjogJ0VSUk9SX1JPVVRFX1BBR0VfVElUTEUnLFxyXG4gICAgICAgIEltYWdlOiAnaW1hZ2VzL2ludmFsaWRfcm91dGUuc3ZnJ1xyXG4gICAgfTtcclxuICAgIE5vQ29ubmVjdGlvbjogRXJyb3JTdGF0ZUl0ZW0gPSB7XHJcbiAgICAgICAgQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIE5hbWU6ICdlcnJvcnNfbm9fY29ubmVjdGlvbicsXHJcbiAgICAgICAgRXZlbnQ6ICdwaXBOb0Nvbm5lY3Rpb25FcnJvcicsXHJcbiAgICAgICAgVGl0bGU6ICdFUlJPUl9SRVNQT05ESU5HX1RJVExFJyxcclxuICAgICAgICBTdWJUaXRsZTogJ0VSUk9SX1JFU1BPTkRJTkdfU1VCVElUTEUnLFxyXG4gICAgICAgIEJyZWFkY3J1bWI6ICdFUlJPUl9SRVNQT05ESU5HX1RJVExFJyxcclxuICAgICAgICBJbWFnZTogJ2ltYWdlcy9ub19yZXNwb25zZS5zdmcnXHJcbiAgICB9O1xyXG4gICAgVW5rbm93bjogRXJyb3JTdGF0ZUl0ZW0gPSB7XHJcbiAgICAgICAgQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIE5hbWU6ICdlcnJvcnNfdW5rbm93bicsXHJcbiAgICAgICAgRXZlbnQ6ICdwaXBVbmtub3duRXJyb3InLFxyXG4gICAgICAgIFRpdGxlOiAnRVJST1JfVU5LTk9XTl9USVRMRScsXHJcbiAgICAgICAgU3ViVGl0bGU6ICdFUlJPUl9VTktOT1dOX1NVQlRJVExFJyxcclxuICAgICAgICBCcmVhZGNydW1iOiAnRVJST1JfVU5LTk9XTl9USVRMRScsXHJcbiAgICAgICAgSW1hZ2U6ICdpbWFnZXMvdW5rbm93bl9lcnJvci5zdmcnXHJcbiAgICB9O1xyXG4gICAgVW5zdXBwb3J0ZWQ6IEVycm9yU3RhdGVJdGVtID0ge1xyXG4gICAgICAgIEFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBOYW1lOiAnZXJyb3JzX3Vuc3VwcG9ydGVkJyxcclxuICAgICAgICBFdmVudDogJycsXHJcbiAgICAgICAgVGl0bGU6ICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRScsXHJcbiAgICAgICAgU3ViVGl0bGU6ICdFUlJPUl9VTlNVUFBPUlRFRF9TVUJUSVRMRScsXHJcbiAgICAgICAgQnJlYWRjcnVtYjogJ0VSUk9SX1VOU1VQUE9SVEVEX1RJVExFJyxcclxuICAgICAgICBJbWFnZTogJycsXHJcbiAgICAgICAgUGFyYW1zOiB7XHJcbiAgICAgICAgICAgIHN1cHBvcnRlZDoge1xyXG4gICAgICAgICAgICAgICAgZWRnZTogMTEsXHJcbiAgICAgICAgICAgICAgICBpZTogMTEsXHJcbiAgICAgICAgICAgICAgICBmaXJlZm94OiA0MywgXHJcbiAgICAgICAgICAgICAgICBvcGVyYTogMzUsXHJcbiAgICAgICAgICAgICAgICBjaHJvbWU6IDQ3XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSXBpcEVycm9yc1NlcnZpY2Uge1xyXG4gICAgZ2V0RXJyb3JJdGVtQnlLZXkoZXJyb3JOYW1lOiBzdHJpbmcpOiBFcnJvclN0YXRlSXRlbTtcclxuXHJcbiAgICBjb25maWc6IHBpcEVycm9yc0NvbmZpZztcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJcGlwRXJyb3JzUHJvdmlkZXIgZXh0ZW5kcyBuZy5JU2VydmljZVByb3ZpZGVyIHtcclxuICAgIGNvbmZpZ3VyZUVycm9yQnlLZXkoZXJyb3JOYW1lOiBzdHJpbmcsIGVycm9yUGFyYW1zOiBFcnJvclN0YXRlSXRlbSk6IHZvaWQ7XHJcbiAgICBjb25maWd1cmVFcnJvcnModmFsdWU6IHBpcEVycm9yc0NvbmZpZyk6IHZvaWQ7XHJcbn1cclxuXHJcbmNsYXNzIHBpcEVycm9yc1NlcnZpY2UgaW1wbGVtZW50cyBJcGlwRXJyb3JzU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IHBpcEVycm9yc0NvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICAgICAgY29uZmlnOiBwaXBFcnJvcnNDb25maWdcclxuICAgICkge1xyXG4gICAgICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnID0gY29uZmlnIHx8IG5ldyBwaXBFcnJvcnNDb25maWcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZygpOiBwaXBFcnJvcnNDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVycm9ySXRlbUJ5S2V5KGVycm9yTmFtZTogc3RyaW5nKTogRXJyb3JTdGF0ZUl0ZW0ge1xyXG4gICAgICAgIGlmICghZXJyb3JOYW1lIHx8ICF0aGlzLl9jb25maWdbZXJyb3JOYW1lXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWdbZXJyb3JOYW1lXTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIHBpcEVycm9yc1Byb3ZpZGVyIGltcGxlbWVudHMgSXBpcEVycm9yc1Byb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IHBpcEVycm9yc1NlcnZpY2U7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IHBpcEVycm9yc0NvbmZpZztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9jb25maWcgPSBuZXcgcGlwRXJyb3JzQ29uZmlnKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbmZpZ3VyZUVycm9yQnlLZXkoZXJyb3JOYW1lOiBzdHJpbmcsIGVycm9yUGFyYW1zOiBFcnJvclN0YXRlSXRlbSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghZXJyb3JOYW1lIHx8ICFlcnJvclBhcmFtcykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5fY29uZmlnW2Vycm9yTmFtZV0pIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnW2Vycm9yTmFtZV0gPSA8RXJyb3JTdGF0ZUl0ZW0+Xy5kZWZhdWx0c0RlZXAoZXJyb3JQYXJhbXMsIHRoaXMuX2NvbmZpZ1tlcnJvck5hbWVdKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29uZmlndXJlRXJyb3JzKHZhbHVlOiBwaXBFcnJvcnNDb25maWcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IDxwaXBFcnJvcnNDb25maWc+Xy5kZWZhdWx0c0RlZXAodmFsdWUsIHRoaXMuX2NvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljICRnZXQoXHJcblxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fc2VydmljZSA9PSBudWxsKVxyXG4gICAgICAgICAgICB0aGlzLl9zZXJ2aWNlID0gbmV3IHBpcEVycm9yc1NlcnZpY2UodGhpcy5fY29uZmlnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZpY2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmFuZ3VsYXJcclxuICAgIC5tb2R1bGUoJ3BpcEVycm9yc1NlcnZpY2UnKVxyXG4gICAgLnByb3ZpZGVyKCdwaXBFcnJvcnNTZXJ2aWNlJywgcGlwRXJyb3JzUHJvdmlkZXIpO1xyXG4iLCIvKipcclxuICogQGZpbGUgU3BlY2lhbCBlcnJvciBoYW5kbGluZyBmb3IgZm9ybXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBDbGVhckVycm9ycycsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmRpcmVjdGl2ZSgncGlwQ2xlYXJFcnJvcnMnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgcmVxdWlyZTogWyduZ01vZGVsJywgJ14/Zm9ybSddLFxyXG4gICAgICAgICAgICBsaW5rOiBmdW5jdGlvbiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzOiBhbnksICRjdHJscykge1xyXG4gICAgICAgICAgICAgICAgdmFyIFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkQ29udHJvbGxlciA9ICRjdHJsc1swXSxcclxuICAgICAgICAgICAgICAgICAgICBmb3JtQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuJHdhdGNoKCRhdHRycy5uZ01vZGVsLCBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjbGVhckZpZWxkRXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJGb3JtRXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckZpZWxkRXJyb3JzKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlcnJvcnMgPSBmaWVsZENvbnRyb2xsZXIuJGVycm9yO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIGVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3Auc3Vic3RyaW5nKDAsIDYpID09ICdFUlJPUl8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZENvbnRyb2xsZXIuJHNldFZhbGlkaXR5KHByb3AsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBjbGVhckZvcm1FcnJvcnMoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybUNvbnRyb2xsZXIuJHNlcnZlckVycm9yID0ge307XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICogQGZpbGUgRm9ybSBlcnJvciB1dGlsaXRpZXNcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICpcclxuICovXHJcbiBcclxuIC8qIGdsb2JhbCBfLCBhbmd1bGFyICovXHJcbiBcclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBGb3JtRXJyb3JzJywgW10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuZmFjdG9yeSgncGlwRm9ybUVycm9ycycsIGZ1bmN0aW9uICgkcm9vdFNjb3BlKSB7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRlcnJvcnNXaXRoSGludDogZXJyb3JzV2l0aEhpbnQsXHJcbiAgICAgICAgICAgIC8vc3VibWl0dGVkRXJyb3JzOiBzdWJtaXR0ZWRFcnJvcnMsXHJcbiAgICAgICAgICAgIC8vc3VibWl0dGVkRXJyb3JzV2l0aEhpbnQ6IHN1Ym1pdHRlZEVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICAvL2RpcnR5RXJyb3JzOiBkaXJ0eUVycm9ycyxcclxuICAgICAgICAgICAgLy9kaXJ0eUVycm9yc1dpdGhIaW50OiBkaXJ0eUVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICAvL3RvdWNoZWRFcnJvcnM6IHRvdWNoZWRFcnJvcnMsICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRvdWNoZWRFcnJvcnNXaXRoSGludDogdG91Y2hlZEVycm9yc1dpdGhIaW50LFxyXG4gICAgICAgICAgICByZXNldEZvcm1FcnJvcnM6IHJlc2V0Rm9ybUVycm9ycyxcclxuICAgICAgICAgICAgc2V0Rm9ybUVycm9yOiBzZXRGb3JtRXJyb3IsXHJcbiAgICAgICAgICAgIHJlc2V0RmllbGRzRXJyb3JzOiByZXNldEZpZWxkc0Vycm9yc1xyXG5cdFx0fTtcclxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBlcnJvcnNXaXRoSGludChmaWVsZCkge1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cdFx0XHRcclxuICAgICAgICAgICAgcmV0dXJuIF8uaXNFbXB0eShmaWVsZC4kZXJyb3IpID8geyBoaW50OiB0cnVlIH0gOiBmaWVsZC4kZXJyb3I7XHJcbiAgICAgICAgfTtcclxuXHRcdFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIHN1Ym1pdHRlZEVycm9ycyhmb3JtLCBmaWVsZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gaXMgbm90IHNldCcpO1xyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBpcyBub3Qgc2V0Jyk7XHJcbi8vIFxyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybS4kc3VibWl0dGVkKVxyXG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIGZpZWxkLiRlcnJvcjtcclxuLy8gICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4vLyAgICAgICAgIH07XHJcbi8vIFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIHN1Ym1pdHRlZEVycm9yc1dpdGhIaW50KGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gXHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtLiRzdWJtaXR0ZWQpIHtcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBfLmlzRW1wdHkoZmllbGQuJGVycm9yKSA/IHsgaGludDogdHJ1ZX0gOiBmaWVsZC4kZXJyb3I7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy8gICAgICAgICAgICAgcmV0dXJuIHsgaGludDogdHJ1ZSB9O1xyXG4vLyAgICAgICAgIH07XHJcbi8vIFxyXG4vLyAgICAgICAgIGZ1bmN0aW9uIGRpcnR5RXJyb3JzKGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gXHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZC4kZGlydHkgfHwgZm9ybS4kZGlydHkpXHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gZmllbGQuJGVycm9yO1xyXG4vLyAgICAgICAgICAgICByZXR1cm4ge307XHJcbi8vICAgICAgICAgfTtcclxuLy8gXHJcbi8vICAgICAgICAgZnVuY3Rpb24gZGlydHlFcnJvcnNXaXRoSGludChmb3JtLCBmaWVsZCkge1xyXG4vLyAgICAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gaXMgbm90IHNldCcpO1xyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdGaWVsZCBpcyBub3Qgc2V0Jyk7XHJcbi8vIFxyXG4vLyAgICAgICAgICAgICBpZiAoZmllbGQuJGRpcnR5IHx8IGZvcm0uJGRpcnR5KSB7XHJcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gXy5pc0VtcHR5KGZpZWxkLiRlcnJvcikgPyB7IGhpbnQ6IHRydWV9IDogZmllbGQuJGVycm9yO1xyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgICAgIHJldHVybiB7IGhpbnQ6IHRydWUgfTtcclxuLy8gICAgICAgICB9O1xyXG4vLyBcclxuLy8gICAgICAgICBmdW5jdGlvbiB0b3VjaGVkRXJyb3JzKGZvcm0sIGZpZWxkKSB7XHJcbi8vICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwpIHRocm93IG5ldyBFcnJvcignRm9ybSBpcyBub3Qgc2V0Jyk7XHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ0ZpZWxkIGlzIG5vdCBzZXQnKTtcclxuLy8gICAgICAgICAgICAgXHJcbi8vICAgICAgICAgICAgIGlmIChmaWVsZC4kdG91Y2hlZCB8fCBmb3JtLiRkaXJ0eSlcclxuLy8gICAgICAgICAgICAgICAgIHJldHVybiBmaWVsZC4kZXJyb3I7XHJcbi8vICAgICAgICAgICAgIHJldHVybiB7fTtcclxuLy8gICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB0b3VjaGVkRXJyb3JzV2l0aEhpbnQoZm9ybSwgZmllbGQpIHtcclxuICAgICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZvcm0uJHN1Ym1pdHRlZCAmJiAoZmllbGQuJHRvdWNoZWQgfHwgZm9ybS4kZGlydHkpIHx8ICFmb3JtLiRzdWJtaXR0ZWQgJiYgKGZpZWxkLiR0b3VjaGVkIHx8IGZpZWxkLiRkaXJ0eSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBfLmlzRW1wdHkoZmllbGQuJGVycm9yKSA/IHsgaGludDogdHJ1ZX0gOiBmaWVsZC4kZXJyb3I7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB7IGhpbnQ6IHRydWUgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNldEZvcm1FcnJvcnMoZm9ybSwgZXJyb3JzKSB7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldFByaXN0aW5lKCk7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldFVudG91Y2hlZCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgZm9ybS4kc2V0RGlydHkoKTtcclxuICAgICAgICAgICAgICAgIGZvcm0uJHNldFN1Ym1pdHRlZCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvciA9IHt9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcmVzZXRGaWVsZHNFcnJvcnMoZm9ybSwgZmllbGQpIHtcclxuICAgICAgICAgICAgaWYgKCFmb3JtKSByZXR1cm47XHJcbiAgICAgICAgICAgIGlmIChmaWVsZCAmJiBmb3JtW2ZpZWxkXSAmJiBmb3JtW2ZpZWxkXS4kZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICBmb3JtW2ZpZWxkXS4kZXJyb3IgPSB7fTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gZm9ybSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmb3JtW3Byb3BdICYmIGZvcm1bcHJvcF0uJGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1bcHJvcF0uJGVycm9yID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmb3JtICYmIGZvcm0uJGVycm9yKSBmb3JtLiRlcnJvciA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBcclxuICAgICAgICBmdW5jdGlvbiBzZXRGb3JtRXJyb3IoZm9ybSwgZXJyb3IsIGVycm9yRmllbGRNYXApIHtcclxuICAgICAgICAgICAgaWYgKGVycm9yID09IG51bGwpIHJldHVybjtcclxuICAgICAgICAgICAgLy8gUHJlcGFyZSBmb3JtIHNlcnZlciBlcnJvcnNcclxuICAgICAgICAgICAgZm9ybS4kc2VydmVyRXJyb3IgPSBmb3JtLiRzZXJ2ZXJFcnJvciB8fCB7fTtcclxuICAgICAgICAgICAgLy8gUHJlcGFyZSBlcnJvciBjb2RlXHJcbiAgICAgICAgICAgIHZhciBjb2RlID0gZXJyb3IuY29kZSB8fCAoZXJyb3IuZGF0YSB8fCB7fSkuY29kZSB8fCBudWxsO1xyXG4gICAgICAgICAgICBpZiAoIWNvZGUgJiYgZXJyb3Iuc3RhdHVzKSBjb2RlID0gZXJyb3Iuc3RhdHVzO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBcclxuICAgICAgICAgICAgICAgICAgICBlcnJvck5hbWUgPSAnRVJST1JfJyArIGNvZGUsXHJcbiAgICAgICAgICAgICAgICAgICAgZmllbGQgPSBlcnJvckZpZWxkTWFwID8gZXJyb3JGaWVsZE1hcFtjb2RlXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgc2VydmVyIGVycm9yIHRvIGZpZWxkc1xyXG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkICYmIGZvcm1bZmllbGRdICYmIGZvcm1bZmllbGRdLiRzZXRWYWxpZGl0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1bZmllbGRdLiRzZXRWYWxpZGl0eShlcnJvck5hbWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gU2V0IHNlcnZlciBlcnJvciB0byBmb3JtXHJcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQgPT0gJ2Zvcm0nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS4kc2VydmVyRXJyb3JbZXJyb3JOYW1lXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB1bmRlZmluZWQgZXJyb3IgZm9yIHRoaXMgZm9ybSBvciBjb2RlID09PSB1bmRlZmluZWQvbnVsbCwgZ28gdG8gdW5oYW5kbGVkIGVycm9yIHBhZ2VcclxuICAgICAgICAgICAgaWYgKGVycm9yLmRhdGEgJiYgZXJyb3IuZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3IuZGF0YS5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFNldCBhcyB1bmRlZmluZWQgZXJyb3JcclxuICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGZvcm0uJHNlcnZlckVycm9yWydFUlJPUl9VTktOT1dOJ10gPSBlcnJvci5tZXNzYWdlO1xyXG4gICAgICAgICAgICAgICAgZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChlcnJvci5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3IubmFtZTtcclxuICAgICAgICAgICAgICAgIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmb3JtLiRzZXJ2ZXJFcnJvclsnRVJST1JfVU5LTk9XTiddID0gZXJyb3I7XHJcbiAgICAgICAgICAgIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kZW1pdCgncGlwVW5oYW5kbGVkSW50ZXJuYWxFcnJvcicsIHtcclxuICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFxyXG5cdH0pO1xyXG5cclxufSkoKTsiLCIvKipcclxuICogQGZpbGUgTWFpbnRlbmFuY2UgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5NYWludGVuYW5jZScsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yTWFpbnRlbmFuY2VDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJGluamVjdG9yLCBwaXBFcnJvcnNTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHZhciBlcnJvcktleSA9ICdNYWludGVuYW5jZSc7XHJcbiAgICAgICAgJHNjb3BlLmVycm9yQ29uZmlnID0gcGlwRXJyb3JzU2VydmljZS5nZXRFcnJvckl0ZW1CeUtleShlcnJvcktleSk7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZS4kcm91dGluZyA9IGZhbHNlO1xyXG4gICAgICAgICRzY29wZS5pc0NvcmRvdmEgPSBmYWxzZTtcclxuICAgICAgICBhcHBIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmVycm9yID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgJiYgJHN0YXRlLnBhcmFtcy5lcnJvciA/ICAkc3RhdGUucGFyYW1zLmVycm9yIDoge307XHJcbiAgICAgICAgJHNjb3BlLnRpbWVvdXRJbnRlcnZhbCA9ICRzY29wZS5lcnJvciAmJiAkc2NvcGUuZXJyb3IuY29uZmlnICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5lcnJvci5jb25maWcucGFyYW1zICYmICRzY29wZS5lcnJvci5jb25maWcucGFyYW1zLmludGVydmFsID8gJHNjb3BlLmVycm9yLmNvbmZpZy5wYXJhbXMuaW50ZXJ2YWwgOiAwO1xyXG5cclxuICAgICAgICAkc2NvcGUub25DbG9zZSA9IG9uQ2xvc2U7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXBwSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE5hdlNlcnZpY2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5icmVhZGNydW1iLnRleHQgPSAkc2NvcGUuZXJyb3JDb25maWcuQnJlYWRjcnVtYjtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hY3Rpb25zLmhpZGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkNsb3NlKCkge1xyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH0pO1xyXG5cclxufSkoKTtcclxuIiwiLyoqXHJcbiAqIEBmaWxlIE1pc3Npbmcgcm91dGUgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5NaXNzaW5nUm91dGUnLCBbXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5jb250cm9sbGVyKCdwaXBFcnJvck1pc3NpbmdSb3V0ZUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsICRyb290U2NvcGUsICRtZE1lZGlhLCAkaW5qZWN0b3IsIHBpcEVycm9yc1NlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIGVycm9yS2V5ID0gJ01pc3NpbmdSb3V0ZSc7XHJcbiAgICAgICAgJHNjb3BlLmVycm9yQ29uZmlnID0gcGlwRXJyb3JzU2VydmljZS5nZXRFcnJvckl0ZW1CeUtleShlcnJvcktleSk7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgYXBwSGVhZGVyKCk7XHJcbiAgICAgICAgJHJvb3RTY29wZS4kcm91dGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAkc2NvcGUuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zLmVycm9yID8gICRzdGF0ZS5wYXJhbXMuZnJvbVN0YXRlIDoge307XHJcbiAgICAgICAgJHNjb3BlLnVuZm91bmRTdGF0ZSA9ICRzdGF0ZSAmJiAkc3RhdGUucGFyYW1zID8gICRzdGF0ZS5wYXJhbXMudW5mb3VuZFN0YXRlIDoge307XHJcbiAgICAgICAgJHNjb3BlLnVybCA9ICRzY29wZS51bmZvdW5kU3RhdGUgJiYgJHNjb3BlLnVuZm91bmRTdGF0ZS50byA/ICRzdGF0ZS5ocmVmKCRzY29wZS51bmZvdW5kU3RhdGUudG8sICRzY29wZS51bmZvdW5kU3RhdGUudG9QYXJhbXMsIHthYnNvbHV0ZTogdHJ1ZX0pIDogJyc7XHJcbiAgICAgICAgJHNjb3BlLnVybEJhY2sgPSAkc2NvcGUuZnJvbVN0YXRlICYmICRzY29wZS5mcm9tU3RhdGUudG8gPyAkc3RhdGUuaHJlZigkc2NvcGUuZnJvbVN0YXRlLnRvLCAkc2NvcGUuZnJvbVN0YXRlLmZyb21QYXJhbXMsIHthYnNvbHV0ZTogdHJ1ZX0pIDogJyc7XHJcblxyXG4gICAgICAgICRzY29wZS5vbkNvbnRpbnVlID0gb25Db250aW51ZTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhcHBIZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIGlmICghcGlwTmF2U2VydmljZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hcHBiYXIuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuaWNvbi5zaG93TWVudSgpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9ICRzY29wZS5lcnJvckNvbmZpZy5CcmVhZGNydW1iO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFjdGlvbnMuaGlkZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ29udGludWUoKSB7XHJcbiAgICAgICAgICAgIC8vIFRvZG86IEdvIHRvIGRlZmF1bHQgc3RhdGUgJy8nXHJcbiAgICAgICAgICAgIC8vcGlwQXV0aFN0YXRlLmdvVG9BdXRob3JpemVkKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBAZmlsZSBObyBjb25uZWN0aW9uIGVycm9yIGNvbnRyb2xsZXJcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuTm9Db25uZWN0aW9uJywgW10pO1xyXG5cclxuICAgIHRoaXNNb2R1bGUuY29udHJvbGxlcigncGlwRXJyb3JOb0Nvbm5lY3Rpb25Db250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkd2luZG93LCAkbWRNZWRpYSwgJGluamVjdG9yLCBwaXBFcnJvcnNTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHZhciBlcnJvcktleSA9ICdOb0Nvbm5lY3Rpb24nO1xyXG4gICAgICAgICRzY29wZS5lcnJvckNvbmZpZyA9IHBpcEVycm9yc1NlcnZpY2UuZ2V0RXJyb3JJdGVtQnlLZXkoZXJyb3JLZXkpO1xyXG5cclxuICAgICAgICB2YXIgcGlwTmF2U2VydmljZSA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdlNlcnZpY2UnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdlNlcnZpY2UnKSA6IG51bGw7XHJcbiAgICAgICAgdmFyIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUubWVkaWEgPSBwaXBNZWRpYSA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJHJvdXRpbmcgPSBmYWxzZTtcclxuICAgICAgICBhcHBIZWFkZXIoKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmVycm9yID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgJiYgJHN0YXRlLnBhcmFtcy5lcnJvciA/ICAkc3RhdGUucGFyYW1zLmVycm9yIDoge307XHJcblxyXG4gICAgICAgICRzY29wZS5vblJldHJ5ID0gb25SZXRyeTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvblJldHJ5KCkge1xyXG4gICAgICAgICAgICAkd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFwcEhlYWRlcigpIHtcclxuICAgICAgICAgICAgaWYgKCFwaXBOYXZTZXJ2aWNlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFwcGJhci5hZGRTaGFkb3coKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYnJlYWRjcnVtYi50ZXh0ID0gJHNjb3BlLmVycm9yQ29uZmlnLkJyZWFkY3J1bWI7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG59KSgpO1xyXG4iLCIvKipcclxuICogQGZpbGUgTm8gQ29ubmVjdGlvbiBFcnJvciBwYW5lbFxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBfLCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoXCJwaXBOb0Nvbm5lY3Rpb25QYW5lbFwiLCBbJ3BpcEVycm9ycy5UcmFuc2xhdGUnXSk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5kaXJlY3RpdmUoJ3BpcE5vQ29ubmVjdGlvblBhbmVsJyxcclxuICAgICAgICBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJz1waXBFcnJvcicsXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0cnk6ICc9cGlwUmV0cnknXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdub19jb25uZWN0aW9uX3BhbmVsL25vX2Nvbm5lY3Rpb25fcGFuZWwuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAncGlwTm9Db25uZWN0aW9uUGFuZWxDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcblxyXG4gICAgdGhpc01vZHVsZS5jb250cm9sbGVyKCdwaXBOb0Nvbm5lY3Rpb25QYW5lbENvbnRyb2xsZXInLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMsIHBpcFRyYW5zbGF0ZSkge1xyXG5cclxuICAgICAgICAgICAgJHNjb3BlLm9uUmV0cnkgPSBvblJldHJ5O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gb25SZXRyeSgpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUucmV0cnkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKCRzY29wZS5yZXRyeSkpICRzY29wZS5yZXRyeSgpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxufSkoKTtcclxuXHJcbiIsIi8qKlxyXG4gKiBAZmlsZSBVbmtub3duIGVycm9yIGNvbnRyb2xsZXJcclxuICogQGNvcHlyaWdodCBEaWdpdGFsIExpdmluZyBTb2Z0d2FyZSBDb3JwLiAyMDE0LTIwMTZcclxuICovXHJcblxyXG4vKiBnbG9iYWwgYW5ndWxhciAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgdGhpc01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVW5rbm93bicsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yVW5rbm93bkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUsICRyb290U2NvcGUsICRpbmplY3RvciwgJG1kTWVkaWEsIHBpcEVycm9yc1NlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIGVycm9yS2V5ID0gJ1Vua25vd24nO1xyXG4gICAgICAgICRzY29wZS5lcnJvckNvbmZpZyA9IHBpcEVycm9yc1NlcnZpY2UuZ2V0RXJyb3JJdGVtQnlLZXkoZXJyb3JLZXkpO1xyXG5cclxuICAgICAgICB2YXIgcGlwTmF2U2VydmljZSA9ICRpbmplY3Rvci5oYXMoJ3BpcE5hdlNlcnZpY2UnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE5hdlNlcnZpY2UnKSA6IG51bGw7XHJcbiAgICAgICAgdmFyIHBpcE1lZGlhID0gJGluamVjdG9yLmhhcygncGlwTWVkaWEnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcE1lZGlhJykgOiBudWxsO1xyXG5cclxuICAgICAgICAkc2NvcGUubWVkaWEgPSBwaXBNZWRpYSA/IHBpcE1lZGlhIDogJG1kTWVkaWE7XHJcblxyXG4gICAgICAgICRyb290U2NvcGUuJHJvdXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAkc2NvcGUuaXNDb3Jkb3ZhID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGFwcEhlYWRlcigpO1xyXG5cclxuICAgICAgICAkc2NvcGUuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zLmVycm9yID8gICRzdGF0ZS5wYXJhbXMuZXJyb3IgOiB7fTtcclxuICAgICAgICAkc2NvcGUuZXJyb3JfZGV0YWlscyA9IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5vbkRldGFpbHMgPSBvbkRldGFpbHM7XHJcbiAgICAgICAgJHNjb3BlLm9uQ2xvc2UgPSBvbkNsb3NlO1xyXG5cclxuICAgICAgICBwYXJzZUVycm9yKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXBwSGVhZGVyKCkge1xyXG4gICAgICAgICAgICBpZiAoIXBpcE5hdlNlcnZpY2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5icmVhZGNydW1iLnRleHQgPSAkc2NvcGUuZXJyb3JDb25maWcuQnJlYWRjcnVtYjtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hY3Rpb25zLmhpZGUoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBwYXJzZUVycm9yKCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JfZGV0YWlscyA9IHt9O1xyXG4gICAgICAgICAgICAkc2NvcGUuZXJyb3JfZGV0YWlscy5jb2RlID0gJHNjb3BlLmVycm9yLmNvZGU7XHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLm1lc3NhZ2UgPSAkc2NvcGUuZXJyb3IubWVzc2FnZTtcclxuICAgICAgICAgICAgJHNjb3BlLmVycm9yX2RldGFpbHMuc3RhdHVzID0gJHNjb3BlLmVycm9yLnN0YXR1cztcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLnNlcnZlcl9zdGFja3RyYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS5lcnJvcl9kZXRhaWxzLmNsaWVudF9zdGFja3RyYWNlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbkRldGFpbHMoKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5zaG93RXJyb3IgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG9uQ2xvc2UoKSB7XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCIvKipcclxuICogQGZpbGUgVW5zdXBwb3J0ZWQgZXJyb3IgY29udHJvbGxlclxyXG4gKiBAY29weXJpZ2h0IERpZ2l0YWwgTGl2aW5nIFNvZnR3YXJlIENvcnAuIDIwMTQtMjAxNlxyXG4gKi9cclxuXHJcbi8qIGdsb2JhbCBhbmd1bGFyICovXHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIHZhciB0aGlzTW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5VbnN1cHBvcnRlZCcsIFtdKTtcclxuXHJcbiAgICB0aGlzTW9kdWxlLmNvbnRyb2xsZXIoJ3BpcEVycm9yVW5zdXBwb3J0ZWRDb250cm9sbGVyJywgZnVuY3Rpb24gKCRzY29wZSwgJHN0YXRlLCAkcm9vdFNjb3BlLCAkbWRNZWRpYSwgJGluamVjdG9yLCBwaXBFcnJvcnNTZXJ2aWNlKSB7XHJcblxyXG4gICAgICAgIHZhciBlcnJvcktleSA9ICdVbnN1cHBvcnRlZCc7XHJcbiAgICAgICAgJHNjb3BlLmVycm9yQ29uZmlnID0gcGlwRXJyb3JzU2VydmljZS5nZXRFcnJvckl0ZW1CeUtleShlcnJvcktleSk7XHJcblxyXG4gICAgICAgIHZhciBwaXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuICAgICAgICB2YXIgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcblxyXG4gICAgICAgICRzY29wZS5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuICAgICAgICAkcm9vdFNjb3BlLiRyb3V0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHBpcE5hdlNlcnZpY2UpIHtcclxuICAgICAgICAgICAgYXBwSGVhZGVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkc2NvcGUuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zLmVycm9yID8gICRzdGF0ZS5wYXJhbXMuZXJyb3IgOiB7fTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUb2RvOiBNYWRlIGRlcGVuZGVuY2llcyBvcHRpb25hbFxyXG4gICAgICAgIGZ1bmN0aW9uIGFwcEhlYWRlcigpIHtcclxuICAgICAgICAgICAgcGlwTmF2U2VydmljZS5hcHBiYXIuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgICAgIHBpcE5hdlNlcnZpY2UuaWNvbi5zaG93TWVudSgpO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9ICRzY29wZS5lcnJvckNvbmZpZy5CcmVhZGNydW1iO1xyXG4gICAgICAgICAgICBwaXBOYXZTZXJ2aWNlLmFjdGlvbnMuaGlkZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgfSk7XHJcblxyXG59KSgpO1xyXG4iLCIoZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbm9fY29ubmVjdGlvbi9ub19jb25uZWN0aW9uLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yIHBpcC1lcnJvci1wYWdlIGxheW91dC1jb2x1bW4gZmxleCBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxpbWcgc3JjPVwie3tlcnJvckNvbmZpZy5JbWFnZX19XCIgY2xhc3M9XCJwaXAtcGljIGJsb2NrXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci10ZXh0XCI+e3s6OmVycm9yQ29uZmlnLlRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIj57ezo6ZXJyb3JDb25maWcuU3ViVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItYWN0aW9ucyBoNDggbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxtZC1idXR0b24gYXJpYS1sYWJlbD1cIlJFVFJZXCIgY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIm9uUmV0cnkoJGV2ZW50KVwiPnt7OjpcXCdFUlJPUl9SRVNQT05ESU5HX1JFVFJZXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtaXNzaW5nX3JvdXRlL21pc3Npbmdfcm91dGUuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJwaXAtZXJyb3IgcGlwLWVycm9yLXBhZ2UgbGF5b3V0LWNvbHVtbiBmbGV4IGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGltZyBzcmM9XCJ7e2Vycm9yQ29uZmlnLkltYWdlfX1cIiBjbGFzcz1cInBpcC1waWMgYmxvY2tcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXRleHRcIj57ezo6ZXJyb3JDb25maWcuVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjplcnJvckNvbmZpZy5TdWJUaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGg0OCBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PG1kLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ09OVElOVUVcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwib25Db250aW51ZSgkZXZlbnQpXCI+e3s6OlxcJ0VSUk9SX1JPVVRFX0NPTlRJTlVFXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48ZGl2IGNsYXNzPVwiaDQ4XCIgbmctaWY9XCJ1cmxcIj48YSBuZy1ocmVmPVwie3t1cmx9fVwiPnt7OjpcXCdFUlJPUl9ST1VURV9UUllfQUdBSU5cXCcgfCB0cmFuc2xhdGUgfX06IHt7dXJsfX08L2E+PC9kaXY+PGRpdiBjbGFzcz1cImg0OFwiIG5nLWlmPVwidXJsQmFja1wiPjxhIG5nLWhyZWY9XCJ7e3VybEJhY2t9fVwiPnt7OjpcXCdFUlJPUl9ST1VURV9HT19CQUNLXFwnIHwgdHJhbnNsYXRlIH19OiB7e3VybEJhY2t9fTwvYT48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdtYWludGVuYW5jZS9tYWludGVuYW5jZS5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48aW1nIHNyYz1cInt7ZXJyb3JDb25maWcuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfU1VCVElUTEVcXCcgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiIG5nLWlmPVwidGltZW91dEludGVydmFsXCI+e3s6OlxcJ0VSUk9SX0FWQUlMQUJMRV9UUllfQUdBSU5cXCcgfCB0cmFuc2xhdGV9fSB7e3RpbWVvdXRJbnRlcnZhbH19IHNlYy48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIiBuZy1pZj1cImlzQ29yZG92YVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIm9uQ2xvc2UoJGV2ZW50KVwiIGFyaWEtbGFiZWw9XCJDTE9TRVwiPnt7OjpcXCdFUlJPUl9BVkFJTEFCTEVfQ0xPU0VcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xufV0pO1xufSkoKTtcblxuKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ25vX2Nvbm5lY3Rpb25fcGFuZWwvbm9fY29ubmVjdGlvbl9wYW5lbC5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvci1wYWdlIHBpcC1lcnJvciBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyIGZsZXhcIj48aW1nIHNyYz1cInt7ZXJyb3JDb25maWcuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjplcnJvckNvbmZpZy5UaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OmVycm9yQ29uZmlnLlN1YlRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48bWQtYnV0dG9uIGFyaWEtbGFiZWw9XCJSRVRSWVwiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCJvblJldHJ5KCRldmVudClcIj57ezo6XFwnRVJST1JfUkVTUE9ORElOR19SRVRSWVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndW5rbm93bi91bmtub3duLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yIHBpcC1lcnJvci1wYWdlIGxheW91dC1jb2x1bW4gZmxleCBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxpbWcgc3JjPVwie3tlcnJvckNvbmZpZy5JbWFnZX19XCIgY2xhc3M9XCJwaXAtcGljIGJsb2NrXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci10ZXh0XCI+e3s6OmVycm9yQ29uZmlnLlRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIj57ezo6ZXJyb3JDb25maWcuU3ViVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiIG5nLWlmPVwic2hvd0Vycm9yICYmIGVycm9yX2RldGFpbHMgJiYgZXJyb3JfZGV0YWlscy5tZXNzYWdlXCI+PGRpdiBuZy1pZj1cImVycm9yX2RldGFpbHMuY29kZVwiPkNvZGU6IHt7ZXJyb3JfZGV0YWlscy5jb2RlfX08L2Rpdj48ZGl2IG5nLWlmPVwiZXJyb3JfZGV0YWlscy5tZXNzYWdlXCI+RGVzY3JpcHRpb246IHt7ZXJyb3JfZGV0YWlscy5tZXNzYWdlfX08L2Rpdj48ZGl2IG5nLWlmPVwiZXJyb3JfZGV0YWlscy5zdGF0dXNcIj5IVFRQIHN0YXR1czoge3tlcnJvcl9kZXRhaWxzLnN0YXR1c319PC9kaXY+PGRpdiBuZy1pZj1cImVycm9yX2RldGFpbHMuc2VydmVyX3N0YWNrdHJhY2VcIj5TZXJ2ZXIgc3RhY2t0cmFjZToge3tlcnJvcl9kZXRhaWxzLnNlcnZlcl9zdGFja3RyYWNlfX08L2Rpdj48ZGl2IG5nLWlmPVwiZXJyb3JfZGV0YWlscy5jbGllbnRfc3RhY2t0cmFjZVwiPkNsaWVudCBzdGFja3RyYWNlIHN0YWNrdHJhY2U6IHt7ZXJyb3JfZGV0YWlscy5jbGllbnRfc3RhY2t0cmFjZX19PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiaDQ4XCIgbmctaWY9XCJpc0NvcmRvdmFcIj48bWQtYnV0dG9uIGFyaWEtbGFiZWw9XCJDTE9TRVwiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCJvbkNsb3NlKCRldmVudClcIj57ezo6XFwnRVJST1JfVU5LTk9XTl9DTE9TRVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cImg0OFwiIG5nLWlmPVwiZXJyb3JfZGV0YWlscyAmJiBlcnJvcl9kZXRhaWxzLnN0YXR1c1wiPjxtZC1idXR0b24gYXJpYS1sYWJlbD1cIkRFVEFJTFNcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwib25EZXRhaWxzKCRldmVudClcIj57ezo6XFwnRVJST1JfVU5LTk9XTl9ERVRBSUxTXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd1bnN1cHBvcnRlZC91bnN1cHBvcnRlZC5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXRleHRcIj57ezo6ZXJyb3JDb25maWcuVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjplcnJvckNvbmZpZy5TdWJUaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIiBuZy1pZj1cIm1lZGlhKFxcJ2d0LXhzXFwnKVwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9pZS5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vZW4tdXMvZG93bmxvYWQvaW50ZXJuZXQtZXhwbG9yZXItMTEtZm9yLXdpbmRvd3MtNy1kZXRhaWxzLmFzcHhcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfSUVcXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfSUVfVkVSXFwnIHwgdHJhbnNsYXRlfX08L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2ZtLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvcnUvZmlyZWZveC9uZXcvXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNXFwnIHwgdHJhbnNsYXRlfX08L2E+PHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIG0wXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9nYy5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lL2Jyb3dzZXIvZGVza3RvcC9pbmRleC5odG1sP3BsYXRmb3JtPXdpbjY0I1wiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvby5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly93d3cub3BlcmEuY29tL3J1L2Rvd25sb2FkXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX09cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHNcIiBuZy1pZj1cIm1lZGlhKFxcJ3hzXFwnKVwiPjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2llLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9kb3dubG9hZC9pbnRlcm5ldC1leHBsb3Jlci0xMS1mb3Itd2luZG93cy03LWRldGFpbHMuYXNweFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRVxcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRV9WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvZm0uc3ZnXFwnKTtcIiBjbGFzcz1cInBpcC1waWNcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaDY0IHRwMTYgYnAxNlwiPjxhIGNsYXNzPVwidGV4dC1ib2R5MiBtMFwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tb3ppbGxhLm9yZy9ydS9maXJlZm94L25ldy9cIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSXFwnIHwgdHJhbnNsYXRlfX08L3A+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInRtMTYgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9nYy5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lL2Jyb3dzZXIvZGVza3RvcC9pbmRleC5odG1sP3BsYXRmb3JtPXdpbjY0I1wiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvby5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly93d3cub3BlcmEuY29tL3J1L2Rvd25sb2FkXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX09cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1lcnJvcnMtaHRtbC5taW4uanMubWFwXG4iXX0=