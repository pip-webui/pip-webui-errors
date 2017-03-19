
export class PipMaintenanceError {
    config?: PipMaintenanceErrorConfig;
}
export class PipMaintenanceErrorConfig {
    params?: PipMaintenanceErrorParams;
}
export class PipMaintenanceErrorParams {
    interval?: number = 0;
}