
import { IErrorPageConfigService } from '../configure/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../configure/ErrorPageConfig';

export class UnsupportedError {
    config?: any;
}

export class UnsupportedErrorPageController {
    private _pageName: string = 'Unsupported';
    private pipNavService;

    public errorConfig: ErrorPageConfig;
    public isCordova: boolean = false;
    public media;
    public error: UnsupportedError;

    constructor(
        $scope: ng.IScope,
        $state: ng.ui.IStateService, 
        $rootScope: ng.IRootScopeService,
        $mdMedia: angular.material.IMedia, 
        $injector: angular.auto.IInjectorService, 
        pipErrorsService: IErrorPageConfigService
    ) {
        "ngInject";

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorPageConfig(this._pageName);
        this.pipNavService = $injector.has('pipNavService') ? $injector.get('pipNavService') : null;

        this.media = pipMedia ? pipMedia : $mdMedia;

        $rootScope['$routing'] = false;
        this.appHeader();

        this.error = $state && $state.params && $state.params['error'] ?  $state.params['error'] : {};

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    }
}

function configureUnsupportedErrorPageRoute(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
            .state('errors_unsupported', {
                url: '/errors/unsupported',
                params: {
                    error: null
                },
                controllerAs: '$ctrl',
                controller: UnsupportedErrorPageController,
                templateUrl: 'unsupported/UnsupportedErrorPage.html'
            });
}

function initUnsupportedErrorPage(
    $rootScope: ng.IRootScopeService, 
    $state: ng.ui.IStateService, 
    $injector: angular.auto.IInjectorService, 
    pipErrorPageConfigService: IErrorPageConfigService) {
    "ngInject";

    let config: ErrorPageConfigs = pipErrorPageConfigService.configs;

    if (!config.Unsupported.Active) return;

    let pipSystemInfo: any = this.$injector.has('pipSystemInfo') ? this.$injector.get('pipSystemInfo') : null;
    if (!pipSystemInfo) { return; }

    // Todo: Make it configurable
    let supportedVersions = {
        edge: 11,
        ie: 11,
        firefox: 43, //4, for testing
        opera: 35,
        chrome: 47
    };

    let browser: string = pipSystemInfo.browserName;
    let version: string = pipSystemInfo.browserVersion;
    version = version.split(".")[0]

    if (browser 
        && supportedVersions[browser] 
        && version >= supportedVersions[browser]) {
        return;
    }
            // if not supported
    this.$state.go('errors_unsupported');
}

function setUnsupportedErrorPageResources($injector: angular.auto.IInjectorService) {
    let pipTranslate: any = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null) return;

    // Set translation strings for the module
    pipTranslate.translations('en', {
        'ERROR_UNSUPPORTED_TITLE': 'This browser is not supported',
        'ERROR_UNSUPPORTED_SUBTITLE': 'Our application using the latest technology. This makes the application faster ' +
        'and easier to use. Unfortunately, your browser doesn\'t support those ' +
        'technologies. Download one of these great browsers and you\'ll be on your way:',
        'ERROR_UNSUPPORTED_O': 'Opera',
        'ERROR_UNSUPPORTED_O_VER': 'Version 36+',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Version 11+',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Version 48+',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Version 45+'

    });

    pipTranslate.translations('ru', {
        'ERROR_UNSUPPORTED_TITLE': 'This browser is not supported',
        'ERROR_UNSUPPORTED_SUBTITLE': 'Our application using the latest technology. This makes the application faster ' +
        'and easier to use. Unfortunately, your browser doesn\'t support those ' +
        'technologies. Download one of these great browsers and you\'ll be on your way:',
        'ERROR_UNSUPPORTED_O': 'Opera',
        'ERROR_UNSUPPORTED_O_VER': 'Version 35+',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Version 11+',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Version 47+',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Version 43+'

    });
}

(() => {
    angular
        .module('pipErrors.Unsupported', [])
        .config(configureUnsupportedErrorPageRoute)
        .run(initUnsupportedErrorPage)
        .run(setUnsupportedErrorPageResources);
})();
