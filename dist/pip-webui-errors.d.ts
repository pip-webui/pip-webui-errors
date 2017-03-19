declare module pip.errors {



export class ErrorStateItem {
    Active: boolean;
    Name: string;
    Event: string;
    Title: string;
    SubTitle: String;
    Breadcrumb: string;
    Image: string;
    Params?: any;
}
export class ErrorsConfig {
    Maintenance: ErrorStateItem;
    MissingRoute: ErrorStateItem;
    NoConnection: ErrorStateItem;
    Unknown: ErrorStateItem;
    Unsupported: ErrorStateItem;
}



export interface IErrorsService {
    getErrorItemByKey(errorName: string): ErrorStateItem;
    config: ErrorsConfig;
}
export interface IErrorsProvider extends ng.IServiceProvider {
    configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void;
    configureErrors(value: ErrorsConfig): void;
    config: ErrorsConfig;
}


class ClearErrorsLink {
    private _fieldController;
    private _formController;
    constructor($scope: ng.IScope, $element: ng.IRootElementService, $attrs: ng.IAttributes, $ctrls: any);
    private clearFieldErrors();
    private clearFormErrors();
}

class FormErrors {
    private $rootScope;
    constructor($rootScope: ng.IRootScopeService);
    errorsWithHint(field: any): any;
    touchedErrorsWithHint(form: ng.IFormController, field: any): any;
    resetFormErrors(form: ng.IFormController, errors?: boolean): void;
    resetFieldsErrors(form: ng.IFormController, field: any): void;
    setFormError(form: ng.IFormController, error: any, errorFieldMap: any): void;
    private goToUnhandledErrorPage(error);
}

export class PipMaintenanceError {
    config?: PipMaintenanceErrorConfig;
}
export class PipMaintenanceErrorConfig {
    params?: PipMaintenanceErrorParams;
}
export class PipMaintenanceErrorParams {
    interval?: number;
}
export class ErrorMaintenanceController {
    private _errorKey;
    private pipNavService;
    errorConfig: ErrorStateItem;
    isCordova: boolean;
    media: any;
    error: PipMaintenanceError;
    timeoutInterval: number;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorsService: IErrorsService);
    private appHeader();
}


export class PipNoConnectionError {
    config?: any;
}
export class ErrorNoConnectionController {
    private $window;
    private _errorKey;
    private pipNavService;
    errorConfig: ErrorStateItem;
    isCordova: boolean;
    media: any;
    error: PipNoConnectionError;
    constructor($window: ng.IWindowService, $scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorsService: IErrorsService);
    private appHeader();
    onRetry(): void;
}

class NoConnectionPanelController {
    private _retry;
    constructor($scope: ng.IScope);
    onRetry(): void;
}

export class PipUnknownErrorDetails {
    code: number;
    message: string;
    status: string;
    server_stacktrace: Function;
    client_stacktrace: Function;
}
export class ErrorUnknownController {
    private _errorKey;
    private pipNavService;
    errorConfig: ErrorStateItem;
    isCordova: boolean;
    media: any;
    error: PipUnknownErrorDetails;
    error_details: PipUnknownErrorDetails;
    showError: boolean;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorsService: IErrorsService);
    private appHeader();
    private parseError();
    onDetails(): void;
}

export class PipUnsupportedError {
    config?: any;
}
export class ErrorUnsupportedController {
    private _errorKey;
    private pipNavService;
    errorConfig: ErrorStateItem;
    isCordova: boolean;
    media: any;
    error: PipUnsupportedError;
    constructor($scope: ng.IScope, $state: ng.ui.IStateService, $rootScope: ng.IRootScopeService, $mdMedia: angular.material.IMedia, $injector: angular.auto.IInjectorService, pipErrorsService: IErrorsService);
    private appHeader();
}

}
