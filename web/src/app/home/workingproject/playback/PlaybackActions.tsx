import * as ApiClient from "../../../../../../api/build/ApiClient";
import { IAction } from "../../../../actions/IAction";
import config from "../../../../Config";
import * as MessageActions from "../../../messages/MessageActions";
import { MessageType } from "../../../messages/MessagingState";
import * as DevicesOverviewActions from "../devices/DevicesOverviewActions";

export class Actions {
    public static SetPlaying: string = "SET_PLAYING";
    public static SetAudioUnloaded: string = "SET_AUDIO_UNLOADED";
    public static SetAudioLoaded: string = "SET_AUDIO_LOADED";
}

export const FetchProjectDevicePlaybackStatus = (dispatch: any, deviceId: number, projectId: number): IAction => {

    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.getProjectDevicePlaybackStatus(deviceId, projectId).then((response: ApiClient.GlobalJsonResultOfProjectDevicePlaybackStatus) => {
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

export const UnloadAudio = (): IAction => {
    return {
        type: Actions.SetAudioUnloaded,
    };
};

export const LoadAudio = (dispatch: any, projectId: number): IAction => {
    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.loadAudio(projectId).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        dispatch({ type: Actions.SetAudioLoaded });
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
            dispatch({ type: DevicesOverviewActions.Actions.ResetProjectDeviceStatuses });
        }
    });

    return {
        type: "DO_NOTHING",
    };
};

export const BypassDevice = (dispatch: any, projectId: number, deviceId: number, bypass: boolean): IAction => {
    let apiClient = new ApiClient.VideoPlaybackClient(config.apiUrl);
    apiClient.bypassDevice(deviceId, projectId, bypass).then((response: ApiClient.GlobalJsonResultOfEmptyResult) => {
        if (!response.successful) {
            dispatch(MessageActions.SetMessageAndMessageType(dispatch, "Failed to bypass device playback: " + response.errorMessage, MessageType.Error));
        }

        return {
            type: "DO_NOTHING",
        };
    });

    if (bypass) {
        return {
            type: DevicesOverviewActions.Actions.SetProjectDeviceStatus, 
            value: ApiClient.ProjectDevicePlaybackStatus.Bypassed, 
            id: deviceId as any
        } as IAction;
    } else {
        return {
             type: DevicesOverviewActions.Actions.SetProjectDeviceStatus,
             value: ApiClient.ProjectDevicePlaybackStatus.NotOnline,
             id: deviceId as any
        } as IAction;
    }
};
