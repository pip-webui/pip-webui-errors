
import { ErrorsConfig, ErrorStateItem } from './ErrorPagesConfig';

export interface IErrorsService {
    getErrorItemByKey(errorName: string): ErrorStateItem;

    config: ErrorsConfig;
}

export interface IErrorsProvider extends ng.IServiceProvider {
    configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void;
    configureErrors(value: ErrorsConfig): void;
    config: ErrorsConfig;
}