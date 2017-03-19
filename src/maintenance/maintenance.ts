
import { IErrorsService } from '../errors_pages/IErrorsService';
import { ErrorsConfig, ErrorStateItem } from '../errors_pages/ErrorPagesConfig';
import { PipMaintenanceError } from './MaintenanceConfig';

class ErrorMaintenanceController {
    private _errorKey: string = 'Maintenance';
    private pipNavService;

    public errorConfig: ErrorStateItem;
    public isCordova: boolean = false;
    public media;
    public error: PipMaintenanceError;
    public timeoutInterval: number;

    constructor(
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

        this.error = $state && $state.params && $state.params['error'] ? $state.params['error'] : {};
        this.timeoutInterval = this.error && this.error.config &&
            this.error.config.params && this.error.config.params.interval ? this.error.config.params.interval : 0;

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    }
}


(() => {

    angular.module('pipErrors.Maintenance', [])
    .controller('PipErrorMaintenanceController', ErrorMaintenanceController);

})();
