import * as ApiClient from "../../../../../../api/build/ApiClient";
import * as DeviceConfigurationState from "./configuration/DeviceConfigurationState";
import * as DeviceScannerState from "./scanning/DeviceScannerState";

export interface IDevicesOverviewState {
    ProjectDevices: ApiClient.Device[];
    DeviceScannerState: DeviceScannerState.IDeviceScannerState;
    DeviceConfigurationState: DeviceConfigurationState.IDeviceConfigurationState;
};

export class DevicesOverviewState implements IDevicesOverviewState {
    public ProjectDevices: ApiClient.Device[];
    public DeviceScannerState: DeviceScannerState.IDeviceScannerState;
    public DeviceConfigurationState: DeviceConfigurationState.IDeviceConfigurationState;

    constructor() {
        this.DeviceScannerState = new DeviceScannerState.DeviceScannerState();
        this.ProjectDevices = new Array<ApiClient.Device>();
        this.DeviceConfigurationState = new DeviceConfigurationState.DeviceConfigurationState();
    }
}
