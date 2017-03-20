import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./DeviceScannerActions";
import { IDeviceScannerState } from "./DeviceScannerState";

export const DeviceScannerReducer = (state: IDeviceScannerState, action: IAction): IDeviceScannerState => {
    let newState: IDeviceScannerState = state;

    switch (action.type) {
        // todo:
        case Actions.SetScanningStatus:
            newState.IsScanning = action.value;
            break;
        case Actions.AddDiscoveredDevice:
            newState.Devices.push(action.value);
            break;
        default: newState = state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
