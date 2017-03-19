
import { IErrorsService } from '../errors_pages/IErrorsService';
import { ErrorsConfig, ErrorStateItem } from '../errors_pages/ErrorPagesConfig';

export class PipNoConnectionError {
    config?: any;
}

export class ErrorNoConnectionController {
    private _errorKey: string = 'NoConnection';
    private pipNavService;

    public errorConfig: ErrorStateItem;
    public isCordova: boolean = false;
    public media;
    public error: PipNoConnectionError;

    constructor(
        private $window: ng.IWindowService,
        $scope: ng.IScope,
        $state: ng.ui.IStateService, 
        $rootScope: ng.IRootScopeService,
        $mdMedia: angular.material.IMedia, 
        $injector: angular.auto.IInjectorService, 
        pipErrorsService: IErrorsService) {

        let pipMedia = $injector.has('pipMedia') ? $injector.get('pipMedia') : null;
        this.errorConfig = pipErrorsService.getErrorItemByKey(this._errorKey);
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

    public onRetry() {
        this.$window.history.back();
    }
}

(() => {

    angular.module('pipErrors.NoConnection', [])
        .controller('pipErrorNoConnectionController',  ErrorNoConnectionController);


})();
