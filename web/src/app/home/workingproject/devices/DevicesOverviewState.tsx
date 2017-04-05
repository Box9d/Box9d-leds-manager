import * as ApiClient from "../../../../../../api/build/ApiClient";
import * as DeviceConfigurationState from "./configuration/DeviceConfigurationState";
import * as DeviceScannerState from "./scanning/DeviceScannerState";

export interface IDevicesOverviewState {
    DevicesWithStatuses: DeviceWithStatus[];
    DeviceScannerState: DeviceScannerState.IDeviceScannerState;
    DeviceConfigurationState: DeviceConfigurationState.IDeviceConfigurationState;
};

export class DevicesOverviewState implements IDevicesOverviewState {
    public DevicesWithStatuses: DeviceWithStatus[];
    public DeviceScannerState: DeviceScannerState.IDeviceScannerState;
    public DeviceConfigurationState: DeviceConfigurationState.IDeviceConfigurationState;

    constructor() {
        this.DeviceScannerState = new DeviceScannerState.DeviceScannerState();
        this.DevicesWithStatuses = new Array<DeviceWithStatus>();
        this.DeviceConfigurationState = new DeviceConfigurationState.DeviceConfigurationState();
    }
}

export class DeviceWithStatus {
    public Device: ApiClient.Device;
    public PlaybackStatus: ApiClient.ProjectDevicePlaybackStatus;
}
