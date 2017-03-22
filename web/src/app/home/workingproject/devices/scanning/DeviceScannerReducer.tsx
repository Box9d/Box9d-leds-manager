import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./DeviceScannerActions";
import { IDeviceScannerState } from "./DeviceScannerState";

export const DeviceScannerReducer = (state: IDeviceScannerState, action: IAction): IDeviceScannerState => {
    let newState: IDeviceScannerState = state;

    switch (action.type) {
        case Actions.SetScanningStatus:
            newState.IsScanning = action.value;
            break;
        case Actions.SetDiscoveredDevices:
            newState.Devices = action.value;
            break;
        default: newState = state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
