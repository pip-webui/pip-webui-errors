export let ErrorsConnectionState = 'errors_no_connection';
export let ErrorsConnectionEvent = 'pipNoConnectionError';

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
        private $state: ng.ui.IStateService,
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

        $rootScope[pip.services.RoutingVar] = false;
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
        if (this.$state.params && this.$state.params['fromState'] && this.$state.params['fromState'] != this.errorConfig.Name) {
            this.$state.go(this.$state.params['fromState'], this.$state.params['fromParams']);
        } else if (this.errorConfig.RedirectSateDefault) {
            this.$state.go(this.errorConfig.RedirectSateDefault);
        } else {
            this.$window.history.back();
        }
        // this.$window.history.back();
    }
}

function configureNoConnectionErrorPageRoute(
    $injector: angular.auto.IInjectorService,
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
        .state(ErrorsConnectionState, {
            url: '/errors/no_connection',
            params: {
                error: null,
                fromState: null,
                fromParams: null
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
    if (!config.NoConnection.StateIgnored) config.NoConnection.StateIgnored = [];
    config.NoConnection.StateIgnored.push(config.NoConnection.Name);

    if (!config.NoConnection.Active) return;

    $rootScope.$on(ErrorsConnectionEvent,
        (event: angular.IAngularEvent, params) => {
            params = params ? params : {};

            if (config.NoConnection.StateIgnored.indexOf($state.current.name) > -1) {
                return;
            } else {
                params.fromState = $state.current.name;
                params.fromParams = $state.params;
            }

            // todo make configure, as array of state
            if ($state.current.name == 'recover_password' || $state.current.name == 'change_password'
                || $state.current.name == 'expire_change_password' || $state.current.name == 'reset_password'
                || $state.current.name == 'verify_email' || $state.current.name == 'verify_email_success'
                || $state.current.name == 'signin' || $state.current.name == 'signup') {

                return
            }
            $state.go(ErrorsConnectionState, params);
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
        'ERROR_NO_CONNECTION_TITLE': 'Нет подключения к серверу',
        'ERROR_NO_CONNECTION_SUBTITLE': 'Невозможно подключиться к серверу. Проверьте подключение к Интернету и повторите попытку.',
        'ERROR_NO_CONNECTION_RETRY': 'Повторить',
    });
}

(() => {

    angular
        .module('pipErrors.Pages')
        .config(configureNoConnectionErrorPageRoute)
        .run(initNoConnectionErrorPage)
        .run(setNoConnectionErrorPageResources);

})();
