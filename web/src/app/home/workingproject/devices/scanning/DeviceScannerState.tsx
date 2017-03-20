import * as ApiClient from "../../../../../../../api/build/ApiClient";

export interface IDeviceScannerState {
    IsScanning: boolean;
    Devices: ApiClient.DiscoveredDevice[];
};

export class DeviceScannerState implements IDeviceScannerState {
    public IsScanning: boolean;
    public Devices: ApiClient.DiscoveredDevice[];

    constructor() {
        this.IsScanning = false;
        this.Devices = new Array<ApiClient.DiscoveredDevice>();
    }
}
