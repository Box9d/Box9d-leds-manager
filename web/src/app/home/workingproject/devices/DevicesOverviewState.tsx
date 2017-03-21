import * as ApiClient from "../../../../../../api/build/ApiClient";
import * as DeviceScannerState from "./scanning/DeviceScannerState";

export interface IDevicesOverviewState {
    ProjectDevices: ApiClient.Device[];
    DeviceScannerState: DeviceScannerState.IDeviceScannerState;
};

export class DevicesOverviewState implements IDevicesOverviewState {
    public ProjectDevices: ApiClient.Device[];
    public DeviceScannerState: DeviceScannerState.IDeviceScannerState;

    constructor() {
        this.DeviceScannerState = new DeviceScannerState.DeviceScannerState();
        this.ProjectDevices = new Array<ApiClient.Device>();
    }
}
