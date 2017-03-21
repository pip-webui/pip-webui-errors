
import { ErrorPageConfigs, ErrorPageConfig, SupportedBrowsers } from './ErrorPageConfig';

export interface IErrorPageConfigService {
    getErrorPageConfig(pageName: string): ErrorPageConfig;
    configs: ErrorPageConfigs;
}

export interface IErrorPageConfigProvider extends ng.IServiceProvider {
    setErrorPageConfig(pageName: string, config: ErrorPageConfig): void;
    setAllErrorPageConfigs(configs: ErrorPageConfigs): void;
    setSupportedBrowsers(browsers: SupportedBrowsers): void;
    configs: ErrorPageConfigs;
}