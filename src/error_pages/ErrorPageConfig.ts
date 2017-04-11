
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

    Maintenance: ErrorPageConfig = {
        Active: true,
        Name: 'errors_maintenance',
        Event: 'pipMaintenanceError',
        Title: 'ERROR_MAINTENANCE_TITLE',
        SubTitle: 'ERROR_MAINTENANCE_SUBTITLE',
        Breadcrumb: 'ERROR_MAINTENANCE_TITLE',
        Image: 'images/maintenance.svg'

    };

    MissingRoute: ErrorPageConfig = {
        Active: true,
        Name: 'errors_missing_route',
        Event: '$stateNotFound',
        Title: 'ERROR_MISSING_ROUTE_TITLE',
        SubTitle: 'ERROR_MISSING_ROUTE_SUBTITLE',
        Breadcrumb: 'ERROR_MISSING_ROUTE_PAGE_TITLE',
        Image: 'images/invalid_route.svg'
    };

    NoConnection: ErrorPageConfig = {
        Active: true,
        Name: 'errors_no_connection',
        Event: 'pipNoConnectionError',
        Title: 'ERROR_NO_CONNECTION_TITLE',
        SubTitle: 'ERROR_NO_CONNECTION_SUBTITLE',
        Breadcrumb: 'ERROR_NO_CONNECTION_TITLE',
        Image: 'images/no_response.svg'
    };

    Unknown: ErrorPageConfig = {
        Active: true,
        Name: 'errors_unknown',
        Event: 'pipUnknownError',
        Title: 'ERROR_UNKNOWN_TITLE',
        SubTitle: 'ERROR_UNKNOWN_SUBTITLE',
        Breadcrumb: 'ERROR_UNKNOWN_TITLE',
        Image: 'images/unknown_error.svg'
    };

    Unsupported: ErrorPageConfig = {
        Active: true,
        Name: 'errors_unsupported',
        Event: '',
        Title: 'ERROR_UNSUPPORTED_TITLE',
        SubTitle: 'ERROR_UNSUPPORTED_SUBTITLE',
        Breadcrumb: 'ERROR_UNSUPPORTED_TITLE',
        Image: '',
        Params: {}
    }
}

export class SupportedBrowsers {
    edge: number = 11;
    ie: number = 11;
    firefox: number = 43;
    opera: number = 35;
    chrome: number = 47;
}
