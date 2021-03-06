export let ErrorsMaintenanceState = 'errors_maintenance';
export let MaintenanceErrorEvent = 'pipMaintenanceError';

import { IErrorPageConfigService } from '../error_pages/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../error_pages/ErrorPageConfig';

class MaintenanceError {
    config?: MaintenanceErrorConfig;
}

class MaintenanceErrorConfig {
    params?: MaintenanceErrorParams;
}

class MaintenanceErrorParams {
    interval?: number = 0;
}

class MaintenanceErrorPageController {
    private _pageName: string = 'Maintenance';
    private pipNavService;

    public config: ErrorPageConfig;
    public isCordova: boolean = false;
    public media;
    public error: MaintenanceError;
    public timeoutInterval: number;

    constructor(
        $scope: ng.IScope,
        private $window: ng.IWindowService,
        private $state: ng.ui.IStateService,
        $rootScope: ng.IRootScopeService,
        $mdMedia: angular.material.IMedia,
        $injector: angular.auto.IInjectorService,
        pipErrorPageConfigService: IErrorPageConfigService
    ) {
        "ngInject";

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.config = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;

        this.media = pipMedia ? pipMedia : $mdMedia;

        $rootScope[pip.services.RoutingVar] = false;
        this.appHeader();

        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.timeoutInterval = this.error && this.error.config &&
            this.error.config.params && this.error.config.params.interval ? this.error.config.params.interval : 0;

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    
    public onRetry() {
        if (this.$state.params && this.$state.params['fromState'] && this.$state.params['fromState'] != this.config.Name ) {
            this.$state.go(this.$state.params['fromState'], this.$state.params['fromParams']);
        } else if (this.config.RedirectSateDefault) {
            this.$state.go(this.config.RedirectSateDefault);
        } else {
            this.$window.history.back();
        }
        // this.$window.history.back();
    }
}

function configureMaintenanceErrorPageRoute(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
            .state(ErrorsMaintenanceState, {
                url: '/errors/maintenance',
                params: {
                    error: null
                },
                controller: MaintenanceErrorPageController,
                controllerAs: '$ctrl',
                templateUrl: 'maintenance/MaintenanceErrorPage.html'
            });
}

function initMaintenanceErrorPage(
    $rootScope: ng.IRootScopeService, 
    $state: ng.ui.IStateService, 
    pipErrorPageConfigService: IErrorPageConfigService
) {
    "ngInject";

    let config: ErrorPageConfigs = pipErrorPageConfigService.configs;

    if (!config.Maintenance.Active) return;

    $rootScope.$on(MaintenanceErrorEvent,
    (event: angular.IAngularEvent, params) => { 
        $state.go(ErrorsMaintenanceState, params);
    });
}

function setMaintenanceErrorPageResources($injector: angular.auto.IInjectorService) {
    let pipTranslate: any = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null) return;

    // Set translation strings for the module
    pipTranslate.translations('en', {
        'ERROR_MAINTENANCE_TITLE': 'The server is on maintenance',
        'ERROR_MAINTENANCE_SUBTITLE': 'Sorry for the inconvenience. This application is undergoing maintenance for ' +
        'a short period. We\'ll be back soon. Thank for your patience.',
        'ERROR_MAINTENANCE_CLOSE': 'Close',
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Try after',
        ERROR_MAINTENANCE_RETRY: 'Retry'
    });

    pipTranslate.translations('ru', {
        'ERROR_MAINTENANCE_TITLE': 'Сервер находится на обслуживании',
        'ERROR_MAINTENANCE_SUBTITLE': 'Приносим извинения за неудобства. Это приложение проходит техническое обслуживание на короткий период времени. Мы скоро вернемся. Благодарим за терпение.',
        'ERROR_MAINTENANCE_CLOSE': 'Закрыть',
        'ERROR_MAINTENANCE_TRY_AGAIN': 'Попробовать еще',
        ERROR_MAINTENANCE_RETRY: 'Попробовать еще'
    });
}

(() => {

    angular
        .module('pipErrors.Pages')
        .config(configureMaintenanceErrorPageRoute)
        .run(initMaintenanceErrorPage)
        .run(setMaintenanceErrorPageResources);

})();
