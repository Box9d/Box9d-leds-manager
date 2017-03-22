import * as ApiClient from "../../../../../../../api/build/ApiClient";
import { IAction } from "../../../../../actions/IAction";
import config from "../../../../../Config";
import * as MessageActions from "../../../../messages/MessageActions";
import { MessageType } from "../../../../messages/MessagingState";

export class Actions {
    public static SetDeviceConfiguration: string = "SET_DEVICE_CONFIGURATION";
}

export const FetchDeviceConfiguration = (dispatch: any, deviceId: number, projectId: number): IAction => {
    let projectDeviceVersionClient = new ApiClient.ProjectDeviceVersionClient(config.apiUrl);
    projectDeviceVersionClient.getLatestProjectDeviceVersion(deviceId, projectId).then((response: ApiClient.GlobalJsonResultOfProjectDeviceVersion) => {
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

const SetDeviceConfiguration = (config: ApiClient.ProjectDeviceVersion): IAction => {
    return {
        type: Actions.SetDeviceConfiguration,
        value: config,
    };
};
