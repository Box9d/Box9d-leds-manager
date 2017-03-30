import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import { Actions } from "./DeviceConfigurationActions";
import { IDeviceConfigurationState } from "./DeviceConfigurationState";

export const DeviceConfigurationReducer = (state: IDeviceConfigurationState, action: IAction): IDeviceConfigurationState => {
    let newState: IDeviceConfigurationState = state;
    newState.DeviceConfiguration = ProjectDeviceVersionReducer(state.DeviceConfiguration, action);

    switch (action.type) {
        case Actions.SetDeviceConfiguration:
            newState.DeviceConfiguration = action.value;
            break;
        case Actions.SetDeviceMappings:
            newState.PixelMappings = action.value;
            break;
        case Actions.DeterminePixelMappingsValidity:
            if (!pixelMappingsAreValid(state)) {
                newState.PixelMappings = new Array<ApiClient.ProjectDeviceVersionMapping>();
            }
            break;
        case Actions.OpenModal:
            newState.ModalIsOpen = true;
            break;
        case Actions.CloseModal:
            newState.ModalIsOpen = false;
            break;
        default: return state;
    }

    return (Object as any).assign({}, state, {}, { newState });
};

const ProjectDeviceVersionReducer = (state: ApiClient.ProjectDeviceVersion, action: IAction): ApiClient.ProjectDeviceVersion => {
    let newState: ApiClient.ProjectDeviceVersion = state;

    switch (action.type) {
        case Actions.ChangeHorizontalPixels:
            newState.numberOfHorizontalPixels = action.value;
            break;
        case Actions.ChangeVerticalPixels:
            newState.numberOfVerticalPixels = action.value;
            break;
        default: break;
    }

    return (Object as any).assign({}, state, {}, { newState });
};


const pixelMappingsAreValid = (state: IDeviceConfigurationState): boolean => {
    if (state.PixelMappings.length === 0) {
        return true;
    }

    let maxHorizontal = Math.max.apply(null, state.PixelMappings.map((m) => m.horizontalPosition));
    let maxVertical = Math.max.apply(null, state.PixelMappings.map((m) => m.verticalPosition));

    if (state.DeviceConfiguration.numberOfHorizontalPixels >= maxHorizontal
    && state.DeviceConfiguration.numberOfVerticalPixels >= maxVertical) {
        return true;
    }

    return false;
}
