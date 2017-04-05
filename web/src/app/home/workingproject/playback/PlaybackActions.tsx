import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";
import * as DevicesOverviewActions from "../devices/DevicesOverviewActions";

export class Actions {
    public static SetPlaying: string = "SET_PLAYING";
}

export const FetchProjectDevicePlaybackStatus = (dispatch: any, deviceId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.getProjectDevicePlaybackStatus(deviceId).then((response: ApiClient.GlobalJsonResultOfProjectDevicePlaybackStatus) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device playback status: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({ type: DevicesOverviewActions.Actions.SetProjectDeviceStatus, value: response.result, id: deviceId });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const Play = (dispatch: any, projectId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.play(projectId).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device playback status: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({ type: Actions.SetPlaying, value: true });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const Stop = (dispatch: any, projectId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.stop(projectId).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device playback status: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({ type: Actions.SetPlaying, value: false });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};