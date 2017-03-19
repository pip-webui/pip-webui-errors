(() => {

    angular.module('pipErrors', [
        'pipErrors.Pages',
        'pipErrorsService',
        'pipNoConnectionPanel',
        'pipClearErrors',
	    'pipFormErrors'

    ]);
    
})();