import { IFormErrorsService } from './IFormErrorsService';

class FormErrorsService {

    constructor(private $rootScope: ng.IRootScopeService) { }

    public errorsWithHint(field: any) {
        if (field == null) return;

        return _.isEmpty(field.$error) ? { hint: true } : field.$error;
    };

    public touchedErrorsWithHint(form: ng.IFormController, field: any, notSubmited?: boolean) {
        if (form == null) return;
        if (field == null) return;

        if (form.$submitted && (field.$touched || field.$dirty) || notSubmited && (field.$touched || field.$dirty)) {
            let result = _.isEmpty(field.$error) ? { hint: true } : field.$error;
            return result;
        }
        return { hint: true };
    }

    public resetFormErrors(form: ng.IFormController, errors?: boolean): void {
        form.$setPristine();
        form.$setUntouched();

        if (errors) {
            form.$setDirty();
            form.$setSubmitted();
        }

        form['$serverError'] = {};
    }

    public resetFieldsErrors(form: ng.IFormController, field?: any): void {
        if (!form) return;
        if (field && form[field] && form[field].$error) {
            form[field].$error = {};
        } else {
            for (let prop in form) {
                if (form[prop] && form[prop].$error) {
                    form[prop].$error = {};
                }
            }
            if (form && form.$error) {
                form.$error = {};
            }
        }
    }

    public setFormError(form: ng.IFormController, error, errorFieldMap) {
        if (error == null) return;
        // Prepare form server errors
        form['$serverError'] = form['$serverError'] || {};
        // Prepare error code
        let code: string = error.code || (error.data || {}).code || null;
        if (!code && error.status) code = error.status;

        if (code) {
            let errorName = 'ERROR_' + code,
                field = errorFieldMap ? errorFieldMap[code] : null;
            // Set server error to fields
            if (field && form[field] && form[field].$setValidity) {
                form[field].$setValidity(errorName, false);
                return;
            }

            // Set server error to form
            if (field == 'form') {
                form['$serverError'][errorName] = true;
                return;
            }
        }

        // if undefined error for this form or code === undefined/null, go to unhandled error page
        if (error.data && error.data.message) {
            form['$serverError']['ERROR_UNKNOWN'] = error.data.message;
            this.goToUnhandledErrorPage(error);
            return;
        }

        // Set as undefined error
        if (error.message) {
            form['$serverError']['ERROR_UNKNOWN'] = error.message;
            this.goToUnhandledErrorPage(error);
            return;
        }

        if (error.name) {
            form['$serverError']['ERROR_UNKNOWN'] = error.name;
            this.goToUnhandledErrorPage(error);
            return;
        }


        form['$serverError']['ERROR_UNKNOWN'] = error;
        this.goToUnhandledErrorPage(error);
    }

    private goToUnhandledErrorPage(error) {
        this.$rootScope.$emit('pipUnhandledInternalError', {
            error: error
        });
    }
}

(() => {

    angular
        .module('pipFormErrors', [])
        .service('pipFormErrors', FormErrorsService);

})();