/**
 * @file Unknown error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

import {IErrorsService, ErrorsConfig, ErrorStateItem} from '../errors_pages/errors_service';

export class PipUnknownErrorDetails {
    code: number;
    message: string;
    status: string;
    server_stacktrace: Function;
    client_stacktrace: Function;
}

export class ErrorUnknownController {
    private _errorKey: string = 'Unknown';
    private pipNavService;

    public errorConfig: ErrorStateItem;
    public isCordova: boolean = false;
    public media;
    public error: PipUnknownErrorDetails;
    public error_details: PipUnknownErrorDetails;
    public showError: boolean;

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
        this.showError = $scope['showError'];
        this.appHeader();

        this.error = $state && $state.params && $state.params['error'] ?  $state.params['error'] : {};
        
        this.parseError();

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    private parseError() {
        this.error_details = new PipUnknownErrorDetails();
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

(() => {
    'use strict';

    var thisModule = angular.module('pipErrors.Unknown', []);

    thisModule.controller('pipErrorUnknownController', ErrorUnknownController);

})();
