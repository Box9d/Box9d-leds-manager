import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";

export class Actions { 
    public static SetProjectDevicePlaybackStatus: string = "SET_PROJECT_DEVICE_PLAYBACK_STATUS";
}

export const FetchProjectDevicePlaybackStatus = (dispatch: any, projectDeviceId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.getProjectDevicePlaybackStatus(projectDeviceId).then((response: ApiClient.GlobalJsonResultOfProjectDevicePlaybackStatus) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device playback status: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({type: Actions.SetProjectDevicePlaybackStatus, value: response.result});
        }
    });

    return {
        type: "DO_NOTHING",
    };
};