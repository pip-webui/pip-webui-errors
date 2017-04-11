export interface IFormErrorsService {
    errorsWithHint(field: any);
    touchedErrorsWithHint(form: ng.IFormController, field: any);
    resetFormErrors(form: ng.IFormController, errors?: boolean): void;
    resetFieldsErrors(form: ng.IFormController, field: any): void;
    setFormError(form: ng.IFormController, error, errorFieldMap): void;
    goToUnhandledErrorPage(error);
}