import { IErrorPageConfigService } from '../error_pages/IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from '../error_pages/ErrorPageConfig';

class MissingRouteErrorState {
    to: string;
    toParams: any;
    fromParams: any;
}

class MissingRouteErrorPageController {
    private _pageName: string = 'MissingRoute';
    private pipNavService;

    public config: ErrorPageConfig;
    public isCordova: boolean = false;
    public media;
    public fromState: MissingRouteErrorState;
    public unfoundState: MissingRouteErrorState;
    public url: string;
    public urlBack: string;

    constructor(
        $scope: ng.IScope,
        private $location: ng.ILocationService,
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
        this.appHeader();

        this.fromState = $state && $state.params && $state.params['fromState'] ? $state.params['fromState'] : {};
        this.unfoundState = $state && $state.params ? $state.params['unfoundState'] : {};
        this.url = this.unfoundState && this.unfoundState.to ? $state.href(this.unfoundState.to, this.unfoundState.toParams, { absolute: true }) : '';
        this.urlBack = this.fromState && this.fromState.to ? $state.href(this.fromState.to, this.fromState.fromParams, { absolute: true }) : '';

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.config.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    public onContinue() {
        this.$location.url('/');
    }
}

function configureMissingRouteErrorPageRoute(
    $stateProvider: ng.ui.IStateProvider
) {
    "ngInject";
    $stateProvider
        .state('errors_missing_route', {
            url: '/errors/missing_route',
            params: {
                unfoundState: null,
                fromState: null
            },
            controller: MissingRouteErrorPageController,
            controllerAs: '$ctrl',
            templateUrl: 'missing_route/MissingRouteErrorPage.html'
        });
}


function initMissingRouteErrorPage(
    $rootScope: ng.IRootScopeService,
    $state: ng.ui.IStateService,
    $injector: angular.auto.IInjectorService,
    pipErrorPageConfigService: IErrorPageConfigService
) {
    "ngInject";

    let config: ErrorPageConfigs = pipErrorPageConfigService.configs;

    if (!config.MissingRoute.Active) return;

    $rootScope.$on('$stateNotFound',
        (
            event: angular.IAngularEvent,
            unfoundState: ng.ui.IState,
            fromState: ng.ui.IState,
            fromParams: any) => {
            event.preventDefault();

            $state.go('errors_missing_route', {
                unfoundState: unfoundState,
                fromState: {
                    to: fromState ? fromState.name : '',
                    fromParams: fromParams
                }
            }
            );
            $rootScope['$routing'] = false;
        }
    );
}

function setMissingRouteErrorPageResources($injector: angular.auto.IInjectorService) {
    let pipTranslate: any = $injector.has('pipTranslate') ? $injector.get('pipTranslate') : null;
    if (pipTranslate == null) return;

    // Set translation strings for the module
    pipTranslate.translations('en', {
        'ERROR_MISSING_ROUTE_TITLE': 'Sorry, the page isn\'t available',
        'ERROR_MISSING_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
        'ERROR_MISSING_ROUTE_CONTINUE': 'Continue',
        'ERROR_MISSING_ROUTE_TRY_AGAIN': 'Try again',
        'ERROR_MISSING_ROUTE_GO_BACK': 'Go Back',
        'ERROR_MISSING_ROUTE_PAGE_TITLE': 'Wrong page'
    });

    pipTranslate.translations('ru', {
        'ERROR_MISSING_ROUTE_TITLE': 'Sorry, the page isn\'t available',
        'ERROR_MISSING_ROUTE_SUBTITLE': 'The link you followed may be broken, or the page may have been removed.',
        'ERROR_MISSING_ROUTE_CONTINUE': 'Continue',
        'ERROR_MISSING_ROUTE_TRY_AGAIN': 'Try again',
        'ERROR_MISSING_ROUTE_GO_BACK': 'Go Back',
        'ERROR_MISSING_ROUTE_PAGE_TITLE': 'Wrong page'
    });
}

(() => {

    angular
        .module('pipErrors.Pages')
        .config(configureMissingRouteErrorPageRoute)
        .run(initMissingRouteErrorPage)
        .run(setMissingRouteErrorPageResources);

})();
