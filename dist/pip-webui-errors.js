(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.pip || (g.pip = {})).errors = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
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
    FormErrorsService.prototype.touchedErrorsWithHint = function (form, field) {
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
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
angular
    .module('pipErrors.Pages', [
    'ngMaterial'
]);
require("./maintenance/MaintenanceErrorPage");
require("./missing_route/MissingRouteErrorPage");
require("./no_connection/NoConnectionErrorPage");
require("./unknown/UnknownErrorPage");
require("./unsupported/UnsupportedErrorPage");
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
},{"./error_pages/ErrorPageConfig":1,"./error_pages/ErrorPageConfigService":2,"./form_errors/ClearErrorsDirective":3,"./form_errors/FormErrorsService":4,"./maintenance/MaintenanceErrorPage":6,"./missing_route/MissingRouteErrorPage":7,"./no_connection/NoConnectionErrorPage":8,"./no_connection_panel/NoConnectionPanel":9,"./unknown/UnknownErrorPage":10,"./unsupported/UnsupportedErrorPage":11}],6:[function(require,module,exports){
"use strict";
configureMaintenanceErrorPageRoute.$inject = ['$stateProvider'];
initMaintenanceErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setMaintenanceErrorPageResources.$inject = ['$injector'];
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
    MaintenanceErrorPageController.$inject = ['$scope', '$state', '$rootScope', '$mdMedia', '$injector', 'pipErrorPageConfigService'];
    function MaintenanceErrorPageController($scope, $state, $rootScope, $mdMedia, $injector, pipErrorPageConfigService) {
        "ngInject";
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
    var _this = this;
    var config = pipErrorPageConfigService.configs;
    if (!config.Maintenance.Active)
        return;
    $rootScope.$on(exports.MaintenanceErrorEvent, function (event, params) {
        _this.$state.go(exports.ErrorsMaintenanceState, params);
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
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Try after'
    });
    pipTranslate.translations('ru', {
        'ERROR_MAINTENANCE_TITLE': 'The server is on maintenance',
        'ERROR_MAINTENANCE_SUBTITLE': 'Sorry for the inconvenience. This application is undergoing maintenance for ' +
            'a short period. We\'ll be back soon. Thank for your patience.',
        'ERROR_MAINTENANCE_CLOSE': 'Close',
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Try after'
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureMaintenanceErrorPageRoute)
        .run(initMaintenanceErrorPage)
        .run(setMaintenanceErrorPageResources);
})();
},{}],7:[function(require,module,exports){
"use strict";
configureMissingRouteErrorPageRoute.$inject = ['$stateProvider'];
initMissingRouteErrorPage.$inject = ['$rootScope', '$state', '$injector', 'pipErrorPageConfigService'];
setMissingRouteErrorPageResources.$inject = ['$injector'];
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
        'ERROR_MISSING_ROUTE_TITLE': 'Sorry, the page isn\'t available',
        'ERROR_MISSING_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
        'ERROR_MISSING_ROUTE_CONTINUE': 'Continue',
        'ERROR_MISSING_ROUTE_TRY_AGAIN': 'Try again',
        'ERROR_MISSING_ROUTE_GO_BACK': 'Go Back',
        'ERROR_MISSING_ROUTE_PAGE_TITLE': 'Wrong page'
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureMissingRouteErrorPageRoute)
        .run(initMissingRouteErrorPage)
        .run(setMissingRouteErrorPageResources);
})();
},{}],8:[function(require,module,exports){
"use strict";
configureNoConnectionErrorPageRoute.$inject = ['$injector', '$stateProvider'];
initNoConnectionErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setNoConnectionErrorPageResources.$inject = ['$injector'];
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
        this.$window.history.back();
    };
    return NoConnectionErrorPageController;
}());
function configureNoConnectionErrorPageRoute($injector, $stateProvider) {
    "ngInject";
    $stateProvider
        .state(exports.ErrorsConnectionState, {
        url: '/errors/no_connection',
        params: {
            error: null
        },
        controller: NoConnectionErrorPageController,
        controllerAs: '$ctrl',
        templateUrl: 'no_connection/NoConnectionErrorPage.html'
    });
}
function initNoConnectionErrorPage($rootScope, $state, pipErrorPageConfigService) {
    "ngInject";
    var _this = this;
    var config = pipErrorPageConfigService.configs;
    if (!config.NoConnection.Active)
        return;
    $rootScope.$on(exports.ErrorsConnectionEvent, function (event, params) {
        _this.$state.go(exports.ErrorsConnectionState, params);
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
        'ERROR_NO_CONNECTION_TITLE': 'No connection to the server',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Unable to connect to server. Check your Internet connection and try again.',
        'ERROR_NO_CONNECTION_RETRY': 'Retry',
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureNoConnectionErrorPageRoute)
        .run(initNoConnectionErrorPage)
        .run(setNoConnectionErrorPageResources);
})();
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
"use strict";
configureUnknownErrorPageRoute.$inject = ['$injector', '$stateProvider'];
initUnknownErrorPage.$inject = ['$rootScope', '$state', 'pipErrorPageConfigService'];
setUnknownErrorPageResources.$inject = ['$injector'];
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
    var _this = this;
    var config = pipErrorPageConfigService.configs;
    if (!config.Unknown.Active)
        return;
    $rootScope.$on(exports.ErrorsUnknownEvent, function (event, params) {
        _this.$state.go(exports.ErrorsUnknownState, params);
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
        'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
        'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
        'ERROR_UNKNOWN_CLOSE': 'Close',
        'ERROR_UNKNOWN_DETAILS': 'Details',
    });
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureUnknownErrorPageRoute)
        .run(initUnknownErrorPage)
        .run(setUnknownErrorPageResources);
})();
},{}],11:[function(require,module,exports){
"use strict";
configureUnsupportedErrorPageRoute.$inject = ['$stateProvider'];
initUnsupportedErrorPage.$inject = ['$rootScope', '$state', '$injector', 'pipErrorPageConfigService'];
setUnsupportedErrorPageResources.$inject = ['$injector'];
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
        .state('errors_unsupported', {
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
    this.$state.go('errors_unsupported');
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
        'ERROR_UNSUPPORTED_O_VER': 'Version 36+',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Version 11+',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Version 48+',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Version 45+'
    });
    pipTranslate.translations('ru', {
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
}
(function () {
    angular
        .module('pipErrors.Pages')
        .config(configureUnsupportedErrorPageRoute)
        .run(initUnsupportedErrorPage)
        .run(setUnsupportedErrorPageResources);
})();
},{}],12:[function(require,module,exports){
(function(module) {
try {
  module = angular.module('pipErrors.Templates');
} catch (e) {
  module = angular.module('pipErrors.Templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('maintenance/MaintenanceErrorPage.html',
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><img src="{{$ctrl.config.Image}}" class="pip-pic block"><div class="pip-error-text">{{::\'ERROR_MAINTENANCE_TITLE\' | translate}}</div><div class="pip-error-subtext">{{::\'ERROR_MAINTENANCE_SUBTITLE\' | translate}}</div><div class="pip-error-subtext" ng-if="$ctrl.timeoutInterval">{{::\'ERROR_MAINTENANCE_TRY_AGAIN\' | translate}} {{timeoutInterval}} sec.</div><div class="pip-error-actions h48 layout-column layout-align-center-center" ng-if="$ctrl.isCordova"><md-button class="md-accent" ng-click="$ctrl.onClose($event)" aria-label="CLOSE">{{::\'ERROR_MAINTENANCE_CLOSE\' | translate}}</md-button></div></div></div>');
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
    '<div class="pip-error-scroll-body pip-scroll"><div class="pip-error pip-error-page layout-column flex layout-align-center-center"><div class="pip-error-text">{{::$ctrl.errorConfig.Title | translate}}</div><div class="pip-error-subtext">{{::$ctrl.errorConfig.SubTitle | translate}}</div><div class="pip-error-details layout-row layout-align-center-center" ng-if="$ctrl.media(\'gt-xs\')"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div><div class="pip-error-details" ng-if="$ctrl.media(\'xs\')"><div class="layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/ie.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.microsoft.com/en-us/download/internet-explorer-11-for-windows-7-details.aspx">{{::\'ERROR_UNSUPPORTED_IE\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_IE_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/fm.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.mozilla.org/ru/firefox/new/">{{::\'ERROR_UNSUPPORTED_FM\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_FM_VER\' | translate}}</p></div></div></div><div class="tm16 layout-row layout-align-center-center"><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/gc.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="https://www.google.com/chrome/browser/desktop/index.html?platform=win64#">{{::\'ERROR_UNSUPPORTED_GC\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_GC_VER\' | translate}}</p></div></div><div class="pip-error-details-item layout-column layout-align-center-center"><div style="background-image: url(\'images/o.svg\');" class="pip-pic"></div><div class="h64 tp16 bp16"><a class="text-body2 m0" target="_blank" href="http://www.opera.com/ru/download">{{::\'ERROR_UNSUPPORTED_O\' | translate}}</a><p class="text-body1 m0">{{::\'ERROR_UNSUPPORTED_O_VER\' | translate}}</p></div></div></div></div></div></div>');
}]);
})();



},{}]},{},[12,5])(12)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvZXJyb3JfcGFnZXMvRXJyb3JQYWdlQ29uZmlnLnRzIiwic3JjL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZ1NlcnZpY2UudHMiLCJzcmMvZm9ybV9lcnJvcnMvQ2xlYXJFcnJvcnNEaXJlY3RpdmUudHMiLCJzcmMvZm9ybV9lcnJvcnMvRm9ybUVycm9yc1NlcnZpY2UudHMiLCJzcmMvaW5kZXgudHMiLCJzcmMvbWFpbnRlbmFuY2UvTWFpbnRlbmFuY2VFcnJvclBhZ2UudHMiLCJzcmMvbWlzc2luZ19yb3V0ZS9NaXNzaW5nUm91dGVFcnJvclBhZ2UudHMiLCJzcmMvbm9fY29ubmVjdGlvbi9Ob0Nvbm5lY3Rpb25FcnJvclBhZ2UudHMiLCJzcmMvbm9fY29ubmVjdGlvbl9wYW5lbC9Ob0Nvbm5lY3Rpb25QYW5lbC50cyIsInNyYy91bmtub3duL1Vua25vd25FcnJvclBhZ2UudHMiLCJzcmMvdW5zdXBwb3J0ZWQvVW5zdXBwb3J0ZWRFcnJvclBhZ2UudHMiLCJ0ZW1wL3BpcC13ZWJ1aS1lcnJvcnMtaHRtbC5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQ0E7SUFBQTtJQVNBLENBQUM7SUFBRCxzQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksMENBQWU7QUFXNUI7SUFBQTtRQUVJLGdCQUFXLEdBQW9CO1lBQzNCLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixLQUFLLEVBQUUscUJBQXFCO1lBQzVCLEtBQUssRUFBRSx5QkFBeUI7WUFDaEMsUUFBUSxFQUFFLDRCQUE0QjtZQUN0QyxVQUFVLEVBQUUseUJBQXlCO1lBQ3JDLEtBQUssRUFBRSx3QkFBd0I7U0FFbEMsQ0FBQztRQUVGLGlCQUFZLEdBQW9CO1lBQzVCLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixLQUFLLEVBQUUsZ0JBQWdCO1lBQ3ZCLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxVQUFVLEVBQUUsZ0NBQWdDO1lBQzVDLEtBQUssRUFBRSwwQkFBMEI7U0FDcEMsQ0FBQztRQUVGLGlCQUFZLEdBQW9CO1lBQzVCLE1BQU0sRUFBRSxJQUFJO1lBQ1osSUFBSSxFQUFFLHNCQUFzQjtZQUM1QixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLEtBQUssRUFBRSwyQkFBMkI7WUFDbEMsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxVQUFVLEVBQUUsMkJBQTJCO1lBQ3ZDLEtBQUssRUFBRSx3QkFBd0I7U0FDbEMsQ0FBQztRQUVGLFlBQU8sR0FBb0I7WUFDdkIsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFVBQVUsRUFBRSxxQkFBcUI7WUFDakMsS0FBSyxFQUFFLDBCQUEwQjtTQUNwQyxDQUFDO1FBRUYsZ0JBQVcsR0FBb0I7WUFDM0IsTUFBTSxFQUFFLElBQUk7WUFDWixJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFVBQVUsRUFBRSx5QkFBeUI7WUFDckMsS0FBSyxFQUFFLEVBQUU7WUFDVCxNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUE7SUFDTCxDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQXJEQSxBQXFEQyxJQUFBO0FBckRZLDRDQUFnQjtBQXVEN0I7SUFBQTtRQUNJLFNBQUksR0FBVyxFQUFFLENBQUM7UUFDbEIsT0FBRSxHQUFXLEVBQUUsQ0FBQztRQUNoQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBQUQsd0JBQUM7QUFBRCxDQU5BLEFBTUMsSUFBQTtBQU5ZLDhDQUFpQjs7O0FDbEU5QixxREFBeUY7QUFFekY7SUFHSSxnQ0FDSSxNQUF3QjtRQUV4QixVQUFVLENBQUM7UUFFWCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxJQUFJLGtDQUFnQixFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELHNCQUFXLDJDQUFPO2FBQWxCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQzs7O09BQUE7SUFFTSxtREFBa0IsR0FBekIsVUFBMEIsUUFBZ0I7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNoQixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVMLDZCQUFDO0FBQUQsQ0F4QkEsQUF3QkMsSUFBQTtBQUVEO0lBSUk7UUFDSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksa0NBQWdCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksbUNBQWlCLEVBQUUsQ0FBQztJQUN4RSxDQUFDO0lBRU0sb0RBQWtCLEdBQXpCLFVBQTBCLFFBQWdCLEVBQUUsTUFBdUI7UUFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRXBDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0lBRU0sd0RBQXNCLEdBQTdCLFVBQThCLE9BQXlCO1FBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRXJCLElBQUksQ0FBQyxPQUFPLEdBQXFCLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU0sc0RBQW9CLEdBQTNCLFVBQTRCLFFBQTJCO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0lBQ3pELENBQUM7SUFFTSxzQ0FBSSxHQUFYO1FBQ0ksVUFBVSxDQUFDO1FBRVgsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFDTCw4QkFBQztBQUFELENBbkNBLEFBbUNDLElBQUE7QUFFRCxDQUFDO0lBQ0csT0FBTztTQUNGLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxFQUFFLENBQUM7U0FDdkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLHVCQUF1QixDQUFDLENBQUM7QUFFeEUsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUN2RUwsQ0FBQztJQUVHO1FBSUkseUJBQ0ksTUFBaUIsRUFDakIsUUFBZ0MsRUFDaEMsTUFBc0IsRUFDdEIsTUFBTTtZQUVOLFVBQVUsQ0FBQztZQU5mLGlCQWVDO1lBUEcsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFDLFFBQVE7Z0JBQ3RDLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2dCQUN4QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBRU0sMENBQWdCLEdBQXZCO1lBQ0ksSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztZQUUxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFTSx5Q0FBZSxHQUF0QjtZQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUMzQyxDQUFDO1FBQ0wsc0JBQUM7SUFBRCxDQWxDQSxBQWtDQyxJQUFBO0lBRUQ7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsR0FBRztZQUNiLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUM7WUFDOUIsSUFBSSxFQUFFLFVBQ0YsTUFBaUIsRUFDakIsUUFBZ0MsRUFDaEMsTUFBc0IsRUFDdEIsTUFBTTtnQkFFTixJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxRCxDQUFDO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRCxPQUFPO1NBQ0YsTUFBTSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztTQUM1QixTQUFTLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztBQUMzRCxDQUFDLENBQUMsRUFBRSxDQUFDOzs7QUN0REw7SUFFSSwyQkFBb0IsVUFBZ0M7UUFBaEMsZUFBVSxHQUFWLFVBQVUsQ0FBc0I7SUFBSSxDQUFDO0lBRWxELDBDQUFjLEdBQXJCLFVBQXNCLEtBQVU7UUFDNUIsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUUxQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNuRSxDQUFDO0lBQUEsQ0FBQztJQUVLLGlEQUFxQixHQUE1QixVQUE2QixJQUF3QixFQUFFLEtBQVU7UUFDN0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRTFCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0csSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNyRSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVNLDJDQUFlLEdBQXRCLFVBQXVCLElBQXdCLEVBQUUsTUFBZ0I7UUFDN0QsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1QsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN6QixDQUFDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sNkNBQWlCLEdBQXhCLFVBQXlCLElBQXdCLEVBQUUsS0FBVTtRQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUNsQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBQzNCLENBQUM7WUFDTCxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNyQixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFFTSx3Q0FBWSxHQUFuQixVQUFvQixJQUF3QixFQUFFLEtBQUssRUFBRSxhQUFhO1FBQzlELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFbEQsSUFBSSxJQUFJLEdBQVcsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztRQUNqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFFL0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNQLElBQUksU0FBUyxHQUFHLFFBQVEsR0FBRyxJQUFJLEVBQzNCLEtBQUssR0FBRyxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztZQUV2RCxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDO1lBQ1gsQ0FBQztZQUdELEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN2QyxNQUFNLENBQUM7WUFDWCxDQUFDO1FBQ0wsQ0FBQztRQUdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ3RELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUM7UUFDWCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsZUFBZSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNuRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUdELElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxrREFBc0IsR0FBOUIsVUFBK0IsS0FBSztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRTtZQUMvQyxLQUFLLEVBQUUsS0FBSztTQUNmLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDTCx3QkFBQztBQUFELENBdkdBLEFBdUdDLElBQUE7QUFFRCxDQUFDO0lBRUcsT0FBTztTQUNGLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO1NBQzNCLE9BQU8sQ0FBQyxlQUFlLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUVyRCxDQUFDLENBQUMsRUFBRSxDQUFDOzs7Ozs7QUNqSEosT0FBTztLQUNILE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtJQUN2QixZQUFZO0NBQ2YsQ0FBQyxDQUFDO0FBRVAsOENBQTRDO0FBQzVDLGlEQUErQztBQUMvQyxpREFBK0M7QUFDL0Msc0NBQW9DO0FBQ3BDLDhDQUE0QztBQUU1QyxnREFBOEM7QUFDOUMsbURBQWlEO0FBQ2pELDhDQUE0QztBQUM1QywyQ0FBeUM7QUFFekMsT0FBTztLQUNGLE1BQU0sQ0FBQyxXQUFXLEVBQUU7SUFDakIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQiwyQkFBMkI7SUFDM0Isc0JBQXNCO0lBQ3RCLGdCQUFnQjtJQUNoQixlQUFlO0NBQ2xCLENBQUMsQ0FBQztBQUVQLG1EQUE4Qzs7O0FDMUJuQyxRQUFBLHNCQUFzQixHQUFHLG9CQUFvQixDQUFDO0FBQzlDLFFBQUEscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7QUFLekQ7SUFBQTtJQUVBLENBQUM7SUFBRCx1QkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRUQ7SUFBQTtJQUVBLENBQUM7SUFBRCw2QkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRUQ7SUFBQTtRQUNJLGFBQVEsR0FBWSxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUE7QUFFRDtJQVVJLHdDQUNJLE1BQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLFVBQWdDLEVBQ2hDLFFBQWlDLEVBQ2pDLFNBQXdDLEVBQ3hDLHlCQUFrRDtRQUVsRCxVQUFVLENBQUM7UUFqQlAsY0FBUyxHQUFXLGFBQWEsQ0FBQztRQUluQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBZTlCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sR0FBRyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTVGLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFNUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0YsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUU5RyxDQUFDO0lBRU8sa0RBQVMsR0FBakI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFDTCxxQ0FBQztBQUFELENBM0NBLEFBMkNDLElBQUE7QUFFRCw0Q0FDSSxjQUFvQztJQUVwQyxVQUFVLENBQUM7SUFFWCxjQUFjO1NBQ0wsS0FBSyxDQUFDLDhCQUFzQixFQUFFO1FBQzNCLEdBQUcsRUFBRSxxQkFBcUI7UUFDMUIsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRSw4QkFBOEI7UUFDMUMsWUFBWSxFQUFFLE9BQU87UUFDckIsV0FBVyxFQUFFLHVDQUF1QztLQUN2RCxDQUFDLENBQUM7QUFDZixDQUFDO0FBRUQsa0NBQ0ksVUFBZ0MsRUFDaEMsTUFBMkIsRUFDM0IseUJBQWtEO0lBRWxELFVBQVUsQ0FBQztJQUxmLGlCQWVDO0lBUkcsSUFBSSxNQUFNLEdBQXFCLHlCQUF5QixDQUFDLE9BQU8sQ0FBQztJQUVqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBRXZDLFVBQVUsQ0FBQyxHQUFHLENBQUMsNkJBQXFCLEVBQ3BDLFVBQUMsS0FBNEIsRUFBRSxNQUFNO1FBQ2pDLEtBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLDhCQUFzQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELDBDQUEwQyxTQUF3QztJQUM5RSxJQUFJLFlBQVksR0FBUSxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzdGLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFBQyxNQUFNLENBQUM7SUFHakMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDNUIseUJBQXlCLEVBQUUsOEJBQThCO1FBQ3pELDRCQUE0QixFQUFFLDhFQUE4RTtZQUM1RywrREFBK0Q7UUFDL0QseUJBQXlCLEVBQUUsT0FBTztRQUNsQyw2QkFBNkIsRUFBRSxXQUFXO0tBQzdDLENBQUMsQ0FBQztJQUVILFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzVCLHlCQUF5QixFQUFFLDhCQUE4QjtRQUN6RCw0QkFBNEIsRUFBRSw4RUFBOEU7WUFDNUcsK0RBQStEO1FBQy9ELHlCQUF5QixFQUFFLE9BQU87UUFDbEMsNkJBQTZCLEVBQUUsV0FBVztLQUM3QyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsQ0FBQztJQUVHLE9BQU87U0FDRixNQUFNLENBQUMsaUJBQWlCLENBQUM7U0FDekIsTUFBTSxDQUFDLGtDQUFrQyxDQUFDO1NBQzFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztTQUM3QixHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUUvQyxDQUFDLENBQUMsRUFBRSxDQUFDOzs7QUMvSE0sUUFBQSx1QkFBdUIsR0FBRyxzQkFBc0IsQ0FBQztBQUNqRCxRQUFBLGtCQUFrQixHQUFHLGdCQUFnQixDQUFDO0FBSWpEO0lBQUE7SUFJQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUVEO0lBWUkseUNBQ0ksTUFBaUIsRUFDVCxTQUE4QixFQUN0QyxNQUEyQixFQUMzQixVQUFnQyxFQUNoQyxRQUFpQyxFQUNqQyxTQUF3QyxFQUN4Qyx5QkFBa0Q7UUFFbEQsVUFBVSxDQUFDO1FBUEgsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFibEMsY0FBUyxHQUFXLGNBQWMsQ0FBQztRQUlwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBa0I5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU1RixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTVDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3pHLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakYsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDOUksSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFNUksQ0FBQztJQUVPLG1EQUFTLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0sb0RBQVUsR0FBakI7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0wsc0NBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBO0FBRUQsNkNBQ0ksY0FBb0M7SUFFcEMsVUFBVSxDQUFDO0lBQ1gsY0FBYztTQUNULEtBQUssQ0FBQywrQkFBdUIsRUFBRTtRQUM1QixHQUFHLEVBQUUsdUJBQXVCO1FBQzVCLE1BQU0sRUFBRTtZQUNKLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsVUFBVSxFQUFFLCtCQUErQjtRQUMzQyxZQUFZLEVBQUUsT0FBTztRQUNyQixXQUFXLEVBQUUsMENBQTBDO0tBQzFELENBQUMsQ0FBQztBQUNYLENBQUM7QUFHRCxtQ0FDSSxVQUFnQyxFQUNoQyxNQUEyQixFQUMzQixTQUF3QyxFQUN4Qyx5QkFBa0Q7SUFFbEQsVUFBVSxDQUFDO0lBRVgsSUFBSSxNQUFNLEdBQXFCLHlCQUF5QixDQUFDLE9BQU8sQ0FBQztJQUVqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBRXhDLFVBQVUsQ0FBQyxHQUFHLENBQUMsMEJBQWtCLEVBQzdCLFVBQ0ksS0FBNEIsRUFDNUIsWUFBMEIsRUFDMUIsU0FBdUIsRUFDdkIsVUFBZTtRQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV2QixNQUFNLENBQUMsRUFBRSxDQUFDLCtCQUF1QixFQUFFO1lBQy9CLFlBQVksRUFBRSxZQUFZO1lBQzFCLFNBQVMsRUFBRTtnQkFDUCxFQUFFLEVBQUUsU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsRUFBRTtnQkFDbkMsVUFBVSxFQUFFLFVBQVU7YUFDekI7U0FDSixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDaEQsQ0FBQyxDQUNKLENBQUM7QUFDTixDQUFDO0FBRUQsMkNBQTJDLFNBQXdDO0lBQy9FLElBQUksWUFBWSxHQUFRLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDN0YsRUFBRSxDQUFDLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQztRQUFDLE1BQU0sQ0FBQztJQUdqQyxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtRQUM1QiwyQkFBMkIsRUFBRSxrQ0FBa0M7UUFDL0QsOEJBQThCLEVBQUUseUVBQXlFO1FBQ3pHLDhCQUE4QixFQUFFLFVBQVU7UUFDMUMsK0JBQStCLEVBQUUsV0FBVztRQUM1Qyw2QkFBNkIsRUFBRSxTQUFTO1FBQ3hDLGdDQUFnQyxFQUFFLFlBQVk7S0FDakQsQ0FBQyxDQUFDO0lBRUgsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDNUIsMkJBQTJCLEVBQUUsa0NBQWtDO1FBQy9ELDhCQUE4QixFQUFFLHlFQUF5RTtRQUN6Ryw4QkFBOEIsRUFBRSxVQUFVO1FBQzFDLCtCQUErQixFQUFFLFdBQVc7UUFDNUMsNkJBQTZCLEVBQUUsU0FBUztRQUN4QyxnQ0FBZ0MsRUFBRSxZQUFZO0tBQ2pELENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxDQUFDO0lBRUcsT0FBTztTQUNGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztTQUN6QixNQUFNLENBQUMsbUNBQW1DLENBQUM7U0FDM0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO1NBQzlCLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBRWhELENBQUMsQ0FBQyxFQUFFLENBQUM7OztBQ25KTSxRQUFBLHFCQUFxQixHQUFHLHNCQUFzQixDQUFDO0FBQy9DLFFBQUEscUJBQXFCLEdBQUcsc0JBQXNCLENBQUM7QUFLMUQ7SUFBQTtJQUVBLENBQUM7SUFBRCx3QkFBQztBQUFELENBRkEsQUFFQyxJQUFBO0FBRUQ7SUFTSSx5Q0FDWSxPQUEwQixFQUNsQyxNQUFpQixFQUNqQixNQUEyQixFQUMzQixVQUFnQyxFQUNoQyxRQUFpQyxFQUNqQyxTQUF3QyxFQUN4Qyx5QkFBa0Q7UUFFbEQsVUFBVSxDQUFDO1FBUkgsWUFBTyxHQUFQLE9BQU8sQ0FBbUI7UUFUOUIsY0FBUyxHQUFXLGNBQWMsQ0FBQztRQUlwQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBZTlCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUUsSUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTVGLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFNUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakcsQ0FBQztJQUVPLG1EQUFTLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRU0saURBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDTCxzQ0FBQztBQUFELENBN0NBLEFBNkNDLElBQUE7QUFFRCw2Q0FDSSxTQUF3QyxFQUN4QyxjQUFvQztJQUVwQyxVQUFVLENBQUM7SUFFWCxjQUFjO1NBQ1QsS0FBSyxDQUFDLDZCQUFxQixFQUFFO1FBQzFCLEdBQUcsRUFBRSx1QkFBdUI7UUFDNUIsTUFBTSxFQUFFO1lBQ0osS0FBSyxFQUFFLElBQUk7U0FDZDtRQUNELFVBQVUsRUFBRSwrQkFBK0I7UUFDM0MsWUFBWSxFQUFFLE9BQU87UUFDckIsV0FBVyxFQUFFLDBDQUEwQztLQUMxRCxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsbUNBQ0ksVUFBZ0MsRUFDaEMsTUFBMkIsRUFDM0IseUJBQWtEO0lBRWxELFVBQVUsQ0FBQztJQUxmLGlCQWdCQztJQVRHLElBQUksTUFBTSxHQUFxQix5QkFBeUIsQ0FBQyxPQUFPLENBQUM7SUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUFDLE1BQU0sQ0FBQztJQUd4QyxVQUFVLENBQUMsR0FBRyxDQUFDLDZCQUFxQixFQUNoQyxVQUFDLEtBQTRCLEVBQUUsTUFBTTtRQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyw2QkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCwyQ0FBMkMsU0FBd0M7SUFDL0UsSUFBSSxZQUFZLEdBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM3RixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBR2pDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzVCLDJCQUEyQixFQUFFLDZCQUE2QjtRQUMxRCw4QkFBOEIsRUFBRSxnRkFBZ0Y7UUFDaEgsMkJBQTJCLEVBQUUsT0FBTztLQUN2QyxDQUFDLENBQUM7SUFFSCxZQUFZLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRTtRQUM1QiwyQkFBMkIsRUFBRSw2QkFBNkI7UUFDMUQsOEJBQThCLEVBQUUsNEVBQTRFO1FBQzVHLDJCQUEyQixFQUFFLE9BQU87S0FDdkMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELENBQUM7SUFFRyxPQUFPO1NBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBQ3pCLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQztTQUMzQyxHQUFHLENBQUMseUJBQXlCLENBQUM7U0FDOUIsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFFaEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUN2SEwsQ0FBQztJQUVHO1FBR0kscUNBQVksTUFBaUI7WUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUVNLDZDQUFPLEdBQWQ7WUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN0RSxDQUFDO1FBQ0wsa0NBQUM7SUFBRCxDQVhBLEFBV0MsSUFBQTtJQUVELE9BQU87U0FDRixNQUFNLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxDQUFDO1NBQ2xDLFNBQVMsQ0FBQyxzQkFBc0IsRUFDakM7UUFDSSxNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsR0FBRztZQUNiLEtBQUssRUFBRTtnQkFDSCxLQUFLLEVBQUUsV0FBVztnQkFDbEIsS0FBSyxFQUFFLFdBQVc7YUFDckI7WUFDRCxXQUFXLEVBQUUsNENBQTRDO1lBQ3pELFVBQVUsRUFBRSwyQkFBMkI7WUFDdkMsWUFBWSxFQUFFLE9BQU87U0FDeEIsQ0FBQztJQUNOLENBQUMsQ0FDQSxDQUFBO0FBRVQsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7O0FDaENNLFFBQUEsa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUM7QUFDdEMsUUFBQSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUtsRDtJQUFBO0lBTUEsQ0FBQztJQUFELDBCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFFRDtJQVdJLG9DQUNJLE1BQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLFVBQWdDLEVBQ2hDLFFBQWlDLEVBQ2pDLFNBQXdDLEVBQ3hDLHlCQUFrRDtRQUVsRCxVQUFVLENBQUM7UUFsQlAsY0FBUyxHQUFXLFNBQVMsQ0FBQztRQUkvQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBZ0I5QixJQUFJLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcseUJBQXlCLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUU1RixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTVDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRTlGLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUV0QixDQUFDO0lBRU8sOENBQVMsR0FBakI7UUFDSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFBQyxNQUFNLENBQUM7UUFFaEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQzVELElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTywrQ0FBVSxHQUFsQjtRQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2hELElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBRTlDLElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEdBQUcsY0FBTyxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsR0FBRyxjQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sOENBQVMsR0FBaEI7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUwsaUNBQUM7QUFBRCxDQTdEQSxBQTZEQyxJQUFBO0FBRUQsd0NBQ0ksU0FBd0MsRUFDeEMsY0FBb0M7SUFFcEMsVUFBVSxDQUFDO0lBRVgsY0FBYztTQUNMLEtBQUssQ0FBQywwQkFBa0IsRUFBRTtRQUN2QixHQUFHLEVBQUUsaUJBQWlCO1FBQ3RCLE1BQU0sRUFBRTtZQUNKLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxZQUFZLEVBQUUsT0FBTztRQUNyQixVQUFVLEVBQUUsMEJBQTBCO1FBQ3RDLFdBQVcsRUFBRSwrQkFBK0I7S0FDL0MsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQUVELDhCQUNJLFVBQWdDLEVBQ2hDLE1BQTJCLEVBQzNCLHlCQUFrRDtJQUVsRCxVQUFVLENBQUM7SUFMZixpQkFlQztJQVJHLElBQUksTUFBTSxHQUFxQix5QkFBeUIsQ0FBQyxPQUFPLENBQUM7SUFFakUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUFDLE1BQU0sQ0FBQztJQUVuQyxVQUFVLENBQUMsR0FBRyxDQUFDLDBCQUFrQixFQUNqQyxVQUFDLEtBQTRCLEVBQUUsTUFBTTtRQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQywwQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxzQ0FBc0MsU0FBd0M7SUFDMUUsSUFBSSxZQUFZLEdBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUM3RixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBR2pDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzVCLHFCQUFxQixFQUFFLDRCQUE0QjtRQUNuRCx3QkFBd0IsRUFBRSx5RUFBeUU7UUFDbkcscUJBQXFCLEVBQUUsT0FBTztRQUM5Qix1QkFBdUIsRUFBRSxTQUFTO0tBQ3JDLENBQUMsQ0FBQztJQUVILFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO1FBQzVCLHFCQUFxQixFQUFFLDRCQUE0QjtRQUNuRCx3QkFBd0IsRUFBRSx5RUFBeUU7UUFDbkcscUJBQXFCLEVBQUUsT0FBTztRQUM5Qix1QkFBdUIsRUFBRSxTQUFTO0tBQ3JDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxDQUFDO0lBRUcsT0FBTztTQUNGLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztTQUN6QixNQUFNLENBQUMsOEJBQThCLENBQUM7U0FDdEMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO1NBQ3pCLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRTNDLENBQUMsQ0FBQyxFQUFFLENBQUM7OztBQ3hJTDtJQUFBO0lBRUEsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FGQSxBQUVDLElBQUE7QUFFRDtJQVNJLHdDQUNJLE1BQWlCLEVBQ2pCLE1BQTJCLEVBQzNCLFVBQWdDLEVBQ2hDLFFBQWlDLEVBQ2pDLFNBQXdDLEVBQ3hDLHlCQUFrRDtRQUVsRCxVQUFVLENBQUM7UUFoQlAsY0FBUyxHQUFXLGFBQWEsQ0FBQztRQUluQyxjQUFTLEdBQVksS0FBSyxDQUFDO1FBYzlCLElBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDNUUsSUFBSSxDQUFDLFdBQVcsR0FBRyx5QkFBeUIsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTVGLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFFNUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzVDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7SUFFakcsQ0FBQztJQUVPLGtEQUFTLEdBQWpCO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBQ0wscUNBQUM7QUFBRCxDQXhDQSxBQXdDQyxJQUFBO0FBRUQsNENBQ0ksY0FBb0M7SUFFcEMsVUFBVSxDQUFDO0lBRVgsY0FBYztTQUNULEtBQUssQ0FBQyxvQkFBb0IsRUFBRTtRQUN6QixHQUFHLEVBQUUscUJBQXFCO1FBQzFCLE1BQU0sRUFBRTtZQUNKLEtBQUssRUFBRSxJQUFJO1NBQ2Q7UUFDRCxZQUFZLEVBQUUsT0FBTztRQUNyQixVQUFVLEVBQUUsOEJBQThCO1FBQzFDLFdBQVcsRUFBRSx1Q0FBdUM7S0FDdkQsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELGtDQUNJLFVBQWdDLEVBQ2hDLE1BQTJCLEVBQzNCLFNBQXdDLEVBQ3hDLHlCQUFrRDtJQUNsRCxVQUFVLENBQUM7SUFFWCxJQUFJLE1BQU0sR0FBcUIseUJBQXlCLENBQUMsT0FBTyxDQUFDO0lBRWpFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFBQyxNQUFNLENBQUM7SUFFdkMsSUFBSSxhQUFhLEdBQVEsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNoRyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUM7SUFBQyxDQUFDO0lBRS9CLElBQUksaUJBQWlCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBRTVELElBQUksT0FBTyxHQUFXLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFDaEQsSUFBSSxPQUFPLEdBQVcsYUFBYSxDQUFDLGNBQWMsQ0FBQztJQUNuRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUUvQixFQUFFLENBQUMsQ0FBQyxPQUFPO1dBQ0osaUJBQWlCLENBQUMsT0FBTyxDQUFDO1dBQzFCLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDekMsQ0FBQztBQUVELDBDQUEwQyxTQUF3QztJQUM5RSxJQUFJLFlBQVksR0FBUSxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzdGLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFBQyxNQUFNLENBQUM7SUFHakMsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDNUIseUJBQXlCLEVBQUUsK0JBQStCO1FBQzFELDRCQUE0QixFQUFFLGlGQUFpRjtZQUMvRyx3RUFBd0U7WUFDeEUsZ0ZBQWdGO1FBQ2hGLHFCQUFxQixFQUFFLE9BQU87UUFDOUIseUJBQXlCLEVBQUUsYUFBYTtRQUN4QyxzQkFBc0IsRUFBRSxtQkFBbUI7UUFDM0MsMEJBQTBCLEVBQUUsYUFBYTtRQUN6QyxzQkFBc0IsRUFBRSxlQUFlO1FBQ3ZDLDBCQUEwQixFQUFFLGFBQWE7UUFDekMsc0JBQXNCLEVBQUUsaUJBQWlCO1FBQ3pDLDBCQUEwQixFQUFFLGFBQWE7S0FFNUMsQ0FBQyxDQUFDO0lBRUgsWUFBWSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7UUFDNUIseUJBQXlCLEVBQUUsK0JBQStCO1FBQzFELDRCQUE0QixFQUFFLGlGQUFpRjtZQUMvRyx3RUFBd0U7WUFDeEUsZ0ZBQWdGO1FBQ2hGLHFCQUFxQixFQUFFLE9BQU87UUFDOUIseUJBQXlCLEVBQUUsYUFBYTtRQUN4QyxzQkFBc0IsRUFBRSxtQkFBbUI7UUFDM0MsMEJBQTBCLEVBQUUsYUFBYTtRQUN6QyxzQkFBc0IsRUFBRSxlQUFlO1FBQ3ZDLDBCQUEwQixFQUFFLGFBQWE7UUFDekMsc0JBQXNCLEVBQUUsaUJBQWlCO1FBQ3pDLDBCQUEwQixFQUFFLGFBQWE7S0FFNUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELENBQUM7SUFDRyxPQUFPO1NBQ0YsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1NBQ3pCLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQztTQUMxQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7U0FDN0IsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDLEVBQUUsQ0FBQzs7QUM1SUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcclxuZXhwb3J0IGNsYXNzIEVycm9yUGFnZUNvbmZpZyB7XHJcbiAgICBBY3RpdmU6IGJvb2xlYW47XHJcbiAgICBOYW1lOiBzdHJpbmc7XHJcbiAgICBFdmVudDogc3RyaW5nO1xyXG4gICAgVGl0bGU6IHN0cmluZztcclxuICAgIFN1YlRpdGxlOiBTdHJpbmc7XHJcbiAgICBCcmVhZGNydW1iOiBzdHJpbmc7XHJcbiAgICBJbWFnZTogc3RyaW5nO1xyXG4gICAgUGFyYW1zPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgRXJyb3JQYWdlQ29uZmlncyB7XHJcblxyXG4gICAgTWFpbnRlbmFuY2U6IEVycm9yUGFnZUNvbmZpZyA9IHtcclxuICAgICAgICBBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgTmFtZTogJ2Vycm9yc19tYWludGVuYW5jZScsXHJcbiAgICAgICAgRXZlbnQ6ICdwaXBNYWludGVuYW5jZUVycm9yJyxcclxuICAgICAgICBUaXRsZTogJ0VSUk9SX01BSU5URU5BTkNFX1RJVExFJyxcclxuICAgICAgICBTdWJUaXRsZTogJ0VSUk9SX01BSU5URU5BTkNFX1NVQlRJVExFJyxcclxuICAgICAgICBCcmVhZGNydW1iOiAnRVJST1JfTUFJTlRFTkFOQ0VfVElUTEUnLFxyXG4gICAgICAgIEltYWdlOiAnaW1hZ2VzL21haW50ZW5hbmNlLnN2ZydcclxuXHJcbiAgICB9O1xyXG5cclxuICAgIE1pc3NpbmdSb3V0ZTogRXJyb3JQYWdlQ29uZmlnID0ge1xyXG4gICAgICAgIEFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICBOYW1lOiAnZXJyb3JzX21pc3Npbmdfcm91dGUnLFxyXG4gICAgICAgIEV2ZW50OiAnJHN0YXRlTm90Rm91bmQnLFxyXG4gICAgICAgIFRpdGxlOiAnRVJST1JfTUlTU0lOR19ST1VURV9USVRMRScsXHJcbiAgICAgICAgU3ViVGl0bGU6ICdFUlJPUl9NSVNTSU5HX1JPVVRFX1NVQlRJVExFJyxcclxuICAgICAgICBCcmVhZGNydW1iOiAnRVJST1JfTUlTU0lOR19ST1VURV9QQUdFX1RJVExFJyxcclxuICAgICAgICBJbWFnZTogJ2ltYWdlcy9pbnZhbGlkX3JvdXRlLnN2ZydcclxuICAgIH07XHJcblxyXG4gICAgTm9Db25uZWN0aW9uOiBFcnJvclBhZ2VDb25maWcgPSB7XHJcbiAgICAgICAgQWN0aXZlOiB0cnVlLFxyXG4gICAgICAgIE5hbWU6ICdlcnJvcnNfbm9fY29ubmVjdGlvbicsXHJcbiAgICAgICAgRXZlbnQ6ICdwaXBOb0Nvbm5lY3Rpb25FcnJvcicsXHJcbiAgICAgICAgVGl0bGU6ICdFUlJPUl9OT19DT05ORUNUSU9OX1RJVExFJyxcclxuICAgICAgICBTdWJUaXRsZTogJ0VSUk9SX05PX0NPTk5FQ1RJT05fU1VCVElUTEUnLFxyXG4gICAgICAgIEJyZWFkY3J1bWI6ICdFUlJPUl9OT19DT05ORUNUSU9OX1RJVExFJyxcclxuICAgICAgICBJbWFnZTogJ2ltYWdlcy9ub19yZXNwb25zZS5zdmcnXHJcbiAgICB9O1xyXG5cclxuICAgIFVua25vd246IEVycm9yUGFnZUNvbmZpZyA9IHtcclxuICAgICAgICBBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgTmFtZTogJ2Vycm9yc191bmtub3duJyxcclxuICAgICAgICBFdmVudDogJ3BpcFVua25vd25FcnJvcicsXHJcbiAgICAgICAgVGl0bGU6ICdFUlJPUl9VTktOT1dOX1RJVExFJyxcclxuICAgICAgICBTdWJUaXRsZTogJ0VSUk9SX1VOS05PV05fU1VCVElUTEUnLFxyXG4gICAgICAgIEJyZWFkY3J1bWI6ICdFUlJPUl9VTktOT1dOX1RJVExFJyxcclxuICAgICAgICBJbWFnZTogJ2ltYWdlcy91bmtub3duX2Vycm9yLnN2ZydcclxuICAgIH07XHJcblxyXG4gICAgVW5zdXBwb3J0ZWQ6IEVycm9yUGFnZUNvbmZpZyA9IHtcclxuICAgICAgICBBY3RpdmU6IHRydWUsXHJcbiAgICAgICAgTmFtZTogJ2Vycm9yc191bnN1cHBvcnRlZCcsXHJcbiAgICAgICAgRXZlbnQ6ICcnLFxyXG4gICAgICAgIFRpdGxlOiAnRVJST1JfVU5TVVBQT1JURURfVElUTEUnLFxyXG4gICAgICAgIFN1YlRpdGxlOiAnRVJST1JfVU5TVVBQT1JURURfU1VCVElUTEUnLFxyXG4gICAgICAgIEJyZWFkY3J1bWI6ICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRScsXHJcbiAgICAgICAgSW1hZ2U6ICcnLFxyXG4gICAgICAgIFBhcmFtczoge31cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cHBvcnRlZEJyb3dzZXJzIHtcclxuICAgIGVkZ2U6IG51bWJlciA9IDExO1xyXG4gICAgaWU6IG51bWJlciA9IDExO1xyXG4gICAgZmlyZWZveDogbnVtYmVyID0gNDM7XHJcbiAgICBvcGVyYTogbnVtYmVyID0gMzU7XHJcbiAgICBjaHJvbWU6IG51bWJlciA9IDQ3O1xyXG59XHJcbiIsImltcG9ydCB7IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlLCBJRXJyb3JQYWdlQ29uZmlnUHJvdmlkZXIgfSBmcm9tICcuL0lFcnJvclBhZ2VDb25maWdTZXJ2aWNlJztcclxuaW1wb3J0IHsgRXJyb3JQYWdlQ29uZmlncywgRXJyb3JQYWdlQ29uZmlnLCBTdXBwb3J0ZWRCcm93c2VycyB9IGZyb20gJy4vRXJyb3JQYWdlQ29uZmlnJztcclxuXHJcbmNsYXNzIEVycm9yUGFnZUNvbmZpZ1NlcnZpY2UgaW1wbGVtZW50cyBJRXJyb3JQYWdlQ29uZmlnU2VydmljZSB7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IEVycm9yUGFnZUNvbmZpZ3M7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIGNvbmZpZzogRXJyb3JQYWdlQ29uZmlnc1xyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWcgPSBjb25maWcgfHwgbmV3IEVycm9yUGFnZUNvbmZpZ3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvbmZpZ3MoKTogRXJyb3JQYWdlQ29uZmlncyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0RXJyb3JQYWdlQ29uZmlnKHBhZ2VOYW1lOiBzdHJpbmcpOiBFcnJvclBhZ2VDb25maWcge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHBhZ2VOYW1lLCB0aGlzLl9jb25maWcpO1xyXG4gICAgICAgIGlmICghcGFnZU5hbWUgfHwgIXRoaXMuX2NvbmZpZ1twYWdlTmFtZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnW3BhZ2VOYW1lXTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIEVycm9yUGFnZUNvbmZpZ1Byb3ZpZGVyIGltcGxlbWVudHMgSUVycm9yUGFnZUNvbmZpZ1Byb3ZpZGVyIHtcclxuICAgIHByaXZhdGUgX3NlcnZpY2U6IEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U7XHJcbiAgICBwdWJsaWMgY29uZmlnczogRXJyb3JQYWdlQ29uZmlncztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNvbmZpZ3MgPSBuZXcgRXJyb3JQYWdlQ29uZmlncygpO1xyXG4gICAgICAgIHRoaXMuY29uZmlncy5VbnN1cHBvcnRlZC5QYXJhbXMuc3VwcG9ydGVkID0gbmV3IFN1cHBvcnRlZEJyb3dzZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldEVycm9yUGFnZUNvbmZpZyhwYWdlTmFtZTogc3RyaW5nLCBjb25maWc6IEVycm9yUGFnZUNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghcGFnZU5hbWUgfHwgIWNvbmZpZykgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5jb25maWdzW3BhZ2VOYW1lXSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3NbcGFnZU5hbWVdID0gPEVycm9yUGFnZUNvbmZpZz5fLmRlZmF1bHRzRGVlcChjb25maWcsIHRoaXMuY29uZmlnc1twYWdlTmFtZV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRBbGxFcnJvclBhZ2VDb25maWdzKGNvbmZpZ3M6IEVycm9yUGFnZUNvbmZpZ3MpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNvbmZpZ3MpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5jb25maWdzID0gPEVycm9yUGFnZUNvbmZpZ3M+Xy5kZWZhdWx0c0RlZXAoY29uZmlncywgdGhpcy5jb25maWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0U3VwcG9ydGVkQnJvd3NlcnMoYnJvd3NlcnM6IFN1cHBvcnRlZEJyb3dzZXJzKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb25maWdzLlVuc3VwcG9ydGVkLlBhcmFtcy5zdXBwb3J0ZWQgPSBicm93c2VycztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgJGdldCgpOiBFcnJvclBhZ2VDb25maWdTZXJ2aWNlIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zZXJ2aWNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2VydmljZSA9IG5ldyBFcnJvclBhZ2VDb25maWdTZXJ2aWNlKHRoaXMuY29uZmlncyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmljZTtcclxuICAgIH1cclxufVxyXG5cclxuKCgpID0+IHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlJywgW10pXHJcbiAgICAgICAgLnByb3ZpZGVyKCdwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlJywgRXJyb3JQYWdlQ29uZmlnUHJvdmlkZXIpO1xyXG5cclxufSkoKTtcclxuIiwiKCgpID0+IHtcclxuXHJcbiAgICBjbGFzcyBDbGVhckVycm9yc0xpbmsge1xyXG4gICAgICAgIHByaXZhdGUgX2ZpZWxkQ29udHJvbGxlcjogYW55O1xyXG4gICAgICAgIHByaXZhdGUgX2Zvcm1Db250cm9sbGVyOiBhbnk7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICAkc2NvcGU6IG5nLklTY29wZSxcclxuICAgICAgICAgICAgJGVsZW1lbnQ6IG5nLklSb290RWxlbWVudFNlcnZpY2UsXHJcbiAgICAgICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgICRjdHJsc1xyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICAnbmdJbmplY3QnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fZmllbGRDb250cm9sbGVyID0gJGN0cmxzWzBdO1xyXG4gICAgICAgICAgICB0aGlzLl9mb3JtQ29udHJvbGxlciA9ICRjdHJsc1sxXTtcclxuXHJcbiAgICAgICAgICAgICRzY29wZS4kd2F0Y2goJGF0dHJzWyduZ01vZGVsJ10sIChuZXdWYWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckZpZWxkRXJyb3JzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyRm9ybUVycm9ycygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBjbGVhckZpZWxkRXJyb3JzKCkge1xyXG4gICAgICAgICAgICBsZXQgZXJyb3JzID0gdGhpcy5fZmllbGRDb250cm9sbGVyLiRlcnJvcjtcclxuXHJcbiAgICAgICAgICAgIGZvciAobGV0IHByb3AgaW4gZXJyb3JzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3ApICYmIHByb3Auc3Vic3RyaW5nKDAsIDYpID09ICdFUlJPUl8nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmllbGRDb250cm9sbGVyLiRzZXRWYWxpZGl0eShwcm9wLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGNsZWFyRm9ybUVycm9ycygpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9ybUNvbnRyb2xsZXIuJHNlcnZlckVycm9yID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyRXJyb3JzRGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIHJlcXVpcmU6IFsnbmdNb2RlbCcsICdeP2Zvcm0nXSxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24gKFxyXG4gICAgICAgICAgICAgICAgJHNjb3BlOiBuZy5JU2NvcGUsXHJcbiAgICAgICAgICAgICAgICAkZWxlbWVudDogbmcuSVJvb3RFbGVtZW50U2VydmljZSxcclxuICAgICAgICAgICAgICAgICRhdHRyczogbmcuSUF0dHJpYnV0ZXMsXHJcbiAgICAgICAgICAgICAgICAkY3RybHNcclxuICAgICAgICAgICAgKSB7XHJcbiAgICAgICAgICAgICAgICBuZXcgQ2xlYXJFcnJvcnNMaW5rKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycywgJGN0cmxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcENsZWFyRXJyb3JzJywgW10pXHJcbiAgICAgICAgLmRpcmVjdGl2ZSgncGlwQ2xlYXJFcnJvcnMnLCBjbGVhckVycm9yc0RpcmVjdGl2ZSk7XHJcbn0pKCk7IiwiaW1wb3J0IHsgSUZvcm1FcnJvcnNTZXJ2aWNlIH0gZnJvbSAnLi9JRm9ybUVycm9yc1NlcnZpY2UnO1xyXG5cclxuY2xhc3MgRm9ybUVycm9yc1NlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIHB1YmxpYyBlcnJvcnNXaXRoSGludChmaWVsZDogYW55KSB7XHJcbiAgICAgICAgaWYgKGZpZWxkID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAgICAgcmV0dXJuIF8uaXNFbXB0eShmaWVsZC4kZXJyb3IpID8geyBoaW50OiB0cnVlIH0gOiBmaWVsZC4kZXJyb3I7XHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyB0b3VjaGVkRXJyb3JzV2l0aEhpbnQoZm9ybTogbmcuSUZvcm1Db250cm9sbGVyLCBmaWVsZDogYW55KSB7XHJcbiAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChmb3JtLiRzdWJtaXR0ZWQgJiYgKGZpZWxkLiR0b3VjaGVkIHx8IGZvcm0uJGRpcnR5KSB8fCAhZm9ybS4kc3VibWl0dGVkICYmIChmaWVsZC4kdG91Y2hlZCB8fCBmaWVsZC4kZGlydHkpKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBfLmlzRW1wdHkoZmllbGQuJGVycm9yKSA/IHsgaGludDogdHJ1ZSB9IDogZmllbGQuJGVycm9yO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4geyBoaW50OiB0cnVlIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0Rm9ybUVycm9ycyhmb3JtOiBuZy5JRm9ybUNvbnRyb2xsZXIsIGVycm9ycz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBmb3JtLiRzZXRQcmlzdGluZSgpO1xyXG4gICAgICAgIGZvcm0uJHNldFVudG91Y2hlZCgpO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3JzKSB7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldERpcnR5KCk7XHJcbiAgICAgICAgICAgIGZvcm0uJHNldFN1Ym1pdHRlZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9ybVsnJHNlcnZlckVycm9yJ10gPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRGaWVsZHNFcnJvcnMoZm9ybTogbmcuSUZvcm1Db250cm9sbGVyLCBmaWVsZDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFmb3JtKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGZpZWxkICYmIGZvcm1bZmllbGRdICYmIGZvcm1bZmllbGRdLiRlcnJvcikge1xyXG4gICAgICAgICAgICBmb3JtW2ZpZWxkXS4kZXJyb3IgPSB7fTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBwcm9wIGluIGZvcm0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JtW3Byb3BdICYmIGZvcm1bcHJvcF0uJGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybVtwcm9wXS4kZXJyb3IgPSB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm9ybSAmJiBmb3JtLiRlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgZm9ybS4kZXJyb3IgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Rm9ybUVycm9yKGZvcm06IG5nLklGb3JtQ29udHJvbGxlciwgZXJyb3IsIGVycm9yRmllbGRNYXApIHtcclxuICAgICAgICBpZiAoZXJyb3IgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIC8vIFByZXBhcmUgZm9ybSBzZXJ2ZXIgZXJyb3JzXHJcbiAgICAgICAgZm9ybVsnJHNlcnZlckVycm9yJ10gPSBmb3JtWyckc2VydmVyRXJyb3InXSB8fCB7fTtcclxuICAgICAgICAvLyBQcmVwYXJlIGVycm9yIGNvZGVcclxuICAgICAgICBsZXQgY29kZTogc3RyaW5nID0gZXJyb3IuY29kZSB8fCAoZXJyb3IuZGF0YSB8fCB7fSkuY29kZSB8fCBudWxsO1xyXG4gICAgICAgIGlmICghY29kZSAmJiBlcnJvci5zdGF0dXMpIGNvZGUgPSBlcnJvci5zdGF0dXM7XHJcblxyXG4gICAgICAgIGlmIChjb2RlKSB7XHJcbiAgICAgICAgICAgIGxldCBlcnJvck5hbWUgPSAnRVJST1JfJyArIGNvZGUsXHJcbiAgICAgICAgICAgICAgICBmaWVsZCA9IGVycm9yRmllbGRNYXAgPyBlcnJvckZpZWxkTWFwW2NvZGVdIDogbnVsbDtcclxuICAgICAgICAgICAgLy8gU2V0IHNlcnZlciBlcnJvciB0byBmaWVsZHNcclxuICAgICAgICAgICAgaWYgKGZpZWxkICYmIGZvcm1bZmllbGRdICYmIGZvcm1bZmllbGRdLiRzZXRWYWxpZGl0eSkge1xyXG4gICAgICAgICAgICAgICAgZm9ybVtmaWVsZF0uJHNldFZhbGlkaXR5KGVycm9yTmFtZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgc2VydmVyIGVycm9yIHRvIGZvcm1cclxuICAgICAgICAgICAgaWYgKGZpZWxkID09ICdmb3JtJykge1xyXG4gICAgICAgICAgICAgICAgZm9ybVsnJHNlcnZlckVycm9yJ11bZXJyb3JOYW1lXSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIHVuZGVmaW5lZCBlcnJvciBmb3IgdGhpcyBmb3JtIG9yIGNvZGUgPT09IHVuZGVmaW5lZC9udWxsLCBnbyB0byB1bmhhbmRsZWQgZXJyb3IgcGFnZVxyXG4gICAgICAgIGlmIChlcnJvci5kYXRhICYmIGVycm9yLmRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICBmb3JtWyckc2VydmVyRXJyb3InXVsnRVJST1JfVU5LTk9XTiddID0gZXJyb3IuZGF0YS5tZXNzYWdlO1xyXG4gICAgICAgICAgICB0aGlzLmdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZXQgYXMgdW5kZWZpbmVkIGVycm9yXHJcbiAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgZm9ybVsnJHNlcnZlckVycm9yJ11bJ0VSUk9SX1VOS05PV04nXSA9IGVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgICAgIHRoaXMuZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlcnJvci5uYW1lKSB7XHJcbiAgICAgICAgICAgIGZvcm1bJyRzZXJ2ZXJFcnJvciddWydFUlJPUl9VTktOT1dOJ10gPSBlcnJvci5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmdvVG9VbmhhbmRsZWRFcnJvclBhZ2UoZXJyb3IpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZm9ybVsnJHNlcnZlckVycm9yJ11bJ0VSUk9SX1VOS05PV04nXSA9IGVycm9yO1xyXG4gICAgICAgIHRoaXMuZ29Ub1VuaGFuZGxlZEVycm9yUGFnZShlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnb1RvVW5oYW5kbGVkRXJyb3JQYWdlKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRlbWl0KCdwaXBVbmhhbmRsZWRJbnRlcm5hbEVycm9yJywge1xyXG4gICAgICAgICAgICBlcnJvcjogZXJyb3JcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuKCgpID0+IHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwRm9ybUVycm9ycycsIFtdKVxyXG4gICAgICAgIC5zZXJ2aWNlKCdwaXBGb3JtRXJyb3JzJywgRm9ybUVycm9yc1NlcnZpY2UpO1xyXG5cclxufSkoKTsiLCLvu79hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBFcnJvcnMuUGFnZXMnLCBbXHJcbiAgICAgICAgJ25nTWF0ZXJpYWwnXHJcbiAgICBdKTtcclxuXHJcbmltcG9ydCAnLi9tYWludGVuYW5jZS9NYWludGVuYW5jZUVycm9yUGFnZSc7XHJcbmltcG9ydCAnLi9taXNzaW5nX3JvdXRlL01pc3NpbmdSb3V0ZUVycm9yUGFnZSc7XHJcbmltcG9ydCAnLi9ub19jb25uZWN0aW9uL05vQ29ubmVjdGlvbkVycm9yUGFnZSc7XHJcbmltcG9ydCAnLi91bmtub3duL1Vua25vd25FcnJvclBhZ2UnO1xyXG5pbXBvcnQgJy4vdW5zdXBwb3J0ZWQvVW5zdXBwb3J0ZWRFcnJvclBhZ2UnO1xyXG5cclxuaW1wb3J0ICcuL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZ1NlcnZpY2UnO1xyXG5pbXBvcnQgJy4vbm9fY29ubmVjdGlvbl9wYW5lbC9Ob0Nvbm5lY3Rpb25QYW5lbCc7XHJcbmltcG9ydCAnLi9mb3JtX2Vycm9ycy9DbGVhckVycm9yc0RpcmVjdGl2ZSc7XHJcbmltcG9ydCAnLi9mb3JtX2Vycm9ycy9Gb3JtRXJyb3JzU2VydmljZSc7XHJcblxyXG5hbmd1bGFyXHJcbiAgICAubW9kdWxlKCdwaXBFcnJvcnMnLCBbXHJcbiAgICAgICAgJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLFxyXG4gICAgICAgICdwaXBFcnJvcnMuUGFnZXMnLFxyXG4gICAgICAgICdwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlJyxcclxuICAgICAgICAncGlwTm9Db25uZWN0aW9uUGFuZWwnLFxyXG4gICAgICAgICdwaXBDbGVhckVycm9ycycsXHJcbiAgICAgICAgJ3BpcEZvcm1FcnJvcnMnXHJcbiAgICBdKTtcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vZXJyb3JfcGFnZXMvRXJyb3JQYWdlQ29uZmlnJztcclxuZXhwb3J0ICogZnJvbSAnLi9lcnJvcl9wYWdlcy9JRXJyb3JQYWdlQ29uZmlnU2VydmljZSc7IiwiZXhwb3J0IGxldCBFcnJvcnNNYWludGVuYW5jZVN0YXRlID0gJ2Vycm9yc19tYWludGVuYW5jZSc7XHJcbmV4cG9ydCBsZXQgTWFpbnRlbmFuY2VFcnJvckV2ZW50ID0gJ3BpcE1haW50ZW5hbmNlRXJyb3InO1xyXG5cclxuaW1wb3J0IHsgSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9lcnJvcl9wYWdlcy9JRXJyb3JQYWdlQ29uZmlnU2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUGFnZUNvbmZpZ3MsIEVycm9yUGFnZUNvbmZpZyB9IGZyb20gJy4uL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZyc7XHJcblxyXG5jbGFzcyBNYWludGVuYW5jZUVycm9yIHtcclxuICAgIGNvbmZpZz86IE1haW50ZW5hbmNlRXJyb3JDb25maWc7XHJcbn1cclxuXHJcbmNsYXNzIE1haW50ZW5hbmNlRXJyb3JDb25maWcge1xyXG4gICAgcGFyYW1zPzogTWFpbnRlbmFuY2VFcnJvclBhcmFtcztcclxufVxyXG5cclxuY2xhc3MgTWFpbnRlbmFuY2VFcnJvclBhcmFtcyB7XHJcbiAgICBpbnRlcnZhbD86IG51bWJlciA9IDA7XHJcbn1cclxuXHJcbmNsYXNzIE1haW50ZW5hbmNlRXJyb3JQYWdlQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9wYWdlTmFtZTogc3RyaW5nID0gJ01haW50ZW5hbmNlJztcclxuICAgIHByaXZhdGUgcGlwTmF2U2VydmljZTtcclxuXHJcbiAgICBwdWJsaWMgY29uZmlnOiBFcnJvclBhZ2VDb25maWc7XHJcbiAgICBwdWJsaWMgaXNDb3Jkb3ZhOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbWVkaWE7XHJcbiAgICBwdWJsaWMgZXJyb3I6IE1haW50ZW5hbmNlRXJyb3I7XHJcbiAgICBwdWJsaWMgdGltZW91dEludGVydmFsOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgJHNjb3BlOiBuZy5JU2NvcGUsXHJcbiAgICAgICAgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICRtZE1lZGlhOiBhbmd1bGFyLm1hdGVyaWFsLklNZWRpYSxcclxuICAgICAgICAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgICAgIHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U6IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGxldCBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2UuZ2V0RXJyb3JQYWdlQ29uZmlnKHRoaXMuX3BhZ2VOYW1lKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlW3BpcC5zZXJ2aWNlcy5Sb3V0aW5nVmFyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwSGVhZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zWydlcnJvciddID8gJHN0YXRlLnBhcmFtc1snZXJyb3InXSA6IHt9O1xyXG4gICAgICAgIHRoaXMudGltZW91dEludGVydmFsID0gdGhpcy5lcnJvciAmJiB0aGlzLmVycm9yLmNvbmZpZyAmJlxyXG4gICAgICAgICAgICB0aGlzLmVycm9yLmNvbmZpZy5wYXJhbXMgJiYgdGhpcy5lcnJvci5jb25maWcucGFyYW1zLmludGVydmFsID8gdGhpcy5lcnJvci5jb25maWcucGFyYW1zLmludGVydmFsIDogMDtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhcHBIZWFkZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBpcE5hdlNlcnZpY2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmFwcGJhci5hZGRTaGFkb3coKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuaWNvbi5zaG93TWVudSgpO1xyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5icmVhZGNydW1iLnRleHQgPSB0aGlzLmNvbmZpZy5CcmVhZGNydW1iO1xyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5hY3Rpb25zLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY29uZmlndXJlTWFpbnRlbmFuY2VFcnJvclBhZ2VSb3V0ZShcclxuICAgICRzdGF0ZVByb3ZpZGVyOiBuZy51aS5JU3RhdGVQcm92aWRlclxyXG4pIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoRXJyb3JzTWFpbnRlbmFuY2VTdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2Vycm9ycy9tYWludGVuYW5jZScsXHJcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvcjogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IE1haW50ZW5hbmNlRXJyb3JQYWdlQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbWFpbnRlbmFuY2UvTWFpbnRlbmFuY2VFcnJvclBhZ2UuaHRtbCdcclxuICAgICAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRNYWludGVuYW5jZUVycm9yUGFnZShcclxuICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLCBcclxuICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSwgXHJcbiAgICBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlOiBJRXJyb3JQYWdlQ29uZmlnU2VydmljZVxyXG4pIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgY29uZmlnOiBFcnJvclBhZ2VDb25maWdzID0gcGlwRXJyb3JQYWdlQ29uZmlnU2VydmljZS5jb25maWdzO1xyXG5cclxuICAgIGlmICghY29uZmlnLk1haW50ZW5hbmNlLkFjdGl2ZSkgcmV0dXJuO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKE1haW50ZW5hbmNlRXJyb3JFdmVudCxcclxuICAgIChldmVudDogYW5ndWxhci5JQW5ndWxhckV2ZW50LCBwYXJhbXMpID0+IHsgXHJcbiAgICAgICAgdGhpcy4kc3RhdGUuZ28oRXJyb3JzTWFpbnRlbmFuY2VTdGF0ZSwgcGFyYW1zKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRNYWludGVuYW5jZUVycm9yUGFnZVJlc291cmNlcygkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICBsZXQgcGlwVHJhbnNsYXRlOiBhbnkgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgIGlmIChwaXBUcmFuc2xhdGUgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFNldCB0cmFuc2xhdGlvbiBzdHJpbmdzIGZvciB0aGUgbW9kdWxlXHJcbiAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAnRVJST1JfTUFJTlRFTkFOQ0VfVElUTEUnOiAnVGhlIHNlcnZlciBpcyBvbiBtYWludGVuYW5jZScsXHJcbiAgICAgICAgJ0VSUk9SX01BSU5URU5BTkNFX1NVQlRJVExFJzogJ1NvcnJ5IGZvciB0aGUgaW5jb252ZW5pZW5jZS4gVGhpcyBhcHBsaWNhdGlvbiBpcyB1bmRlcmdvaW5nIG1haW50ZW5hbmNlIGZvciAnICtcclxuICAgICAgICAnYSBzaG9ydCBwZXJpb2QuIFdlXFwnbGwgYmUgYmFjayBzb29uLiBUaGFuayBmb3IgeW91ciBwYXRpZW5jZS4nLFxyXG4gICAgICAgICdFUlJPUl9NQUlOVEVOQU5DRV9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgJ0VSUk9SX01BSU5URU5BTkNFX1RSWV9BR0FJTic6ICdUcnkgYWZ0ZXInXHJcbiAgICB9KTtcclxuXHJcbiAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdydScsIHtcclxuICAgICAgICAnRVJST1JfTUFJTlRFTkFOQ0VfVElUTEUnOiAnVGhlIHNlcnZlciBpcyBvbiBtYWludGVuYW5jZScsXHJcbiAgICAgICAgJ0VSUk9SX01BSU5URU5BTkNFX1NVQlRJVExFJzogJ1NvcnJ5IGZvciB0aGUgaW5jb252ZW5pZW5jZS4gVGhpcyBhcHBsaWNhdGlvbiBpcyB1bmRlcmdvaW5nIG1haW50ZW5hbmNlIGZvciAnICtcclxuICAgICAgICAnYSBzaG9ydCBwZXJpb2QuIFdlXFwnbGwgYmUgYmFjayBzb29uLiBUaGFuayBmb3IgeW91ciBwYXRpZW5jZS4nLFxyXG4gICAgICAgICdFUlJPUl9NQUlOVEVOQU5DRV9DTE9TRSc6ICdDbG9zZScsXHJcbiAgICAgICAgJ0VSUk9SX01BSU5URU5BTkNFX1RSWV9BR0FJTic6ICdUcnkgYWZ0ZXInXHJcbiAgICB9KTtcclxufVxyXG5cclxuKCgpID0+IHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwRXJyb3JzLlBhZ2VzJylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZ3VyZU1haW50ZW5hbmNlRXJyb3JQYWdlUm91dGUpXHJcbiAgICAgICAgLnJ1bihpbml0TWFpbnRlbmFuY2VFcnJvclBhZ2UpXHJcbiAgICAgICAgLnJ1bihzZXRNYWludGVuYW5jZUVycm9yUGFnZVJlc291cmNlcyk7XHJcblxyXG59KSgpO1xyXG4iLCJleHBvcnQgbGV0IEVycm9yc01pc3NpbmdSb3V0ZVN0YXRlID0gJ2Vycm9yc19taXNzaW5nX3JvdXRlJztcclxuZXhwb3J0IGxldCBTdGF0ZU5vdEZvdW5kRXZlbnQgPSAnJHN0YXRlTm90Rm91bmQnOyAgXHJcbmltcG9ydCB7IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vZXJyb3JfcGFnZXMvSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UnO1xyXG5pbXBvcnQgeyBFcnJvclBhZ2VDb25maWdzLCBFcnJvclBhZ2VDb25maWcgfSBmcm9tICcuLi9lcnJvcl9wYWdlcy9FcnJvclBhZ2VDb25maWcnO1xyXG5cclxuY2xhc3MgTWlzc2luZ1JvdXRlRXJyb3JTdGF0ZSB7XHJcbiAgICB0bzogc3RyaW5nO1xyXG4gICAgdG9QYXJhbXM6IGFueTtcclxuICAgIGZyb21QYXJhbXM6IGFueTtcclxufVxyXG5cclxuY2xhc3MgTWlzc2luZ1JvdXRlRXJyb3JQYWdlQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9wYWdlTmFtZTogc3RyaW5nID0gJ01pc3NpbmdSb3V0ZSc7XHJcbiAgICBwcml2YXRlIHBpcE5hdlNlcnZpY2U7XHJcblxyXG4gICAgcHVibGljIGNvbmZpZzogRXJyb3JQYWdlQ29uZmlnO1xyXG4gICAgcHVibGljIGlzQ29yZG92YTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1lZGlhO1xyXG4gICAgcHVibGljIGZyb21TdGF0ZTogTWlzc2luZ1JvdXRlRXJyb3JTdGF0ZTtcclxuICAgIHB1YmxpYyB1bmZvdW5kU3RhdGU6IE1pc3NpbmdSb3V0ZUVycm9yU3RhdGU7XHJcbiAgICBwdWJsaWMgdXJsOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdXJsQmFjazogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRzY29wZTogbmcuSVNjb3BlLFxyXG4gICAgICAgIHByaXZhdGUgJGxvY2F0aW9uOiBuZy5JTG9jYXRpb25TZXJ2aWNlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWEsXHJcbiAgICAgICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlOiBJRXJyb3JQYWdlQ29uZmlnU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBsZXQgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb25maWcgPSBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlLmdldEVycm9yUGFnZUNvbmZpZyh0aGlzLl9wYWdlTmFtZSk7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlID0gJGluamVjdG9yLmhhcygncGlwTmF2U2VydmljZScpID8gJGluamVjdG9yLmdldCgncGlwTmF2U2VydmljZScpIDogbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5tZWRpYSA9IHBpcE1lZGlhID8gcGlwTWVkaWEgOiAkbWRNZWRpYTtcclxuXHJcbiAgICAgICAgJHJvb3RTY29wZVtwaXAuc2VydmljZXMuUm91dGluZ1Zhcl0gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmFwcEhlYWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmZyb21TdGF0ZSA9ICRzdGF0ZSAmJiAkc3RhdGUucGFyYW1zICYmICRzdGF0ZS5wYXJhbXNbJ2Zyb21TdGF0ZSddID8gJHN0YXRlLnBhcmFtc1snZnJvbVN0YXRlJ10gOiB7fTtcclxuICAgICAgICB0aGlzLnVuZm91bmRTdGF0ZSA9ICRzdGF0ZSAmJiAkc3RhdGUucGFyYW1zID8gJHN0YXRlLnBhcmFtc1sndW5mb3VuZFN0YXRlJ10gOiB7fTtcclxuICAgICAgICB0aGlzLnVybCA9IHRoaXMudW5mb3VuZFN0YXRlICYmIHRoaXMudW5mb3VuZFN0YXRlLnRvID8gJHN0YXRlLmhyZWYodGhpcy51bmZvdW5kU3RhdGUudG8sIHRoaXMudW5mb3VuZFN0YXRlLnRvUGFyYW1zLCB7IGFic29sdXRlOiB0cnVlIH0pIDogJyc7XHJcbiAgICAgICAgdGhpcy51cmxCYWNrID0gdGhpcy5mcm9tU3RhdGUgJiYgdGhpcy5mcm9tU3RhdGUudG8gPyAkc3RhdGUuaHJlZih0aGlzLmZyb21TdGF0ZS50bywgdGhpcy5mcm9tU3RhdGUuZnJvbVBhcmFtcywgeyBhYnNvbHV0ZTogdHJ1ZSB9KSA6ICcnO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcEhlYWRlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlwTmF2U2VydmljZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9IHRoaXMuY29uZmlnLkJyZWFkY3J1bWI7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmFjdGlvbnMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbnRpbnVlKCkge1xyXG4gICAgICAgIHRoaXMuJGxvY2F0aW9uLnVybCgnLycpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25maWd1cmVNaXNzaW5nUm91dGVFcnJvclBhZ2VSb3V0ZShcclxuICAgICRzdGF0ZVByb3ZpZGVyOiBuZy51aS5JU3RhdGVQcm92aWRlclxyXG4pIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgLnN0YXRlKEVycm9yc01pc3NpbmdSb3V0ZVN0YXRlLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbWlzc2luZ19yb3V0ZScsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgdW5mb3VuZFN0YXRlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZnJvbVN0YXRlOiBudWxsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6IE1pc3NpbmdSb3V0ZUVycm9yUGFnZUNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdtaXNzaW5nX3JvdXRlL01pc3NpbmdSb3V0ZUVycm9yUGFnZS5odG1sJ1xyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gaW5pdE1pc3NpbmdSb3V0ZUVycm9yUGFnZShcclxuICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLFxyXG4gICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgIHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U6IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlXHJcbikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIGxldCBjb25maWc6IEVycm9yUGFnZUNvbmZpZ3MgPSBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlLmNvbmZpZ3M7XHJcblxyXG4gICAgaWYgKCFjb25maWcuTWlzc2luZ1JvdXRlLkFjdGl2ZSkgcmV0dXJuO1xyXG5cclxuICAgICRyb290U2NvcGUuJG9uKFN0YXRlTm90Rm91bmRFdmVudCxcclxuICAgICAgICAoXHJcbiAgICAgICAgICAgIGV2ZW50OiBhbmd1bGFyLklBbmd1bGFyRXZlbnQsXHJcbiAgICAgICAgICAgIHVuZm91bmRTdGF0ZTogbmcudWkuSVN0YXRlLFxyXG4gICAgICAgICAgICBmcm9tU3RhdGU6IG5nLnVpLklTdGF0ZSxcclxuICAgICAgICAgICAgZnJvbVBhcmFtczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAkc3RhdGUuZ28oRXJyb3JzTWlzc2luZ1JvdXRlU3RhdGUsIHtcclxuICAgICAgICAgICAgICAgIHVuZm91bmRTdGF0ZTogdW5mb3VuZFN0YXRlLFxyXG4gICAgICAgICAgICAgICAgZnJvbVN0YXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG86IGZyb21TdGF0ZSA/IGZyb21TdGF0ZS5uYW1lIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgZnJvbVBhcmFtczogZnJvbVBhcmFtc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGVbcGlwLnNlcnZpY2VzLlJvdXRpbmdWYXJdID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0TWlzc2luZ1JvdXRlRXJyb3JQYWdlUmVzb3VyY2VzKCRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UpIHtcclxuICAgIGxldCBwaXBUcmFuc2xhdGU6IGFueSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgaWYgKHBpcFRyYW5zbGF0ZSA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgLy8gU2V0IHRyYW5zbGF0aW9uIHN0cmluZ3MgZm9yIHRoZSBtb2R1bGVcclxuICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywge1xyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX1RJVExFJzogJ1NvcnJ5LCB0aGUgcGFnZSBpc25cXCd0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgJ0VSUk9SX01JU1NJTkdfUk9VVEVfU1VCVElUTEUnOiAnVGhlIGxpbmsgeW91IGZvbGxvd2VkIG1heSBiZSBicm9rZW4sIG9yIHRoZSBwYWdlIG1heSBoYXZlIGJlZW4gcmVtb3ZlZC4nLFxyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX0NPTlRJTlVFJzogJ0NvbnRpbnVlJyxcclxuICAgICAgICAnRVJST1JfTUlTU0lOR19ST1VURV9UUllfQUdBSU4nOiAnVHJ5IGFnYWluJyxcclxuICAgICAgICAnRVJST1JfTUlTU0lOR19ST1VURV9HT19CQUNLJzogJ0dvIEJhY2snLFxyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX1BBR0VfVElUTEUnOiAnV3JvbmcgcGFnZSdcclxuICAgIH0pO1xyXG5cclxuICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1Jywge1xyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX1RJVExFJzogJ1NvcnJ5LCB0aGUgcGFnZSBpc25cXCd0IGF2YWlsYWJsZScsXHJcbiAgICAgICAgJ0VSUk9SX01JU1NJTkdfUk9VVEVfU1VCVElUTEUnOiAnVGhlIGxpbmsgeW91IGZvbGxvd2VkIG1heSBiZSBicm9rZW4sIG9yIHRoZSBwYWdlIG1heSBoYXZlIGJlZW4gcmVtb3ZlZC4nLFxyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX0NPTlRJTlVFJzogJ0NvbnRpbnVlJyxcclxuICAgICAgICAnRVJST1JfTUlTU0lOR19ST1VURV9UUllfQUdBSU4nOiAnVHJ5IGFnYWluJyxcclxuICAgICAgICAnRVJST1JfTUlTU0lOR19ST1VURV9HT19CQUNLJzogJ0dvIEJhY2snLFxyXG4gICAgICAgICdFUlJPUl9NSVNTSU5HX1JPVVRFX1BBR0VfVElUTEUnOiAnV3JvbmcgcGFnZSdcclxuICAgIH0pO1xyXG59XHJcblxyXG4oKCkgPT4ge1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBFcnJvcnMuUGFnZXMnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlndXJlTWlzc2luZ1JvdXRlRXJyb3JQYWdlUm91dGUpXHJcbiAgICAgICAgLnJ1bihpbml0TWlzc2luZ1JvdXRlRXJyb3JQYWdlKVxyXG4gICAgICAgIC5ydW4oc2V0TWlzc2luZ1JvdXRlRXJyb3JQYWdlUmVzb3VyY2VzKTtcclxuXHJcbn0pKCk7XHJcbiIsImV4cG9ydCBsZXQgRXJyb3JzQ29ubmVjdGlvblN0YXRlID0gJ2Vycm9yc19ub19jb25uZWN0aW9uJztcclxuZXhwb3J0IGxldCBFcnJvcnNDb25uZWN0aW9uRXZlbnQgPSAncGlwTm9Db25uZWN0aW9uRXJyb3InO1xyXG5cclxuaW1wb3J0IHsgSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9lcnJvcl9wYWdlcy9JRXJyb3JQYWdlQ29uZmlnU2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUGFnZUNvbmZpZ3MsIEVycm9yUGFnZUNvbmZpZyB9IGZyb20gJy4uL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZyc7XHJcblxyXG5jbGFzcyBOb0Nvbm5lY3Rpb25FcnJvciB7XHJcbiAgICBjb25maWc/OiBhbnk7XHJcbn1cclxuXHJcbmNsYXNzIE5vQ29ubmVjdGlvbkVycm9yUGFnZUNvbnRyb2xsZXIge1xyXG4gICAgcHJpdmF0ZSBfcGFnZU5hbWU6IHN0cmluZyA9ICdOb0Nvbm5lY3Rpb24nO1xyXG4gICAgcHJpdmF0ZSBwaXBOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBlcnJvckNvbmZpZzogRXJyb3JQYWdlQ29uZmlnO1xyXG4gICAgcHVibGljIGlzQ29yZG92YTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1lZGlhO1xyXG4gICAgcHVibGljIGVycm9yOiBOb0Nvbm5lY3Rpb25FcnJvcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlICR3aW5kb3c6IG5nLklXaW5kb3dTZXJ2aWNlLFxyXG4gICAgICAgICRzY29wZTogbmcuSVNjb3BlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWEsXHJcbiAgICAgICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlOiBJRXJyb3JQYWdlQ29uZmlnU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBsZXQgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5lcnJvckNvbmZpZyA9IHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2UuZ2V0RXJyb3JQYWdlQ29uZmlnKHRoaXMuX3BhZ2VOYW1lKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlW3BpcC5zZXJ2aWNlcy5Sb3V0aW5nVmFyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwSGVhZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zWydlcnJvciddID8gJHN0YXRlLnBhcmFtc1snZXJyb3InXSA6IHt9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcEhlYWRlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlwTmF2U2VydmljZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9IHRoaXMuZXJyb3JDb25maWcuQnJlYWRjcnVtYjtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uUmV0cnkoKSB7XHJcbiAgICAgICAgdGhpcy4kd2luZG93Lmhpc3RvcnkuYmFjaygpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25maWd1cmVOb0Nvbm5lY3Rpb25FcnJvclBhZ2VSb3V0ZShcclxuICAgICRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UsXHJcbiAgICAkc3RhdGVQcm92aWRlcjogbmcudWkuSVN0YXRlUHJvdmlkZXJcclxuKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoRXJyb3JzQ29ubmVjdGlvblN0YXRlLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9lcnJvcnMvbm9fY29ubmVjdGlvbicsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogTm9Db25uZWN0aW9uRXJyb3JQYWdlQ29udHJvbGxlcixcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ25vX2Nvbm5lY3Rpb24vTm9Db25uZWN0aW9uRXJyb3JQYWdlLmh0bWwnXHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXROb0Nvbm5lY3Rpb25FcnJvclBhZ2UoXHJcbiAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgIHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U6IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlXHJcbikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIGxldCBjb25maWc6IEVycm9yUGFnZUNvbmZpZ3MgPSBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlLmNvbmZpZ3M7XHJcblxyXG4gICAgaWYgKCFjb25maWcuTm9Db25uZWN0aW9uLkFjdGl2ZSkgcmV0dXJuO1xyXG5cclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbihFcnJvcnNDb25uZWN0aW9uRXZlbnQsXHJcbiAgICAgICAgKGV2ZW50OiBhbmd1bGFyLklBbmd1bGFyRXZlbnQsIHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLiRzdGF0ZS5nbyhFcnJvcnNDb25uZWN0aW9uU3RhdGUsIHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldE5vQ29ubmVjdGlvbkVycm9yUGFnZVJlc291cmNlcygkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlKSB7XHJcbiAgICBsZXQgcGlwVHJhbnNsYXRlOiBhbnkgPSAkaW5qZWN0b3IuaGFzKCdwaXBUcmFuc2xhdGUnKSA/ICRpbmplY3Rvci5nZXQoJ3BpcFRyYW5zbGF0ZScpIDogbnVsbDtcclxuICAgIGlmIChwaXBUcmFuc2xhdGUgPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFNldCB0cmFuc2xhdGlvbiBzdHJpbmdzIGZvciB0aGUgbW9kdWxlXHJcbiAgICBwaXBUcmFuc2xhdGUudHJhbnNsYXRpb25zKCdlbicsIHtcclxuICAgICAgICAnRVJST1JfTk9fQ09OTkVDVElPTl9USVRMRSc6ICdObyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXInLFxyXG4gICAgICAgICdFUlJPUl9OT19DT05ORUNUSU9OX1NVQlRJVExFJzogJ1VuYWJsZSB0byBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIuIENoZWNrIHlvdXIgSW50ZXJuZXQgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgJ0VSUk9SX05PX0NPTk5FQ1RJT05fUkVUUlknOiAnUmV0cnknLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7XHJcbiAgICAgICAgJ0VSUk9SX05PX0NPTk5FQ1RJT05fVElUTEUnOiAnTm8gY29ubmVjdGlvbiB0byB0aGUgc2VydmVyJyxcclxuICAgICAgICAnRVJST1JfTk9fQ09OTkVDVElPTl9TVUJUSVRMRSc6ICdVbmFibGUgdG8gY29ubmVjdCB0byBzZXJ2ZXIuIENoZWNrIHlvdXIgSW50ZXJuZXQgY29ubmVjdGlvbiBhbmQgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgJ0VSUk9SX05PX0NPTk5FQ1RJT05fUkVUUlknOiAnUmV0cnknLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbigoKSA9PiB7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3BpcEVycm9ycy5QYWdlcycpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWd1cmVOb0Nvbm5lY3Rpb25FcnJvclBhZ2VSb3V0ZSlcclxuICAgICAgICAucnVuKGluaXROb0Nvbm5lY3Rpb25FcnJvclBhZ2UpXHJcbiAgICAgICAgLnJ1bihzZXROb0Nvbm5lY3Rpb25FcnJvclBhZ2VSZXNvdXJjZXMpO1xyXG5cclxufSkoKTtcclxuIiwiKCgpID0+IHtcclxuXHJcbiAgICBjbGFzcyBOb0Nvbm5lY3Rpb25QYW5lbENvbnRyb2xsZXIge1xyXG4gICAgICAgIHByaXZhdGUgX3JldHJ5OiBGdW5jdGlvbjtcclxuICAgICAgICBwdWJsaWMgZXJyb3I6IGFueTtcclxuICAgICAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IG5nLklTY29wZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXRyeSA9ICRzY29wZVsncmV0cnknXTtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9ICRzY29wZVsnZXJyb3InXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvblJldHJ5KCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fcmV0cnkgJiYgYW5ndWxhci5pc0Z1bmN0aW9uKHRoaXMuX3JldHJ5KSkgdGhpcy5fcmV0cnkoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoXCJwaXBOb0Nvbm5lY3Rpb25QYW5lbFwiLCBbXSlcclxuICAgICAgICAuZGlyZWN0aXZlKCdwaXBOb0Nvbm5lY3Rpb25QYW5lbCcsXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6ICc9cGlwRXJyb3InLFxyXG4gICAgICAgICAgICAgICAgICAgIHJldHJ5OiAnPXBpcFJldHJ5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnbm9fY29ubmVjdGlvbl9wYW5lbC9Ob0Nvbm5lY3Rpb25QYW5lbC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IE5vQ29ubmVjdGlvblBhbmVsQ29udHJvbGxlcixcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICApXHJcblxyXG59KSgpO1xyXG5cclxuIiwiZXhwb3J0IGxldCBFcnJvcnNVbmtub3duU3RhdGUgPSAnZXJyb3JzX3Vua25vd24nO1xyXG5leHBvcnQgbGV0IEVycm9yc1Vua25vd25FdmVudCA9ICdwaXBVbmtub3duRXJyb3InO1xyXG5cclxuaW1wb3J0IHsgSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9lcnJvcl9wYWdlcy9JRXJyb3JQYWdlQ29uZmlnU2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUGFnZUNvbmZpZ3MsIEVycm9yUGFnZUNvbmZpZyB9IGZyb20gJy4uL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZyc7XHJcblxyXG5jbGFzcyBVbmtub3duRXJyb3JEZXRhaWxzIHtcclxuICAgIGNvZGU6IG51bWJlcjtcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIHN0YXR1czogc3RyaW5nO1xyXG4gICAgc2VydmVyX3N0YWNrdHJhY2U6IEZ1bmN0aW9uO1xyXG4gICAgY2xpZW50X3N0YWNrdHJhY2U6IEZ1bmN0aW9uO1xyXG59XHJcblxyXG5jbGFzcyBVbmtub3duRXJyb3JQYWdlQ29udHJvbGxlciB7XHJcbiAgICBwcml2YXRlIF9wYWdlTmFtZTogc3RyaW5nID0gJ1Vua25vd24nO1xyXG4gICAgcHJpdmF0ZSBwaXBOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBjb25maWc6IEVycm9yUGFnZUNvbmZpZztcclxuICAgIHB1YmxpYyBpc0NvcmRvdmE6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBtZWRpYTtcclxuICAgIHB1YmxpYyBlcnJvcjogVW5rbm93bkVycm9yRGV0YWlscztcclxuICAgIHB1YmxpYyBlcnJvcl9kZXRhaWxzOiBVbmtub3duRXJyb3JEZXRhaWxzO1xyXG4gICAgcHVibGljIHNob3dFcnJvcjogYm9vbGVhbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAkc2NvcGU6IG5nLklTY29wZSxcclxuICAgICAgICAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2UsIFxyXG4gICAgICAgICRyb290U2NvcGU6IG5nLklSb290U2NvcGVTZXJ2aWNlLFxyXG4gICAgICAgICRtZE1lZGlhOiBhbmd1bGFyLm1hdGVyaWFsLklNZWRpYSwgXHJcbiAgICAgICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSwgIFxyXG4gICAgICAgIHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U6IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgICAgIGxldCBwaXBNZWRpYSA9ICRpbmplY3Rvci5oYXMoJ3BpcE1lZGlhJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBNZWRpYScpIDogbnVsbDtcclxuICAgICAgICB0aGlzLmNvbmZpZyA9IHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2UuZ2V0RXJyb3JQYWdlQ29uZmlnKHRoaXMuX3BhZ2VOYW1lKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlW3BpcC5zZXJ2aWNlcy5Sb3V0aW5nVmFyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2hvd0Vycm9yID0gJHNjb3BlWydzaG93RXJyb3InXTtcclxuICAgICAgICB0aGlzLmFwcEhlYWRlcigpO1xyXG5cclxuICAgICAgICB0aGlzLmVycm9yID0gJHN0YXRlICYmICRzdGF0ZS5wYXJhbXMgJiYgJHN0YXRlLnBhcmFtc1snZXJyb3InXSA/ICAkc3RhdGUucGFyYW1zWydlcnJvciddIDoge307XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wYXJzZUVycm9yKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYXBwSGVhZGVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5waXBOYXZTZXJ2aWNlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5hcHBiYXIuYWRkU2hhZG93KCk7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmljb24uc2hvd01lbnUoKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYnJlYWRjcnVtYi50ZXh0ID0gdGhpcy5jb25maWcuQnJlYWRjcnVtYjtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBwYXJzZUVycm9yKCkge1xyXG4gICAgICAgIHRoaXMuZXJyb3JfZGV0YWlscyA9IG5ldyBVbmtub3duRXJyb3JEZXRhaWxzKCk7XHJcbiAgICAgICAgdGhpcy5lcnJvcl9kZXRhaWxzLmNvZGUgPSB0aGlzLmVycm9yLmNvZGU7XHJcbiAgICAgICAgdGhpcy5lcnJvcl9kZXRhaWxzLm1lc3NhZ2UgPSB0aGlzLmVycm9yLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5lcnJvcl9kZXRhaWxzLnN0YXR1cyA9IHRoaXMuZXJyb3Iuc3RhdHVzO1xyXG5cclxuICAgICAgICB0aGlzLmVycm9yX2RldGFpbHMuc2VydmVyX3N0YWNrdHJhY2UgPSAoKSA9PiB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5lcnJvcl9kZXRhaWxzLmNsaWVudF9zdGFja3RyYWNlID0gKCkgPT4ge307XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRGV0YWlscygpIHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvciA9IHRydWU7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBjb25maWd1cmVVbmtub3duRXJyb3JQYWdlUm91dGUgKFxyXG4gICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSwgXHJcbiAgICAkc3RhdGVQcm92aWRlcjogbmcudWkuSVN0YXRlUHJvdmlkZXJcclxuKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKEVycm9yc1Vua25vd25TdGF0ZSwge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2Vycm9ycy91bmtub3duJyxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LCBcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJyRjdHJsJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFVua25vd25FcnJvclBhZ2VDb250cm9sbGVyLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICd1bmtub3duL1Vua25vd25FcnJvclBhZ2UuaHRtbCdcclxuICAgICAgICAgICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRVbmtub3duRXJyb3JQYWdlKFxyXG4gICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsIFxyXG4gICAgJHN0YXRlOiBuZy51aS5JU3RhdGVTZXJ2aWNlLCBcclxuICAgIHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2U6IElFcnJvclBhZ2VDb25maWdTZXJ2aWNlXHJcbikge1xyXG4gICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgIGxldCBjb25maWc6IEVycm9yUGFnZUNvbmZpZ3MgPSBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlLmNvbmZpZ3M7XHJcblxyXG4gICAgaWYgKCFjb25maWcuVW5rbm93bi5BY3RpdmUpIHJldHVybjtcclxuXHJcbiAgICAkcm9vdFNjb3BlLiRvbihFcnJvcnNVbmtub3duRXZlbnQsXHJcbiAgICAoZXZlbnQ6IGFuZ3VsYXIuSUFuZ3VsYXJFdmVudCwgcGFyYW1zKSA9PiB7IFxyXG4gICAgICAgIHRoaXMuJHN0YXRlLmdvKEVycm9yc1Vua25vd25TdGF0ZSwgcGFyYW1zKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRVbmtub3duRXJyb3JQYWdlUmVzb3VyY2VzKCRpbmplY3RvcjogYW5ndWxhci5hdXRvLklJbmplY3RvclNlcnZpY2UpIHtcclxuICAgIGxldCBwaXBUcmFuc2xhdGU6IGFueSA9ICRpbmplY3Rvci5oYXMoJ3BpcFRyYW5zbGF0ZScpID8gJGluamVjdG9yLmdldCgncGlwVHJhbnNsYXRlJykgOiBudWxsO1xyXG4gICAgaWYgKHBpcFRyYW5zbGF0ZSA9PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgLy8gU2V0IHRyYW5zbGF0aW9uIHN0cmluZ3MgZm9yIHRoZSBtb2R1bGVcclxuICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ2VuJywge1xyXG4gICAgICAgICdFUlJPUl9VTktOT1dOX1RJVExFJzogJ09vcHMuIFNvbWV0aGluZyB3ZW50IHdyb25nJyxcclxuICAgICAgICAnRVJST1JfVU5LTk9XTl9TVUJUSVRMRSc6ICdVbmtub3duIGVycm9yIG9jY3VycmVkLCBidXQgZG9uXFwndCB3b3JyeSB3ZSBhbHJlYWR5IGhhdmUgYmVlbiBub3RpZmllZC4nLFxyXG4gICAgICAgICdFUlJPUl9VTktOT1dOX0NMT1NFJzogJ0Nsb3NlJyxcclxuICAgICAgICAnRVJST1JfVU5LTk9XTl9ERVRBSUxTJzogJ0RldGFpbHMnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygncnUnLCB7XHJcbiAgICAgICAgJ0VSUk9SX1VOS05PV05fVElUTEUnOiAnT29wcy4gU29tZXRoaW5nIHdlbnQgd3JvbmcnLFxyXG4gICAgICAgICdFUlJPUl9VTktOT1dOX1NVQlRJVExFJzogJ1Vua25vd24gZXJyb3Igb2NjdXJyZWQsIGJ1dCBkb25cXCd0IHdvcnJ5IHdlIGFscmVhZHkgaGF2ZSBiZWVuIG5vdGlmaWVkLicsXHJcbiAgICAgICAgJ0VSUk9SX1VOS05PV05fQ0xPU0UnOiAnQ2xvc2UnLFxyXG4gICAgICAgICdFUlJPUl9VTktOT1dOX0RFVEFJTFMnOiAnRGV0YWlscycsXHJcbiAgICB9KTtcclxufVxyXG5cclxuKCgpID0+IHtcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgncGlwRXJyb3JzLlBhZ2VzJylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZ3VyZVVua25vd25FcnJvclBhZ2VSb3V0ZSlcclxuICAgICAgICAucnVuKGluaXRVbmtub3duRXJyb3JQYWdlKVxyXG4gICAgICAgIC5ydW4oc2V0VW5rbm93bkVycm9yUGFnZVJlc291cmNlcyk7XHJcblxyXG59KSgpO1xyXG4iLCJcclxuaW1wb3J0IHsgSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9lcnJvcl9wYWdlcy9JRXJyb3JQYWdlQ29uZmlnU2VydmljZSc7XHJcbmltcG9ydCB7IEVycm9yUGFnZUNvbmZpZ3MsIEVycm9yUGFnZUNvbmZpZyB9IGZyb20gJy4uL2Vycm9yX3BhZ2VzL0Vycm9yUGFnZUNvbmZpZyc7XHJcblxyXG5jbGFzcyBVbnN1cHBvcnRlZEVycm9yIHtcclxuICAgIGNvbmZpZz86IGFueTtcclxufVxyXG5cclxuY2xhc3MgVW5zdXBwb3J0ZWRFcnJvclBhZ2VDb250cm9sbGVyIHtcclxuICAgIHByaXZhdGUgX3BhZ2VOYW1lOiBzdHJpbmcgPSAnVW5zdXBwb3J0ZWQnO1xyXG4gICAgcHJpdmF0ZSBwaXBOYXZTZXJ2aWNlO1xyXG5cclxuICAgIHB1YmxpYyBlcnJvckNvbmZpZzogRXJyb3JQYWdlQ29uZmlnO1xyXG4gICAgcHVibGljIGlzQ29yZG92YTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1lZGlhO1xyXG4gICAgcHVibGljIGVycm9yOiBVbnN1cHBvcnRlZEVycm9yO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICRzY29wZTogbmcuSVNjb3BlLFxyXG4gICAgICAgICRzdGF0ZTogbmcudWkuSVN0YXRlU2VydmljZSxcclxuICAgICAgICAkcm9vdFNjb3BlOiBuZy5JUm9vdFNjb3BlU2VydmljZSxcclxuICAgICAgICAkbWRNZWRpYTogYW5ndWxhci5tYXRlcmlhbC5JTWVkaWEsXHJcbiAgICAgICAgJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSxcclxuICAgICAgICBwaXBFcnJvclBhZ2VDb25maWdTZXJ2aWNlOiBJRXJyb3JQYWdlQ29uZmlnU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgXCJuZ0luamVjdFwiO1xyXG5cclxuICAgICAgICBsZXQgcGlwTWVkaWEgPSAkaW5qZWN0b3IuaGFzKCdwaXBNZWRpYScpID8gJGluamVjdG9yLmdldCgncGlwTWVkaWEnKSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5lcnJvckNvbmZpZyA9IHBpcEVycm9yUGFnZUNvbmZpZ1NlcnZpY2UuZ2V0RXJyb3JQYWdlQ29uZmlnKHRoaXMuX3BhZ2VOYW1lKTtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UgPSAkaW5qZWN0b3IuaGFzKCdwaXBOYXZTZXJ2aWNlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBOYXZTZXJ2aWNlJykgOiBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm1lZGlhID0gcGlwTWVkaWEgPyBwaXBNZWRpYSA6ICRtZE1lZGlhO1xyXG5cclxuICAgICAgICAkcm9vdFNjb3BlW3BpcC5zZXJ2aWNlcy5Sb3V0aW5nVmFyXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuYXBwSGVhZGVyKCk7XHJcblxyXG4gICAgICAgIHRoaXMuZXJyb3IgPSAkc3RhdGUgJiYgJHN0YXRlLnBhcmFtcyAmJiAkc3RhdGUucGFyYW1zWydlcnJvciddID8gJHN0YXRlLnBhcmFtc1snZXJyb3InXSA6IHt9O1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFwcEhlYWRlcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMucGlwTmF2U2VydmljZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYXBwYmFyLmFkZFNoYWRvdygpO1xyXG4gICAgICAgIHRoaXMucGlwTmF2U2VydmljZS5pY29uLnNob3dNZW51KCk7XHJcbiAgICAgICAgdGhpcy5waXBOYXZTZXJ2aWNlLmJyZWFkY3J1bWIudGV4dCA9IHRoaXMuZXJyb3JDb25maWcuQnJlYWRjcnVtYjtcclxuICAgICAgICB0aGlzLnBpcE5hdlNlcnZpY2UuYWN0aW9ucy5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNvbmZpZ3VyZVVuc3VwcG9ydGVkRXJyb3JQYWdlUm91dGUoXHJcbiAgICAkc3RhdGVQcm92aWRlcjogbmcudWkuSVN0YXRlUHJvdmlkZXJcclxuKSB7XHJcbiAgICBcIm5nSW5qZWN0XCI7XHJcblxyXG4gICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAuc3RhdGUoJ2Vycm9yc191bnN1cHBvcnRlZCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2Vycm9ycy91bnN1cHBvcnRlZCcsXHJcbiAgICAgICAgICAgIHBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgZXJyb3I6IG51bGxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnJGN0cmwnLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBVbnN1cHBvcnRlZEVycm9yUGFnZUNvbnRyb2xsZXIsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndW5zdXBwb3J0ZWQvVW5zdXBwb3J0ZWRFcnJvclBhZ2UuaHRtbCdcclxuICAgICAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFVuc3VwcG9ydGVkRXJyb3JQYWdlKFxyXG4gICAgJHJvb3RTY29wZTogbmcuSVJvb3RTY29wZVNlcnZpY2UsXHJcbiAgICAkc3RhdGU6IG5nLnVpLklTdGF0ZVNlcnZpY2UsXHJcbiAgICAkaW5qZWN0b3I6IGFuZ3VsYXIuYXV0by5JSW5qZWN0b3JTZXJ2aWNlLFxyXG4gICAgcGlwRXJyb3JQYWdlQ29uZmlnU2VydmljZTogSUVycm9yUGFnZUNvbmZpZ1NlcnZpY2UpIHtcclxuICAgIFwibmdJbmplY3RcIjtcclxuXHJcbiAgICBsZXQgY29uZmlnOiBFcnJvclBhZ2VDb25maWdzID0gcGlwRXJyb3JQYWdlQ29uZmlnU2VydmljZS5jb25maWdzO1xyXG5cclxuICAgIGlmICghY29uZmlnLlVuc3VwcG9ydGVkLkFjdGl2ZSkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwaXBTeXN0ZW1JbmZvOiBhbnkgPSAkaW5qZWN0b3IuaGFzKCdwaXBTeXN0ZW1JbmZvJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBTeXN0ZW1JbmZvJykgOiBudWxsO1xyXG4gICAgaWYgKCFwaXBTeXN0ZW1JbmZvKSB7IHJldHVybjsgfVxyXG5cclxuICAgIGxldCBzdXBwb3J0ZWRWZXJzaW9ucyA9IGNvbmZpZy5VbnN1cHBvcnRlZC5QYXJhbXMuc3VwcG9ydGVkO1xyXG5cclxuICAgIGxldCBicm93c2VyOiBzdHJpbmcgPSBwaXBTeXN0ZW1JbmZvLmJyb3dzZXJOYW1lO1xyXG4gICAgbGV0IHZlcnNpb246IHN0cmluZyA9IHBpcFN5c3RlbUluZm8uYnJvd3NlclZlcnNpb247XHJcbiAgICB2ZXJzaW9uID0gdmVyc2lvbi5zcGxpdChcIi5cIilbMF1cclxuXHJcbiAgICBpZiAoYnJvd3NlclxyXG4gICAgICAgICYmIHN1cHBvcnRlZFZlcnNpb25zW2Jyb3dzZXJdXHJcbiAgICAgICAgJiYgdmVyc2lvbiA+PSBzdXBwb3J0ZWRWZXJzaW9uc1ticm93c2VyXSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIC8vIGlmIG5vdCBzdXBwb3J0ZWRcclxuICAgIHRoaXMuJHN0YXRlLmdvKCdlcnJvcnNfdW5zdXBwb3J0ZWQnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0VW5zdXBwb3J0ZWRFcnJvclBhZ2VSZXNvdXJjZXMoJGluamVjdG9yOiBhbmd1bGFyLmF1dG8uSUluamVjdG9yU2VydmljZSkge1xyXG4gICAgbGV0IHBpcFRyYW5zbGF0ZTogYW55ID0gJGluamVjdG9yLmhhcygncGlwVHJhbnNsYXRlJykgPyAkaW5qZWN0b3IuZ2V0KCdwaXBUcmFuc2xhdGUnKSA6IG51bGw7XHJcbiAgICBpZiAocGlwVHJhbnNsYXRlID09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICAvLyBTZXQgdHJhbnNsYXRpb24gc3RyaW5ncyBmb3IgdGhlIG1vZHVsZVxyXG4gICAgcGlwVHJhbnNsYXRlLnRyYW5zbGF0aW9ucygnZW4nLCB7XHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX1RJVExFJzogJ1RoaXMgYnJvd3NlciBpcyBub3Qgc3VwcG9ydGVkJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfU1VCVElUTEUnOiAnT3VyIGFwcGxpY2F0aW9uIHVzaW5nIHRoZSBsYXRlc3QgdGVjaG5vbG9neS4gVGhpcyBtYWtlcyB0aGUgYXBwbGljYXRpb24gZmFzdGVyICcgK1xyXG4gICAgICAgICdhbmQgZWFzaWVyIHRvIHVzZS4gVW5mb3J0dW5hdGVseSwgeW91ciBicm93c2VyIGRvZXNuXFwndCBzdXBwb3J0IHRob3NlICcgK1xyXG4gICAgICAgICd0ZWNobm9sb2dpZXMuIERvd25sb2FkIG9uZSBvZiB0aGVzZSBncmVhdCBicm93c2VycyBhbmQgeW91XFwnbGwgYmUgb24geW91ciB3YXk6JyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfTyc6ICdPcGVyYScsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX09fVkVSJzogJ1ZlcnNpb24gMzYrJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUUnOiAnSW50ZXJuZXQgRXhwbG9yZXInLFxyXG4gICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9JRV9WRVInOiAnVmVyc2lvbiAxMSsnLFxyXG4gICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9HQyc6ICdHb29nbGUgQ2hyb21lJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfR0NfVkVSJzogJ1ZlcnNpb24gNDgrJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfRk0nOiAnTW96aWxsYSBGaXJlZm94JyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSJzogJ1ZlcnNpb24gNDUrJ1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHBpcFRyYW5zbGF0ZS50cmFuc2xhdGlvbnMoJ3J1Jywge1xyXG4gICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9USVRMRSc6ICdUaGlzIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZCcsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX1NVQlRJVExFJzogJ091ciBhcHBsaWNhdGlvbiB1c2luZyB0aGUgbGF0ZXN0IHRlY2hub2xvZ3kuIFRoaXMgbWFrZXMgdGhlIGFwcGxpY2F0aW9uIGZhc3RlciAnICtcclxuICAgICAgICAnYW5kIGVhc2llciB0byB1c2UuIFVuZm9ydHVuYXRlbHksIHlvdXIgYnJvd3NlciBkb2VzblxcJ3Qgc3VwcG9ydCB0aG9zZSAnICtcclxuICAgICAgICAndGVjaG5vbG9naWVzLiBEb3dubG9hZCBvbmUgb2YgdGhlc2UgZ3JlYXQgYnJvd3NlcnMgYW5kIHlvdVxcJ2xsIGJlIG9uIHlvdXIgd2F5OicsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX08nOiAnT3BlcmEnLFxyXG4gICAgICAgICdFUlJPUl9VTlNVUFBPUlRFRF9PX1ZFUic6ICdWZXJzaW9uIDM1KycsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0lFJzogJ0ludGVybmV0IEV4cGxvcmVyJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfSUVfVkVSJzogJ1ZlcnNpb24gMTErJyxcclxuICAgICAgICAnRVJST1JfVU5TVVBQT1JURURfR0MnOiAnR29vZ2xlIENocm9tZScsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0dDX1ZFUic6ICdWZXJzaW9uIDQ3KycsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNJzogJ01vemlsbGEgRmlyZWZveCcsXHJcbiAgICAgICAgJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNX1ZFUic6ICdWZXJzaW9uIDQzKydcclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuKCgpID0+IHtcclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdwaXBFcnJvcnMuUGFnZXMnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlndXJlVW5zdXBwb3J0ZWRFcnJvclBhZ2VSb3V0ZSlcclxuICAgICAgICAucnVuKGluaXRVbnN1cHBvcnRlZEVycm9yUGFnZSlcclxuICAgICAgICAucnVuKHNldFVuc3VwcG9ydGVkRXJyb3JQYWdlUmVzb3VyY2VzKTtcclxufSkoKTtcclxuIiwiKGZ1bmN0aW9uKG1vZHVsZSkge1xudHJ5IHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnKTtcbn0gY2F0Y2ggKGUpIHtcbiAgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BpcEVycm9ycy5UZW1wbGF0ZXMnLCBbXSk7XG59XG5tb2R1bGUucnVuKFsnJHRlbXBsYXRlQ2FjaGUnLCBmdW5jdGlvbigkdGVtcGxhdGVDYWNoZSkge1xuICAkdGVtcGxhdGVDYWNoZS5wdXQoJ21haW50ZW5hbmNlL01haW50ZW5hbmNlRXJyb3JQYWdlLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yLXNjcm9sbC1ib2R5IHBpcC1zY3JvbGxcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yIHBpcC1lcnJvci1wYWdlIGxheW91dC1jb2x1bW4gZmxleCBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxpbWcgc3JjPVwie3skY3RybC5jb25maWcuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjpcXCdFUlJPUl9NQUlOVEVOQU5DRV9USVRMRVxcJyB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OlxcJ0VSUk9SX01BSU5URU5BTkNFX1NVQlRJVExFXFwnIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXN1YnRleHRcIiBuZy1pZj1cIiRjdHJsLnRpbWVvdXRJbnRlcnZhbFwiPnt7OjpcXCdFUlJPUl9NQUlOVEVOQU5DRV9UUllfQUdBSU5cXCcgfCB0cmFuc2xhdGV9fSB7e3RpbWVvdXRJbnRlcnZhbH19IHNlYy48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIiBuZy1pZj1cIiRjdHJsLmlzQ29yZG92YVwiPjxtZC1idXR0b24gY2xhc3M9XCJtZC1hY2NlbnRcIiBuZy1jbGljaz1cIiRjdHJsLm9uQ2xvc2UoJGV2ZW50KVwiIGFyaWEtbGFiZWw9XCJDTE9TRVwiPnt7OjpcXCdFUlJPUl9NQUlOVEVOQU5DRV9DTE9TRVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbWlzc2luZ19yb3V0ZS9NaXNzaW5nUm91dGVFcnJvclBhZ2UuaHRtbCcsXG4gICAgJzxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc2Nyb2xsLWJvZHkgcGlwLXNjcm9sbFwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3IgcGlwLWVycm9yLXBhZ2UgbGF5b3V0LWNvbHVtbiBmbGV4IGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGltZyBzcmM9XCJ7eyRjdHJsLmNvbmZpZy5JbWFnZX19XCIgY2xhc3M9XCJwaXAtcGljIGJsb2NrXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci10ZXh0XCI+e3s6OiRjdHJsLmNvbmZpZy5UaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OiRjdHJsLmNvbmZpZy5TdWJUaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGg0OCBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PG1kLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ09OVElOVUVcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwiJGN0cmwub25Db250aW51ZSgkZXZlbnQpXCI+e3s6OlxcJ0VSUk9SX01JU1NJTkdfUk9VVEVfQ09OVElOVUVcXCcgfCB0cmFuc2xhdGV9fTwvbWQtYnV0dG9uPjwvZGl2PjxkaXYgY2xhc3M9XCJoNDhcIiBuZy1pZj1cInVybFwiPjxhIG5nLWhyZWY9XCJ7eyRjdHJsLnVybH19XCI+e3s6OlxcJ0VSUk9SX01JU1NJTkdfUk9VVEVfVFJZX0FHQUlOXFwnIHwgdHJhbnNsYXRlIH19OiB7eyRjdHJsLnVybH19PC9hPjwvZGl2PjxkaXYgY2xhc3M9XCJoNDhcIiBuZy1pZj1cInVybEJhY2tcIj48YSBuZy1ocmVmPVwie3skY3RybC51cmxCYWNrfX1cIj57ezo6XFwnRVJST1JfTUlTU0lOR19ST1VURV9HT19CQUNLXFwnIHwgdHJhbnNsYXRlIH19OiB7eyRjdHJsLnVybEJhY2t9fTwvYT48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCdub19jb25uZWN0aW9uL05vQ29ubmVjdGlvbkVycm9yUGFnZS5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvci1zY3JvbGwtYm9keSBwaXAtc2Nyb2xsXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48aW1nIHNyYz1cInt7JGN0cmwuZXJyb3JDb25maWcuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjokY3RybC5lcnJvckNvbmZpZy5UaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OiRjdHJsLmVycm9yQ29uZmlnLlN1YlRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48bWQtYnV0dG9uIGFyaWEtbGFiZWw9XCJSRVRSWVwiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCIkY3RybC5vblJldHJ5KCRldmVudClcIj57ezo6XFwnRVJST1JfTk9fQ09OTkVDVElPTl9SRVRSWVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgnbm9fY29ubmVjdGlvbl9wYW5lbC9Ob0Nvbm5lY3Rpb25QYW5lbC5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvci1wYWdlIHBpcC1lcnJvciBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyIGZsZXhcIj48aW1nIHNyYz1cInt7JGN0cmwuZXJyb3IuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjokY3RybC5lcnJvci5UaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1zdWJ0ZXh0XCI+e3s6OiRjdHJsLmVycm9yLlN1YlRpdGxlIHwgdHJhbnNsYXRlfX08L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWFjdGlvbnMgaDQ4IGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48bWQtYnV0dG9uIGFyaWEtbGFiZWw9XCJSRVRSWVwiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCIkY3RybC5vblJldHJ5KCRldmVudClcIj57ezo6XFwnRVJST1JfTk9fQ09OTkVDVElPTl9SRVRSWVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PC9kaXY+Jyk7XG59XSk7XG59KSgpO1xuXG4oZnVuY3Rpb24obW9kdWxlKSB7XG50cnkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycpO1xufSBjYXRjaCAoZSkge1xuICBtb2R1bGUgPSBhbmd1bGFyLm1vZHVsZSgncGlwRXJyb3JzLlRlbXBsYXRlcycsIFtdKTtcbn1cbm1vZHVsZS5ydW4oWyckdGVtcGxhdGVDYWNoZScsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7XG4gICR0ZW1wbGF0ZUNhY2hlLnB1dCgndW5rbm93bi9Vbmtub3duRXJyb3JQYWdlLmh0bWwnLFxuICAgICc8ZGl2IGNsYXNzPVwicGlwLWVycm9yLXNjcm9sbC1ib2R5IHBpcC1zY3JvbGxcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yIHBpcC1lcnJvci1wYWdlIGxheW91dC1jb2x1bW4gZmxleCBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxpbWcgc3JjPVwie3skY3RybC5jb25maWcuSW1hZ2V9fVwiIGNsYXNzPVwicGlwLXBpYyBibG9ja1wiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItdGV4dFwiPnt7OjokY3RybC5jb25maWcuVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjokY3RybC5jb25maWcuU3ViVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiIG5nLWlmPVwiJGN0cmwuc2hvd0Vycm9yICYmICRjdHJsLmVycm9yX2RldGFpbHMgJiYgJGN0cmwuZXJyb3JfZGV0YWlscy5tZXNzYWdlXCI+PGRpdiBuZy1pZj1cIiRjdHJsLmVycm9yX2RldGFpbHMuY29kZVwiPkNvZGU6IHt7JGN0cmwuZXJyb3JfZGV0YWlscy5jb2RlfX08L2Rpdj48ZGl2IG5nLWlmPVwiJGN0cmwuZXJyb3JfZGV0YWlscy5tZXNzYWdlXCI+RGVzY3JpcHRpb246IHt7JGN0cmwuZXJyb3JfZGV0YWlscy5tZXNzYWdlfX08L2Rpdj48ZGl2IG5nLWlmPVwiJGN0cmwuZXJyb3JfZGV0YWlscy5zdGF0dXNcIj5IVFRQIHN0YXR1czoge3skY3RybC5lcnJvcl9kZXRhaWxzLnN0YXR1c319PC9kaXY+PGRpdiBuZy1pZj1cIiRjdHJsLmVycm9yX2RldGFpbHMuc2VydmVyX3N0YWNrdHJhY2VcIj5TZXJ2ZXIgc3RhY2t0cmFjZToge3skY3RybC5lcnJvcl9kZXRhaWxzLnNlcnZlcl9zdGFja3RyYWNlfX08L2Rpdj48ZGl2IG5nLWlmPVwiJGN0cmwuZXJyb3JfZGV0YWlscy5jbGllbnRfc3RhY2t0cmFjZVwiPkNsaWVudCBzdGFja3RyYWNlIHN0YWNrdHJhY2U6IHt7JGN0cmwuZXJyb3JfZGV0YWlscy5jbGllbnRfc3RhY2t0cmFjZX19PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1hY3Rpb25zIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IGNsYXNzPVwiaDQ4XCIgbmctaWY9XCIkY3RybC5pc0NvcmRvdmFcIj48bWQtYnV0dG9uIGFyaWEtbGFiZWw9XCJDTE9TRVwiIGNsYXNzPVwibWQtYWNjZW50XCIgbmctY2xpY2s9XCIkY3RybC5vbkNsb3NlKCRldmVudClcIj57ezo6XFwnRVJST1JfVU5LTk9XTl9DTE9TRVxcJyB8IHRyYW5zbGF0ZX19PC9tZC1idXR0b24+PC9kaXY+PGRpdiBjbGFzcz1cImg0OFwiIG5nLWlmPVwiJGN0cmwuZXJyb3JfZGV0YWlscyAmJiAkY3RybC5lcnJvcl9kZXRhaWxzLnN0YXR1c1wiPjxtZC1idXR0b24gYXJpYS1sYWJlbD1cIkRFVEFJTFNcIiBjbGFzcz1cIm1kLWFjY2VudFwiIG5nLWNsaWNrPVwiJGN0cmwub25EZXRhaWxzKCRldmVudClcIj57ezo6XFwnRVJST1JfVU5LTk9XTl9ERVRBSUxTXFwnIHwgdHJhbnNsYXRlfX08L21kLWJ1dHRvbj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbihmdW5jdGlvbihtb2R1bGUpIHtcbnRyeSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJyk7XG59IGNhdGNoIChlKSB7XG4gIG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaXBFcnJvcnMuVGVtcGxhdGVzJywgW10pO1xufVxubW9kdWxlLnJ1bihbJyR0ZW1wbGF0ZUNhY2hlJywgZnVuY3Rpb24oJHRlbXBsYXRlQ2FjaGUpIHtcbiAgJHRlbXBsYXRlQ2FjaGUucHV0KCd1bnN1cHBvcnRlZC9VbnN1cHBvcnRlZEVycm9yUGFnZS5odG1sJyxcbiAgICAnPGRpdiBjbGFzcz1cInBpcC1lcnJvci1zY3JvbGwtYm9keSBwaXAtc2Nyb2xsXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvciBwaXAtZXJyb3ItcGFnZSBsYXlvdXQtY29sdW1uIGZsZXggbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLXRleHRcIj57ezo6JGN0cmwuZXJyb3JDb25maWcuVGl0bGUgfCB0cmFuc2xhdGV9fTwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3Itc3VidGV4dFwiPnt7OjokY3RybC5lcnJvckNvbmZpZy5TdWJUaXRsZSB8IHRyYW5zbGF0ZX19PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzIGxheW91dC1yb3cgbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIiBuZy1pZj1cIiRjdHJsLm1lZGlhKFxcJ2d0LXhzXFwnKVwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9pZS5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lm1pY3Jvc29mdC5jb20vZW4tdXMvZG93bmxvYWQvaW50ZXJuZXQtZXhwbG9yZXItMTEtZm9yLXdpbmRvd3MtNy1kZXRhaWxzLmFzcHhcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfSUVcXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfSUVfVkVSXFwnIHwgdHJhbnNsYXRlfX08L3A+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2ZtLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvcnUvZmlyZWZveC9uZXcvXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNXFwnIHwgdHJhbnNsYXRlfX08L2E+PHAgY2xhc3M9XCJ0ZXh0LWJvZHkxIG0wXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX0ZNX1ZFUlxcJyB8IHRyYW5zbGF0ZX19PC9wPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9nYy5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lL2Jyb3dzZXIvZGVza3RvcC9pbmRleC5odG1sP3BsYXRmb3JtPXdpbjY0I1wiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvby5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly93d3cub3BlcmEuY29tL3J1L2Rvd25sb2FkXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX09cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHNcIiBuZy1pZj1cIiRjdHJsLm1lZGlhKFxcJ3hzXFwnKVwiPjxkaXYgY2xhc3M9XCJsYXlvdXQtcm93IGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBjbGFzcz1cInBpcC1lcnJvci1kZXRhaWxzLWl0ZW0gbGF5b3V0LWNvbHVtbiBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXFwnaW1hZ2VzL2llLnN2Z1xcJyk7XCIgY2xhc3M9XCJwaXAtcGljXCI+PC9kaXY+PGRpdiBjbGFzcz1cImg2NCB0cDE2IGJwMTZcIj48YSBjbGFzcz1cInRleHQtYm9keTIgbTBcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cHM6Ly93d3cubWljcm9zb2Z0LmNvbS9lbi11cy9kb3dubG9hZC9pbnRlcm5ldC1leHBsb3Jlci0xMS1mb3Itd2luZG93cy03LWRldGFpbHMuYXNweFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRVxcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9JRV9WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvZm0uc3ZnXFwnKTtcIiBjbGFzcz1cInBpcC1waWNcIj48L2Rpdj48ZGl2IGNsYXNzPVwiaDY0IHRwMTYgYnAxNlwiPjxhIGNsYXNzPVwidGV4dC1ib2R5MiBtMFwiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJodHRwczovL3d3dy5tb3ppbGxhLm9yZy9ydS9maXJlZm94L25ldy9cIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfRk1fVkVSXFwnIHwgdHJhbnNsYXRlfX08L3A+PC9kaXY+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInRtMTYgbGF5b3V0LXJvdyBsYXlvdXQtYWxpZ24tY2VudGVyLWNlbnRlclwiPjxkaXYgY2xhc3M9XCJwaXAtZXJyb3ItZGV0YWlscy1pdGVtIGxheW91dC1jb2x1bW4gbGF5b3V0LWFsaWduLWNlbnRlci1jZW50ZXJcIj48ZGl2IHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKFxcJ2ltYWdlcy9nYy5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vY2hyb21lL2Jyb3dzZXIvZGVza3RvcC9pbmRleC5odG1sP3BsYXRmb3JtPXdpbjY0I1wiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ1xcJyB8IHRyYW5zbGF0ZX19PC9hPjxwIGNsYXNzPVwidGV4dC1ib2R5MSBtMFwiPnt7OjpcXCdFUlJPUl9VTlNVUFBPUlRFRF9HQ19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwicGlwLWVycm9yLWRldGFpbHMtaXRlbSBsYXlvdXQtY29sdW1uIGxheW91dC1hbGlnbi1jZW50ZXItY2VudGVyXCI+PGRpdiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybChcXCdpbWFnZXMvby5zdmdcXCcpO1wiIGNsYXNzPVwicGlwLXBpY1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJoNjQgdHAxNiBicDE2XCI+PGEgY2xhc3M9XCJ0ZXh0LWJvZHkyIG0wXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly93d3cub3BlcmEuY29tL3J1L2Rvd25sb2FkXCI+e3s6OlxcJ0VSUk9SX1VOU1VQUE9SVEVEX09cXCcgfCB0cmFuc2xhdGV9fTwvYT48cCBjbGFzcz1cInRleHQtYm9keTEgbTBcIj57ezo6XFwnRVJST1JfVU5TVVBQT1JURURfT19WRVJcXCcgfCB0cmFuc2xhdGV9fTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj4nKTtcbn1dKTtcbn0pKCk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcC13ZWJ1aS1lcnJvcnMtaHRtbC5taW4uanMubWFwXG4iXX0=