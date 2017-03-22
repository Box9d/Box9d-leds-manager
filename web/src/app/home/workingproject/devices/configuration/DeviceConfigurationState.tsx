import * as ApiClient from "../../../../../../../api/build/ApiClient";

export interface IDeviceConfigurationState {
    DeviceConfiguration: ApiClient.ProjectDeviceVersion;
};

export class DeviceConfigurationState implements IDeviceConfigurationState {
    public DeviceConfiguration: ApiClient.ProjectDeviceVersion;

    constructor() {
        this.DeviceConfiguration = new ApiClient.ProjectDeviceVersion();
    }
}
