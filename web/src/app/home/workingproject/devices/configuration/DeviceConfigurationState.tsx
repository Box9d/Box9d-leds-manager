import * as ApiClient from "../../../../../../../api/build/ApiClient";

export interface IDeviceConfigurationState {
    DeviceConfiguration: ApiClient.ProjectDeviceVersion;
    ModalIsOpen: boolean;
    PixelMappings: ApiClient.ProjectDeviceVersionMapping[];
};

export class DeviceConfigurationState implements IDeviceConfigurationState {
    public DeviceConfiguration: ApiClient.ProjectDeviceVersion;
    public PixelMappings: ApiClient.ProjectDeviceVersionMapping[];
    public ModalIsOpen: boolean;

    constructor() {
        this.DeviceConfiguration = new ApiClient.ProjectDeviceVersion();
        this.PixelMappings = new Array<ApiClient.ProjectDeviceVersionMapping>();
        this.ModalIsOpen = false;
    }
}
