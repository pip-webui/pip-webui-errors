class ClearErrorsLink {
    private _fieldController: any;
    private _formController: any;

    constructor(
        $scope: ng.IScope,
        $element: ng.IRootElementService,
        $attrs: ng.IAttributes,
        $ctrls
    ) {
        this._fieldController = $ctrls[0];
        this._formController = $ctrls[1];

        $scope.$watch($attrs['ngModel'], (newValue) => {
            this.clearFieldErrors();
            this.clearFormErrors();
        });
    }

    private clearFieldErrors() {
        let errors = this._fieldController.$error;

        for (let prop in errors) {
            if (errors.hasOwnProperty(prop) && prop.substring(0, 6) == 'ERROR_') {
                this._fieldController.$setValidity(prop, true);
            }
        }
    }

    private clearFormErrors() {
        this._formController.$serverError = {};
    }
}

(() => {
    function clearErrorsDirective() {
        return {
            restrict: 'A',
            require: ['ngModel', '^?form'],
            link: ClearErrorsLink
        };
    }

    angular
        .module('pipClearErrors', [])
        .directive('pipClearErrors', clearErrorsDirective);
})();