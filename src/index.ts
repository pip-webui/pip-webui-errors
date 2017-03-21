/*angular
    .module('pipErrors.Pages', [
        'ngMaterial'
    ]);
*/
import './maintenance/MaintenanceErrorPage';
import './missing_route/MissingRouteErrorPage';
import './no_connection/NoConnectionErrorPage';
import './unknown/UnknownErrorPage';
import './unsupported/UnsupportedErrorPage';

angular
    .module('pipErrors', [
        'pipErrors.Templates',
        'pipErrors.Pages',
        'pipErrorPageConfigService',
        'pipNoConnectionPanel',
        'pipClearErrors',
        'pipFormErrors'
    ]);

export * from './error_pages/ErrorPageConfig';
export * from './error_pages/IErrorPageConfigService';