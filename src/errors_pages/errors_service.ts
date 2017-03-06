'use strict';

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
    Maintenance: ErrorStateItem = {
        Active: true,
        Name: 'errors_maintenance',
        Event: 'pipMaintenanceError',
        Title: 'ERROR_AVAILABLE_TITLE',
        SubTitle: 'ERROR_AVAILABLE_SUBTITLE',
        Breadcrumb: 'ERROR_AVAILABLE_TITLE',
        Image: 'images/maintenance.svg'
        
    };
    MissingRoute: ErrorStateItem = {
        Active: true,
        Name: 'errors_missing_route',
        Event: '$stateNotFound',
        Title: 'ERROR_ROUTE_TITLE',
        SubTitle: 'ERROR_ROUTE_SUBTITLE',
        Breadcrumb: 'ERROR_ROUTE_PAGE_TITLE',
        Image: 'images/invalid_route.svg'
    };
    NoConnection: ErrorStateItem = {
        Active: true,
        Name: 'errors_no_connection',
        Event: 'pipNoConnectionError',
        Title: 'ERROR_RESPONDING_TITLE',
        SubTitle: 'ERROR_RESPONDING_SUBTITLE',
        Breadcrumb: 'ERROR_RESPONDING_TITLE',
        Image: 'images/no_response.svg'
    };
    Unknown: ErrorStateItem = {
        Active: true,
        Name: 'errors_unknown',
        Event: 'pipUnknownError',
        Title: 'ERROR_UNKNOWN_TITLE',
        SubTitle: 'ERROR_UNKNOWN_SUBTITLE',
        Breadcrumb: 'ERROR_UNKNOWN_TITLE',
        Image: 'images/unknown_error.svg'
    };
    Unsupported: ErrorStateItem = {
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
    }
}

export interface IErrorsService {
    getErrorItemByKey(errorName: string): ErrorStateItem;

    config: ErrorsConfig;
}

export interface IErrorsProvider extends ng.IServiceProvider {
    configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void;
    configureErrors(value: ErrorsConfig): void;
}

class ErrorsService implements IErrorsService {
    private _config: ErrorsConfig;

    public constructor(
        config: ErrorsConfig
    ) {
        "ngInject";

        this._config = config || new ErrorsConfig();
    }

    public get config(): ErrorsConfig {
        return this._config;
    }

    public getErrorItemByKey(errorName: string): ErrorStateItem {
        if (!errorName || !this._config[errorName]) {
            return null;
        }

        return this._config[errorName];
    }

}

class ErrorsProvider implements IErrorsProvider {
    private _service: ErrorsService;
    private _config: ErrorsConfig;

    constructor() {
        this._config = new ErrorsConfig();
    }

    public configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void {
        if (!errorName || !errorParams) return;
        if (!this._config[errorName]) return;

        this._config[errorName] = <ErrorStateItem>_.defaultsDeep(errorParams, this._config[errorName]);
    }

    public configureErrors(value: ErrorsConfig): void {
        if (!value) return;

        this._config = <ErrorsConfig>_.defaultsDeep(value, this._config);
    }

    public $get(): ErrorsService {
        "ngInject";

        if (this._service == null)
            this._service = new ErrorsService(this._config);

        return this._service;
    }
}

angular
    .module('pipErrorsService')
    .provider('pipErrorsService', ErrorsProvider);
