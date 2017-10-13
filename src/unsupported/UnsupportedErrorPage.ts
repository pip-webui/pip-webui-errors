export let ErrorsUnsupportedState = 'errors_unsupported';
export let ErrorsUnsupportedEvent = 'pipUnsupportedError';

import { IErrorPageConfigService } from '../error_pages/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../error_pages/ErrorPageConfig';

class UnsupportedError {
    config?: any;
}

class UnsupportedErrorPageController {
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
}

function configureUnsupportedErrorPageRoute(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";

    $stateProvider
        .state(ErrorsUnsupportedState, {
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

    let pipSystemInfo: any = $injector.has('pipSystemInfo') ? $injector.get('pipSystemInfo') : null;
    if (!pipSystemInfo) { return; }

    let supportedVersions = config.Unsupported.Params.supported;

    let browser: string = pipSystemInfo.browserName;
    let version: string = pipSystemInfo.browserVersion;
    version = version.split(".")[0]

    if (browser
        && supportedVersions[browser]
        && version >= supportedVersions[browser]) {
        return;
    }
    // if not supported
    $state.go(ErrorsUnsupportedState);
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
        'ERROR_UNSUPPORTED_O_VER': 'Version',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Version',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Version',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Version'

    });

    pipTranslate.translations('ru', {
        'ERROR_UNSUPPORTED_TITLE': 'Этот браузер не поддерживается. ',
        'ERROR_UNSUPPORTED_SUBTITLE': 'Наше приложение использует новейшие технологии. Это делает приложение более быстрым ' +
        'и простым в использовании. К сожалению, ваш браузер не поддерживает эти технологии. ' +
        'Загрузите один из этих великолепных браузеров, и вы будете в пути:',
        'ERROR_UNSUPPORTED_O': 'Opera',
        'ERROR_UNSUPPORTED_O_VER': 'Версия',
        'ERROR_UNSUPPORTED_IE': 'Internet Explorer',
        'ERROR_UNSUPPORTED_IE_VER': 'Версия',
        'ERROR_UNSUPPORTED_GC': 'Google Chrome',
        'ERROR_UNSUPPORTED_GC_VER': 'Версия',
        'ERROR_UNSUPPORTED_FM': 'Mozilla Firefox',
        'ERROR_UNSUPPORTED_FM_VER': 'Версия'

    });
}

(() => {
    angular
        .module('pipErrors.Pages')
        .config(configureUnsupportedErrorPageRoute)
        .run(initUnsupportedErrorPage)
        .run(setUnsupportedErrorPageResources);
})();
