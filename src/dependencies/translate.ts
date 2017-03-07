/**
 * @file Optional filter to translate string resources
 * @copyright Digital Living Software Corp. 2014-2016
 */
 
/* global angular */

(() => {
    'use strict';

    function filterTranslate($injector: angular.auto.IInjectorService) {
        let pipTranslate: any = $injector.has('pipTranslate') 
            ? $injector.get('pipTranslate') : null;

        return (key) => {
            return pipTranslate  ? pipTranslate.translate(key) || key : key;
        }
    }

    var thisModule = angular.module('pipErrors.Translate', []);

    thisModule.filter('translate', filterTranslate);

})();
