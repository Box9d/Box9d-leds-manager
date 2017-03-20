import * as DeviceScannerState from "./scanning/DeviceScannerState";

export interface IDevicesOverviewState {
    DeviceScannerState: DeviceScannerState.IDeviceScannerState;
};

export class DevicesOverviewState implements IDevicesOverviewState {
    public DeviceScannerState: DeviceScannerState.IDeviceScannerState;

    constructor() {
        this.DeviceScannerState = new DeviceScannerState.DeviceScannerState();
    }
}
