declare module pip.errors {




export interface IFormErrorsService {
    errorsWithHint(field: any): any;
    touchedErrorsWithHint(form: ng.IFormController, field: any, notSubmited?: boolean): any;
    resetFormErrors(form: ng.IFormController, errors?: boolean): void;
    resetFieldsErrors(form: ng.IFormController, field: any): void;
    setFormError(form: ng.IFormController, error: any, errorFieldMap: any): void;
    goToUnhandledErrorPage(error: any): any;
}

class HttpResponseInterceptor implements ng.IHttpInterceptor {
    private $q;
    private $location;
    private $rootScope;
    constructor($q: ng.IQService, $location: ng.ILocationService, $rootScope: ng.IRootScopeService);
    responseError: (rejection: any) => ng.IPromise<any>;
}
function configureHttpInterceptor($stateProvider: ng.ui.IStateProvider, $httpProvider: ng.IHttpProvider): void;

export class ErrorPageConfig {
    Active: boolean;
    Name: string;
    Event: string;
    Title: string;
    SubTitle: String;
    Breadcrumb: string;
    Image: string;
    Params?: any;
    RedirectSateDefault?: string;
    StateIgnored?: string[];
}
export class ErrorPageConfigs {
    Maintenance: ErrorPageConfig;
    MissingRoute: ErrorPageConfig;
    NoConnection: ErrorPageConfig;
    Unknown: ErrorPageConfig;
    Unsupported: ErrorPageConfig;
}
export class SupportedBrowsers {
    edge: number;
    ie: number;
    firefox: number;
    opera: number;
    chrome: number;
}


export interface IErrorPageConfigService {
    getErrorPageConfig(pageName: string): ErrorPageConfig;
    configs: ErrorPageConfigs;
}
export interface IErrorPageConfigProvider extends ng.IServiceProvider {
    setErrorPageConfig(pageName: string, config: ErrorPageConfig): void;
    setAllErrorPageConfigs(configs: ErrorPageConfigs): void;
    setSupportedBrowsers(browsers: SupportedBrowsers): void;
    configs: ErrorPageConfigs;
}

export let ErrorsMaintenanceState: string;
export let MaintenanceErrorEvent: string;

export let ErrorsMissingRouteState: string;
export let StateNotFoundEvent: string;

export let ErrorsConnectionState: string;
export let ErrorsConnectionEvent: string;


export let ErrorsUnknownState: string;
export let ErrorsUnknownEvent: string;

export let ErrorsUnsupportedState: string;
export let ErrorsUnsupportedEvent: string;

}
