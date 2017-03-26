import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./DeviceConfigurationActions";
import { IDeviceConfigurationState } from "./DeviceConfigurationState";

export const DeviceConfigurationReducer = (state: IDeviceConfigurationState, action: IAction): IDeviceConfigurationState => {
    let newState: IDeviceConfigurationState = state;

    switch (action.type) {
        case Actions.SetDeviceConfiguration:
            newState.DeviceConfiguration = action.value;
            break;
        case Actions.OpenModal:
            newState.ModalIsOpen = true;
            break;
        case Actions.CloseModal:
            newState.ModalIsOpen = false;
            break;
        case Actions.SetMappingConfigured:
            newState.IsMappingConfigured = true;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};
