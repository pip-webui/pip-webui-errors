import { IErrorsService, IErrorsProvider } from './IErrorsService';
import { ErrorsConfig, ErrorStateItem } from './ErrorPagesConfig';

class ErrorsService implements IErrorsService {
    private _config: ErrorsConfig;

    public constructor(
        config: ErrorsConfig
    ) {
        "ngInject";

        this._config = config || new ErrorsConfig();
    }

    public get config(): ErrorsConfig {
        console.log(this._config);
        return this._config;
    }

    public getErrorItemByKey(errorName: string): ErrorStateItem {
        if (!errorName || !this._config[errorName]) {
            return null;
        }

        return this._config[errorName];
    }

}

class ErrorsProvider implements IErrorsProvider {
    private _service: ErrorsService;
    public config: ErrorsConfig;

    constructor() {
        this.config = new ErrorsConfig();
    }

    public configureErrorByKey(errorName: string, errorParams: ErrorStateItem): void {
        if (!errorName || !errorParams) return;
        if (!this.config[errorName]) return;

        this.config[errorName] = <ErrorStateItem>_.defaultsDeep(errorParams, this.config[errorName]);
    }

    public configureErrors(value: ErrorsConfig): void {
        if (!value) return;

        this.config = <ErrorsConfig>_.defaultsDeep(value, this.config);
    }

    public $get(): ErrorsService {
        "ngInject";

        if (this._service == null) {
            this._service = new ErrorsService(this.config);
        }

        return this._service;
    }
}

(() => {
    angular
        .module('pipErrorsService', [])
        .provider('pipErrorsService', ErrorsProvider);

})();
