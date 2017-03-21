
import { IErrorPageConfigService } from '../error_pages/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../error_pages/ErrorPageConfig';

export class UnknownErrorDetails {
    code: number;
    message: string;
    status: string;
    server_stacktrace: Function;
    client_stacktrace: Function;
}

export class UnknownErrorPageController {
    private _pageName: string = 'Unknown';
    private pipNavService;

    public config: ErrorPageConfig;
    public isCordova: boolean = false;
    public media;
    public error: UnknownErrorDetails;
    public error_details: UnknownErrorDetails;
    public showError: boolean;

    constructor(
        $scope: ng.IScope,
        $state: ng.ui.IStateService, 
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

        $rootScope['$routing'] = false;
        this.showError = $scope['showError'];
        this.appHeader();

        this.error = $state && $state.params && $state.params['error'] ?  $state.params['error'] : {};
        
        this.parseError();

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    private parseError() {
        this.error_details = new UnknownErrorDetails();
        this.error_details.code = this.error.code;
        this.error_details.message = this.error.message;
        this.error_details.status = this.error.status;

        this.error_details.server_stacktrace = () => {};

        this.error_details.client_stacktrace = () => {};
    }

    public onDetails() {
        this.showError = true;
    }

}

function configureUnknownErrorPageRoute (
    $injector: angular.auto.IInjectorService, 
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
            .state('errors_unknown', {
                url: '/errors/unknown',
                params: {
                    error: null
                }, 
                controllerAs: '$ctrl',
                controller: UnknownErrorPageController,
                templateUrl: 'unknown/UnknownErrorPage.html'
            });
}

function initUnknownErrorPage(
    $rootScope: ng.IRootScopeService, 
    $state: ng.ui.IStateService, 
    pipErrorPageConfigService: IErrorPageConfigService
) {
    "ngInject";

    let config: ErrorPageConfigs = pipErrorPageConfigService.configs;

    if (!config.Unknown.Active) return;

    $rootScope.$on('pipUnknownError',
    (event: angular.IAngularEvent, params) => { 
        this.$state.go('errors_unknown', params);
    });
}

function setUnknownErrorPageResources($injector: angular.auto.IInjectorService) {
    let pipTranslate: any = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null) return;

    // Set translation strings for the module
    pipTranslate.translations('en', {
        'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
        'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
        'ERROR_UNKNOWN_CLOSE': 'Close',
        'ERROR_UNKNOWN_DETAILS': 'Details',
    });

    pipTranslate.translations('ru', {
        'ERROR_UNKNOWN_TITLE': 'Oops. Something went wrong',
        'ERROR_UNKNOWN_SUBTITLE': 'Unknown error occurred, but don\'t worry we already have been notified.',
        'ERROR_UNKNOWN_CLOSE': 'Close',
        'ERROR_UNKNOWN_DETAILS': 'Details',
    });
}

(() => {

    angular
        .module('pipErrors.Pages')
        .config(configureUnknownErrorPageRoute)
        .run(initUnknownErrorPage)
        .run(setUnknownErrorPageResources);

})();
