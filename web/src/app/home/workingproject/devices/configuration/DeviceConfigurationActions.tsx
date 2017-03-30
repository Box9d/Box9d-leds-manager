import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import config from "../../../../../Config";
import * as MessageActions from "../../../../messages/MessageActions";
import { MessageType } from "../../../../messages/MessagingState";

export class Actions {
    public static SetDeviceConfiguration: string = "SET_DEVICE_CONFIGURATION";
    public static SetDeviceMappings: string = "SET_DEVICE_PIXEL_MAPPINGS";
    public static OpenModal = "OPEN_MAPPING_MODAL";
    public static CloseModal = "CLOSE_MAPPING_MODAL";
    public static ChangeHorizontalPixels = "CHANGE_HORIZONTAL_PIXELS";
    public static ChangeVerticalPixels = "CHANGE_VERTICAL_PIXELS";
}

export const FetchDeviceConfiguration = (dispatch: any, deviceId: number, projectId: number): IAction => {
    let projectDeviceVersionClient = new ApiClient.ProjectDeviceVersionClient(config.apiUrl);
    projectDeviceVersionClient.getLatestProjectDeviceVersion(deviceId, projectId).then((response: ApiClient.GlobalJsonResultOfProjectDeviceVersion) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project devices: " + response.errorMessage, MessageType.Error));
        } else {
            if (response.result) {
                dispatch(SetDeviceConfiguration(response.result));
            }
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const ClearDeviceConfiguration = (): IAction => {
    return {
        type: Actions.SetDeviceConfiguration,
        value: new ApiClient.ProjectDeviceVersion(),
    };
};

export const OpenModal = (): IAction => {
    return {
        type: Actions.OpenModal,
        value: name,
    };
};

export const CloseModal = (): IAction => {
    return {
        type: Actions.CloseModal,
        value: name,
    };
};
export const ChangeHorizontalPixels = (number: number): IAction => {
    return {
        type: Actions.ChangeHorizontalPixels,
        value: number,
    };
};

export const ChangeVerticalPixels = (number: number): IAction => {
    return {
        type: Actions.ChangeVerticalPixels,
        value: number,
    };
};

export const SetDevicePixelMappings = (mappings: ApiClient.ProjectDeviceVersionMapping[]): IAction => {
    return {
        type: Actions.SetDeviceMappings,
        value: mappings,
    };
};

const SetDeviceConfiguration = (config: ApiClient.ProjectDeviceVersion): IAction => {
    return {
        type: Actions.SetDeviceConfiguration,
        value: config,
    };
};