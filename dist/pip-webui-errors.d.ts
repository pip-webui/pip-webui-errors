declare module pip.errors {


export class ErrorPageConfig {
    Active: boolean;
    Name: string;
    Event: string;
    Title: string;
    SubTitle: String;
    Breadcrumb: string;
    Image: string;
    Params?: any;
}
export class ErrorPageConfigs {
    Maintenance: ErrorPageConfig;
    MissingRoute: ErrorPageConfig;
    NoConnection: ErrorPageConfig;
    Unknown: ErrorPageConfig;
    Unsupported: ErrorPageConfig;
}


export interface IErrorPageConfigService {
    getErrorPageConfig(pageName: string): ErrorPageConfig;
    configs: ErrorPageConfigs;
}
export interface IErrorPageConfigProvider extends ng.IServiceProvider {
    setErrorPageConfig(pageName: string, config: ErrorPageConfig): void;
    setAllErrorPageConfigs(configs: ErrorPageConfigs): void;
    configs: ErrorPageConfigs;
}

class ClearErrorsLink {
    private _fieldController;
    private _formController;
    constructor($scope: ng.IScope, $element: ng.IRootElementService, $attrs: ng.IAttributes, $ctrls: any);
    private clearFieldErrors();
    private clearFormErrors();
}

class FormErrorsService {
    private $rootScope;
    constructor($rootScope: ng.IRootScopeService);
    errorsWithHint(field: any): any;
    touchedErrorsWithHint(form: ng.IFormController, field: any): any;
    resetFormErrors(form: ng.IFormController, errors?: boolean): void;
    resetFieldsErrors(form: ng.IFormController, field: any): void;
    setFormError(form: ng.IFormController, error: any, errorFieldMap: any): void;
    private goToUnhandledErrorPage(error);
}

interface IHttpResponseInterceptor {
    responseError(rejection: any): any;
}
class HttpResponseInterceptor implements IHttpResponseInterceptor {
    private $q;
    private $location;
    private $rootScope;
    constructor($q: ng.IQService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService);
    responseError(rejection: any): ng.IPromise<any>;
}



export class NoConnectionError {
    config?: any;
}
export class NoConnectionErrorPageController {
    private $window;
    private _pageName;
    private pipNavService;
    errorConfig: ErrorPageConfig;
    isCordova: boolean;
    media: any;
    error: NoConnectionError;
    constructor($window: ng.IWindowService, $scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorPageConfigService: IErrorPageConfigService);
    private appHeader();
    onRetry(): void;
}

class NoConnectionPanelController {
    private _retry;
    constructor($scope: ng.IScope);
    onRetry(): void;
}

export class UnknownErrorDetails {
    code: number;
    message: string;
    status: string;
    server_stacktrace: Function;
    client_stacktrace: Function;
}
export class UnknownErrorPageController {
    private _pageName;
    private pipNavService;
    config: ErrorPageConfig;
    isCordova: boolean;
    media: any;
    error: UnknownErrorDetails;
    error_details: UnknownErrorDetails;
    showError: boolean;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorPageConfigService: IErrorPageConfigService);
    private appHeader();
    private parseError();
    onDetails(): void;
}

export class UnsupportedError {
    config?: any;
}
export class UnsupportedErrorPageController {
    private _pageName;
    private pipNavService;
    errorConfig: ErrorPageConfig;
    isCordova: boolean;
    media: any;
    error: UnsupportedError;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorsService: IErrorPageConfigService);
    private appHeader();
}

}
