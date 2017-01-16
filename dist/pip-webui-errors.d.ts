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
export class pipErrorsConfig {
    Maintenance: ErrorStateItem;
    MissingRoute: ErrorStateItem;
    NoConnection: ErrorStateItem;
    Unknown: ErrorStateItem;
    Unsupported: ErrorStateItem;
}
export interface IpipErrorsService {
    getErrorItemByKey(errorName: string): ErrorStateItem;
    config: pipErrorsConfig;
}
export interface IpipErrorsProvider extends ng.IServiceProvider {
    configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void;
    configureErrors(value: pipErrorsConfig): void;
}









}
