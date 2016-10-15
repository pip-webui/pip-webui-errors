/**
 * @file Registration of all error handling components
 * @copyright Digital Living Software Corp. 2014-2016
 */

/* global angular */

(function () {
    'use strict';

    angular.module('pipErrors', [
        'pipErrors.Pages',
        'pipNoConnectionPanel',
        'pipClearErrors',
	    'pipFormErrors'
    ]);
    
})();