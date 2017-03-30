import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import config from "../../../../../Config";
import * as MessageActions from "../../../../messages/MessageActions";
import { MessageType } from "../../../../messages/MessagingState";

export class Actions {
    public static SetDeviceConfiguration: string = "SET_DEVICE_CONFIGURATION";
    public static SetDeviceMappings: string = "SET_DEVICE_PIXEL_MAPPINGS";
    public static DeterminePixelMappingsValidity: string = "DETERMINE_PIXEL_MAPPINGS_VALIDITY";
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
                dispatch(FetchDevicePixelMappings(dispatch, response.result.id));
            }
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

const FetchDevicePixelMappings = (dispatch: any, projectDeviceVersionId: number): IAction => {
    let projectDeviceVersionClient = new ApiClient.ProjectDeviceMappingClient(config.apiUrl);
    projectDeviceVersionClient.getProjectDeviceMappings(projectDeviceVersionId).then((response: ApiClient.GlobalJsonResultOfIEnumerableOfProjectDeviceVersionMapping) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device mappings: " + response.errorMessage, MessageType.Error));
        } else {
            if (response.result) {
                dispatch(SetDevicePixelMappings(response.result));
            }
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const ClearDeviceConfiguration = (dispatch: any): IAction => {

    dispatch(ClearDevicePixelMappings());

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

export const ClearDevicePixelMappings = (): IAction => {
    return {
        type: Actions.SetDeviceMappings,
        value: new Array<ApiClient.ProjectDeviceVersionMapping>(),
    };
};

export const DeterminePixelMappingsValidity = (): IAction => {
    return {
        type: Actions.DeterminePixelMappingsValidity,
    };
};

const SetDeviceConfiguration = (config: ApiClient.ProjectDeviceVersion): IAction => {
    return {
        type: Actions.SetDeviceConfiguration,
        value: config,
    };
};
