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
Object.defineProperty(exports, "__esModule", { value: true });
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
Object.defineProperty(exports, "__esModule", { value: true });
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
  $templateCache.put('maintenance/maintenance.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_AVAILABLE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_AVAILABLE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="timeoutInterval">{{::\'ERROR_AVAILABLE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="isCordova"><md-button class="md-accent" ng-click="onClose($event)" aria-label="CLOSE">{{::\'ERROR_AVAILABLE_CLOSE\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="CONTINUE" class="md-accent" ng-click="onContinue($event)">{{::\'ERROR_ROUTE_CONTINUE\' | translate}}</md-button></div><div class="h48" ng-if="url"><a ng-href="{{url}}">{{::\'ERROR_ROUTE_TRY_AGAIN\' | translate }}: {{url}}</a></div><div class="h48" ng-if="urlBack"><a ng-href="{{urlBack}}">{{::\'ERROR_ROUTE_GO_BACK\' | translate }}: {{urlBack}}</a></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-subtext" ng-if="showError && error_details && error_details.message"><div ng-if="error_details.code">Code: {{error_details.code}}</div><div ng-if="error_details.message">Description: {{error_details.message}}</div><div ng-if="error_details.status">HTTP status: {{error_details.status}}</div><div ng-if="error_details.server_stacktrace">Server stacktrace: {{error_details.server_stacktrace}}</div><div ng-if="error_details.client_stacktrace">Client stacktrace stacktrace: {{error_details.client_stacktrace}}</div></div><div class="pip-error-actions layout-column layout-align-center-center"><div class="h48" ng-if="isCordova"><md-button aria-label="CLOSE" class="md-accent" ng-click="onClose($event)">{{::\'ERROR_UNKNOWN_CLOSE\' | translate}}</md-button></div><div class="h48" ng-if="error_details && error_details.status"><md-button aria-label="DETAILS" class="md-accent" ng-click="onDetails($event)">{{::\'ERROR_UNKNOWN_DETAILS\' | translate}}</md-button></div></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::errorConfig.SubTitle | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="media(\'gt-xs\')"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div><div class="pip-error-details" ng-if="media(\'xs\')"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div></div></div></div>');
}]);
})();



},{}]},{},[15,1,2,4,5,6,3,7,8,9,10,12,11,13,14])(15)
});

//# sourceMappingURL=pip-webui-errors.js.map
