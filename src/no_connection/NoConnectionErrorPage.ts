
import { IErrorPageConfigService } from '../error_pages/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../error_pages/ErrorPageConfig';

class NoConnectionError {
    config?: any;
}

class NoConnectionErrorPageController {
    private _pageName: string = 'NoConnection';
    private pipNavService;

    public errorConfig: ErrorPageConfig;
    public isCordova: boolean = false;
    public media;
    public error: NoConnectionError;

    constructor(
        private $window: ng.IWindowService,
        $scope: ng.IScope,
        $state: ng.ui.IStateService,
        $rootScope: ng.IRootScopeService,
        $mdMedia: angular.material.IMedia,
        $injector: angular.auto.IInjectorService,
        pipErrorPageConfigService: IErrorPageConfigService
    ) {
        "ngInject";

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorPageConfigService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;

        this.media = pipMedia ? pipMedia : $mdMedia;

        $rootScope['$routing'] = false;
        this.appHeader();

        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    public onRetry() {
        this.$window.history.back();
    }
}

function configureNoConnectionErrorPageRoute(
    $injector: angular.auto.IInjectorService,
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
        .state('errors_no_connection', {
            url: '/errors/no_connection',
            params: {
                error: null
            },
            controller: NoConnectionErrorPageController,
            controllerAs: '$ctrl',
            templateUrl: 'no_connection/NoConnectionErrorPage.html'
        });
}

function initNoConnectionErrorPage(
    $rootScope: ng.IRootScopeService,
    $state: ng.ui.IStateService,
    pipErrorPageConfigService: IErrorPageConfigService
) {
    "ngInject";

    let config: ErrorPageConfigs = pipErrorPageConfigService.configs;

    if (!config.NoConnection.Active) return;


    $rootScope.$on('pipNoConnectionError',
        (event: angular.IAngularEvent, params) => {
            this.$state.go('errors_no_connection', params);
        });
}

function setNoConnectionErrorPageResources($injector: angular.auto.IInjectorService) {
    let pipTranslate: any = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null) return;

    // Set translation strings for the module
    pipTranslate.translations('en', {
        'ERROR_NO_CONNECTION_TITLE': 'No connection to the server',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Unable to connect to the server. Check your Internet connection and try again.',
        'ERROR_NO_CONNECTION_RETRY': 'Retry',
    });

    pipTranslate.translations('ru', {
        'ERROR_NO_CONNECTION_TITLE': 'No connection to the server',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Unable to connect to server. Check your Internet connection and try again.',
        'ERROR_NO_CONNECTION_RETRY': 'Retry',
    });
}

(() => {

    angular
        .module('pipErrors.Pages')
        .config(configureNoConnectionErrorPageRoute)
        .run(initNoConnectionErrorPage)
        .run(setNoConnectionErrorPageResources);

})();
