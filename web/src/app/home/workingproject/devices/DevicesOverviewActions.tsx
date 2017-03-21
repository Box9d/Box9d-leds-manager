import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

export class Actions {
    public static SetProjectDevices: string = "SET_PROJECT_DEVICES";
}

export const FetchProjectDevices = (dispatch: any, projectId: number): IAction => {

    let apiClient = new ApiClient.DeviceClient(config.apiUrl);
    apiClient.getProjectDevices(projectId).then((response: ApiClient.GlobalJsonResultOfIEnumerableOfDevice) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project devices: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({type: Actions.SetProjectDevices, value: response.result});
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const RemoveDeviceFromProject = (dispatch: any, deviceId: number, projectId: number): IAction => {
    let apiClient = new ApiClient.DeviceClient(config.apiUrl);
    apiClient.removeDeviceFromProject(deviceId, projectId).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not remove device from project: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Project device removed", MessageType.Info));
            dispatch(FetchProjectDevices(dispatch, projectId));
        }
    });

    return {
        type: "DO_NOTHING",
    };
};
