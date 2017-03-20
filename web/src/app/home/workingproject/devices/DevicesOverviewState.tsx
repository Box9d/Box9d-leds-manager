import * as ApiClient from "../../../../../../api/build/ApiClient";
import * as DeviceScannerState from "./scanning/DeviceScannerState";

export interface IDevicesOverviewState {
    ShouldFetchProjectDevices: boolean;
    ProjectDevices: ApiClient.ProjectDevice[];
    DeviceScannerState: DeviceScannerState.IDeviceScannerState;
};

export class DevicesOverviewState implements IDevicesOverviewState {
    public ShouldFetchProjectDevices: boolean;
    public ProjectDevices: ApiClient.ProjectDevice[];
    public DeviceScannerState: DeviceScannerState.IDeviceScannerState;

    constructor() {
        this.ShouldFetchProjectDevices = true;
        this.ProjectDevices = new Array<ApiClient.ProjectDevice>();
        this.DeviceScannerState = new DeviceScannerState.DeviceScannerState();
    }
}
