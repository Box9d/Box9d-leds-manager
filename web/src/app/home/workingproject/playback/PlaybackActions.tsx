import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";
import { Actions } from "../devices/DevicesOverviewActions";

export const FetchProjectDevicePlaybackStatus = (dispatch: any, deviceId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.getProjectDevicePlaybackStatus(deviceId).then((response: ApiClient.GlobalJsonResultOfProjectDevicePlaybackStatus) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Could not retrieve project device playback status: " + response.errorMessage, MessageType.Error));
        } else {
            dispatch({ type: Actions.SetProjectDeviceStatus, value: response.result, id: deviceId });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};