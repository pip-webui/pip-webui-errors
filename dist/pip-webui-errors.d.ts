declare module pip.errors {



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







}
