import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import { DeviceConfigurationReducer } from "./configuration/DeviceConfigurationReducer";
import { Actions } from "./DevicesOverviewActions";
import { IDevicesOverviewState, DeviceWithStatus } from "./DevicesOverviewState";
import { DeviceScannerReducer } from "./scanning/DeviceScannerReducer";

export const DevicesOverviewReducer = (state: IDevicesOverviewState, action: IAction): IDevicesOverviewState => {
    let newState: IDevicesOverviewState = state;
    newState.DeviceScannerState = DeviceScannerReducer(state.DeviceScannerState, action);
    newState.DeviceConfigurationState = DeviceConfigurationReducer(state.DeviceConfigurationState, action);

    switch (action.type) {
        case Actions.SetProjectDevices:
            newState.DevicesWithStatuses = new Array<DeviceWithStatus>();
            for (let device of action.value) {
                let deviceWithStatus = new DeviceWithStatus();
                deviceWithStatus.Device = device;
                newState.DevicesWithStatuses.push(deviceWithStatus);
            }
            break;
        case Actions.SetProjectDeviceStatus:
            // Why do I need to completely re-create this array?
            let oldDevices = state.DevicesWithStatuses;
            newState.DevicesWithStatuses = new Array<DeviceWithStatus>();
            for (let device of oldDevices) {
                newState.DevicesWithStatuses.push(device);
            }
            let targetDevice = newState.DevicesWithStatuses.find((d) => d.Device.id === +action.id).PlaybackStatus = action.value;
            break;
        case Actions.ResetProjectDeviceStatuses:
            let devices = state.DevicesWithStatuses;
            newState.DevicesWithStatuses = new Array<DeviceWithStatus>();

            for (let device of devices) {
                device.PlaybackStatus = ApiClient.ProjectDevicePlaybackStatus.NotReady;
                newState.DevicesWithStatuses.push(device);
            }
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
