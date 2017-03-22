import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./DeviceConfigurationActions";
import { IDeviceConfigurationState } from "./DeviceConfigurationState";

export const DeviceConfigurationReducer = (state: IDeviceConfigurationState, action: IAction): IDeviceConfigurationState => {
    let newState: IDeviceConfigurationState = state;

    switch (action.type) {
        case Actions.SetDeviceConfiguration:
            state.DeviceConfiguration = action.value;
        default: newState = state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
