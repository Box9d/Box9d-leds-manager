import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import config from "../../../../../Config";
import * as MessageActions from "../../../../messages/MessageActions";
import { MessageType } from "../../../../messages/MessagingState";

export class Actions {
    public static SetDeviceConfiguration: string = "SET_DEVICE_CONFIGURATION";
    public static OpenModal = "OPEN_MAPPING_MODAL";
    public static CloseModal = "CLOSE_MAPPING_MODAL";
    public static SetMappingConfigured = "SET_MAPPING_CONFIGURED";
}

export const FetchDeviceConfiguration = (dispatch: any, deviceId: number, projectId: number): IAction => {
    let projectDeviceVersionClient = new ApiClient.ProjectDeviceVersionClient(config.apiUrl);
    projectDeviceVersionClient.getLatestProjectDeviceVersion(deviceId).then((response: ApiClient.GlobalJsonResultOfProjectDeviceVersion) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project devices: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch(SetDeviceConfiguration(response.result));
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

export const SetMappingConfigured = (): IAction => {
    return {
        type: Actions.SetMappingConfigured,
        value: name,
    };
};

const SetDeviceConfiguration = (config: ApiClient.ProjectDeviceVersion): IAction => {
    return {
        type: Actions.SetDeviceConfiguration,
        value: config,
    };
};
