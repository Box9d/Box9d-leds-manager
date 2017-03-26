import * as ApiClient from "../../../../../../../api/build/ApiClient";

export interface IDeviceConfigurationState {
    DeviceConfiguration: ApiClient.ProjectDeviceVersion;
    ModalIsOpen: boolean;
    IsMappingConfigured: boolean;
};

export class DeviceConfigurationState implements IDeviceConfigurationState {
    public DeviceConfiguration: ApiClient.ProjectDeviceVersion;
    public ModalIsOpen: boolean;
    public IsMappingConfigured: boolean;

    constructor() {
        this.DeviceConfiguration = new ApiClient.ProjectDeviceVersion();
        this.ModalIsOpen = false;
        this.IsMappingConfigured = false;
    }
}
