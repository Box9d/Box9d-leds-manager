import { IAction } from "../../../../actions/IAction";
import { Actions } from "./DevicesOverviewActions";
import { IDevicesOverviewState } from "./DevicesOverviewState";
import { DeviceScannerReducer } from "./scanning/DeviceScannerReducer";

export const DevicesOverviewReducer = (state: IDevicesOverviewState, action: IAction): IDevicesOverviewState => {
    let newState: IDevicesOverviewState = state;
    newState.DeviceScannerState = DeviceScannerReducer(state.DeviceScannerState, action);

    switch (action.type) {
        case Actions.SetShouldFetchProjectDevices:
            newState.ShouldFetchProjectDevices = action.value;
            break;

        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
