(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).errors = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorPageConfig = (function () {
    function ErrorPageConfig() {
    }
    return ErrorPageConfig;
}());
exports.ErrorPageConfig = ErrorPageConfig;
var ErrorPageConfigs = (function () {
    function ErrorPageConfigs() {
        this.Maintenance = {
            Active: true,
            Name: 'errors_maintenance',
            Event: 'pipMaintenanceError',
            Title: 'ERROR_MAINTENANCE_TITLE',
            SubTitle: 'ERROR_MAINTENANCE_SUBTITLE',
            Breadcrumb: 'ERROR_MAINTENANCE_TITLE',
            Image: 'images/maintenance.svg'
        };
        this.MissingRoute = {
            Active: true,
            Name: 'errors_missing_route',
            Event: '$stateNotFound',
            Title: 'ERROR_MISSING_ROUTE_TITLE',
            SubTitle: 'ERROR_MISSING_ROUTE_SUBTITLE',
            Breadcrumb: 'ERROR_MISSING_ROUTE_PAGE_TITLE',
            Image: 'images/invalid_route.svg'
        };
        this.NoConnection = {
            Active: true,
            Name: 'errors_no_connection',
            Event: 'pipNoConnectionError',
            Title: 'ERROR_NO_CONNECTION_TITLE',
            SubTitle: 'ERROR_NO_CONNECTION_SUBTITLE',
            Breadcrumb: 'ERROR_NO_CONNECTION_TITLE',
            Image: 'images/no_response.svg',
            StateIgnored: []
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
            Params: {}
        };
    }
    return ErrorPageConfigs;
}());
exports.ErrorPageConfigs = ErrorPageConfigs;
var SupportedBrowsers = (function () {
    function SupportedBrowsers() {
        this.edge = 11;
        this.ie = 11;
        this.firefox = 43;
        this.opera = 35;
        this.chrome = 47;
    }
    return SupportedBrowsers;
}());
exports.SupportedBrowsers = SupportedBrowsers;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorPageConfig_1 = require("./ErrorPageConfig");
var ErrorPageConfigService = (function () {
    ErrorPageConfigService.$inject = ['config'];
    function ErrorPageConfigService(config) {
        "ngInject";
        this._config = config || new ErrorPageConfig_1.ErrorPageConfigs();
    }
    Object.defineProperty(ErrorPageConfigService.prototype, "configs", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    ErrorPageConfigService.prototype.getErrorPageConfig = function (pageName) {
        console.log(pageName, this._config);
        if (!pageName || !this._config[pageName]) {
            return null;
        }
        return this._config[pageName];
    };
    return ErrorPageConfigService;
}());
var ErrorPageConfigProvider = (function () {
    function ErrorPageConfigProvider() {
        this.configs = new ErrorPageConfig_1.ErrorPageConfigs();
        this.configs.Unsupported.Params.supported = new ErrorPageConfig_1.SupportedBrowsers();
    }
    ErrorPageConfigProvider.prototype.setErrorPageConfig = function (pageName, config) {
        if (!pageName || !config)
            return;
        if (!this.configs[pageName])
            return;
        this.configs[pageName] = _.defaultsDeep(config, this.configs[pageName]);
    };
    ErrorPageConfigProvider.prototype.setAllErrorPageConfigs = function (configs) {
        if (!configs)
            return;
        this.configs = _.defaultsDeep(configs, this.configs);
    };
    ErrorPageConfigProvider.prototype.setSupportedBrowsers = function (browsers) {
        this.configs.Unsupported.Params.supported = browsers;
    };
    ErrorPageConfigProvider.prototype.$get = function () {
        "ngInject";
        if (this._service == null) {
            this._service = new ErrorPageConfigService(this.configs);
        }
        return this._service;
    };
    return ErrorPageConfigProvider;
}());
(function () {
    angular
        .module('pipErrorPageConfigService', [])
        .provider('pipErrorPageConfigService', ErrorPageConfigProvider);
})();
},{"./ErrorPageConfig":1}],3:[function(require,module,exports){
(function () {
    var ClearErrorsLink = (function () {
        ClearErrorsLink.$inject = ['$scope', '$element', '$attrs', '$ctrls'];
        function ClearErrorsLink($scope, $element, $attrs, $ctrls) {
            'ngInject';
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
    function clearErrorsDirective() {
        return {
            restrict: 'A',
            require: ['ngModel', '^?form'],
            link: function ($scope, $element, $attrs, $ctrls) {
                new ClearErrorsLink($scope, $element, $attrs, $ctrls);
            }
        };
    }
    angular
        .module('pipClearErrors', [])
        .directive('pipClearErrors', clearErrorsDirective);
})();
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FormErrorsService = (function () {
    FormErrorsService.$inject = ['$rootScope'];
    function FormErrorsService($rootScope) {
        this.$rootScope = $rootScope;
    }
    FormErrorsService.prototype.errorsWithHint = function (field) {
        if (field == null)
            return;
        return _.isEmpty(field.$error) ? { hint: true } : field.$error;
    };
    ;
    FormErrorsService.prototype.touchedErrorsWithHint = function (form, field, notSubmited) {
        if (form == null)
            return;
        if (field == null)
            return;
        if (form.$submitted || notSubmited && (field.$touched || field.$dirty)) {
            var result = _.isEmpty(field.$error) ? { hint: true } : field.$error;
            return result;
        }
        return { hint: true };
    };
    FormErrorsService.prototype.resetFormErrors = function (form, errors) {
        form.$setPristine();
        form.$setUntouched();
        if (errors) {
            form.$setDirty();
            form.$setSubmitted();
        }
        form['$serverError'] = {};
    };
    FormErrorsService.prototype.resetFieldsErrors = function (form, field) {
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
    FormErrorsService.prototype.setFormError = function (form, error, errorFieldMap) {
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
    FormErrorsService.prototype.goToUnhandledErrorPage = function (error) {
        this.$rootScope.$emit('pipUnhandledInternalError', {
            error: error
        });
    };
    return FormErrorsService;
}());
(function () {
    angular
        .module('pipFormErrors', [])
        .service('pipFormErrors', FormErrorsService);
})();
},{}],5:[function(require,module,exports){
configureHttpInterceptor.$inject = ['$stateProvider', '$httpProvider'];
var HttpResponseInterceptor = (function () {
    HttpResponseInterceptor.$inject = ['$q', '$location', '$rootScope'];
    function HttpResponseInterceptor($q, $location, $rootScope) {
        "ngInject";
        var _this = this;
        this.$q = $q;
        this.$location = $location;
        this.$rootScope = $rootScope;
        this.responseError = function (rejection) {
            switch (rejection.status) {
                case 503:
                    _this.$rootScope.$emit('pipMaintenanceError', { error: rejection });
                    break;
                case -1:
                    _this.$rootScope.$emit('pipNoConnectionError', { error: rejection });
                    break;
                default:
                    console.error("errors_unknown", rejection);
                    break;
            }
            return _this.$q.reject(rejection);
        };
    }
    return HttpResponseInterceptor;
}());
function configureHttpInterceptor($stateProvider, $httpProvider) {
    $httpProvider.interceptors.push('pipHttpResponseInterceptor');
}
angular
    .module('pipErrors.Pages')
    .config(configureHttpInterceptor)
    .service('pipHttpResponseInterceptor', HttpResponseInterceptor);
},{}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
angular
    .module('pipErrors.Pages', [
    'ngMaterial'
]);
require("./maintenance/MaintenanceErrorPage");
require("./missing_route/MissingRouteErrorPage");
require("./no_connection/NoConnectionErrorPage");
require("./unknown/UnknownErrorPage");
require("./unsupported/UnsupportedErrorPage");
require("./http_intercept/HttpResponseInterceptor");
require("./error_pages/ErrorPageConfigService");
require("./no_connection_panel/NoConnectionPanel");
require("./form_errors/ClearErrorsDirective");
require("./form_errors/FormErrorsService");
angular
    .module('pipErrors', [
    'pipErrors.Templates',
    'pipErrors.Pages',
    'pipErrorPageConfigService',
    'pipNoConnectionPanel',
    'pipClearErrors',
    'pipFormErrors'
]);
__export(require("./error_pages/ErrorPageConfig"));
},{"./error_pages/ErrorPageConfig":1,"./error_pages/ErrorPageConfigService":2,"./form_errors/ClearErrorsDirective":3,"./form_errors/FormErrorsService":4,"./http_intercept/HttpResponseInterceptor":5,"./maintenance/MaintenanceErrorPage":7,"./missing_route/MissingRouteErrorPage":8,"./no_connection/NoConnectionErrorPage":9,"./no_connection_panel/NoConnectionPanel":10,"./unknown/UnknownErrorPage":11,"./unsupported/UnsupportedErrorPage":12}],7:[function(require,module,exports){
"use strict";
configureMaintenanceErrorPageRoute.$inject = ['$stateProvider'];
initMaintenanceErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setMaintenanceErrorPageResources.$inject = ['$injector'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsMaintenanceState = 'errors_maintenance';
exports.MaintenanceErrorEvent = 'pipMaintenanceError';
var MaintenanceError = (function () {
    function MaintenanceError() {
    }
    return MaintenanceError;
}());
var MaintenanceErrorConfig = (function () {
    function MaintenanceErrorConfig() {
    }
    return MaintenanceErrorConfig;
}());
var MaintenanceErrorParams = (function () {
    function MaintenanceErrorParams() {
        this.interval = 0;
    }
    return MaintenanceErrorParams;
}());
var MaintenanceErrorPageController = (function () {
    MaintenanceErrorPageController.$inject = ['$scope', '$window', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function MaintenanceErrorPageController($scope, $window, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
        this.$window = $window;
        this.$state = $state;
        this._pageName = 'Maintenance';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.config = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope[pip.services.RoutingVar] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.timeoutInterval = this.error && this.error.config &&
            this.error.config.params && this.error.config.params.interval ? this.error.config.params.interval : 0;
    }
    MaintenanceErrorPageController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    MaintenanceErrorPageController.prototype.onRetry = function () {
        if (this.$state.params && this.$state.params['fromState'] && this.$state.params['fromState'] != this.config.Name) {
            this.$state.go(this.$state.params['fromState'], this.$state.params['fromParams']);
        }
        else if (this.config.RedirectSateDefault) {
            this.$state.go(this.config.RedirectSateDefault);
        }
        else {
            this.$window.history.back();
        }
    };
    return MaintenanceErrorPageController;
}());
function configureMaintenanceErrorPageRoute($stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsMaintenanceState, {
        url: '/errors/maintenance',
        params: {
            error: null
        },
        controller: MaintenanceErrorPageController,
        controllerAs: '$ctrl',
        templateUrl: 'maintenance/MaintenanceErrorPage.html'
    });
}
function initMaintenanceErrorPage($rootScope, $state, pipErrorPageConfigService) {
    "ngInject";
    var config = pipErrorPageConfigService.configs;
    if (!config.Maintenance.Active)
        return;
    $rootScope.$on(exports.MaintenanceErrorEvent, function (event, params) {
        $state.go(exports.ErrorsMaintenanceState, params);
    });
}
function setMaintenanceErrorPageResources($injector) {
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null)
        return;
    pipTranslate.translations('en', {
        'ERROR_MAINTENANCE_TITLE': 'The server is on maintenance',
        'ERROR_MAINTENANCE_SUBTITLE': 'Sorry for the inconvenience. This application is undergoing maintenance for ' +
            'a short period. We\'ll be back soon. Thank for your patience.',
        'ERROR_MAINTENANCE_CLOSE': 'Close',
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Try after',
        ERROR_MAINTENANCE_RETRY: 'Retry'
    });
    pipTranslate.translations('ru', {
        'ERROR_MAINTENANCE_TITLE': 'Сервер находится на обслуживании',
        'ERROR_MAINTENANCE_SUBTITLE': 'Приносим извинения за неудобства. Это приложение проходит техническое обслуживание на короткий период времени. Мы скоро вернемся. Благодарим за терпение.',
        'ERROR_MAINTENANCE_CLOSE': 'Закрыть',
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Попробовать еще',
        ERROR_MAINTENANCE_RETRY: 'Попробовать еще'
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureMaintenanceErrorPageRoute)
        .run(initMaintenanceErrorPage)
        .run(setMaintenanceErrorPageResources);
})();
},{}],8:[function(require,module,exports){
"use strict";
configureMissingRouteErrorPageRoute.$inject = ['$stateProvider'];
initMissingRouteErrorPage.$inject = ['$rootScope', '$state', '$injector', 'pipErrorPageConfigService'];
setMissingRouteErrorPageResources.$inject = ['$injector'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsMissingRouteState = 'errors_missing_route';
exports.StateNotFoundEvent = '$stateNotFound';
var MissingRouteErrorState = (function () {
    function MissingRouteErrorState() {
    }
    return MissingRouteErrorState;
}());
var MissingRouteErrorPageController = (function () {
    MissingRouteErrorPageController.$inject = ['$scope', '$location', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function MissingRouteErrorPageController($scope, $location, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
        this.$location = $location;
        this._pageName = 'MissingRoute';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.config = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope[pip.services.RoutingVar] = false;
        this.appHeader();
        this.fromState = $state && $state.params && $state.params['fromState'] ? $state.params['fromState'] : {};
        this.unfoundState = $state && $state.params ? $state.params['unfoundState'] : {};
        this.url = this.unfoundState && this.unfoundState.to ? $state.href(this.unfoundState.to, this.unfoundState.toParams, { absolute: true }) : '';
        this.urlBack = this.fromState && this.fromState.to ? $state.href(this.fromState.to, this.fromState.fromParams, { absolute: true }) : '';
    }
    MissingRouteErrorPageController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    MissingRouteErrorPageController.prototype.onContinue = function () {
        this.$location.url('/');
    };
    return MissingRouteErrorPageController;
}());
function configureMissingRouteErrorPageRoute($stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsMissingRouteState, {
        url: '/errors/missing_route',
        params: {
            unfoundState: null,
            fromState: null
        },
        controller: MissingRouteErrorPageController,
        controllerAs: '$ctrl',
        templateUrl: 'missing_route/MissingRouteErrorPage.html'
    });
}
function initMissingRouteErrorPage($rootScope, $state, $injector, pipErrorPageConfigService) {
    "ngInject";
    var config = pipErrorPageConfigService.configs;
    if (!config.MissingRoute.Active)
        return;
    $rootScope.$on(exports.StateNotFoundEvent, function (event, unfoundState, fromState, fromParams) {
        event.preventDefault();
        $state.go(exports.ErrorsMissingRouteState, {
            unfoundState: unfoundState,
            fromState: {
                to: fromState ? fromState.name : '',
                fromParams: fromParams
            }
        });
        $rootScope[pip.services.RoutingVar] = false;
    });
}
function setMissingRouteErrorPageResources($injector) {
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null)
        return;
    pipTranslate.translations('en', {
        'ERROR_MISSING_ROUTE_TITLE': 'Sorry, the page isn\'t available',
        'ERROR_MISSING_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
        'ERROR_MISSING_ROUTE_CONTINUE': 'Continue',
        'ERROR_MISSING_ROUTE_TRY_AGAIN': 'Try again',
        'ERROR_MISSING_ROUTE_GO_BACK': 'Go Back',
        'ERROR_MISSING_ROUTE_PAGE_TITLE': 'Wrong page'
    });
    pipTranslate.translations('ru', {
        'ERROR_MISSING_ROUTE_TITLE': 'К сожалению, страница недоступна',
        'ERROR_MISSING_ROUTE_SUBTITLE': 'Введенная Вами ссылка не коректная или страница может быть удалена.',
        'ERROR_MISSING_ROUTE_CONTINUE': 'Продолжить',
        'ERROR_MISSING_ROUTE_TRY_AGAIN': 'Попробовать еще',
        'ERROR_MISSING_ROUTE_GO_BACK': 'Вернуться',
        'ERROR_MISSING_ROUTE_PAGE_TITLE': 'Ошибочная страница'
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureMissingRouteErrorPageRoute)
        .run(initMissingRouteErrorPage)
        .run(setMissingRouteErrorPageResources);
})();
},{}],9:[function(require,module,exports){
"use strict";
configureNoConnectionErrorPageRoute.$inject = ['$injector', '$stateProvider'];
initNoConnectionErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setNoConnectionErrorPageResources.$inject = ['$injector'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsConnectionState = 'errors_no_connection';
exports.ErrorsConnectionEvent = 'pipNoConnectionError';
var NoConnectionError = (function () {
    function NoConnectionError() {
    }
    return NoConnectionError;
}());
var NoConnectionErrorPageController = (function () {
    NoConnectionErrorPageController.$inject = ['$window', '$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function NoConnectionErrorPageController($window, $scope, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
        this.$window = $window;
        this.$state = $state;
        this._pageName = 'NoConnection';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope[pip.services.RoutingVar] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
    }
    NoConnectionErrorPageController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    NoConnectionErrorPageController.prototype.onRetry = function () {
        if (this.$state.params && this.$state.params['fromState'] && this.$state.params['fromState'] != this.errorConfig.Name) {
            this.$state.go(this.$state.params['fromState'], this.$state.params['fromParams']);
        }
        else if (this.errorConfig.RedirectSateDefault) {
            this.$state.go(this.errorConfig.RedirectSateDefault);
        }
        else {
            this.$window.history.back();
        }
    };
    return NoConnectionErrorPageController;
}());
function configureNoConnectionErrorPageRoute($injector, $stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsConnectionState, {
        url: '/errors/no_connection',
        params: {
            error: null,
            fromState: null,
            fromParams: null
        },
        controller: NoConnectionErrorPageController,
        controllerAs: '$ctrl',
        templateUrl: 'no_connection/NoConnectionErrorPage.html'
    });
}
function initNoConnectionErrorPage($rootScope, $state, pipErrorPageConfigService) {
    "ngInject";
    var config = pipErrorPageConfigService.configs;
    if (!config.NoConnection.StateIgnored)
        config.NoConnection.StateIgnored = [];
    config.NoConnection.StateIgnored.push(config.NoConnection.Name);
    if (!config.NoConnection.Active)
        return;
    $rootScope.$on(exports.ErrorsConnectionEvent, function (event, params) {
        params = params ? params : {};
        if (config.NoConnection.StateIgnored.indexOf($state.current.name) > -1) {
            return;
        }
        else {
            params.fromState = $state.current.name;
            params.fromParams = $state.params;
        }
        if ($state.current.name == 'recover_password' || $state.current.name == 'change_password'
            || $state.current.name == 'expire_change_password' || $state.current.name == 'reset_password'
            || $state.current.name == 'verify_email' || $state.current.name == 'verify_email_success'
            || $state.current.name == 'signin' || $state.current.name == 'signup') {
            return;
        }
        $state.go(exports.ErrorsConnectionState, params);
    });
}
function setNoConnectionErrorPageResources($injector) {
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null)
        return;
    pipTranslate.translations('en', {
        'ERROR_NO_CONNECTION_TITLE': 'No connection to the server',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Unable to connect to the server. Check your Internet connection and try again.',
        'ERROR_NO_CONNECTION_RETRY': 'Retry',
    });
    pipTranslate.translations('ru', {
        'ERROR_NO_CONNECTION_TITLE': 'Нет подключения к серверу',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Невозможно подключиться к серверу. Проверьте подключение к Интернету и повторите попытку.',
        'ERROR_NO_CONNECTION_RETRY': 'Повторить',
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureNoConnectionErrorPageRoute)
        .run(initNoConnectionErrorPage)
        .run(setNoConnectionErrorPageResources);
})();
},{}],10:[function(require,module,exports){
(function () {
    var NoConnectionPanelController = (function () {
        NoConnectionPanelController.$inject = ['$scope'];
        function NoConnectionPanelController($scope) {
            this._retry = $scope['retry'];
            this.error = $scope['error'];
        }
        NoConnectionPanelController.prototype.onRetry = function () {
            if (this._retry && angular.isFunction(this._retry))
                this._retry();
        };
        return NoConnectionPanelController;
    }());
    angular
        .module("pipNoConnectionPanel", [])
        .directive('pipNoConnectionPanel', function () {
        return {
            restrict: 'E',
            scope: {
                error: '=pipError',
                retry: '=pipRetry'
            },
            templateUrl: 'no_connection_panel/NoConnectionPanel.html',
            controller: NoConnectionPanelController,
            controllerAs: '$ctrl'
        };
    });
})();
},{}],11:[function(require,module,exports){
"use strict";
configureUnknownErrorPageRoute.$inject = ['$injector', '$stateProvider'];
initUnknownErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setUnknownErrorPageResources.$inject = ['$injector'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsUnknownState = 'errors_unknown';
exports.ErrorsUnknownEvent = 'pipUnknownError';
var UnknownErrorDetails = (function () {
    function UnknownErrorDetails() {
    }
    return UnknownErrorDetails;
}());
var UnknownErrorPageController = (function () {
    UnknownErrorPageController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function UnknownErrorPageController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
        this._pageName = 'Unknown';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.config = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope[pip.services.RoutingVar] = false;
        this.showError = $scope['showError'];
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.parseError();
    }
    UnknownErrorPageController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    UnknownErrorPageController.prototype.parseError = function () {
        this.error_details = new UnknownErrorDetails();
        this.error_details.code = this.error.code;
        this.error_details.message = this.error.message;
        this.error_details.status = this.error.status;
        this.error_details.server_stacktrace = function () { };
        this.error_details.client_stacktrace = function () { };
    };
    UnknownErrorPageController.prototype.onDetails = function () {
        this.showError = true;
    };
    return UnknownErrorPageController;
}());
function configureUnknownErrorPageRoute($injector, $stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsUnknownState, {
        url: '/errors/unknown',
        params: {
            error: null
        },
        controllerAs: '$ctrl',
        controller: UnknownErrorPageController,
        templateUrl: 'unknown/UnknownErrorPage.html'
    });
}
function initUnknownErrorPage($rootScope, $state, pipErrorPageConfigService) {
    "ngInject";
    var config = pipErrorPageConfigService.configs;
    if (!config.Unknown.Active)
        return;
    $rootScope.$on(exports.ErrorsUnknownEvent, function (event, params) {
        $state.go(exports.ErrorsUnknownState, params);
    });
}
function setUnknownErrorPageResources($injector) {
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null)
        return;
    pipTranslate.translations('en', {
        'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
        'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
        'ERROR_UNKNOWN_CLOSE': 'Close',
        'ERROR_UNKNOWN_DETAILS': 'Details',
    });
    pipTranslate.translations('ru', {
        'ERROR_UNKNOWN_TITLE': 'Что-то пошло не так',
        'ERROR_UNKNOWN_SUBTITLE': 'Произошла неизвестная ошибка, но не беспокойтесь, мы уже уведомлены.',
        'ERROR_UNKNOWN_CLOSE': 'Закрыть',
        'ERROR_UNKNOWN_DETAILS': 'Подробнее',
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureUnknownErrorPageRoute)
        .run(initUnknownErrorPage)
        .run(setUnknownErrorPageResources);
})();
},{}],12:[function(require,module,exports){
"use strict";
configureUnsupportedErrorPageRoute.$inject = ['$stateProvider'];
initUnsupportedErrorPage.$inject = ['$rootScope', '$state', '$injector', 'pipErrorPageConfigService'];
setUnsupportedErrorPageResources.$inject = ['$injector'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsUnsupportedState = 'errors_unsupported';
exports.ErrorsUnsupportedEvent = 'pipUnsupportedError';
var UnsupportedError = (function () {
    function UnsupportedError() {
    }
    return UnsupportedError;
}());
var UnsupportedErrorPageController = (function () {
    UnsupportedErrorPageController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function UnsupportedErrorPageController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
        this._pageName = 'Unsupported';
        this.isCordova = false;
        var pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;
        this.media = pipMedia ? pipMedia : $mdMedia;
        $rootScope[pip.services.RoutingVar] = false;
        this.appHeader();
        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
    }
    UnsupportedErrorPageController.prototype.appHeader = function () {
        if (!this.pipNavService)
            return;
        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    };
    return UnsupportedErrorPageController;
}());
function configureUnsupportedErrorPageRoute($stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsUnsupportedState, {
        url: '/errors/unsupported',
        params: {
            error: null
        },
        controllerAs: '$ctrl',
        controller: UnsupportedErrorPageController,
        templateUrl: 'unsupported/UnsupportedErrorPage.html'
    });
}
function initUnsupportedErrorPage($rootScope, $state, $injector, pipErrorPageConfigService) {
    "ngInject";
    var config = pipErrorPageConfigService.configs;
    if (!config.Unsupported.Active)
        return;
    var pipSystemInfo = $injector.has('pipSystemInfo') ? $injector.get('pipSystemInfo') : null;
    if (!pipSystemInfo) {
        return;
    }
    var supportedVersions = config.Unsupported.Params.supported;
    var browser = pipSystemInfo.browserName;
    var version = pipSystemInfo.browserVersion;
    version = version.split(".")[0];
    if (browser
        && supportedVersions[browser]
        && version >= supportedVersions[browser]) {
        return;
    }
    $state.go(exports.ErrorsUnsupportedState);
}
function setUnsupportedErrorPageResources($injector) {
    var pipTranslate = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null)
        return;
    pipTranslate.translations('en', {
        'ERROR_UNSUPPORTED_TITLE': 'This browser is not supported',
        'ERROR_UNSUPPORTED_SUBTITLE': 'Our application using the latest technology. This makes the application faster ' +
            'and easier to use. Unfortunately, your browser doesn\'t support those ' +
            'technologies. Download one of these great browsers and you\'ll be on your way:',
        'ERROR_UNSUPPORTED_O': 'Opera',
        'ERROR_UNSUPPORTED_O_VER': 'Version',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Version',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Version',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Version',
        ERROR_UNSUPPORTED_EDGE: 'Edge',
        ERROR_UNSUPPORTED_EDGE_VER: 'Version',
        ERROR_UNSUPPORTED_SAFARI_VER: 'Version',
        ERROR_UNSUPPORTED_SAFARI: 'Safari'
    });
    pipTranslate.translations('ru', {
        'ERROR_UNSUPPORTED_TITLE': 'Этот браузер не поддерживается. ',
        'ERROR_UNSUPPORTED_SUBTITLE': 'Наше приложение использует новейшие технологии. Это делает приложение более быстрым ' +
            'и простым в использовании. К сожалению, ваш браузер не поддерживает эти технологии. ' +
            'Загрузите один из этих великолепных браузеров, и вы будете в пути:',
        'ERROR_UNSUPPORTED_O': 'Opera',
        'ERROR_UNSUPPORTED_O_VER': 'Версия',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Версия',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Версия',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Версия',
        ERROR_UNSUPPORTED_EDGE: 'Edge',
        ERROR_UNSUPPORTED_EDGE_VER: 'Версия',
        ERROR_UNSUPPORTED_SAFARI_VER: 'Версия',
        ERROR_UNSUPPORTED_SAFARI: 'Safari'
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureUnsupportedErrorPageRoute)
        .run(initUnsupportedErrorPage)
        .run(setUnsupportedErrorPageResources);
})();
},{}],13:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/MaintenanceErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.config.Image}}" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_MAINTENANCE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_MAINTENANCE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="$ctrl.timeoutInterval">{{::\'ERROR_MAINTENANCE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="$ctrl.isCordova"><md-button class="md-accent" ng-click="$ctrl.onClose($event)" aria-label="CLOSE">{{::\'ERROR_MAINTENANCE_CLOSE\' | translate}}</md-button></div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="!$ctrl.isCordova"><md-button aria-label="RETRY" class="md-accent" ng-click="$ctrl.onRetry($event)">{{::\'ERROR_MAINTENANCE_RETRY\' | translate}}</md-button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('missing_route/MissingRouteErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.config.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.config.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.config.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="CONTINUE" class="md-accent" ng-click="$ctrl.onContinue($event)">{{::\'ERROR_MISSING_ROUTE_CONTINUE\' | translate}}</md-button></div><div class="h48" ng-if="url"><a ng-href="{{$ctrl.url}}">{{::\'ERROR_MISSING_ROUTE_TRY_AGAIN\' | translate }}: {{$ctrl.url}}</a></div><div class="h48" ng-if="urlBack"><a ng-href="{{$ctrl.urlBack}}">{{::\'ERROR_MISSING_ROUTE_GO_BACK\' | translate }}: {{$ctrl.urlBack}}</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection/NoConnectionErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.errorConfig.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="$ctrl.onRetry($event)">{{::\'ERROR_NO_CONNECTION_RETRY\' | translate}}</md-button></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('no_connection_panel/NoConnectionPanel.html',
    '<div class="pip-error-page pip-error layout-column layout-align-center-center flex"><img src="{{$ctrl.error.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.error.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.error.SubTitle | translate}}</div><div class="pip-error-actions h48 layout-column layout-align-center-center"><md-button aria-label="RETRY" class="md-accent" ng-click="$ctrl.onRetry($event)">{{::\'ERROR_NO_CONNECTION_RETRY\' | translate}}</md-button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('unknown/UnknownErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.config.Image}}" class="pip-pic block"><div class="pip-error-text">{{::$ctrl.config.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.config.SubTitle | translate}}</div><div class="pip-error-subtext" ng-if="$ctrl.showError && $ctrl.error_details && $ctrl.error_details.message"><div ng-if="$ctrl.error_details.code">Code: {{$ctrl.error_details.code}}</div><div ng-if="$ctrl.error_details.message">Description: {{$ctrl.error_details.message}}</div><div ng-if="$ctrl.error_details.status">HTTP status: {{$ctrl.error_details.status}}</div><div ng-if="$ctrl.error_details.server_stacktrace">Server stacktrace: {{$ctrl.error_details.server_stacktrace}}</div><div ng-if="$ctrl.error_details.client_stacktrace">Client stacktrace stacktrace: {{$ctrl.error_details.client_stacktrace}}</div></div><div class="pip-error-actions layout-column layout-align-center-center"><div class="h48" ng-if="$ctrl.isCordova"><md-button aria-label="CLOSE" class="md-accent" ng-click="$ctrl.onClose($event)">{{::\'ERROR_UNKNOWN_CLOSE\' | translate}}</md-button></div><div class="h48" ng-if="$ctrl.error_details && $ctrl.error_details.status"><md-button aria-label="DETAILS" class="md-accent" ng-click="$ctrl.onDetails($event)">{{::\'ERROR_UNKNOWN_DETAILS\' | translate}}</md-button></div></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('unsupported/UnsupportedErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="$ctrl.media(\'gt-xs\') && $ctrl.errorConfig.Params && $ctrl.errorConfig.Params.supported"><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.ie"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}} {{ $ctrl.errorConfig.Params.supported.ie }} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.edge"><div style="background-image: url(\'images/edge.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://microsoft-edge.en.softonic.com/download">{{::\'ERROR_UNSUPPORTED_EDGE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_EDGE_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.edge}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.firefox"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.firefox}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.chrome"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.chrome}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.opera"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.opera}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.safari"><div style="background-image: url(\'images/safari.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://safari.en.softonic.com/">{{::\'ERROR_UNSUPPORTED_SAFARI\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_SAFARI_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.safari}} +</p></div></div></div><div class="pip-error-details" ng-if="$ctrl.media(\'xs\') && $ctrl.errorConfig.Params && $ctrl.errorConfig.Params.supported"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.ie"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.ie}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.edge"><div style="background-image: url(\'images/edge.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://microsoft-edge.en.softonic.com/download">{{::\'ERROR_UNSUPPORTED_EDGE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_EDGE_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.edge}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.firefox"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.firefox}} +</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.chrome"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.chrome}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.opera"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.opera}} +</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center" ng-if="$ctrl.errorConfig.Params.supported.safari"><div style="background-image: url(\'images/safari.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16 text-center"><a class="text-body2 m0" target="_blank" href="https://safari.en.softonic.com/">{{::\'ERROR_UNSUPPORTED_SAFARI\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_SAFARI_VER\' | translate}} {{$ctrl.errorConfig.Params.supported.safari}} +</p></div></div></div></div></div></div>');
}]);
})();



},{}]},{},[13,6])(13)
});

//# sourceMappingURL=pip-webui-errors.js.map
