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
                newState.DevicesWithStatuses.push(deviceWithStatus)
            }
            break;
        case Actions.SetProjectDeviceStatus:
            newState.DevicesWithStatuses.find((d) => d.Device.id === +action.id).PlaybackStatus = action.value;
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
