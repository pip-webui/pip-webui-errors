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
}









}
