import { IErrorPageConfigService, IErrorPageConfigProvider } from './IErrorPageConfigService';
import { ErrorPageConfigs, ErrorPageConfig } from './ErrorPageConfig';

class ErrorPageConfigService implements IErrorPageConfigService {
    private _config: ErrorPageConfigs;

    public constructor(
        config: ErrorPageConfigs
    ) {
        "ngInject";

        this._config = config || new ErrorPageConfigs();
    }

    public get configs(): ErrorPageConfigs {
        return this._config;
    }

    public getErrorPageConfig(pageName: string): ErrorPageConfig {
        if (!pageName || !this._config[pageName]) {
            return null;
        }

        return this._config[pageName];
    }

}

class ErrorPageConfigProvider implements IErrorPageConfigProvider {
    private _service: ErrorPageConfigService;
    public configs: ErrorPageConfigs;

    constructor() {
        this.configs = new ErrorPageConfigs();
    }

    public setErrorPageConfig(pageName: string, config: ErrorPageConfig): void {
        if (!pageName || !config) return;
        if (!this.configs[pageName]) return;

        this.configs[pageName] = <ErrorPageConfig>_.defaultsDeep(config, this.configs[pageName]);
    }

    public setAllErrorPageConfigs(configs: ErrorPageConfigs): void {
        if (!configs) return;

        this.configs = <ErrorPageConfigs>_.defaultsDeep(configs, this.configs);
    }

    public $get(): ErrorPageConfigService {
        "ngInject";

        if (this._service == null) {
            this._service = new ErrorPageConfigService(this.configs);
        }

        return this._service;
    }
}

(() => {
    angular
        .module('pipErrorPageConfigService', [])
        .provider('pipErrorPageConfigService', ErrorPageConfigProvider);

})();
