import { IAction } from "../../../../actions/IAction";
import { IDevicesOverviewState } from "./DevicesOverviewState";
import { DeviceScannerReducer } from "./scanning/DeviceScannerReducer";

export const DevicesOverviewReducer = (state: IDevicesOverviewState, action: IAction): IDevicesOverviewState => {
    let newState: IDevicesOverviewState = state;
    newState.DeviceScannerState = DeviceScannerReducer(state.DeviceScannerState, action);

    return (Object as any).assign({}, state, {}, { newState });
};
