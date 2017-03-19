(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).errors = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    angular.module('pipErrors.Strings', ['pipTranslate'])
        .run(['$injector', function ($injector) {
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
                'technologies. Download one of these great browsers and you\'ll be on your way:',
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
                'technologies. Download one of these great browsers and you\'ll be on your way:',
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
    filterTranslate.$inject = ['$injector'];
    function filterTranslate($injector) {
        var pipTranslate = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;
        return function (key) {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        };
    }
    angular.module('pipErrors.Translate', [])
        .filter('translate', filterTranslate);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorStateItem = (function () {
    function ErrorStateItem() {
    }
    return ErrorStateItem;
}());
exports.ErrorStateItem = ErrorStateItem;
var ErrorsConfig = (function () {
    function ErrorsConfig() {
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
    return ErrorsConfig;
}());
exports.ErrorsConfig = ErrorsConfig;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorsPageRun = (function () {
    function ErrorsPageRun($rootScope, $state, $injector, pipErrorsService) {
        var _this = this;
        this.$state = $state;
        this.$injector = $injector;
        var errorConfig = pipErrorsService.config;
        if (errorConfig.Unsupported.Active) {
            this.checkSupported();
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
                $rootScope['$routing'] = false;
            });
        }
        if (errorConfig.NoConnection.Active) {
            $rootScope.$on('pipNoConnectionError', function (event, params) {
                _this.noConnectionError(event, params);
            });
        }
        if (errorConfig.Unknown.Active) {
            $rootScope.$on('pipUnknownError', function (event, params) {
                _this.unknownError(event, params);
            });
        }
        if (errorConfig.Maintenance.Active) {
            $rootScope.$on('pipMaintenanceError', function (event, params) {
                _this.maintenanceError(event, params);
            });
        }
    }
    ErrorsPageRun.prototype.goToErrors = function (toState, params) {
        if (toState == null)
            throw new Error('Error state was not defined');
        this.$state.go(toState, params);
    };
    ErrorsPageRun.prototype.maintenanceError = function (event, params) {
        this.goToErrors('errors_maintenance', params);
    };
    ErrorsPageRun.prototype.noConnectionError = function (event, params) {
        this.goToErrors('errors_no_connection', params);
    };
    ErrorsPageRun.prototype.unknownError = function (event, params) {
        this.goToErrors('errors_unknown', params);
    };
    ErrorsPageRun.prototype.checkSupported = function (supported) {
        var pipSystemInfo = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
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
        this.$state.go('errors_unsupported');
    };
    return ErrorsPageRun;
}());
var AuthHttpResponseInterceptor = (function () {
    AuthHttpResponseInterceptor.$inject = ['$q', '$location', '$rootScope'];
    function AuthHttpResponseInterceptor($q, $location, $rootScope) {
        this.$q = $q;
        this.$location = $location;
        this.$rootScope = $rootScope;
    }
    AuthHttpResponseInterceptor.prototype.responseError = function (rejection) {
        var toState = this.$rootScope['$state'] && this.$rootScope['$state'].name ? this.$rootScope['$state'].name : null, toParams = this.$rootScope['$state'] && this.$rootScope['$state'].params ? this.$rootScope['$state'].params : null;
        switch (rejection.status) {
            case 503:
                this.$rootScope.$emit('pipMaintenanceError', { error: rejection });
                break;
            case -1:
                this.$rootScope.$emit('pipNoConnectionError', { error: rejection });
                break;
            default:
                console.error("errors_unknown", rejection);
                break;
        }
        return this.$q.reject(rejection);
    };
    return AuthHttpResponseInterceptor;
}());
var maintenance_1 = require("../maintenance/maintenance");
(function () {
    'use strict';
    ErrorsPageConfig.$inject = ['$stateProvider', '$httpProvider'];
    function ErrorsPageConfig($stateProvider, $httpProvider) {
        $httpProvider.interceptors.push('pipAuthHttpResponseInterceptor');
        $stateProvider
            .state('errors_no_connection', {
            url: '/errors/no_connection',
            params: {
                error: null
            },
            controller: 'pipErrorNoConnectionController',
            controllerAs: '$ctrl',
            templateUrl: 'no_connection/no_connection.html'
        })
            .state('errors_maintenance', {
            url: '/errors/maintenance',
            params: {
                error: null
            },
            controller: maintenance_1.ErrorMaintenanceController,
            controllerAs: '$ctrl',
            templateUrl: 'maintenance/maintenance.html'
        })
            .state('errors_missing_route', {
            url: '/errors/missing_route',
            params: {
                unfoundState: null,
                fromState: null
            },
            controller: 'pipErrorMissingRouteController',
            controllerAs: '$ctrl',
            templateUrl: 'missing_route/missing_route.html'
        })
            .state('errors_unsupported', {
            url: '/errors/unsupported',
            params: {
                error: null
            },
            controllerAs: '$ctrl',
            controller: 'pipErrorUnsupportedController',
            templateUrl: 'unsupported/unsupported.html'
        })
            .state('errors_unknown', {
            url: '/errors/unknown',
            params: {
                error: null
            },
            controllerAs: '$ctrl',
            controller: 'pipErrorUnknownController',
            templateUrl: 'unknown/unknown.html'
        });
    }
    angular.module('pipErrors.Pages', [
        'ngMaterial',
        'pipErrors.Strings', 'pipErrors.NoConnection', 'pipErrors.MissingRoute', 'pipErrors.Unsupported',
        'pipErrors.Unknown', 'pipErrors.Maintenance', 'pipErrors.Translate', 'pipErrors.Templates'
    ])
        .config(ErrorsPageConfig)
        .run(['$rootScope', '$state', '$injector', 'pipErrorsService', function ($rootScope, $state, $injector, pipErrorsService) {
        var run = new ErrorsPageRun($rootScope, $state, $injector, pipErrorsService);
    }])
        .service('pipAuthHttpResponseInterceptor', AuthHttpResponseInterceptor);
})();
},{"../maintenance/maintenance":11}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorPagesConfig_1 = require("./ErrorPagesConfig");
var ErrorsService = (function () {
    ErrorsService.$inject = ['config'];
    function ErrorsService(config) {
        "ngInject";
        this._config = config || new ErrorPagesConfig_1.ErrorsConfig();
    }
    Object.defineProperty(ErrorsService.prototype, "config", {
        get: function () {
            console.log(this._config);
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    ErrorsService.prototype.getErrorItemByKey = function (errorName) {
        if (!errorName || !this._config[errorName]) {
            return null;
        }
        return this._config[errorName];
    };
    return ErrorsService;
}());
var ErrorsProvider = (function () {
    function ErrorsProvider() {
        this.config = new ErrorPagesConfig_1.ErrorsConfig();
    }
    ErrorsProvider.prototype.configureErrorByKey = function (errorName, errorParams) {
        if (!errorName || !errorParams)
            return;
        if (!this.config[errorName])
            return;
        this.config[errorName] = _.defaultsDeep(errorParams, this.config[errorName]);
    };
    ErrorsProvider.prototype.configureErrors = function (value) {
        if (!value)
            return;
        this.config = _.defaultsDeep(value, this.config);
    };
    ErrorsProvider.prototype.$get = function () {
        "ngInject";
        if (this._service == null) {
            this._service = new ErrorsService(this.config);
        }
        return this._service;
    };
    return ErrorsProvider;
}());
(function () {
    angular
        .module('pipErrorsService')
        .provider('pipErrorsService', ErrorsProvider);
})();
},{"./ErrorPagesConfig":4}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
},{}],8:[function(require,module,exports){
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
angular.module('pipErrorsService', []);
require("./ErrorsService");
},{"./ErrorsService":6}],9:[function(require,module,exports){
var ClearErrorsLink = (function () {
    function ClearErrorsLink($scope, $element, $attrs, $ctrls) {
        var _this = this;
        this._fieldController = $ctrls[0];
        this._formController = $ctrls[1];
        $scope.$watch($attrs['ngModel'], function (newValue) {
            _this.clearFieldErrors();
            _this.clearFormErrors();
        });
    }
    ClearErrorsLink.prototype.clearFieldErrors = function () {
        var errors = this._fieldController.$error;
        for (var prop in errors) {
            if (errors.hasOwnProperty(prop) && prop.substring(0, 6) == 'ERROR_') {
                this._fieldController.$setValidity(prop, true);
            }
        }
    };
    ClearErrorsLink.prototype.clearFormErrors = function () {
        this._formController.$serverError = {};
    };
    return ClearErrorsLink;
}());
(function () {
    'use strict';
    function clearErrors() {
        return {
            restrict: 'A',
            require: ['ngModel', '^?form'],
            link: ClearErrorsLink
        };
    }
    var thisModule = angular.module('pipClearErrors', []);
    thisModule.directive('pipClearErrors', clearErrors);
})();
},{}],10:[function(require,module,exports){
var FormErrors = (function () {
    FormErrors.$inject = ['$rootScope'];
    function FormErrors($rootScope) {
        this.$rootScope = $rootScope;
    }
    FormErrors.prototype.errorsWithHint = function (field) {
        if (field == null)
            return;
        return _.isEmpty(field.$error) ? { hint: true } : field.$error;
    };
    ;
    FormErrors.prototype.touchedErrorsWithHint = function (form, field) {
        if (form == null)
            return;
        if (field == null)
            return;
        if (form.$submitted && (field.$touched || form.$dirty) || !form.$submitted && (field.$touched || field.$dirty)) {
            var result = _.isEmpty(field.$error) ? { hint: true } : field.$error;
            return result;
        }
        return { hint: true };
    };
    FormErrors.prototype.resetFormErrors = function (form, errors) {
        form.$setPristine();
        form.$setUntouched();
        if (errors) {
            form.$setDirty();
            form.$setSubmitted();
        }
        form['$serverError'] = {};
    };
    FormErrors.prototype.resetFieldsErrors = function (form, field) {
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
            }
            if (form && form.$error) {
                form.$error = {};
            }
        }
    };
    FormErrors.prototype.setFormError = function (form, error, errorFieldMap) {
        if (error == null)
            return;
        form['$serverError'] = form['$serverError'] || {};
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
                form['$serverError'][errorName] = true;
                return;
            }
        }
        if (error.data && error.data.message) {
            form['$serverError']['ERROR_UNKNOWN'] = error.data.message;
            this.goToUnhandledErrorPage(error);
            return;
        }
        if (error.message) {
            form['$serverError']['ERROR_UNKNOWN'] = error.message;
            this.goToUnhandledErrorPage(error);
            return;
        }
        if (error.name) {
            form['$serverError']['ERROR_UNKNOWN'] = error.name;
            this.goToUnhandledErrorPage(error);
            return;
        }
        form['$serverError']['ERROR_UNKNOWN'] = error;
        this.goToUnhandledErrorPage(error);
    };
    FormErrors.prototype.goToUnhandledErrorPage = function (error) {
        this.$rootScope.$emit('pipUnhandledInternalError', {
            error: error
        });
    };
    ;
    return FormErrors;
}());
(function () {
    'use strict';
    angular.module('pipFormErrors', [])
        .service('pipFormErrors', FormErrors);
})();
},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipMaintenanceError = (function () {
    function PipMaintenanceError() {
    }
    return PipMaintenanceError;
}());
exports.PipMaintenanceError = PipMaintenanceError;
var PipMaintenanceErrorConfig = (function () {
    function PipMaintenanceErrorConfig() {
    }
    return PipMaintenanceErrorConfig;
}());
exports.PipMaintenanceErrorConfig = PipMaintenanceErrorConfig;
var PipMaintenanceErrorParams = (function () {
    function PipMaintenanceErrorParams() {
        this.interval = 0;
    }
    return PipMaintenanceErrorParams;
}());
exports.PipMaintenanceErrorParams = PipMaintenanceErrorParams;
var ErrorMaintenanceController = (function () {
    ErrorMaintenanceController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService'];
    function ErrorMaintenanceController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        this._errorKey = 'Maintenance';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope['$routing'] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.timeoutInterval = this.error && this.error.config &&
            this.error.config.params && this.error.config.params.interval ? this.error.config.params.interval : 0;
    }
    ErrorMaintenanceController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    return ErrorMaintenanceController;
}());
exports.ErrorMaintenanceController = ErrorMaintenanceController;
(function () {
    'use strict';
    angular.module('pipErrors.Maintenance', []).controller('PipErrorMaintenanceController', ErrorMaintenanceController);
})();
},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipMissingRouteErrorState = (function () {
    function PipMissingRouteErrorState() {
    }
    return PipMissingRouteErrorState;
}());
var ErrorMissingRouteController = (function () {
    ErrorMissingRouteController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService'];
    function ErrorMissingRouteController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        this._errorKey = 'MissingRoute';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope['$routing'] = false;
        this.appHeader();
        this.fromState = $state && $state.params && $state.params['fromState'] ? $state.params['fromState'] : {};
        this.unfoundState = $state && $state.params ? $state.params['unfoundState'] : {};
        this.url = this.unfoundState && this.unfoundState.to ? $state.href(this.unfoundState.to, this.unfoundState.toParams, { absolute: true }) : '';
        this.urlBack = this.fromState && this.fromState.to ? $state.href(this.fromState.to, this.fromState.fromParams, { absolute: true }) : '';
    }
    ErrorMissingRouteController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    ErrorMissingRouteController.prototype.onContinue = function () {
    };
    ;
    return ErrorMissingRouteController;
}());
(function () {
    'use strict';
    angular.module('pipErrors.MissingRoute', [])
        .controller('pipErrorMissingRouteController', ErrorMissingRouteController);
})();
},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipNoConnectionError = (function () {
    function PipNoConnectionError() {
    }
    return PipNoConnectionError;
}());
exports.PipNoConnectionError = PipNoConnectionError;
var ErrorNoConnectionController = (function () {
    ErrorNoConnectionController.$inject = ['$window', '$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService'];
    function ErrorNoConnectionController($window, $scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        this.$window = $window;
        this._errorKey = 'NoConnection';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope['$routing'] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
    }
    ErrorNoConnectionController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    ErrorNoConnectionController.prototype.onRetry = function () {
        this.$window.history.back();
    };
    return ErrorNoConnectionController;
}());
exports.ErrorNoConnectionController = ErrorNoConnectionController;
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.NoConnection', []);
    thisModule.controller('pipErrorNoConnectionController', ErrorNoConnectionController);
})();
},{}],14:[function(require,module,exports){
var NoConnectionPanelController = (function () {
    NoConnectionPanelController.$inject = ['$scope'];
    function NoConnectionPanelController($scope) {
        this._retry = $scope['retry'];
    }
    NoConnectionPanelController.prototype.onRetry = function () {
        if (this._retry && angular.isFunction(this._retry))
            this._retry();
    };
    return NoConnectionPanelController;
}());
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
            controller: 'pipNoConnectionPanelController',
            controllerAs: '$ctrl'
        };
    });
    thisModule.controller('pipNoConnectionPanelController', NoConnectionPanelController);
})();
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipUnknownErrorDetails = (function () {
    function PipUnknownErrorDetails() {
    }
    return PipUnknownErrorDetails;
}());
exports.PipUnknownErrorDetails = PipUnknownErrorDetails;
var ErrorUnknownController = (function () {
    ErrorUnknownController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService'];
    function ErrorUnknownController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        this._errorKey = 'Unknown';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope['$routing'] = false;
        this.showError = $scope['showError'];
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.parseError();
    }
    ErrorUnknownController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    ErrorUnknownController.prototype.parseError = function () {
        this.error_details = new PipUnknownErrorDetails();
        this.error_details.code = this.error.code;
        this.error_details.message = this.error.message;
        this.error_details.status = this.error.status;
        this.error_details.server_stacktrace = function () { };
        this.error_details.client_stacktrace = function () { };
    };
    ErrorUnknownController.prototype.onDetails = function () {
        this.showError = true;
    };
    return ErrorUnknownController;
}());
exports.ErrorUnknownController = ErrorUnknownController;
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unknown', []);
    thisModule.controller('pipErrorUnknownController', ErrorUnknownController);
})();
},{}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PipUnsupportedError = (function () {
    function PipUnsupportedError() {
    }
    return PipUnsupportedError;
}());
exports.PipUnsupportedError = PipUnsupportedError;
var ErrorUnsupportedController = (function () {
    ErrorUnsupportedController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorsService'];
    function ErrorUnsupportedController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorsService) {
        this._errorKey = 'Unsupported';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope['$routing'] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
    }
    ErrorUnsupportedController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    return ErrorUnsupportedController;
}());
exports.ErrorUnsupportedController = ErrorUnsupportedController;
(function () {
    'use strict';
    var thisModule = angular.module('pipErrors.Unsupported', []);
    thisModule.controller('pipErrorUnsupportedController', ErrorUnsupportedController);
})();
},{}],17:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/maintenance.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_AVAILABLE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_AVAILABLE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="$ctrl.timeoutInterval">{{::\'ERROR_AVAILABLE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="$ctrl.isCordova"><md-button class="md-accent" ng-click="$ctrl.onClose($event)" aria-label="CLOSE">{{::\'ERROR_AVAILABLE_CLOSE\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="CONTINUE" class="md-accent" ng-click="$ctrl.onContinue($event)">{{::\'ERROR_ROUTE_CONTINUE\' | translate}}</md-button></div><div class="h48" ng-if="url"><a ng-href="{{$ctrl.url}}">{{::\'ERROR_ROUTE_TRY_AGAIN\' | translate }}: {{$ctrl.url}}</a></div><div class="h48" ng-if="urlBack"><a ng-href="{{$ctrl.urlBack}}">{{::\'ERROR_ROUTE_GO_BACK\' | translate }}: {{$ctrl.urlBack}}</a></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="$ctrl.onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error-page pip-error layout-column layout-align-center-center flex"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="$ctrl.onRetry($event)">{{::\'ERROR_RESPONDING_RETRY\' | translate}}</md-button></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-subtext" ng-if="$ctrl.showError && $ctrl.error_details && $ctrl.error_details.message"><div ng-if="$ctrl.error_details.code">Code: {{$ctrl.error_details.code}}</div><div ng-if="$ctrl.error_details.message">Description: {{$ctrl.error_details.message}}</div><div ng-if="$ctrl.error_details.status">HTTP status: {{$ctrl.error_details.status}}</div><div ng-if="$ctrl.error_details.server_stacktrace">Server stacktrace: {{$ctrl.error_details.server_stacktrace}}</div><div ng-if="$ctrl.error_details.client_stacktrace">Client stacktrace stacktrace: {{$ctrl.error_details.client_stacktrace}}</div></div><div class="pip-error-actions layout-column layout-align-center-center"><div class="h48" ng-if="$ctrl.isCordova"><md-button aria-label="CLOSE" class="md-accent" ng-click="$ctrl.onClose($event)">{{::\'ERROR_UNKNOWN_CLOSE\' | translate}}</md-button></div><div class="h48" ng-if="$ctrl.error_details && $ctrl.error_details.status"><md-button aria-label="DETAILS" class="md-accent" ng-click="$ctrl.onDetails($event)">{{::\'ERROR_UNKNOWN_DETAILS\' | translate}}</md-button></div></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="$ctrl.media(\'gt-xs\')"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div><div class="pip-error-details" ng-if="$ctrl.media(\'xs\')"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div></div></div></div>');
}]);
})();



},{}]},{},[17,1,2,4,5,6,7,8,3,9,10,11,12,14,13,15,16])(17)
});

//# sourceMappingURL=pip-webui-errors.js.map
