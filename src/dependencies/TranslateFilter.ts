(() => {

    function filterTranslate($injector: angular.auto.IInjectorService) {
        let pipTranslate: any = $injector.has('pipTranslate')
            ? $injector.get('pipTranslate') : null;

        return (key) => {
            return pipTranslate ? pipTranslate.translate(key) || key : key;
        }
    }

    angular.module('pipErrors.Translate', [])
        .filter('translate', filterTranslate);

})();
