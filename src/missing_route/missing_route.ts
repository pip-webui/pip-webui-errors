/**
 * @file Missing route error controller
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

import {IErrorsService, ErrorsConfig, ErrorStateItem} from '../errors_pages/errors_service';

class PipMissingRouteErrorState {
   to: string;
   toParams: any;
   fromParams: any;
}

class ErrorMissingRouteController {
    private _errorKey: string = 'MissingRoute';
    private pipNavService;

    public errorConfig: ErrorStateItem;
    public isCordova: boolean = false;
    public media;
    public fromState: PipMissingRouteErrorState;
    public unfoundState: PipMissingRouteErrorState;
    public url: string;
    public urlBack: string;

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

        this.fromState = $state && $state.params && $state.params['fromState'] ?  $state.params['fromState'] : {};
        this.unfoundState = $state && $state.params ?  $state.params['unfoundState'] : {};
        this.url = this.unfoundState && this.unfoundState.to ? $state.href(this.unfoundState.to, this.unfoundState.toParams, {absolute: true}) : '';
        this.urlBack = this.fromState && this.fromState.to ? $state.href(this.fromState.to, this.fromState.fromParams, {absolute: true}) : '';

    }

    private appHeader(): void {
        if (!this.pipNavService) return;

        this.pipNavService.appbar.addShadow();
        this.pipNavService.icon.showMenu();
        this.pipNavService.breadcrumb.text = this.errorConfig.Breadcrumb;
        this.pipNavService.actions.hide();
    }

    public  onContinue() {
            // Todo: Go to default state '/'
            //pipAuthState.goToAuthorized();
    };
}


(() => {
    'use strict';

    var thisModule = angular.module('pipErrors.MissingRoute', []);

    thisModule.controller('pipErrorMissingRouteController', ErrorMissingRouteController);

})();
